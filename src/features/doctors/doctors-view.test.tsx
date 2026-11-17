import { screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Header } from "@/components/layout/header";
import { LanguageProvider } from "@/components/layout/language-context";
import { renderWithTheme } from "@/test/render";
import { DoctorsView } from "./doctors-view";

// Restaura o idioma do documento após cada teste.
afterEach(() => {
  document.documentElement.lang = "pt-BR";
});

// Verifica banners, cartões, links de cadastro e troca de idioma da página de médicos.
describe("DoctorsView", () => {
  it("selects each hero banner exclusively by keyboard and announces its heading", async () => {
    const { user } = renderWithTheme(<DoctorsView />);
    const heading = screen.getByRole("heading", { level: 1 });
    const titles = [/^Saúde que cuida\s*e transforma vidas$/, /^Mudamos pessoas,\s*transformamos o mundo\.$/, /^Educação sem fronteiras,\s*transformação sem limites\.$/];
    const banners = within(screen.getByRole("group", { name: "Escolher banner" })).getAllByRole("button");
    expect(screen.getByRole("region", { name: titles[0] })).toHaveAttribute("aria-roledescription", "carrossel");
    expect(heading).toHaveAttribute("aria-live", "polite");
    expect(heading).toHaveAccessibleName(titles[0]);
    expect(banners).toHaveLength(3);
    banners.forEach((banner, index) => {
      expect(banner).toHaveAttribute("type", "button");
      expect(banner).toHaveAccessibleName(new RegExp(`^Banner ${index + 1}:`));
      expect(banner).toHaveAttribute("aria-pressed", String(index === 0));
    });
    for (const index of [1, 2, 0]) {
      banners[index].focus();
      await user.keyboard("{Enter}");
      expect(heading).toHaveAccessibleName(titles[index]);
      banners.forEach((banner, candidate) => expect(banner).toHaveAttribute("aria-pressed", String(candidate === index)));
    }
  });

  it("renders mission headings and named volunteer testimonials separately from the nine doctor cards", () => {
    renderWithTheme(<DoctorsView />);
    const mission = within(screen.getByRole("region", { name: "Nossa Missão" }));
    for (const name of ["Construir um mundo mais fraterno", "Unir corações e valorizar vidas", "Promover educação sustentável e inclusiva"]) {
      expect(mission.getByRole("heading", { level: 3, name })).toBeVisible();
    }
    expect(mission.getByRole("img", { name: "Pessoas reunidas em um evento do Orgulho LGBTQIA+" })).toBeVisible();
    const testimonials = within(screen.getByRole("region", { name: "Depoimentos inspiradores" }));
    expect(testimonials.getAllByRole("article")).toHaveLength(3);
    for (const name of ["Fernanda", "Silvia", "Débora"]) {
      expect(within(testimonials.getByRole("article", { name: `Depoimento de ${name}` })).getByRole("heading", { level: 3, name })).toBeVisible();
    }
    const team = within(screen.getByRole("region", { name: "Conheça nossos médicos" }));
    const cards = team.getAllByRole("article");
    const names = ["Fernanda", "Marcelo", "Fernanda", "Fernanda", "Marcelo", "Fernanda", "Fernanda", "Fernanda", "Marcelo"];
    expect(cards).toHaveLength(9);
    expect(team.getAllByRole("heading", { level: 3, name: "Fernanda" })).toHaveLength(6);
    expect(team.getAllByRole("heading", { level: 3, name: "Marcelo" })).toHaveLength(3);
    cards.forEach((card, index) => {
      expect(within(card).getByRole("heading", { level: 3, name: names[index] })).toBeVisible();
      expect(within(card).getByText("Lorem", { exact: true })).toBeVisible();
      expect(within(card).getByText("Lorem Ipsum", { exact: true })).toBeVisible();
    });
    expect(screen.getByRole("heading", { level: 2, name: "Juntos pela causa!" })).toBeVisible();
  });

  it("keeps all four registration CTAs as home hash links without a form or local registration dialog", () => {
    renderWithTheme(<DoctorsView />);
    const registration = screen.getAllByRole("link", { name: "Como cadastrar" });
    const join = screen.getAllByRole("link", { name: "Junte-se a nós" });
    expect(registration).toHaveLength(2);
    expect(join).toHaveLength(2);
    expect(screen.getAllByRole("link")).toHaveLength(4);
    for (const link of [...registration, ...join]) expect(link).toHaveAttribute("href", "/#cadastro");
    expect(screen.queryByRole("dialog", { hidden: true })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /cadastrar|agendar/i })).not.toBeInTheDocument();
  });

  it("uses the header's shared language state and preserves the selected slide when translating and switching back", async () => {
    const { user } = renderWithTheme(<LanguageProvider><Header /><DoctorsView /></LanguageProvider>);
    await user.click(screen.getByRole("button", { name: /^Banner 3:/ }));
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("button", { name: "EN English" }));
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Education without borders,\s*transformation without limits\.$/);
    expect(screen.getByRole("region", { name: /^Education without borders,/ })).toHaveAttribute("aria-roledescription", "carousel");
    expect(within(screen.getByRole("group", { name: "Choose a banner" })).getByRole("button", { name: /^Banner 3:/ })).toHaveAttribute("aria-pressed", "true");
    for (const name of ["Our Mission", "Inspiring testimonials", "Meet our doctors", "Together for the cause!"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    for (const name of ["Build a more compassionate world", "Bring hearts together and value lives", "Promote sustainable and inclusive education"]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeVisible();
    }
    expect(screen.getByRole("img", { name: "People together at a Pride event" })).toBeVisible();
    expect(screen.getByRole("img", { name: "Lacrei Saúde partner seal" })).toBeVisible();
    for (const name of ["Fernanda", "Silvia", "Débora"]) expect(screen.getByRole("article", { name: `Testimonial from ${name}` })).toBeVisible();
    const navigation = within(screen.getByRole("navigation", { name: "Main navigation" }));
    expect(navigation.getByRole("link", { name: "Doctors" })).toHaveAttribute("href", "/medicos");
    expect(screen.getAllByRole("link", { name: "How to register" })).toHaveLength(3);
    expect(screen.getAllByRole("link", { name: "Join us" })).toHaveLength(2);
    for (const name of ["How to register", "Join us"]) {
      for (const link of screen.getAllByRole("link", { name })) expect(link).toHaveAttribute("href", "/#cadastro");
    }
    await user.click(screen.getByRole("button", { name: "PT Português" }));
    expect(document.documentElement).toHaveAttribute("lang", "pt-BR");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Educação sem fronteiras,\s*transformação sem limites\.$/);
    expect(screen.getByRole("button", { name: /^Banner 3:/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Nossa Missão" })).toBeVisible();
  });
});