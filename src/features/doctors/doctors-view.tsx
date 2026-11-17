"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/layout/language-context";
import { Container } from "@/components/ui/primitives";
import * as Home from "@/features/home/home.styles";
import * as S from "./doctors.styles";

const assets = "/images/figma/medicos/";
const partnerAssets = "/images/figma/";
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus neque. Cras sit amet ligula ut justo commodo porta id ut enim. Nulla est lectus, mollis sit amet vehicula id, volutpat eget mauris.";
const volunteers = [
  { name: "Fernanda", avatar: "imgEllipse22.png" },
  { name: "Silvia", avatar: "imgEllipse23.png" },
  { name: "Débora", avatar: "imgEllipse24.png" },
];
const doctors = ["Fernanda", "Marcelo", "Fernanda", "Fernanda", "Marcelo", "Fernanda", "Fernanda", "Fernanda", "Marcelo"];
// Keep the source image placements from Figma, including its deliberate stretching.
const fernandaCrop = { position: "absolute", width: "100%", height: "156.61%", left: "0", top: "-12.48%" } as const;
const marceloCrop = { position: "absolute", width: "126.58%", height: "162.92%", left: "-13.26%", top: "-13.25%" } as const;

export function DoctorsView() {
  const { language } = useLanguage();
  const en = language === "en";
  const [slide, setSlide] = useState(0);
  const register = en ? "How to register" : "Como cadastrar";
  const join = en ? "Join us" : "Junte-se a nós";
  const titles = en ? [
    ["Health that cares", "and transforms lives"],
    ["We change people,", "we transform the world."],
    ["Education without borders,", "transformation without limits."],
  ] : [
    ["Saúde que cuida", "e transforma vidas"],
    ["Mudamos pessoas,", "transformamos o mundo."],
    ["Educação sem fronteiras,", "transformação sem limites."],
  ];
  const values = en ? [
    "Build a more compassionate world",
    "Bring hearts together and value lives",
    "Promote sustainable and inclusive education",
  ] : [
    "Construir um mundo mais fraterno",
    "Unir corações e valorizar vidas",
    "Promover educação sustentável e inclusiva",
  ];

  return (
    <>
      <S.Hero aria-labelledby="doctors-title" aria-roledescription={en ? "carousel" : "carrossel"}>
        <Image src={`${assets}imgSectionBannerHero.png`} alt="" fill preload sizes="100vw" />
        <Home.HeroContent>
          <h1 id="doctors-title" aria-live="polite">{titles[slide][0]}<br />{slide === 0 ? <>{en ? "and " : "e "}<span>{en ? "transforms lives" : "transforma vidas"}</span></> : <span>{titles[slide][1]}</span>}</h1>
          <S.RegisterLink href="/#cadastro">{register}<Image src={`${assets}imgWhatsapp.svg`} alt="" width={18} height={18} /></S.RegisterLink>
        </Home.HeroContent>
        <Home.Dots role="group" aria-label={en ? "Choose a banner" : "Escolher banner"}>
          {titles.map((title, index) => <button key={index} type="button" aria-label={`Banner ${index + 1}: ${title.join(" ")}`} aria-pressed={slide === index} onClick={() => setSlide(index)}><span /></button>)}
        </Home.Dots>
      </S.Hero>

      <S.Mission aria-labelledby="mission-title">
        <Home.AboutGrid>
          <Image src={`${assets}imgVector.png`} alt={en ? "People together at a Pride event" : "Pessoas reunidas em um evento do Orgulho LGBTQIA+"} width={630} height={669} sizes="(min-width: 1440px) 630px, (min-width: 1024px) 44vw, (min-width: 768px) 630px, calc(100vw - 32px)" />
          <S.MissionContent>
            <div><h2 id="mission-title">{en ? "Our Mission" : "Nossa Missão"}</h2><p>{lorem}</p></div>
            <Home.Values>
              {values.map(title => <li key={title}>
                <span aria-hidden="true"><Image src={`${assets}imgHeartRewardSocialRatingMediaHeartItLikeFavoriteLove.svg`} width={27} height={23} alt="" /></span>
                <div><h3>{title}</h3><p>{lorem}</p></div>
              </li>)}
            </Home.Values>
            <Home.HomeButton href="/#cadastro" $variant="secondary">{register}<Image src={`${assets}imgWhatsapp1.svg`} width={18} height={18} alt="" /></Home.HomeButton>
            <Image src={`${assets}imgMisc09.svg`} width={24} height={93} alt="" />
          </S.MissionContent>
        </Home.AboutGrid>
      </S.Mission>

      <S.Testimonials aria-labelledby="testimonials-title">
        <S.SectionContent>
          <S.Heading><Home.Handwritten>{en ? "Our volunteers" : "Nossos voluntários"}</Home.Handwritten><h2 id="testimonials-title">{en ? "Inspiring testimonials" : "Depoimentos inspiradores"}</h2></S.Heading>
          <S.TestimonialGrid>
            {volunteers.map(({ name, avatar }) => <S.TestimonialCard key={name} aria-label={en ? `Testimonial from ${name}` : `Depoimento de ${name}`}>
              <header><Image src={`${assets}${avatar}`} width={64} height={64} alt="" /><div><h3>{name}</h3><p>Lorem</p></div></header>
              <p>{lorem}</p><p>{lorem}</p>
            </S.TestimonialCard>)}
          </S.TestimonialGrid>
          <Home.HomeButton href="/#cadastro" $variant="secondary">{join}</Home.HomeButton>
        </S.SectionContent>
      </S.Testimonials>

      <S.Team aria-labelledby="team-title">
        <Image src={`${assets}imgSectionHistory.png`} alt="" fill sizes="100vw" />
        <S.TeamCurve aria-hidden="true"><Image src={`${assets}imgVector21.svg`} width={258} height={1441} alt="" /></S.TeamCurve>
        <S.SectionContent>
          <S.Heading><Home.Handwritten>{en ? "Our team" : "Nosso time"}</Home.Handwritten><h2 id="team-title">{en ? "Meet our doctors" : "Conheça nossos médicos"}</h2></S.Heading>
          <S.DoctorGrid>
            {doctors.map((name, index) => {
              const marcelo = name === "Marcelo";
              return <S.DoctorCard key={`${name}-${index}`} $marcelo={marcelo}>
                <Image src={`${assets}${marcelo ? "imgTextContent1.png" : "imgTextContent.png"}`} alt="" width={marcelo ? 793 : 864} height={marcelo ? 525 : 864} sizes="(min-width: 1440px) 475px, (min-width: 1024px) 40vw, (min-width: 768px) 60vw, 127vw" style={marcelo ? marceloCrop : fernandaCrop} />
                <h3>{name}</h3><div><p>Lorem</p><p>Lorem Ipsum</p></div>
              </S.DoctorCard>;
            })}
          </S.DoctorGrid>
          <Home.HomeButton href="/#cadastro">{join}</Home.HomeButton>
        </S.SectionContent>
      </S.Team>

      <Home.PartnerSection id="parceiros" aria-labelledby="partners-title"><Container>
        <S.Heading><Home.Handwritten>{en ? "Our partners" : "Nossos parceiros"}</Home.Handwritten><h2 id="partners-title">{en ? "Together for the cause!" : "Juntos pela causa!"}</h2></S.Heading>
        <Home.PartnerLogos>
          <div><Image src={`${partnerAssets}imgLogo.png`} alt="Lacrei Saúde" fill sizes="138px" style={{ padding: "0" }} /></div>
          <div><Image src={`${partnerAssets}imgPrancheta121.png`} alt={en ? "Lacrei Saúde partner seal" : "Selo parceiro Lacrei Saúde"} fill sizes="208px" /></div>
          <div><Image src={`${partnerAssets}imgLogo.png`} alt="Lacrei Saúde" fill sizes="124px" style={{ padding: "3.5rem 1.5rem" }} /></div>
          <div><Image src={`${partnerAssets}imgLogo.png`} alt="Lacrei Saúde" fill sizes="116px" style={{ padding: "3.5rem 2rem" }} /></div>
        </Home.PartnerLogos>
      </Container></Home.PartnerSection>
    </>
  );
}