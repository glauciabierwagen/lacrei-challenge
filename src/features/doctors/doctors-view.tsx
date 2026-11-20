"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/layout/language-context";
import * as Home from "@/features/home/home.styles";
import { PartnerSection } from "@/features/home/partner-section";
import { PurposeSection } from "@/features/home/purpose-section";
import type testimonialsData from "./testimonials.json";
import * as S from "./doctors.styles";

const assets = "/images/figma/medicos/";
type Testimonial = (typeof testimonialsData)[number];

function isTranslation(value: unknown): value is Testimonial["story"] {
  return typeof value === "object" && value !== null &&
    "pt" in value && typeof value.pt === "string" &&
    "en" in value && typeof value.en === "string";
}

function isTestimonial(value: unknown): value is Testimonial {
  return typeof value === "object" && value !== null &&
    "name" in value && typeof value.name === "string" &&
    "avatar" in value && typeof value.avatar === "string" &&
    "profession" in value && isTranslation(value.profession) &&
    "story" in value && isTranslation(value.story);
}

type TestimonialsState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded"; data: Testimonial[] };
const doctors = [
  { image: "M1.png", name: { pt: "Ana Ribeiro", en: "Ana Ribeiro" }, specialty: { pt: "Médica de família", en: "Family physician" } },
  { image: "M2.png", name: { pt: "Camila Nunes", en: "Camila Nunes" }, specialty: { pt: "Cardiologia", en: "Cardiology" } },
  { image: "M3.png", name: { pt: "Rafael Costa", en: "Rafael Costa" }, specialty: { pt: "Medicina de família", en: "Family medicine" } },
  { image: "M4.png", name: { pt: "Gabriel Almeida", en: "Gabriel Almeida" }, specialty: { pt: "Pediatria", en: "Pediatrics" } },
  { image: "M5.png", name: { pt: "Helena Martins", en: "Helena Martins" }, specialty: { pt: "Dermatologia", en: "Dermatology" } },
  { image: "M6.png", name: { pt: "Daniel Tanaka", en: "Daniel Tanaka" }, specialty: { pt: "Psiquiatria", en: "Psychiatry" } },
  { image: "M7.png", name: { pt: "Joana Souza", en: "Joana Souza" }, specialty: { pt: "Ginecologia", en: "Gynecology" } },
  { image: "M8.jpg", name: { pt: "Marina Lopes", en: "Marina Lopes" }, specialty: { pt: "Endocrinologia", en: "Endocrinology" } },
  { image: "M9.png", name: { pt: "Bianca Ferreira", en: "Bianca Ferreira" }, specialty: { pt: "Neurologia", en: "Neurology" } },
];

