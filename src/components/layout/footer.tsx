"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import styled from "styled-components";
import { useLanguage } from "./language-context";

// Estilos do rodapé, do formulário e dos canais de contato.
const Shell = styled.footer`
  box-sizing: border-box;
  padding: 64px 20px 24px;
  background: linear-gradient(110deg, #018363 0%, #014687 100%);
  color: #fff;
  font-family: "Nunito", sans-serif;
  a { color: inherit; }
  :focus-visible { outline: 3px solid #c8d533; outline-offset: 4px; }
  @media (min-width: 1200px) { padding-inline: 32px; }
`;
const Content = styled.div`
  max-width: 1280px;
  margin-inline: auto;
  display: grid;
  gap: 0;
`;
const Top = styled.div`
  display: grid;
  gap: 32px;
  padding-block: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, .6);
  > * { min-width: 0; }
  @media (min-width: 768px) { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 32px; }
  @media (min-width: 1200px) {
    grid-template-columns: minmax(220px, 1.1fr) repeat(3, minmax(0, 1fr));
    gap: 40px;
  }
`;
const BrandSocial = styled.div`
  display: grid;
  align-content: start;
  gap: 48px;
  min-width: 0;
  @media (max-width: 767px) { gap: 24px; }
`;
const Newsletter = styled.section`
  display: grid;
  gap: 8px;
  width: 100%;
  padding-block: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, .6);
  h2 { font-size: 24px; font-weight: 700; line-height: 1.3; letter-spacing: 0; margin: 0 0 16px; }
  p { font-size: 16px; line-height: 1.5; margin: 0 0 20px; }
  small { display: block; font-size: 12px; line-height: 1.5; margin-top: 12px; }
  small + small { margin-top: 8px; }
  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
    column-gap: 48px;
    form { grid-column: 2; grid-row: 1 / span 2; align-self: center; }
    small:first-of-type { grid-column: 1; grid-row: 3; }
    small:nth-of-type(2) { grid-column: 2; grid-row: 3; }
    [role="status"] { grid-column: 1 / -1; }
  }
`;
const Signup = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  input { box-sizing: border-box; flex: 1 1 150px; width: 100%; min-width: 0; min-height: 48px; border: 1px solid #fff; border-radius: 5px; background: #fff; color: #252525; padding: 12px; font: inherit; }
  input::placeholder { color: #575757; opacity: 1; }
  button { flex: 0 0 auto; min-height: 48px; padding: 12px 24px; border: 0; border-radius: 5px; background: #c8d533; color: #163f32; font: inherit; font-weight: 700; }
`;
const HiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;
const Channels = styled.div`
  min-width: 0;
  ul { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; list-style: none; margin: 0; padding: 0; }
  a { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 4px; }
  a:hover { background: rgba(255, 255, 255, .12); }
  img { width: 24px; height: 24px; object-fit: contain; }
`;
const FooterLinkGroup = styled.nav`
  min-width: 0;
  h2 { margin: 0 0 16px; color: #fff; font-size: 18px; line-height: 1.3; font-weight: 700; }
  ul { display: grid; gap: 0; list-style: none; margin: 0; padding: 0; }
  a { display: flex; align-items: center; min-height: 40px; color: #fff; text-decoration: none; overflow-wrap: anywhere; }
  a:hover { color: #c8d533; text-decoration: underline; }
`;
const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  padding-top: 24px;
  p { margin: 0; font-size: 14px; line-height: 1.6; }
`;
const FooterLogo = styled.a`
  display: block;
  width: min(100%, 190px);
  img { display: block; width: 100%; height: auto; filter: brightness(0) invert(1); }
`;
const Status = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  min-height: 1.5em;
`;

// Links publicados conferidos em https://lacreisaude.com.br/.
const channels = [
  { name: "Facebook", icon: "imgFacebook.svg", href: "https://www.facebook.com/lacrei.saude/" },
  { name: "Instagram", icon: "imgInstagram.svg", href: "https://www.instagram.com/lacrei.saude" },
  { name: "LinkedIn", icon: "imgGroup4519.svg", href: "https://www.linkedin.com/company/lacrei" },
];
const copy = {
  pt: {
    title: "Assine para receber novidades",
    description: "Assine gratuitamente e receba notícias, histórias inspiradoras e muito mais direto no seu e-mail.",
    email: "Seu e-mail", subscribe: "Assinar",
    terms: "Ao assinar, você aceita a Política de Privacidade e receberá novidades.",
    disclaimer: "Demonstração de newsletter. Nenhum dado é enviado ou armazenado.",
    submitted: "Demonstração: nenhum e-mail foi enviado ou armazenado.",
    social: "Siga-nos", contact: "Fale conosco",
    groups: [
      { title: "Lacrei Saúde", links: [
        ["Quem Somos", "https://lacreisaude.com.br/quem-somos/"],
        ["Nosso Propósito", "https://lacreisaude.com.br/quem-somos/#proposito"],
        ["Missão, Visão e Valor", "https://lacreisaude.com.br/quem-somos/#missao-visao-valores"],
        ["Acessibilidade", "https://lacreisaude.com.br/acessibilidade/"],
      ] },
      { title: "Saúde", links: [
        ["Buscar atendimento", "https://paciente.lacreisaude.com.br/"],
        ["Oferecer atendimento", "https://profissional.lacreisaude.com.br/"],
      ] },
      { title: "Segurança e Privacidade", links: [
        ["Política de Privacidade", "https://lacreisaude.com.br/politica-de-privacidade/"],
        ["Termos de Uso", "https://lacreisaude.com.br/termos-de-uso/"],
        ["Direitos de Titular", "https://lacreisaude.com.br/direitos-de-titular/"],
      ] },
    ],
    rights: "©2026 Lacrei Saúde - Todos os Direitos reservados",
  },
  en: {
    title: "Subscribe for updates",
    description: "Subscribe for free and receive news, inspiring stories and much more directly in your inbox.",
    email: "Your email", subscribe: "Subscribe",
    terms: "By subscribing, you accept our Privacy Policy and receive updates.",
    disclaimer: "Newsletter demonstration. No data is sent or stored.",
    submitted: "Demo: no email was sent or stored.",
    social: "Follow us", contact: "Contact us",
    groups: [
      { title: "Lacrei Saúde", links: [
        ["About Us", "https://lacreisaude.com.br/quem-somos/"],
        ["Our Purpose", "https://lacreisaude.com.br/quem-somos/#proposito"],
        ["Mission, Vision and Values", "https://lacreisaude.com.br/quem-somos/#missao-visao-valores"],
        ["Accessibility", "https://lacreisaude.com.br/acessibilidade/"],
      ] },
      { title: "Health", links: [
        ["Find care", "https://paciente.lacreisaude.com.br/"],
        ["Offer care", "https://profissional.lacreisaude.com.br/"],
      ] },
      { title: "Security and Privacy", links: [
        ["Privacy Policy", "https://lacreisaude.com.br/politica-de-privacidade/"],
        ["Terms of Use", "https://lacreisaude.com.br/termos-de-uso/"],
        ["Data Subject Rights", "https://lacreisaude.com.br/direitos-de-titular/"],
      ] },
    ],
    rights: "©2026 Lacrei Saúde - All rights reserved",
  },
};

// Mostra a newsletter demonstrativa e os contatos no idioma escolhido.
export function Footer() {
  const { language } = useLanguage();
  const text = copy[language];
  const emailId = useId();
  const headingId = useId();
  const groupsId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Valida e limpa o campo sem enviar nem armazenar o e-mail.
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setEmail("");
    setSubmitted(true);
  }

  return (
    <Shell>
      <Content>
        <Top>
          <BrandSocial>
            <FooterLogo href="/" aria-label={language === "pt" ? "Lacrei Saúde — início" : "Lacrei Saúde — home"}>
              <Image src="/images/figma/logo_lacrei.svg" width={203} height={26} sizes="190px" alt="Lacrei Saúde" />
            </FooterLogo>
            <Channels as="nav" aria-label={text.social}>
              <ul>
                {channels.map(({ name, icon, href }) => (
                  <li key={name}>
                    <a href={href} aria-label={name} title={name}>
                      <Image src={`/images/figma/${icon}`} width={24} height={24} alt="" />
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:contato@lacreisaude.com.br" aria-label={`${text.contact}: contato@lacreisaude.com.br`} title={text.contact}>
                    <Image src="/images/figma/imgEmail.svg" width={24} height={24} alt="" />
                  </a>
                </li>
              </ul>
            </Channels>
          </BrandSocial>
          {text.groups.map((group, index) => (
            <FooterLinkGroup key={group.title} aria-labelledby={`${groupsId}-${index}`}>
              <h2 id={`${groupsId}-${index}`}>{group.title}</h2>
              <ul>{group.links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
            </FooterLinkGroup>
          ))}
        </Top>
        <Newsletter id="novidades" aria-labelledby={headingId}>
          <h2 id={headingId}>{text.title}</h2>
          <p>{text.description}</p>
          <Signup onSubmit={submit}>
            <HiddenLabel htmlFor={emailId}>{text.email}</HiddenLabel>
            <input id={emailId} type="email" autoComplete="email" placeholder={text.email} value={email} onChange={(event) => setEmail(event.target.value)} required />
            <button type="submit">{text.subscribe}</button>
          </Signup>
          <small>{text.terms}</small>
          <small>{text.disclaimer}</small>
          <Status role="status" aria-live="polite">{submitted ? text.submitted : ""}</Status>
        </Newsletter>
        <Bottom>
          <div><p>{text.rights}</p><p>Made by UXpand</p></div>
        </Bottom>
      </Content>
    </Shell>
  );
}