"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/primitives";
import { useLanguage } from "@/components/layout/language-context";
import * as S from "./home.styles";

const assets = "/images/figma/";
const partnerSymbols = [
  { file: "health-professional.svg", pt: "Profissional de saúde", en: "Healthcare professional" },
  { file: "clinic-care.svg", pt: "Clínica de saúde", en: "Healthcare clinic" },
  { file: "heart-care.svg", pt: "Cuidado e bem-estar", en: "Care and wellbeing" },
  { file: "health-mark.svg", pt: "Saúde", en: "Health" },
];
const years = [2018, 2019, 2020, 2023, 2024, 2025];
const photos = [`${assets}imgFrame4556.png`, "/images/history/pexels-7108401.webp", `${assets}hospital.jpg`, `${assets}imgTextContent.png`, "/images/history/pexels-6129681.webp", "/images/history/pexels-6129507.webp"];
const stories = {
  pt: [
    { title: "Um cuidado que faz falta", description: "Para muitas pessoas LGBTQIAPN+, buscar atendimento de saúde ainda significava enfrentar barreiras. Crescia a necessidade de um cuidado acolhedor e sem julgamentos." },
    { title: "Uma ideia começa a ganhar forma", description: "A vontade de mudar essa realidade inspira a criação de uma ponte entre pessoas e profissionais preparados para atender com respeito, escuta e humanidade." },
    { title: "Nasce a Lacrei Saúde", description: "Com o propósito de promover a inclusão da comunidade LGBTQIAPN+ no atendimento clínico, a Lacrei Saúde nasce para aproximar pacientes e profissionais." },
    { title: "Conexões com mais acolhimento", description: "Cada encontro pode ser um passo para uma experiência de saúde mais segura, representativa e respeitosa, em que a diversidade é reconhecida." },
    { title: "Respeito em cada experiência", description: "Seguimos valorizando a pluralidade e o acesso a cuidados que consideram cada pessoa por inteiro, com dignidade, segurança e atenção." },
    { title: "Um futuro sem fronteiras", description: "O compromisso continua: ampliar caminhos para uma saúde inclusiva e humanizada, fortalecendo a comunidade LGBTQIAPN+ onde quer que ela esteja." },
  ],
  en: [
    { title: "The need for compassionate care", description: "For many LGBTQIAPN+ people, seeking healthcare still meant facing barriers. The need for welcoming, judgment-free care was becoming clear." },
    { title: "An idea begins to take shape", description: "The desire to change this reality inspires a bridge between people and health professionals prepared to provide respectful, compassionate care." },
    { title: "Lacrei Saúde is born", description: "Founded to promote clinical inclusion for the LGBTQIAPN+ community, Lacrei Saúde connects patients with health professionals." },
    { title: "More welcoming connections", description: "Every connection can be a step toward safer, more representative, and respectful healthcare that recognizes and welcomes diversity." },
    { title: "Respect in every experience", description: "We continue to value plurality and access to care that sees each person as a whole, with dignity, safety, and attention." },
    { title: "A future without borders", description: "The commitment continues: expanding paths to inclusive, compassionate healthcare and strengthening the LGBTQIAPN+ community wherever they are." },
  ],
};
// Mantém os recortes do Figma, incluindo a remoção de espaços vazios das imagens.
const crops = [
  { width: "167.66%", height: "206.18%", left: "-33.7%", top: "-45.15%" },
  { width: "100%", height: "100%", left: "0", top: "0", objectFit: "cover" as const },
  { width: "100%", height: "100%", left: "0", top: "0", objectFit: "cover" as const },
  { width: "100%", height: "100%", left: "0", top: "0", objectFit: "cover" as const, transform: "scale(1.25)" },
  { width: "100%", height: "100%", left: "0", top: "0", objectFit: "cover" as const, objectPosition: "37% center" },
  { width: "100%", height: "100%", left: "0", top: "0", objectFit: "cover" as const },
];
const locations = [
  { pt: "Brasil", en: "Brazil", x: 26.45, y: 39.1 },
  { pt: "Senegal", en: "Senegal", x: 48.03, y: 24.55 },
  { pt: "Moçambique", en: "Mozambique", x: 85.66, y: 54.81 },
  { pt: "Madagáscar", en: "Madagascar", x: 92.24, y: 62.48 },
];
const purposeCopy = {
  pt: {
    title: "Nosso Propósito",
    introduction: "Conectar a comunidade LGBTQIAPN+ a profissionais que oferecem cuidado sem preconceitos.",
    values: [
      { title: "Saúde inclusiva", description: "Cuidados físicos e mentais para todas as pessoas, sem discriminação." },
      { title: "Diversidade", description: "Capacitar profissionais para um atendimento respeitoso e adaptado a cada paciente." },
      { title: "Fim do preconceito", description: "Usar educação e empatia para derrubar barreiras históricas na saúde." },
    ],
  },
  en: {
    title: "Our Purpose",
    introduction: "We exist to transform access to healthcare by connecting the LGBTQIAPN+ community with qualified, compassionate health professionals. We are committed to safe, inclusive, prejudice-free care, celebrating diversity in all its forms and ensuring every person is welcomed with dignity and respect for their whole self.",
    values: [
      { title: "Promote inclusive healthcare", description: "We make physical and mental health services accessible while respecting and welcoming the diversity of bodies, identities, and lived experiences, ensuring dignified, discrimination-free care for the entire LGBTQIAPN+ community." },
      { title: "Value diversity", description: "We believe plurality is our greatest strength. We work to raise awareness and equip professionals, bringing hearts and knowledge together to build care that recognizes, respects, and celebrates each patient's individual differences." },
      { title: "Challenge prejudice", description: "We help dismantle historical barriers to healthcare through information and empathy, promoting ongoing education that transforms society and enables truly safe, compassionate, and human-centered medical care for everyone." },
    ],
  },
};

