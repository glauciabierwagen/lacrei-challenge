"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/primitives";
import { useLanguage } from "@/components/layout/language-context";
import * as S from "./home.styles";

const assets = "/images/figma/";
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus neque. Cras sit amet ligula ut justo commodo porta id ut enim. Nulla est lectus, mollis sit amet vehicula id, volutpat eget mauris.";
const years = [2018, 2019, 2020, 2023, 2024, 2025];
const photos = ["imgFrame4556.png", "imgTextContent.png", "imgTextContent1.png", "imgTextContent.png", "imgFrame4556.png", "imgTextContent.png"];
// Mantém os recortes do Figma, incluindo a remoção de espaços vazios das imagens.
const crops = [
  { width: "167.66%", height: "206.18%", left: "-33.7%", top: "-45.15%" },
  { width: "150.11%", height: "138.29%", left: "-22.66%", top: "-27.26%" },
  { width: "100%", height: "131.43%", left: "-.19%", top: "-31.38%" },
  { width: "202.54%", height: "140.1%", left: "-59.38%", top: "-15.84%" },
  { width: "153.26%", height: "188.47%", left: "-29.89%", top: "-40.37%" },
  { width: "229.95%", height: "119.3%", left: "-57.4%", top: "-17.09%" },
];
const locations = [
  { pt: "Brasil", en: "Brazil", x: 26.45, y: 39.1 },
  { pt: "Senegal", en: "Senegal", x: 48.03, y: 24.55 },
  { pt: "Moçambique", en: "Mozambique", x: 85.66, y: 54.81 },
  { pt: "Madagáscar", en: "Madagascar", x: 92.24, y: 62.48 },
];

