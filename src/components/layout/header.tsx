"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { useLanguage } from "./language-context";

// Estilos do cabeçalho, do menu responsivo e dos botões de idioma.
const Shell = styled.header<{ $home: boolean }>`
  position: ${({ $home }) => $home ? "absolute" : "relative"};
  inset: 0 0 auto;
  z-index: 5;
  width: 100%;
  color: #fff;
  background: ${({ $home }) => $home ? "#0d0d0d3d" : "linear-gradient(110deg, #018363, #014687)"};
  backdrop-filter: blur(9px);
  font-family: "Nunito", sans-serif;
  a, button { color: inherit; }
  :focus-visible { outline: 3px solid #d5f78b; outline-offset: 4px; }
`;
const Row = styled.div`
  box-sizing: border-box;
  max-width: 1248px;
  min-height: 96px;
  margin-inline: auto;
  padding-inline: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  @media (min-width: 52rem) { padding-inline: 0; width: calc(100% - 2rem); flex-wrap: nowrap; }
  @media (min-width: 1200px) { padding-inline: 0; width: calc(100% - 96px); flex-wrap: nowrap; }
  @media (min-width: 1440px) { width: calc(100% - 192px); }
`;
const Brand = styled(Link)`
  width: 203px;
  height: 40px;
  flex: 0 0 203px;
  display: grid;
  place-items: center;
  img { width: 100%; height: auto; object-fit: contain; }
  @media (max-width: 1199px) {
    width: clamp(150px, 52vw, 203px);
    flex-basis: clamp(150px, 52vw, 203px);
  }
`;
const Toggle = styled.button`
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid currentColor;
  border-radius: 8px;
  background: #013c43;
  font: inherit;
  font-weight: 600;
  @media (min-width: 52rem) { display: none; }
`;
const Navigation = styled.nav<{ $open: boolean }>`
  display: ${({ $open }) => $open ? "flex" : "none"};
  flex-direction: column;
  width: 100%;
  padding: 12px 16px 20px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #013c43;
  ul { display: flex; flex-direction: column; gap: 8px; list-style: none; margin: 0; padding: 0; }
  a { display: flex; align-items: center; min-height: 44px; text-decoration: none; font-size: 20px; font-weight: 600; }
  a:hover, a[aria-current="page"] { text-decoration: underline; text-underline-offset: 6px; }
  a[data-registration] { border: 1px solid #fff; border-radius: 8px; padding: 0 16px; }
  @media (min-width: 52rem) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    flex: 1;
    width: auto;
    margin-inline-start: 2rem;
    padding: 0;
    background: transparent;
    ul { flex: 1; flex-direction: row; align-items: center; justify-content: space-between; gap: 8px; }
    a { white-space: nowrap; font-size: 16px; }
  }
  @media (min-width: 56rem) {
    ul { gap: 16px; }
    a { font-size: 18px; }
  }
`;
const Languages = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  button { min-width: 44px; min-height: 44px; border: 0; background: transparent; padding: 4px; font: inherit; font-size: 16px; font-weight: 700; }
  button[aria-pressed="true"] { color: ${({ theme }) => theme.colors.primary}; text-decoration: underline; text-underline-offset: 5px; }
  @media (min-width: 52rem) { margin-top: 0; }
