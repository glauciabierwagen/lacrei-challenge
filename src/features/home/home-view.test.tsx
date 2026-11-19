import { fireEvent, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider, useLanguage } from "@/components/layout/language-context";
import { renderWithTheme } from "@/test/render";
import { HomeView } from "./home-view";

// O jsdom não oferece o ciclo nativo do modal, a contenção de foco nem a ação de Escape.
// Simula apenas abrir e fechar; foco e Escape reais são verificados nos testes de navegador.
const dialogPrototype = HTMLDialogElement.prototype;
const originalShowModal = Object.getOwnPropertyDescriptor(dialogPrototype, "showModal");
const originalClose = Object.getOwnPropertyDescriptor(dialogPrototype, "close");

function LanguageControls() {
  const { setLanguage } = useLanguage();
  return <><button onClick={() => setLanguage("en")}>English</button><button onClick={() => setLanguage("pt")}>Português</button></>;
}

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  Object.defineProperties(dialogPrototype, {
    showModal: { configurable: true, value: vi.fn(function (this: HTMLDialogElement) {
      this.open = true;
    }) },
    close: { configurable: true, value: vi.fn(function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event("close"));
    }) },
  });
});

afterEach(() => {
  for (const [name, descriptor] of [["showModal", originalShowModal], ["close", originalClose]] as const) {
    if (descriptor) Object.defineProperty(dialogPrototype, name, descriptor);
    else Reflect.deleteProperty(dialogPrototype, name);
  }
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
  document.documentElement.lang = "pt-BR";
});

