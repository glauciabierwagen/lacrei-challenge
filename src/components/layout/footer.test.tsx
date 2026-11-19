import { fireEvent, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@/test/render";
import { Footer } from "./footer";
import { Header } from "./header";
import { LanguageProvider } from "./language-context";

// Verifica contatos, newsletter demonstrativa, idioma e acessibilidade do rodapé.
describe("Footer", () => {
  it("provides a newsletter, actual brand asset and copyright without a back-to-top button", () => {
    renderWithTheme(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("heading", { level: 2, name: "Assine para receber novidades" })).toBeVisible();
    expect(screen.getByRole("region", { name: "Assine para receber novidades" })).toHaveAttribute("id", "novidades");
    expect(screen.getByRole("img", { name: "Lacrei Saúde" })).toHaveAttribute("src", "/images/figma/logo_lacrei.svg");
    expect(screen.getByText("©2026 Lacrei Saúde - Todos os Direitos reservados")).toBeVisible();
    expect(screen.getByText("Made by UXpand")).toBeVisible();
    expect(screen.queryByRole("link", { name: "Voltar ao topo" })).not.toBeInTheDocument();
    expect(document.querySelector("#cadastro")).not.toBeInTheDocument();
  });

  it("places the newsletter after all navigation and back-to-top items", () => {
    renderWithTheme(<Footer />);
    const items = [
      screen.getByRole("navigation", { name: "Siga-nos" }),
      screen.getByRole("navigation", { name: "Lacrei Saúde" }),
      screen.getByRole("navigation", { name: "Saúde" }),
      screen.getByRole("navigation", { name: "Segurança e Privacidade" }),
      screen.getByRole("region", { name: "Assine para receber novidades" }),
    ];
    for (let index = 0; index < items.length - 1; index++) {
      expect(items[index].compareDocumentPosition(items[index + 1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it("preserves the newsletter copy and plain-text terms without inventing a policy link", () => {
    renderWithTheme(<Footer />);
    const newsletter = screen.getByRole("region", { name: "Assine para receber novidades" });
    expect(within(newsletter).getByText("Assine gratuitamente e receba notícias, histórias inspiradoras e muito mais direto no seu e-mail.")).toBeVisible();
    expect(within(newsletter).getByText("Ao assinar, você aceita a Política de Privacidade e receberá novidades.")).toBeVisible();
    expect(within(newsletter).getByText("Demonstração de newsletter. Nenhum dado é enviado ou armazenado.")).toBeVisible();
    expect(within(newsletter).queryByRole("link")).not.toBeInTheDocument();
    const status = within(newsletter).getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toBeEmptyDOMElement();
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(within(newsletter).getByRole("textbox", { name: "Seu e-mail" })).toHaveStyle({ background: "#fff", color: "#252525" });
    expect(within(newsletter).getByRole("button", { name: "Assinar" })).toHaveStyle({ background: "#c8d533", color: "#163f32", borderRadius: "5px" });
    expect(newsletter).toHaveStyle({ width: "100%" });
  });

  it("uses only social and email destinations published on the official website", () => {
    renderWithTheme(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Siga-nos" });
    expect(nav).toHaveAttribute("aria-label", "Siga-nos");
    const links = [["Facebook", "https://www.facebook.com/lacrei.saude/"],
      ["Instagram", "https://www.instagram.com/lacrei.saude"],
      ["LinkedIn", "https://www.linkedin.com/company/lacrei"],
      ["Fale conosco: contato@lacreisaude.com.br", "mailto:contato@lacreisaude.com.br"]];
    expect(within(nav).getAllByRole("link")).toHaveLength(4);
    for (const [name, href] of links) expect(within(nav).getByRole("link", { name })).toHaveAttribute("href", href);
    expect(within(nav).getByRole("link", { name: "Fale conosco: contato@lacreisaude.com.br" })).toHaveAttribute("title", "Fale conosco");
    expect(screen.queryByRole("button", { name: "YouTube" })).not.toBeInTheDocument();
  });

  it("adds the official information, health and privacy links without removing the newsletter or social links", () => {
    renderWithTheme(<Footer />);
    const groups = [
      ["Lacrei Saúde", [
        ["Quem Somos", "https://lacreisaude.com.br/quem-somos/"],
        ["Nosso Propósito", "https://lacreisaude.com.br/quem-somos/#proposito"],
        ["Missão, Visão e Valor", "https://lacreisaude.com.br/quem-somos/#missao-visao-valores"],
        ["Acessibilidade", "https://lacreisaude.com.br/acessibilidade/"],
      ]],
      ["Saúde", [
        ["Buscar atendimento", "https://paciente.lacreisaude.com.br/"],
        ["Oferecer atendimento", "https://profissional.lacreisaude.com.br/"],
      ]],
      ["Segurança e Privacidade", [
        ["Política de Privacidade", "https://lacreisaude.com.br/politica-de-privacidade/"],
        ["Termos de Uso", "https://lacreisaude.com.br/termos-de-uso/"],
        ["Direitos de Titular", "https://lacreisaude.com.br/direitos-de-titular/"],
      ]],
    ] as const;
    for (const [heading, links] of groups) {
      const nav = screen.getByRole("navigation", { name: heading });
      for (const [label, href] of links) expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    expect(screen.getByRole("region", { name: "Assine para receber novidades" })).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Siga-nos" })).toBeVisible();
  });

  it("requires a labelled valid email and rejects missing and invalid values", async () => {
    const { user } = renderWithTheme(<Footer />);
    const input = screen.getByRole("textbox", { name: "Seu e-mail" });
    const status = within(screen.getByRole("region", { name: "Assine para receber novidades" })).getByRole("status");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
    expect(screen.getByLabelText("Seu e-mail")).toBe(input);
    await user.click(screen.getByRole("button", { name: "Assinar" }));
    expect(input).toBeInvalid();
    await user.type(input, "invalid-email");
    await user.click(screen.getByRole("button", { name: "Assinar" }));
    expect(input).toBeInvalid();
    // Confere se um envio por código também rejeita valores inválidos.
    fireEvent.submit(input.closest("form")!);
    expect(input).toHaveValue("invalid-email");
    expect(status).toBeEmptyDOMElement();
    expect(screen.queryByText("Demonstração: nenhum e-mail foi enviado ou armazenado.")).not.toBeInTheDocument();
  });

  it("announces the demo result without network or storage and clears the email", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    const { user } = renderWithTheme(<Footer />);
    const input = screen.getByRole("textbox", { name: "Seu e-mail" });
    const initialStatus = within(screen.getByRole("region", { name: "Assine para receber novidades" })).getByRole("status");
    expect(initialStatus).toBeEmptyDOMElement();
    await user.type(input, "person@example.com");
    await user.click(screen.getByRole("button", { name: "Assinar" }));
    expect(input).toHaveValue("");
    const status = screen.getByText("Demonstração: nenhum e-mail foi enviado ou armazenado.");
    expect(status).toBe(initialStatus);
    expect(status).toHaveAttribute("role", "status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
  });

  it("supports keyboard access to the labelled form and all channel controls", async () => {
    const { user } = renderWithTheme(<Footer />);
    const controls = [
      screen.getByRole("link", { name: "Lacrei Saúde — início" }),
      screen.getByRole("link", { name: "Facebook" }), screen.getByRole("link", { name: "Instagram" }),
      screen.getByRole("link", { name: "LinkedIn" }), screen.getByRole("link", { name: "Fale conosco: contato@lacreisaude.com.br" }),
      ...["Quem Somos", "Nosso Propósito", "Missão, Visão e Valor", "Acessibilidade", "Buscar atendimento",
        "Oferecer atendimento", "Política de Privacidade", "Termos de Uso", "Direitos de Titular"]
        .map((name) => screen.getByRole("link", { name })),
      screen.getByRole("textbox", { name: "Seu e-mail" }), screen.getByRole("button", { name: "Assinar" })];
    for (const control of controls) { await user.tab(); expect(control).toHaveFocus(); }
  });

  it("translates footer text and existing live messages in both directions", async () => {
    const { user } = renderWithTheme(<LanguageProvider><Header /><Footer /></LanguageProvider>);
    await user.type(screen.getByRole("textbox", { name: "Seu e-mail" }), "person@example.com");
    await user.click(screen.getByRole("button", { name: "Assinar" }));
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("button", { name: "EN English" }));
    expect(screen.getByRole("heading", { name: "Subscribe for updates" })).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Follow us" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Contact us: contato@lacreisaude.com.br" })).toBeVisible();
    expect(screen.getByText("Subscribe for free and receive news, inspiring stories and much more directly in your inbox.")).toBeVisible();
    expect(screen.getByText("By subscribing, you accept our Privacy Policy and receive updates.")).toBeVisible();
    expect(screen.getByText("Newsletter demonstration. No data is sent or stored.")).toBeVisible();
    expect(screen.queryByRole("link", { name: "Back to top" })).not.toBeInTheDocument();
    expect(screen.getByText("Demo: no email was sent or stored.")).toBeVisible();
    expect(screen.queryByRole("button", { name: "YouTube" })).not.toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: "Your email" }), "english@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(screen.getByRole("textbox", { name: "Your email" })).toHaveValue("");
    await user.click(screen.getByRole("button", { name: "PT Português" }));
    expect(screen.getByRole("navigation", { name: "Siga-nos" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Fale conosco: contato@lacreisaude.com.br" })).toBeVisible();
    expect(screen.getByText("Demonstração: nenhum e-mail foi enviado ou armazenado.")).toBeVisible();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTheme(<Footer />);
    expect((await axe(container)).violations).toEqual([]);
  });
});