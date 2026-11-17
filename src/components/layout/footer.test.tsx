import { fireEvent, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@/test/render";
import { Footer } from "./footer";
import { Header } from "./header";
import { LanguageProvider } from "./language-context";

describe("Footer", () => {
  it("provides a newsletter, actual brand asset, copyright and back-to-top link", () => {
    renderWithTheme(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("heading", { level: 2, name: "Assine para receber novidades" })).toBeVisible();
    expect(screen.getByRole("region", { name: "Assine para receber novidades" })).toHaveAttribute("id", "novidades");
    expect(screen.getByRole("img", { name: "Lacrei Saúde" })).toHaveAttribute("width", "1920");
    expect(screen.getByText("©2026 Lacrei Saúde - Todos os Direitos reservados")).toBeVisible();
    expect(screen.getByText("Made by UXpand")).toBeVisible();
    expect(screen.getByRole("link", { name: "Voltar ao topo" })).toHaveAttribute("href", "#topo");
    expect(document.querySelector("#cadastro")).not.toBeInTheDocument();
  });

  it("preserves the newsletter copy and plain-text terms without inventing a policy link", () => {
    renderWithTheme(<Footer />);
    const newsletter = screen.getByRole("region", { name: "Assine para receber novidades" });
    expect(within(newsletter).getByText("Assine gratuitamente e receba notícias, histórias inspiradoras e muito mais direto no seu e-mail.")).toBeVisible();
    expect(within(newsletter).getByText("Ao se inscrever, você concorda com nossa Política de Privacidade e consente em receber atualizações da nossa empresa.")).toBeVisible();
    expect(within(newsletter).getByText("Demonstração de newsletter. Nenhum dado é enviado ou armazenado.")).toBeVisible();
    expect(within(newsletter).queryByRole("link")).not.toBeInTheDocument();
    const status = within(newsletter).getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toBeEmptyDOMElement();
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(within(newsletter).getByRole("textbox", { name: "Seu e-mail" })).toHaveStyle({ background: "#fff", color: "#252525" });
    expect(within(newsletter).getByRole("button", { name: "Assinar" })).toHaveStyle({ background: "#c8d533", color: "#163f32", borderRadius: "5px" });
    expect(screen.getByRole("link", { name: "Voltar ao topo" })).toHaveStyle({ background: "#c8d533" });
  });

  it("uses only social and email destinations published on the official website", () => {
    renderWithTheme(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Siga-nos" });
    expect(within(nav).getByRole("heading", { level: 2, name: "Siga-nos" })).toBeVisible();
    const links = [["Instagram", "https://www.instagram.com/lacrei.saude"],
      ["LinkedIn", "https://www.linkedin.com/company/lacrei"],
      ["Facebook", "https://www.facebook.com/lacrei.saude/"]];
    expect(within(nav).getAllByRole("link")).toHaveLength(3);
    for (const [name, href] of links) expect(within(nav).getByRole("link", { name })).toHaveAttribute("href", href);
    const contact = screen.getByRole("region", { name: "Fale conosco" });
    expect(within(contact).getByRole("heading", { level: 2, name: "Fale conosco" })).toBeVisible();
    expect(within(contact).getAllByRole("link")).toHaveLength(1);
    expect(within(contact).getByRole("link", { name: "contato@lacreisaude.com.br" })).toHaveAttribute("href", "mailto:contato@lacreisaude.com.br");
    expect(within(nav).queryByRole("link", { name: "contato@lacreisaude.com.br" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "YouTube" })).not.toBeInTheDocument();
  });

  it("explains the unavailable YouTube channel through a polite status", async () => {
    const { user } = renderWithTheme(<Footer />);
    await user.click(screen.getByRole("button", { name: "YouTube" }));
    expect(screen.getByText("YouTube: canal oficial não verificado. Link indisponível nesta demonstração.")).toHaveAttribute("role", "status");
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
    // Defensively reject programmatic submission that bypasses browser validation.
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
    const controls = [screen.getByRole("textbox", { name: "Seu e-mail" }),
      screen.getByRole("button", { name: "Assinar" }), screen.getByRole("link", { name: "Instagram" }),
      screen.getByRole("button", { name: "YouTube" }), screen.getByRole("link", { name: "LinkedIn" }),
      screen.getByRole("link", { name: "Facebook" }), screen.getByRole("link", { name: "contato@lacreisaude.com.br" }),
      screen.getByRole("link", { name: "Voltar ao topo" })];
    for (const control of controls) { await user.tab(); expect(control).toHaveFocus(); }
  });

  it("translates footer text and existing live messages in both directions", async () => {
    const { user } = renderWithTheme(<LanguageProvider><Header /><Footer /></LanguageProvider>);
    await user.type(screen.getByRole("textbox", { name: "Seu e-mail" }), "person@example.com");
    await user.click(screen.getByRole("button", { name: "Assinar" }));
    await user.click(screen.getByRole("button", { name: "YouTube" }));
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("button", { name: "EN English" }));
    expect(screen.getByRole("heading", { name: "Subscribe for updates" })).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Follow us" })).toBeVisible();
    expect(screen.getByRole("region", { name: "Contact us" })).toBeVisible();
    expect(screen.getByText("Subscribe for free and receive news, inspiring stories and much more directly in your inbox.")).toBeVisible();
    expect(screen.getByText("By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.")).toBeVisible();
    expect(screen.getByText("Newsletter demonstration. No data is sent or stored.")).toBeVisible();
    expect(screen.getByRole("link", { name: "Back to top" })).toHaveAttribute("href", "#topo");
    expect(screen.getByText("Demo: no email was sent or stored.")).toBeVisible();
    expect(screen.getByText("YouTube: official channel not verified. Link unavailable in this demo.")).toBeVisible();
    await user.type(screen.getByRole("textbox", { name: "Your email" }), "english@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(screen.getByRole("textbox", { name: "Your email" })).toHaveValue("");
    await user.click(screen.getByRole("button", { name: "PT Português" }));
    expect(screen.getByRole("navigation", { name: "Siga-nos" })).toBeVisible();
    expect(screen.getByRole("region", { name: "Fale conosco" })).toBeVisible();
    expect(screen.getByText("Demonstração: nenhum e-mail foi enviado ou armazenado.")).toBeVisible();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTheme(<Footer />);
    expect((await axe(container)).violations).toEqual([]);
  });
});