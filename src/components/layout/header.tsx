"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { useLanguage } from "./language-context";

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
  min-height: 111px;
  margin-inline: auto;
  padding-inline: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  @media (min-width: 1200px) { padding-inline: 0; width: calc(100% - 96px); flex-wrap: nowrap; }
  @media (min-width: 1440px) { width: calc(100% - 192px); }
`;
const Brand = styled(Link)`
  width: 130px;
  height: 79px;
  flex: 0 0 130px;
  overflow: hidden;
  display: grid;
  place-items: center;
  img { width: 82px; height: 82px; object-fit: fill; }
`;
const Toggle = styled.button`
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid currentColor;
  border-radius: 8px;
  background: #013c43;
  font: inherit;
  font-weight: 600;
  @media (min-width: 1200px) { display: none; }
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
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    width: auto;
    padding: 0;
    background: transparent;
    ul { flex-direction: row; align-items: center; gap: 24px; }
    a { white-space: nowrap; }
  }
`;
const Languages = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  button { min-width: 44px; min-height: 44px; border: 0; background: transparent; padding: 4px; font: inherit; font-size: 16px; font-weight: 700; }
  button[aria-pressed="true"] { color: #d5f78b; text-decoration: underline; text-underline-offset: 5px; }
  @media (min-width: 1200px) { margin-top: 0; }
`;

const navigation = {
  pt: ["Início", "Quem Somos", "Médicos", "Blog", "Unidades", "Como cadastrar"],
  en: ["Home", "About Us", "Doctors", "Blog", "Locations", "How to register"],
};
const destinations = ["/", "/sobre", "/medicos", "/#historias", "/#impacto", "/#cadastro"];

export function Header() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigationId = useId();
  const english = language === "en";

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
          <Image src="/images/figma/imgLogo.png" width={528} height={613} sizes="82px" alt="Lacrei Saúde" />
        </Brand>
        <Toggle ref={buttonRef} type="button" aria-expanded={open} aria-controls={navigationId} onClick={() => setOpen(!open)}>
          {open ? (english ? "Close menu" : "Fechar menu") : "Menu"}
        </Toggle>
        <Navigation id={navigationId} aria-label={english ? "Main navigation" : "Navegação principal"} $open={open}>
          <ul>
            {navigation[language].map((label, index) => (
              <li key={destinations[index]}>
                <Link href={destinations[index]} aria-current={pathname === destinations[index] ? "page" : undefined}
                  data-registration={index === 5 ? "" : undefined} onClick={(event) => {
                    setOpen(false);
                    if (index === 5 && pathname === "/") {
                      event.preventDefault();
                      if (window.matchMedia("(max-width: 1199px)").matches) buttonRef.current?.focus();
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
    </Shell>
  );
}