// Apresenta a missão, os voluntários e os médicos no idioma escolhido.
export function DoctorsView() {
  const { language } = useLanguage();
  const en = language === "en";
  const [testimonials, setTestimonials] = useState<TestimonialsState>({ status: "loading" });
  useEffect(() => {
    const controller = new AbortController();
    async function loadTestimonials() {
      try {
        const response = await fetch("/api/depoimentos", { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isTestimonial)) throw new Error("Invalid testimonials response");
        if (!controller.signal.aborted) setTestimonials({ status: "loaded", data });
      } catch {
        if (!controller.signal.aborted) setTestimonials({ status: "error" });
      }
    }
    void loadTestimonials();
    return () => controller.abort();
  }, []);
  // Guarda o banner selecionado sem perder a seleção ao trocar o idioma.
  const [slide, setSlide] = useState(0);
  const patients = en ? "For Patients" : "Para Pacientes";
  const professionals = en ? "For Professionals" : "Para Profissionais";
  const offerCare = en ? "Offer care" : "Oferecer atendimento";
  const findCare = en ? "Find care" : "Buscar Atendimento";
  const titles = en ? [
    ["Health that cares", "and transforms lives"],
    ["We change people,", "we transform the world."],
    ["Health without borders,", "transformation without limits."],
  ] : [
    ["Saúde que cuida", "e transforma vidas"],
    ["Mudamos pessoas,", "transformamos o mundo."],
    ["Saúde sem fronteiras,", "transformação sem limites."],
  ];
  return (
    <>
      <S.Hero aria-labelledby="doctors-title" aria-roledescription={en ? "carousel" : "carrossel"}>
        <Image src={`${assets}imgSectionBannerHero.png`} alt="" fill preload sizes="100vw" />
        <Home.HeroContent>
          <h1 id="doctors-title" aria-live="polite">{titles[slide][0]}<br />{slide === 0 ? <>{en ? "and " : "e "}<span>{en ? "transforms lives" : "transforma vidas"}</span></> : <span>{titles[slide][1]}</span>}</h1>
          <Home.RegisterActions>
            <S.RegisterLink href="https://paciente.lacreisaude.com.br/">{patients}</S.RegisterLink>
            <S.RegisterLink href="https://profissional.lacreisaude.com.br/">{professionals}</S.RegisterLink>
          </Home.RegisterActions>
        </Home.HeroContent>
        <Home.Dots role="group" aria-label={en ? "Choose a banner" : "Escolher banner"}>
          {titles.map((title, index) => <button key={index} type="button" aria-label={`Banner ${index + 1}: ${title.join(" ")}`} aria-pressed={slide === index} onClick={() => setSlide(index)}><span /></button>)}
        </Home.Dots>
      </S.Hero>

      <Home.CareIntro aria-labelledby="care-intro-title">
        <h2 id="care-intro-title">{en ? "Discover the Lacrei Saúde way of caring" : "Conheça o jeito Lacrei Saúde de cuidar"}</h2>
        <p>{en ? "Quality and inclusive healthcare" : "Atendimento de qualidade e inclusivo"}</p>
      </Home.CareIntro>

      <PurposeSection
        title={en ? "Our Mission" : "Nossa Missão"}
        introductionLines={en
          ? ["Every detail of your experience matters to us,", "so we provide welcoming, safe and inclusive care."]
          : ["Nos preocupamos com cada detalhe de sua experiência,", "com cuidado acolhedor, seguro e sem preconceitos."]}
        action={{ label: en ? "Frequently Asked Questions" : "Dúvidas Frequentes", href: "https://lacreisaude.com.br/ajuda/" }}
        image={{ src: "/images/figma/medicos/diversidade.png", alt: en ? "People celebrating Pride together" : "Pessoas celebrando o Orgulho LGBTQIA+" }}
      />

      <S.Testimonials aria-labelledby="testimonials-title">
        <S.SectionContent>
          <S.TestimonialHeading>
            <Home.Handwritten>{en ? "Our patients" : "Nossos pacientes"}</Home.Handwritten>
            <h2 id="testimonials-title">{en ? "Inspiring testimonials" : "Depoimentos inspiradores"}</h2>
            <small>{en ? "Illustrative profiles and stories; these are not real testimonials." : "Perfis e relatos ilustrativos; não representam depoimentos reais."}</small>
          </S.TestimonialHeading>
          {testimonials.status === "loading" && <p role="status">{en ? "Loading testimonials..." : "Carregando depoimentos..."}</p>}
          {testimonials.status === "error" && <p role="alert">{en ? "Could not load testimonials. Please reload the page." : "Não foi possível carregar os depoimentos. Recarregue a página."}</p>}
          {testimonials.status === "loaded" && (testimonials.data.length === 0
            ? <p role="status">{en ? "No illustrative testimonials available." : "Nenhum depoimento ilustrativo disponível."}</p>
            : <S.TestimonialGrid>
              {testimonials.data.map(({ name, avatar, profession, story }) => <S.TestimonialCard key={name} aria-label={en ? `Testimonial from ${name}` : `Depoimento de ${name}`}>
                <header><Image src={`${assets}${avatar}`} width={64} height={64} alt="" /><div><h3>{name}</h3><p>{en ? profession.en : profession.pt}</p></div></header>
                <p>{en ? story.en : story.pt}</p>
              </S.TestimonialCard>)}
            </S.TestimonialGrid>)}
          <S.FindCareButton href="https://paciente.lacreisaude.com.br/" $variant="secondary">{findCare}</S.FindCareButton>
        </S.SectionContent>
      </S.Testimonials>

      <S.Team aria-labelledby="team-title">
        <Image src={`${assets}imgSectionHistory.png`} alt="" fill sizes="100vw" />
        <S.TeamCurve aria-hidden="true"><Image src={`${assets}imgVector21.svg`} width={258} height={1441} alt="" /></S.TeamCurve>
        <S.SectionContent>
          <S.TeamHeading>
            <Home.Handwritten>{en ? "Our team" : "Nosso time"}</Home.Handwritten>
            <h2 id="team-title">{en ? "Meet our professionals" : "Conheça nossos profissionais"}</h2>
            <p>{en ? "Professionals committed to quality, inclusive care." : "Profissionais comprometidos com um atendimento de qualidade e inclusivo."}</p>
          </S.TeamHeading>
          <S.DoctorGrid>
            {doctors.map((doctor) => <S.DoctorCard key={doctor.image}>
              <Image src={`${assets}${doctor.image}`} alt="" fill sizes="(min-width: 1440px) 475px, (min-width: 1024px) 40vw, (min-width: 768px) 60vw, 127vw" style={{ objectPosition: doctor.image === "M5.png" ? "center top" : "center 24%" }} />
              <h3>{en ? doctor.name.en : doctor.name.pt}</h3>
              <p>{en ? doctor.specialty.en : doctor.specialty.pt}</p>
            </S.DoctorCard>)}
          </S.DoctorGrid>
          <S.ProfileDisclosure>{en ? "Demonstration profiles; names and specialties are illustrative." : "Perfis demonstrativos; nomes e especialidades são ilustrativos."}</S.ProfileDisclosure>
          <S.OfferCareButton href="https://profissional.lacreisaude.com.br/">{offerCare}</S.OfferCareButton>
        </S.SectionContent>
      </S.Team>

      <PartnerSection />
    </>
  );
}