// Monta a página inicial com banners, mapa, histórias e aviso de cadastro.
export function HomeView() {
  const { language } = useLanguage();
  const en = language === "en";
  const impactIntroduction = en
    ? "Inclusive, prejudice-free healthcare for the LGBTQIAPN+ community, from Brazil to the world."
    : "Saúde inclusiva e sem preconceitos para a comunidade LGBTQIAPN+, do Brasil para o mundo.";
  const [slide, setSlide] = useState(0);
  const [location, setLocation] = useState<number | null>(null);
  const [timelineControlsVisible, setTimelineControlsVisible] = useState(false);
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
          <h1 id="home-title" data-slide={slide} aria-live="polite">{titles[slide][0]}<br /><span>{titles[slide][1]}</span></h1>
          <S.RegisterActions>
            <S.RegisterLink href="https://paciente.lacreisaude.com.br/">{en ? "For Patients" : "Para Pacientes"}</S.RegisterLink>
            <S.RegisterLink href="https://profissional.lacreisaude.com.br/">{en ? "For Professionals" : "Para Profissionais"}</S.RegisterLink>
          </S.RegisterActions>
        </S.HeroContent>
        <S.Dots role="group" aria-label={en ? "Choose a banner" : "Escolher banner"}>
          {titles.map((title, index) => <button key={index} type="button" aria-label={`${en ? "Banner" : "Banner"} ${index + 1}: ${title.join(" ")}`} aria-pressed={slide === index} onClick={() => setSlide(index)}><span /></button>)}
        </S.Dots>
      </S.Hero>

      <S.CareIntro aria-labelledby="care-intro-title">
        <h2 id="care-intro-title">{en ? "Discover the Lacrei Saúde way of caring" : "Conheça o jeito Lacrei Saúde de cuidar"}</h2>
        <p>{en ? "Quality and inclusive healthcare" : "Atendimento de qualidade e inclusivo"}</p>
      </S.CareIntro>

      <S.HomeSection id="proposito" aria-labelledby="purpose-title">
        <S.AboutGrid>
          <S.AboutImageCard>
            <Image src={`${assets}medicos/Médicos.png`} alt={en ? "A diverse team of health professionals" : "Equipe diversa de profissionais de saúde"} fill sizes="(min-width: 64rem) 55vw, (min-width: 48rem) 50vw, calc(100vw - 3rem)" />
          </S.AboutImageCard>
          <S.PurposeContent>
            <div><h2 id="purpose-title">{purposeCopy[en ? "en" : "pt"].title}</h2><p>{purposeCopy[en ? "en" : "pt"].introduction}</p></div>
            <S.Values>
              {purposeCopy[en ? "en" : "pt"].values.map(({ title, description }) => <li key={title}>
                <span aria-hidden="true"><Image src={`${assets}imgHeartRewardSocialRatingMediaHeartItLikeFavoriteLove.svg`} width={27} height={23} alt="" /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>)}
            </S.Values>
            <S.HomeButton href="/medicos" $variant="secondary">{en ? "Meet our team" : "Conheça nosso time"}</S.HomeButton>
            <Image src={`${assets}imgMisc09.svg`} width={24} height={93} alt="" />
          </S.PurposeContent>
        </S.AboutGrid>
      </S.HomeSection>

      <S.ImpactSection id="impacto" aria-labelledby="impact-title">
        <S.ImpactContent>
          <S.CenterHeading><S.Handwritten $color="#018762">Lacrei Saúde</S.Handwritten><h2 id="impact-title">{en ? "The impact of Lacrei Saúde" : "Impacto do Lacrei Saúde"}</h2><p>{impactIntroduction}</p></S.CenterHeading>
          <S.MapCanvas role="group" aria-label={en ? "Explore the countries highlighted on the map" : "Explore os países destacados no mapa"}>
            {/* Usa SVG em img nativo com as medidas do Figma; a sobra para fora do mapa é intencional. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${assets}imgMap.svg`} alt={en ? "Map highlighting countries in South America and Africa" : "Mapa com países destacados na América do Sul e na África"} width={900} height={568} loading="lazy" />
            {locations.map((item, index) => <button key={item.en} type="button" style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-label={`${en ? "Explore" : "Explorar"} ${en ? item.en : item.pt}`} aria-pressed={location === index} onClick={() => setLocation(index)}>
              <Image src={`${assets}imgVector1.svg`} width={10} height={26} alt="" />
            </button>)}
          </S.MapCanvas>
          <S.ImpactStatus role="status">{location !== null ? `${en ? locations[location].en : locations[location].pt} — ${en ? "highlighted in the design map. Impact details have not been provided." : "destaque no mapa do projeto. Dados de impacto ainda não disponibilizados."}` : ""}</S.ImpactStatus>
        </S.ImpactContent>
        <Image src={`${assets}imgAirplaneWithADottedPathOfTravel.png`} width={120} height={135} alt="" />
        <Image src={`${assets}imgAirplaneWithADottedPathOfTravel.png`} width={120} height={135} alt="" />
      </S.ImpactSection>

      <S.HistorySection id="historias" aria-labelledby="history-title">
        <S.CenterHeading>
          <S.Handwritten $color="#018762">{en ? "Our story" : "Nossa história"}</S.Handwritten>
          <h2 id="history-title">{en ? "Care that moves us forward" : "Uma trajetória de acolhimento"}</h2>
          <p>{en ? "A story of inclusive healthcare." : "Uma história de saúde inclusiva."}</p>
        </S.CenterHeading>
        <S.TimelineCarousel data-controls-visible={timelineControlsVisible} onClick={() => setTimelineControlsVisible(true)}>
          <S.TimelineArrow type="button" aria-label={en ? "Previous stories" : "Histórias anteriores"} aria-controls="history-timeline" onClick={() => timeline.current?.scrollBy({ left: -544, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>←</S.TimelineArrow>
          <S.TimelineViewport id="history-timeline" ref={timeline} tabIndex={0} role="region" aria-label={en ? "History timeline — scroll to explore" : "Linha do tempo — role para explorar"}>
            <S.TimelineTrack>
              {years.map((year, index) => <li key={year}><time dateTime={`${year}`}>{year}</time><S.StoryCard>
                <Image src={photos[index]} alt={index === 1 ? (en ? "Healthcare team gathered around a table" : "Equipe de saúde reunida em uma mesa") : index === 2 ? (en ? "Exterior of a hospital complex" : "Fachada de um complexo hospitalar") : index === 4 ? (en ? "Healthcare professionals caring for a patient in a hospital bed" : "Profissionais de saúde atendendo uma pessoa em um leito hospitalar") : index === 5 ? (en ? "Diverse healthcare team standing together in a hospital" : "Equipe diversa de profissionais de saúde reunida em um hospital") : ""} width={index === 1 || index >= 4 ? 1000 : index === 2 ? 1194 : 1920} height={index >= 4 ? 666 : index === 1 ? 667 : index === 2 ? 661 : 1080} sizes={index === 1 || index >= 4 ? "(max-width: 352px) 240px, (max-width: 541px) 68vw, 368px" : "(min-width: 768px) 740px, 550px"} style={{ position: "absolute", ...crops[index] }} />
                <div><h3>{stories[en ? "en" : "pt"][index].title}</h3><p>{stories[en ? "en" : "pt"][index].description}</p></div>
              </S.StoryCard></li>)}
            </S.TimelineTrack>
          </S.TimelineViewport>
          <S.TimelineArrow type="button" aria-label={en ? "Next stories" : "Próximas histórias"} aria-controls="history-timeline" onClick={() => timeline.current?.scrollBy({ left: 544, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>→</S.TimelineArrow>
        </S.TimelineCarousel>
        <S.HistoryTeamAction>
          <S.HomeButton href="/medicos" $variant="secondary">{en ? "Meet our team" : "Conheça nosso time"}</S.HomeButton>
        </S.HistoryTeamAction>
      </S.HistorySection>

      <S.AudienceSection aria-label={en ? "Choose how to access Lacrei Saúde" : "Escolha como acessar a Lacrei Saúde"}>
        <S.AudienceCard>
          <Image src="https://lacreisaude.com.br/_next/static/media/person-with-flag-around.5a804bf9.png" alt={en ? "Person wrapped in a pride flag" : "Pessoa envolta em uma bandeira do orgulho LGBTQIAPN+"} width={676} height={654} unoptimized />
          <div>
            <h2>{en ? "Patients" : "Pacientes"}</h2>
            <p>{en ? "Connect with health professionals who understand the needs of the LGBTQIAPN+ community." : "Conecte-se a profissionais da saúde que estudam as necessidades da comunidade LGBTQIAPN+."}</p>
            <a href="https://paciente.lacreisaude.com.br/">{en ? "Find care" : "Buscar atendimento"}</a>
          </div>
        </S.AudienceCard>
        <S.AudienceCard $reverse>
          <Image src="https://lacreisaude.com.br/_next/static/media/person-professional.e0f3da65.png" alt={en ? "Healthcare professional" : "Profissional da saúde"} width={374} height={359} unoptimized />
          <div>
            <h2>{en ? "Health professionals" : "Profissionais da saúde"}</h2>
            <p>{en ? "We are looking for qualified health professionals who prioritize the physical and mental wellbeing of LGBTQIAPN+ people." : "Buscamos profissionais da saúde qualificados que priorizam o bem-estar físico e mental de pessoas LGBTQIAPN+."}</p>
            <a href="https://profissional.lacreisaude.com.br/">{en ? "Offer care" : "Oferecer atendimento"}</a>
          </div>
        </S.AudienceCard>
      </S.AudienceSection>

      <S.PartnerSection id="parceiros" aria-labelledby="partners-title"><Container>
        <S.CenterHeading><S.Handwritten>{en ? "Our partners" : "Nossos parceiros"}</S.Handwritten><h2 id="partners-title">{en ? "Together for the cause!" : "Juntos pela causa!"}</h2></S.CenterHeading>
        <S.PartnerLogos>
          {partnerSymbols.map((symbol) => <div key={symbol.file}><Image src={`/images/partners/${symbol.file}`} alt={en ? symbol.en : symbol.pt} width={96} height={96} /></div>)}
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