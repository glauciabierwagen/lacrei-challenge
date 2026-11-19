import { screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@/test/render";
import { Footer } from "./footer";
import { Header } from "./header";
import { LanguageProvider } from "./language-context";

// Verifica o menu, as rotas, a troca de idioma e a acessibilidade do cabeçalho.
describe("Header", () => {
  let originalLocation: string;

  beforeEach(() => {
    originalLocation = window.location.href;
    vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
      matches: false, media: query, onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(),
      addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
    })));
  });

  afterEach(() => {
    window.history.replaceState(null, "", originalLocation);
    vi.unstubAllGlobals();
  });

  it("defaults to Portuguese without a provider and names the cropped brand and collapsed navigation", () => {
    renderWithTheme(<Header />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    const navigation = screen.getByRole("navigation", { hidden: true });
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", navigation.id);
    expect(navigation).toHaveAttribute("aria-label", "Navegação principal");
    expect(navigation).not.toBeVisible();
    expect(screen.getByRole("link", { name: "Lacrei Saúde — início" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("img", { name: "Lacrei Saúde" })).toHaveAttribute("width", "528");
    expect(screen.getByRole("banner")).toHaveStyle({ position: "absolute", zIndex: "5" });
  });

  it.each(["{Enter}", " "])("toggles the native menu with %s", async (key) => {
    const { user } = renderWithTheme(<Header />);
    await user.tab();
    await user.tab();
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveFocus();
    await user.keyboard(key);
    expect(toggle).toHaveAccessibleName("Fechar menu");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeVisible();
    await user.keyboard(key);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("ignores other keys and closes on Escape, returning focus", async () => {
    const { user } = renderWithTheme(<Header />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    await user.click(toggle);
    await user.tab();
    expect(screen.getByRole("link", { name: "Início" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it.each([
    { pathname: "/", current: "Início" },
    { pathname: "/sobre", current: undefined },
    { pathname: "/medicos", current: "Médicos" },
    { pathname: "/missing", current: undefined },
  ])("has exact destinations and matching current page at $pathname", async ({ pathname, current }) => {
    vi.mocked(usePathname).mockReturnValue(pathname);
    const { user } = renderWithTheme(<Header />);
    expect(screen.getByRole("banner")).toHaveStyle({ position: ["/", "/medicos"].includes(pathname) ? "absolute" : "relative", zIndex: "5" });
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const navigation = screen.getByRole("navigation", { name: "Navegação principal" });
    const links = [["Início", "/"], ["Quem Somos", "https://lacreisaude.com.br/quem-somos/"], ["Médicos", "/medicos"],
      ["Blog", "/#historias"], ["Unidades", "/#impacto"], ["Como cadastrar", "/#cadastro"]];
    expect(within(navigation).getAllByRole("link")).toHaveLength(6);
    for (const [name, href] of links) {
      const link = within(navigation).getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      if (name === current) expect(link).toHaveAttribute("aria-current", "page");
      else expect(link).not.toHaveAttribute("aria-current");
    }
  });

  it.each(["Início", "Quem Somos", "Médicos", "Blog", "Unidades", "Como cadastrar", "Lacrei Saúde — início"])("closes after activating %s", async (name) => {
    const { user } = renderWithTheme(<Header />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    await user.click(toggle);
    const link = screen.getByRole("link", { name });
    link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    link.focus();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it.each([true, false])("dispatches registration again at the same hash and focuses the toggle only when collapsed (matches=%s)", async (matches) => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches, media: query, onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(),
      addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(() => true),
    }));
    const pushState = vi.spyOn(window.history, "pushState");
    const dispatch = vi.spyOn(window, "dispatchEvent");
    const { user } = renderWithTheme(<Header />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    const focus = vi.spyOn(toggle, "focus");

    for (const count of [1, 2]) {
      await user.click(toggle);
      focus.mockClear();
      const registration = screen.getByRole("link", { name: "Como cadastrar" });
      // O jsdom não aplica as regras de desktop ao simular matchMedia.
      // Mantém a navegação visível após fechar o estado do menu, como no CSS de desktop.
      if (!matches) screen.getByRole("navigation").style.display = "flex";
      await user.click(registration);
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      if (matches) expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
      else expect(screen.getByRole("navigation")).toBeVisible();
      expect(window.matchMedia).toHaveBeenLastCalledWith("(max-width: 1199px)");
      expect(pushState).toHaveBeenCalledTimes(count);
      expect(pushState).toHaveBeenLastCalledWith(null, "", "/#cadastro");
      expect(window.location.pathname + window.location.hash).toBe("/#cadastro");
      expect(dispatch).toHaveBeenCalledTimes(count);
      expect(dispatch).toHaveBeenLastCalledWith(expect.objectContaining({ type: "lacrei:register" }));
      expect(dispatch.mock.calls.at(-1)?.[0]).toBeInstanceOf(Event);
      if (matches) {
        expect(focus).toHaveBeenCalledOnce();
        expect(toggle).toHaveFocus();
      } else {
        expect(focus).not.toHaveBeenCalled();
        expect(registration).toHaveFocus();
      }
    }
  });

  it.each(["/sobre", "/medicos"])("keeps registration at %s as a normal home hash link", async (pathname) => {
    vi.mocked(usePathname).mockReturnValue(pathname);
    window.history.replaceState(null, "", pathname);
    const pushState = vi.spyOn(window.history, "pushState");
    const dispatch = vi.spyOn(window, "dispatchEvent");
    const { user } = renderWithTheme(<Header />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    await user.click(toggle);
    const registration = screen.getByRole("link", { name: "Como cadastrar" });
    expect(registration).toHaveAttribute("href", "/#cadastro");
    registration.addEventListener("click", (event) => event.preventDefault(), { once: true });
    await user.click(registration);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(window.matchMedia).not.toHaveBeenCalled();
    expect(pushState).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(window.location.pathname + window.location.hash).toBe(pathname);
  });

  it("shares PT/EN state with the footer and updates document language in an effect", async () => {
    const { user } = renderWithTheme(<LanguageProvider><Header /><Footer /></LanguageProvider>);
    expect(document.documentElement).toHaveAttribute("lang", "pt-BR");
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("button", { name: "PT Português" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "EN English" }));
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("button", { name: "EN English" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("group", { name: "Language" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Lacrei Saúde — home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "https://lacreisaude.com.br/quem-somos/");
    expect(screen.getByRole("link", { name: "Doctors" })).toHaveAttribute("href", "/medicos");
    expect(screen.getByRole("link", { name: "How to register" })).toHaveAttribute("href", "/#cadastro");
    expect(screen.getByRole("heading", { name: "Subscribe for updates" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Close menu" }));
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("button", { name: "PT Português" }));
    expect(document.documentElement).toHaveAttribute("lang", "pt-BR");
    expect(screen.getByRole("heading", { name: "Assine para receber novidades" })).toBeVisible();
  });

  it("removes the Escape listener when unmounted while open", async () => {
    const removeListener = vi.spyOn(document, "removeEventListener");
    const { user, unmount } = renderWithTheme(<Header />);
    await user.click(screen.getByRole("button", { name: "Menu" }));
    unmount();
    expect(removeListener).toHaveBeenCalledWith("keydown", expect.any(Function));
  });

  it("has no axe violations with the menu open", async () => {
    const { container, user } = renderWithTheme(<Header />);
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect((await axe(container)).violations).toEqual([]);
  });
});