`;
const NavigationDialog = styled.dialog`
  width: min(calc(100% - 2rem), 32rem);
  max-height: calc(100dvh - 2rem);
  overflow: auto;
  padding: 2rem;
  border: 0;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: #fff;
  &::backdrop { background: rgba(0, 0, 0, .65); }
  h2 { margin-bottom: 1rem; font-size: 2rem; line-height: 1.2; }
  p { margin-bottom: 1.5rem; font-size: 1.125rem; line-height: 1.5; }
  > div { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
  a { color: ${({ theme }) => theme.colors.primary}; font-size: clamp(1rem, 2.4vw, 1.5rem); }
  button { min-height: 4rem; padding: .5rem 1.5rem; border: 0; border-radius: 5px;
    background: ${({ theme }) => theme.colors.primary}; color: #fff; font: inherit; font-size: 1.25rem; }
`;

const navigation = {
  pt: ["Início", "Quem Somos", "Médicos", "Blog", "Unidades", "Entrar"],
  en: ["Home", "About Us", "Doctors", "Blog", "Locations", "Sign in"],
};
const destinations = ["/", "https://lacreisaude.com.br/quem-somos/", "/medicos", "/#historias", "/#impacto", "/#cadastro"];
const navigationDialogCopy = {
  pt: {
    blog: {
      title: "Blog",
      description: "O conteúdo do blog não está disponível nesta demonstração. Consulte o site oficial da Lacrei Saúde para novidades e informações atualizadas.",
    },
    locations: {
      title: "Unidades",
      description: "As informações sobre unidades de atendimento não estão disponíveis nesta demonstração. Consulte o site oficial da Lacrei Saúde para informações atualizadas.",
    },
    official: "Site oficial (nova aba)",
    close: "Fechar",
  },
  en: {
    blog: {
      title: "Blog",
      description: "Blog content is not available in this demo. Visit Lacrei Saúde's official website for news and current information.",
    },
    locations: {
      title: "Locations",
      description: "Information about care locations is not available in this demo. Visit Lacrei Saúde's official website for current information.",
    },
    official: "Official website (new tab)",
    close: "Close",
  },
};

// Mostra a navegação e permite trocar o idioma do site.
export function Header() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigationDialog = useRef<HTMLDialogElement>(null);
  const navigationDialogReturnFocus = useRef<HTMLElement | null>(null);
  const [dialogSection, setDialogSection] = useState<"blog" | "locations" | null>(null);
  const navigationId = useId();
  const english = language === "en";
  const dialogCopy = dialogSection ? navigationDialogCopy[language][dialogSection] : null;

  // Fecha o menu móvel com Escape e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <Shell $home={pathname === "/" || pathname === "/medicos"}>
      <Row>
        <Brand href="/" aria-label={english ? "Lacrei Saúde — home" : "Lacrei Saúde — início"} onClick={() => setOpen(false)}>
          <Image src="/images/figma/logo_lacrei.svg" width={203} height={26} sizes="(min-width: 52rem) 203px, 52vw" alt="Lacrei Saúde" />
        </Brand>
        <Toggle ref={buttonRef} type="button" aria-expanded={open} aria-controls={navigationId} onClick={() => setOpen(!open)}>
          {open ? (english ? "Close menu" : "Fechar menu") : "Menu"}
        </Toggle>
        <Navigation id={navigationId} aria-label={english ? "Main navigation" : "Navegação principal"} $open={open}>
          <ul>
            {navigation[language].map((label, index) => (
              <li key={destinations[index]}>
                <Link href={destinations[index]} aria-current={pathname === destinations[index] ? "page" : undefined}
                  aria-haspopup={index === 3 || index === 4 ? "dialog" : undefined}
                  aria-controls={index === 3 || index === 4 ? "navigation-info-dialog" : undefined}
                  data-registration={index === 5 ? "" : undefined} onClick={(event) => {
                    setOpen(false);
                    if (index === 3 || index === 4) {
                      event.preventDefault();
                      navigationDialogReturnFocus.current = window.matchMedia("(max-width: 831px)").matches
                        ? buttonRef.current
                        : event.currentTarget;
                      setDialogSection(index === 3 ? "blog" : "locations");
                      navigationDialog.current?.showModal();
                      return;
                    }
                    if (index === 5 && pathname === "/") {
                      event.preventDefault();
                      if (window.matchMedia("(max-width: 831px)").matches) buttonRef.current?.focus();
                      // Reabre o aviso de cadastro mesmo quando a URL já tem essa âncora.
                      window.history.pushState(null, "", "/#cadastro");
                      window.dispatchEvent(new Event("lacrei:register"));
                    }
                  }}>{label}</Link>
              </li>
            ))}
          </ul>
          <Languages role="group" aria-label={english ? "Language" : "Idioma"}>
            <button type="button" lang="pt-BR" aria-label="PT Português" aria-pressed={!english} onClick={() => setLanguage("pt")}>PT</button>
            <span aria-hidden="true">|</span>
            <button type="button" lang="en" aria-label="EN English" aria-pressed={english} onClick={() => setLanguage("en")}>EN</button>
          </Languages>
        </Navigation>
      </Row>
      <NavigationDialog
        ref={navigationDialog}
        id="navigation-info-dialog"
        aria-labelledby="navigation-info-title"
        onClose={() => {
          navigationDialogReturnFocus.current?.focus();
          navigationDialogReturnFocus.current = null;
        }}
      >
        {dialogCopy && <>
          <h2 id="navigation-info-title">{dialogCopy.title}</h2>
          <p>{dialogCopy.description}</p>
          <div>
            <a href="https://lacreisaude.com.br/" target="_blank" rel="noopener noreferrer">{navigationDialogCopy[language].official}</a>
            <button type="button" onClick={() => navigationDialog.current?.close()}>{navigationDialogCopy[language].close}</button>
          </div>
        </>}
      </NavigationDialog>
    </Shell>
  );
}