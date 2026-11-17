"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import styled from "styled-components";
import { useLanguage } from "./language-context";

// Estilos do rodapé, do formulário e dos canais de contato.
const Shell = styled.footer`
  box-sizing: border-box;
  min-height: 470px;
  padding: 64px 20px;
  background: linear-gradient(110deg, #018363 0%, #014687 100%);
  color: #fff;
  font-family: "Nunito", sans-serif;
  a { color: inherit; }
  :focus-visible { outline: 3px solid #c8d533; outline-offset: 4px; }
  @media (min-width: 1200px) { padding: 48px 48px 24px; }
`;
const Content = styled.div`
  max-width: 1248px;
  margin-inline: auto;
  display: grid;
  gap: 40px;
  @media (min-width: 1200px) { min-height: 398px; align-content: space-between; gap: 24px; }
`;
const Top = styled.div`
  display: grid;
  gap: 32px;
  > * { min-width: 0; }
  @media (min-width: 768px) { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 32px; }
  @media (min-width: 1200px) { grid-template-columns: 432px minmax(0, 1fr) minmax(0, 1fr) 50px; gap: 60px; }
`;
const Newsletter = styled.section`
  max-width: 432px;
  h2 { font-size: 24px; font-weight: 700; line-height: 1.3; letter-spacing: 0; margin: 0 0 16px; }
  p { font-size: 16px; line-height: 1.5; margin: 0 0 20px; }
  small { display: block; font-size: 12px; line-height: 1.5; margin-top: 12px; }
  small + small { margin-top: 8px; }
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
  display: grid;
  gap: 32px;
  min-width: 0;
  > * { min-width: 0; }
  h2 { margin: 0 0 16px; font-size: 20px; line-height: 1.3; font-weight: 700; }
  ul { display: grid; gap: 4px; list-style: none; margin: 0; padding: 0; }
  a, button { display: flex; align-items: center; gap: 16px; min-height: 44px; padding: 0; border: 0; background: transparent; color: #fff; font: inherit; text-decoration: none; text-align: left; overflow-wrap: anywhere; }
  a:hover, button:hover { text-decoration: underline; }
  img { flex: 0 0 24px; width: 24px; height: 24px; object-fit: contain; }
  @media (min-width: 1200px) { display: contents; }
`;
const BackTop = styled.a`
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background: #c8d533;
  @media (min-width: 768px) and (max-width: 1199px) { grid-column: 2; justify-self: end; }
`;
const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  border-top: 1px solid #fff;
  padding-top: 24px;
  p { margin: 0; font-size: 14px; line-height: 1.6; }
`;
const FooterLogo = styled.div`
  width: 106px;
  height: 65px;
  overflow: hidden;
  img { width: 106px; height: 65px; object-fit: cover; }
`;
const Status = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  min-height: 1.5em;
`;

// Links publicados conferidos em https://lacreisaude.com.br/.
const channels = [
  { name: "Instagram", icon: "imgInstagram.svg", href: "https://www.instagram.com/lacrei.saude" },
  { name: "YouTube", icon: "imgGroup4529.svg", href: null },
  { name: "LinkedIn", icon: "imgGroup4519.svg", href: "https://www.linkedin.com/company/lacrei" },
  { name: "Facebook", icon: "imgFacebook.svg", href: "https://www.facebook.com/lacrei.saude/" },
];
const copy = {
  pt: {
    title: "Assine para receber novidades",
    description: "Assine gratuitamente e receba notícias, histórias inspiradoras e muito mais direto no seu e-mail.",
    email: "Seu e-mail", subscribe: "Assinar",
    terms: "Ao se inscrever, você concorda com nossa Política de Privacidade e consente em receber atualizações da nossa empresa.",
    disclaimer: "Demonstração de newsletter. Nenhum dado é enviado ou armazenado.",
    submitted: "Demonstração: nenhum e-mail foi enviado ou armazenado.",
    unavailable: "YouTube: canal oficial não verificado. Link indisponível nesta demonstração.",
    social: "Siga-nos", contact: "Fale conosco", top: "Voltar ao topo",
    rights: "©2026 Lacrei Saúde - Todos os Direitos reservados",
  },
  en: {
    title: "Subscribe for updates",
    description: "Subscribe for free and receive news, inspiring stories and much more directly in your inbox.",
    email: "Your email", subscribe: "Subscribe",
    terms: "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.",
    disclaimer: "Newsletter demonstration. No data is sent or stored.",
    submitted: "Demo: no email was sent or stored.",
    unavailable: "YouTube: official channel not verified. Link unavailable in this demo.",
    social: "Follow us", contact: "Contact us", top: "Back to top",
    rights: "©2026 Lacrei Saúde - All rights reserved",
  },
};

// Mostra a newsletter demonstrativa e os contatos no idioma escolhido.
export function Footer() {
  const { language } = useLanguage();
  const text = copy[language];
  const emailId = useId();
  const headingId = useId();
  const socialId = useId();
  const contactId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

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
          <Channels>
            <nav aria-labelledby={socialId}>
              <h2 id={socialId}>{text.social}</h2>
              <ul>
                {channels.map(({ name, icon, href }) => (
                  <li key={name}>
                    {href ? (
                      <a href={href}>
                        <Image src={`/images/figma/${icon}`} width={24} height={24} alt="" />{name}
                      </a>
                    ) : (
                      <button type="button" onClick={() => setUnavailable(true)}>
                        <Image src={`/images/figma/${icon}`} width={24} height={24} alt="" />{name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <Status role="status" aria-live="polite">{unavailable ? text.unavailable : ""}</Status>
            </nav>
            <section aria-labelledby={contactId}>
              <h2 id={contactId}>{text.contact}</h2>
              <a href="mailto:contato@lacreisaude.com.br">
                <Image src="/images/figma/imgEmail.svg" width={24} height={24} alt="" />contato@lacreisaude.com.br
              </a>
            </section>
          </Channels>
          <BackTop href="#topo" aria-label={text.top}>
            <Image src="/images/figma/imgChevronUp.svg" width={24} height={24} alt="" />
          </BackTop>
        </Top>
        <Bottom>
          <div><p>{text.rights}</p><p>Made by UXpand</p></div>
          <FooterLogo><Image src="/images/figma/imgPrancheta121.png" width={1920} height={1080} sizes="106px" alt="Lacrei Saúde" /></FooterLogo>
        </Bottom>
      </Content>
    </Shell>
  );
}