// Verifica banners, mapa, idioma, linha do tempo e abertura do aviso de cadastro.
describe("HomeView", () => {
  it("links both Portuguese team CTAs to the doctors route", () => {
    renderWithTheme(<HomeView />);
    expect(screen.getAllByRole("link", { name: "Conheça nosso time" })).toHaveLength(2);
    for (const name of ["Nosso Propósito", "Impacto do Lacrei Saúde"]) {
      expect(within(screen.getByRole("region", { name })).getByRole("link", { name: "Conheça nosso time" })).toHaveAttribute("href", "/medicos");
    }
  });

  it("shows the complete Portuguese purpose copy", () => {
    renderWithTheme(<HomeView />);
    const purpose = screen.getByRole("region", { name: "Nosso Propósito" });
    expect(within(purpose).getByText("Existimos para transformar o acesso à saúde, conectando a comunidade LGBTQIAPN+ a profissionais de saúde qualificados e humanizados. Nosso compromisso é com a promoção de um atendimento seguro, inclusivo e livre de preconceitos, celebrando a diversidade em todas as suas formas e garantindo que cada pessoa seja acolhida em sua integralidade e dignidade.")).toBeVisible();
    for (const title of ["Promover saúde inclusiva", "Valorizar a diversidade", "Combater o preconceito"]) {
      expect(within(purpose).getByRole("heading", { level: 3, name: title })).toBeVisible();
    }
    for (const description of [
      "Facilitamos o acesso a serviços de saúde físicos e mentais que respeitam e acolhem a pluralidade de corpos, identidades e vivências, garantindo um acolhimento digno e livre de qualquer tipo de discriminação para toda a comunidade LGBTQIAPN+.",
      "Acreditamos que a pluralidade é nossa maior força. Trabalhamos ativamente para sensibilizar e capacitar profissionais, unindo corações e saberes para construir um ambiente de cuidado que reconhece, respeita e celebra as diferenças individuais de cada paciente.",
      "Atuamos na desconstrução de barreiras históricas no acesso à saúde por meio da informação e do afeto, promovendo uma educação contínua que transforma a sociedade e viabiliza um atendimento médico verdadeiramente seguro, empático e humanizado para todas as pessoas.",
    ]) {
      expect(within(purpose).getByText(description)).toBeVisible();
    }
  });

  it("scales the partner seal to match the neighboring logos", () => {
    renderWithTheme(<HomeView />);
    expect(screen.getByRole("img", { name: "Selo parceiro Lacrei Saúde" })).toHaveStyle({ transform: "scale(2)" });
  });

  it("selects each banner exclusively and announces its heading", async () => {
    const { user } = renderWithTheme(<HomeView />);
    const banners = within(screen.getByRole("group", { name: "Escolher banner" })).getAllByRole("button");
    const heading = screen.getByRole("heading", { level: 1 });
    // Os espaços no nome acessível junto ao <br /> diferem entre jsdom e Chromium.
    const titles = [/^Saúde que fortalece\s*e transforma vidas$/, /^Mudamos pessoas,\s*transformamos o mundo\.$/, /^Saúde sem fronteiras,\s*transformação sem limites\.$/];
    expect(heading).toHaveAttribute("aria-live", "polite");
    expect(banners).toHaveLength(3);
    expect(banners[0]).toHaveAttribute("aria-pressed", "true");
    for (const index of [1, 2, 0]) {
      banners[index].focus();
      await user.keyboard("{Enter}");
      expect(heading).toHaveAccessibleName(titles[index]);
      expect(heading).toHaveAttribute("data-slide", String(index));
      if (index === 2) {
        expect(heading.querySelector("span")).toHaveStyle({ whiteSpace: "nowrap", color: "rgb(8, 123, 107)" });
      }
      banners.forEach((banner, candidate) => {
        expect(banner).toHaveAttribute("aria-pressed", String(candidate === index));
      });
    }
  });

  it("announces the selected country without inventing impact data", async () => {
    const { user } = renderWithTheme(<HomeView />);
    const map = screen.getByRole("group", { name: "Explore os países destacados no mapa" });
    const markers = within(map).getAllByRole("button");
    const status = screen.getByRole("status");
    expect(status).toBeEmptyDOMElement();
    expect(markers).toHaveLength(4);
    markers.forEach((marker) => expect(marker).toHaveAttribute("aria-pressed", "false"));
    for (const country of ["Brasil", "Senegal", "Moçambique", "Madagáscar"]) {
      const selected = within(map).getByRole("button", { name: `Explorar ${country}` });
      await user.click(selected);
      expect(status).toHaveTextContent(`${country} — destaque no mapa do projeto. Dados de impacto ainda não disponibilizados.`);
      markers.forEach((marker) => expect(marker).toHaveAttribute("aria-pressed", String(marker === selected)));
    }
  });

  it("translates selected content and accessible names through LanguageProvider, then switches back", async () => {
    const { user } = renderWithTheme(<LanguageProvider><LanguageControls /><HomeView /></LanguageProvider>);
    expect(document.documentElement).toHaveAttribute("lang", "pt-BR");
    await user.click(screen.getByRole("button", { name: /^Banner 3:/ }));
    await user.click(screen.getByRole("button", { name: "Explorar Moçambique" }));
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Health without borders,\s*transformation without limits\.$/);
    expect(screen.getByRole("region", { name: /^Health without borders,\s*transformation without limits\.$/ })).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getByRole("group", { name: "Choose a banner" })).toBeVisible();
    expect(screen.getByRole("button", { name: /^Banner 3:/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Our Purpose" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Promote inclusive healthcare" })).toBeVisible();
    expect(screen.getByText("Our commitment to inclusive, prejudice-free healthcare knows no borders. From Brazil to the world, we expand access to compassionate care, celebrating diversity and strengthening the LGBTQIAPN+ community across continents.")).toBeVisible();
    expect(screen.getByRole("img", { name: "A diverse team of health professionals" })).toBeVisible();
    expect(screen.getByRole("group", { name: "Explore the countries highlighted on the map" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Explore Mozambique" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Mozambique — highlighted in the design map. Impact details have not been provided.");
    expect(screen.getByRole("region", { name: "History timeline — scroll to explore" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("heading", { name: "Together for the cause!" })).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Meet our team" })).toHaveLength(2);
    for (const name of ["Our Purpose", "The impact of Lacrei Saúde"]) {
      expect(within(screen.getByRole("region", { name })).getByRole("link", { name: "Meet our team" })).toHaveAttribute("href", "/medicos");
    }
    expect(screen.getByRole("link", { name: "For Patients" })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    expect(screen.getByRole("link", { name: "For Professionals" })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    window.history.pushState(null, "", "/#cadastro");
    fireEvent(window, new Event("lacrei:register"));
    const dialog = screen.getByRole("dialog", { name: "How to register" });
    expect(within(dialog).getByText(/Registration and appointments are not available here/)).toBeVisible();
    expect(within(dialog).getByRole("link", { name: "Official website (new tab)" })).toHaveAttribute("href", "https://lacreisaude.com.br/");
    await user.click(within(dialog).getByRole("button", { name: "Close" }));
    await user.click(screen.getByRole("button", { name: "Português" }));
    expect(document.documentElement).toHaveAttribute("lang", "pt-BR");
    expect(screen.getByText("O nosso compromisso com uma saúde inclusiva e sem preconceitos não tem fronteiras. Do Brasil para o mundo, ampliamos o acesso a cuidados humanizados, celebrando a diversidade e fortalecendo a comunidade LGBTQIAPN+ em diferentes continentes.")).toBeVisible();
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Saúde sem fronteiras,\s*transformação sem limites\.$/);
    expect(screen.getByRole("button", { name: "Explorar Moçambique" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Moçambique — destaque no mapa do projeto.");
    expect(screen.getByRole("link", { name: "Para Pacientes" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Para Profissionais" })).toBeVisible();
  });

  it.each([false, true])("scrolls the timeline both ways with reduced motion = %s", async (reducedMotion) => {
    const matchMedia = vi.fn((query: string) => ({ matches: reducedMotion, media: query }));
    vi.stubGlobal("matchMedia", matchMedia);
    const { user } = renderWithTheme(<HomeView />);
    const timeline = screen.getByRole("region", { name: "Linha do tempo — role para explorar" });
    const scrollBy = vi.fn();
    Object.defineProperty(timeline, "scrollBy", { configurable: true, value: scrollBy });
    expect(timeline).toHaveAttribute("tabindex", "0");
    expect(timeline).toHaveStyle({ scrollbarWidth: "none" });
    expect(within(timeline).getAllByRole("listitem")).toHaveLength(6);
    const storyTitles = ["Um cuidado que faz falta", "Uma ideia começa a ganhar forma", "Nasce a Lacrei Saúde", "Conexões com mais acolhimento", "Respeito em cada experiência", "Um futuro sem fronteiras"];
    for (const title of storyTitles) expect(within(timeline).getByRole("heading", { level: 3, name: title })).toBeVisible();
    expect(within(timeline).getByRole("img", { name: "Fachada de um complexo hospitalar" })).toBeVisible();
    expect(within(timeline).getByRole("img", { name: "Profissionais de saúde atendendo uma pessoa em um leito hospitalar" })).toBeVisible();
    const connectionCard = within(timeline).getByRole("heading", { level: 3, name: "Conexões com mais acolhimento" }).closest("article");
    expect(connectionCard?.querySelector("img")).toHaveStyle({ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.25)" });
    expect(within(timeline).queryByText("Lorem Ipsum")).not.toBeInTheDocument();
    for (const year of [2018, 2019, 2020, 2023, 2024, 2025]) {
      expect(within(timeline).getByText(String(year))).toHaveAttribute("datetime", String(year));
    }
    const next = screen.getByRole("button", { name: "Próximas histórias" });
    const previous = screen.getByRole("button", { name: "Histórias anteriores" });
    expect(next.parentElement).toBe(previous.parentElement);
    expect(within(screen.getByRole("region", { name: "Linha do tempo — role para explorar" })).getByRole("heading", { level: 3, name: storyTitles[0] })).toBeVisible();
    expect(screen.queryByRole("link", { name: "Crie novas histórias" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Create new stories" })).not.toBeInTheDocument();
    await user.click(next);
    await user.click(previous);
    expect(scrollBy).toHaveBeenCalledTimes(2);
    expect(scrollBy).toHaveBeenNthCalledWith(1, { left: 544, behavior: reducedMotion ? "instant" : "smooth" });
    expect(scrollBy).toHaveBeenNthCalledWith(2, { left: -544, behavior: reducedMotion ? "instant" : "smooth" });
    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("links the hero CTAs to the official patient and professional portals", () => {
    renderWithTheme(<HomeView />);
    expect(screen.getByRole("link", { name: "Para Pacientes" })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    expect(screen.getByRole("link", { name: "Para Profissionais" })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    expect(screen.queryByRole("button", { name: "Como cadastrar" })).not.toBeInTheDocument();
  });

  it("opens an initial registration hash, ignores hash changes while open, and clears the hash on close", async () => {
    window.history.replaceState(null, "", "/#cadastro");
    const { user } = renderWithTheme(<HomeView />);
    expect(screen.getByRole("dialog", { name: "Como cadastrar" })).toHaveAttribute("open");
    fireEvent(window, new HashChangeEvent("hashchange"));
    expect(dialogPrototype.showModal).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "Fechar" }));
    expect(window.location.hash).toBe("");
    expect(window.location.pathname).toBe("/");
  });

  it("handles repeated registration hash events and removes the listener on unmount", async () => {
    const removeListener = vi.spyOn(window, "removeEventListener");
    const { user, unmount } = renderWithTheme(<HomeView />);
    window.history.replaceState(null, "", "/#impacto");
    fireEvent(window, new HashChangeEvent("hashchange"));
    expect(dialogPrototype.showModal).not.toHaveBeenCalled();
    for (let attempt = 0; attempt < 2; attempt++) {
      window.history.replaceState(null, "", "/#cadastro");
      fireEvent(window, new HashChangeEvent("hashchange"));
      expect(screen.getByRole("dialog", { name: "Como cadastrar" })).toHaveAttribute("open");
      await user.click(screen.getByRole("button", { name: "Fechar" }));
      expect(window.location.hash).toBe("");
    }
    expect(dialogPrototype.showModal).toHaveBeenCalledTimes(2);
    unmount();
    expect(removeListener).toHaveBeenCalledWith("hashchange", expect.any(Function));
    window.history.replaceState(null, "", "/#cadastro");
    fireEvent(window, new HashChangeEvent("hashchange"));
    expect(dialogPrototype.showModal).toHaveBeenCalledTimes(2);
  });
});