// Monta a página inicial com banners, mapa, histórias e aviso de cadastro.
export function HomeView() {
  const { language } = useLanguage();
  const en = language === "en";
  const [slide, setSlide] = useState(0);
  const [location, setLocation] = useState<number | null>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const registrationLink = useRef<HTMLElement | null>(null);

  // Abre o modal pela âncora ou evento de cadastro e remove os ouvintes ao sair.
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#cadastro" && !dialog.current?.open) {
        registrationLink.current = document.activeElement as HTMLElement;
        dialog.current?.showModal();
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    window.addEventListener("lacrei:register", openFromHash);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener("lacrei:register", openFromHash);
    };
  }, []);

  function openRegistration() {
    registrationLink.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
  }

  function closeRegistration() {
    dialog.current?.close();
  }

  // Ao fechar o modal, limpa a âncora de cadastro e devolve o foco à origem.
  function restoreFocus() {
    if (window.location.hash === "#cadastro") window.history.replaceState(null, "", window.location.pathname);
    registrationLink.current?.focus();
  }

  const titles = en ? [
    ["Health that empowers", "and transforms lives"],
    ["We change people,", "we transform the world."],
    ["Health without borders,", "transformation without limits."],
  ] : [
    ["Saúde que fortalece", "e transforma vidas"],
    ["Mudamos pessoas,", "transformamos o mundo."],
    ["Saúde sem fronteiras,", "transformação sem limites."],
  ];

  return (
    <>
      <S.Hero aria-labelledby="home-title" aria-roledescription={en ? "carousel" : "carrossel"}>
        <Image src={`${assets}imgSectionBannerHero.png`} alt="" fill preload sizes="100vw" />
        <S.HeroContent>
          <h1 id="home-title" aria-live="polite">{titles[slide][0]}<br /><span>{titles[slide][1]}</span></h1>
          <S.RegisterButton type="button" onClick={openRegistration}>{en ? "How to register" : "Como cadastrar"}<Image src={`${assets}imgWhatsapp.svg`} alt="" width={18} height={18} /></S.RegisterButton>
        </S.HeroContent>
        <S.Dots role="group" aria-label={en ? "Choose a banner" : "Escolher banner"}>
          {titles.map((title, index) => <button key={index} type="button" aria-label={`${en ? "Banner" : "Banner"} ${index + 1}: ${title.join(" ")}`} aria-pressed={slide === index} onClick={() => setSlide(index)}><span /></button>)}
        </S.Dots>
      </S.Hero>

      <S.HomeSection id="proposito" aria-labelledby="purpose-title">
        <S.AboutGrid>
          <Image src={`${assets}imgVector.png`} alt={en ? "A diverse team of health professionals" : "Equipe diversa de profissionais de saúde"} width={630} height={669} sizes="(min-width: 1024px) 44vw, (min-width: 768px) 630px, 100vw" />
          <S.AboutContent>
            <div><h2 id="purpose-title">{en ? "Our Purpose" : "Nosso Propósito"}</h2><p>{lorem}</p></div>
            <S.Values>
              {(en ? ["Build a more compassionate world", "Bring hearts together and value lives", "Promote sustainable and inclusive education"] : ["Construir um mundo mais fraterno", "Unir corações e valorizar vidas", "Promover educação sustentável e inclusiva"]).map(title => <li key={title}>
                <span aria-hidden="true"><Image src={`${assets}imgHeartRewardSocialRatingMediaHeartItLikeFavoriteLove.svg`} width={27} height={23} alt="" /></span>
                <div><h3>{title}</h3><p>{lorem}</p></div>
              </li>)}
            </S.Values>
            <S.HomeButton href="/medicos" $variant="secondary">{en ? "Meet our team" : "Conheça nosso time"}</S.HomeButton>
            <Image src={`${assets}imgMisc09.svg`} width={24} height={93} alt="" />
          </S.AboutContent>
        </S.AboutGrid>
      </S.HomeSection>

      <S.ImpactSection id="impacto" aria-labelledby="impact-title">
        <S.ImpactContent>
          <S.CenterHeading><h2 id="impact-title">{en ? "The impact of Lacrei Saúde" : "Impacto do Lacrei Saúde"}</h2><p>{lorem}</p></S.CenterHeading>
          <S.MapCanvas role="group" aria-label={en ? "Explore the countries highlighted on the map" : "Explore os países destacados no mapa"}>
            {/* Usa SVG em img nativo com as medidas do Figma; a sobra para fora do mapa é intencional. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${assets}imgMap.svg`} alt={en ? "Map highlighting countries in South America and Africa" : "Mapa com países destacados na América do Sul e na África"} width={900} height={568} loading="lazy" />
            {locations.map((item, index) => <button key={item.en} type="button" style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-label={`${en ? "Explore" : "Explorar"} ${en ? item.en : item.pt}`} aria-pressed={location === index} onClick={() => setLocation(index)}>
              <Image src={`${assets}imgVector1.svg`} width={10} height={26} alt="" />
            </button>)}
          </S.MapCanvas>
          <S.ImpactStatus role="status">{location !== null ? `${en ? locations[location].en : locations[location].pt} — ${en ? "highlighted in the design map. Impact details have not been provided." : "destaque no mapa do projeto. Dados de impacto ainda não disponibilizados."}` : ""}</S.ImpactStatus>
          <S.HomeButton href="/medicos" $variant="secondary">{en ? "Meet our team" : "Conheça nosso time"}</S.HomeButton>
        </S.ImpactContent>
        <Image src={`${assets}imgAirplaneWithADottedPathOfTravel.png`} width={120} height={135} alt="" />
        <Image src={`${assets}imgAirplaneWithADottedPathOfTravel.png`} width={120} height={135} alt="" />
      </S.ImpactSection>

      <S.HistorySection id="historias" aria-labelledby="history-title">
        <S.CenterHeading><S.Handwritten>{en ? "Our partners" : "Nossos parceiros"}</S.Handwritten><h2 id="history-title">Lorem Ipsum</h2></S.CenterHeading>
        <S.TimelineViewport ref={timeline} tabIndex={0} role="region" aria-label={en ? "History timeline — scroll to explore" : "Linha do tempo — role para explorar"}>
          <S.TimelineTrack>
            {years.map((year, index) => <li key={year}><time dateTime={`${year}`}>{year}</time><S.StoryCard>
              <Image src={`${assets}${photos[index]}`} alt="" width={index === 2 ? 768 : 1920} height={index === 2 ? 1024 : 1080} sizes="(min-width: 768px) 740px, 550px" style={{ position: "absolute", ...crops[index] }} />
              <div><h3>Lorem Ipsum</h3><p>{lorem}</p></div>
            </S.StoryCard></li>)}
          </S.TimelineTrack>
        </S.TimelineViewport>
        <S.HistoryActions>
          <button type="button" aria-label={en ? "Previous stories" : "Histórias anteriores"} onClick={() => timeline.current?.scrollBy({ left: -544, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>←</button>
          <S.HomeButton href="#cadastro" onClick={(event) => { event.preventDefault(); openRegistration(); }}>{en ? "Create new stories" : "Crie novas histórias"}</S.HomeButton>
          <button type="button" aria-label={en ? "Next stories" : "Próximas histórias"} onClick={() => timeline.current?.scrollBy({ left: 544, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>→</button>
        </S.HistoryActions>
      </S.HistorySection>

      <S.PartnerSection id="parceiros" aria-labelledby="partners-title"><Container>
        <S.CenterHeading><S.Handwritten>{en ? "Our partners" : "Nossos parceiros"}</S.Handwritten><h2 id="partners-title">{en ? "Together for the cause!" : "Juntos pela causa!"}</h2></S.CenterHeading>
        <S.PartnerLogos>
          <div><Image src={`${assets}imgLogo.png`} alt="Lacrei Saúde" fill sizes="138px" style={{ padding: "0" }} /></div>
          <div><Image src={`${assets}imgPrancheta121.png`} alt={en ? "Lacrei Saúde partner seal" : "Selo parceiro Lacrei Saúde"} fill sizes="208px" /></div>
          <div><Image src={`${assets}imgLogo.png`} alt="Lacrei Saúde" fill sizes="124px" style={{ padding: "3.5rem 1.5rem" }} /></div>
          <div><Image src={`${assets}imgLogo.png`} alt="Lacrei Saúde" fill sizes="116px" style={{ padding: "3.5rem 2rem" }} /></div>
        </S.PartnerLogos>
      </Container></S.PartnerSection>

      <S.RegistrationDialog ref={dialog} id="cadastro" aria-labelledby="registration-title" onClose={restoreFocus}>
        <h2 id="registration-title">{en ? "How to register" : "Como cadastrar"}</h2>
        <p>{en ? "This is a demonstration based on the Figma design. Registration and appointments are not available here. Visit the official Lacrei Saúde website for current information." : "Esta é uma demonstração baseada no Figma. Cadastros e agendamentos não estão disponíveis aqui. Consulte o site oficial da Lacrei Saúde para informações atualizadas."}</p>
        <a href="https://lacreisaude.com.br/" target="_blank" rel="noopener noreferrer">{en ? "Official website (new tab)" : "Site oficial (nova aba)"}</a>
        <button type="button" onClick={closeRegistration}>{en ? "Close" : "Fechar"}</button>
      </S.RegistrationDialog>
    </>
  );
}