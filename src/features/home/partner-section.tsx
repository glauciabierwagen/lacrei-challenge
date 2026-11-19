"use client";

import Image from "next/image";
import { useLanguage } from "@/components/layout/language-context";
import { Container } from "@/components/ui/primitives";
import * as S from "./home.styles";

const partnerSymbols = [
  { file: "health-professional.svg", pt: "Profissional de saúde", en: "Healthcare professional" },
  { file: "clinic-care.svg", pt: "Clínica de saúde", en: "Healthcare clinic" },
  { file: "heart-care.svg", pt: "Cuidado e bem-estar", en: "Care and wellbeing" },
  { file: "health-mark.svg", pt: "Saúde", en: "Health" },
];

export function PartnerSection() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <S.PartnerSection id="parceiros" aria-labelledby="partners-title">
      <Container>
        <S.CenterHeading>
          <S.Handwritten>{en ? "Our partners" : "Nossos parceiros"}</S.Handwritten>
          <h2 id="partners-title">{en ? "Together for the cause!" : "Juntos pela causa!"}</h2>
        </S.CenterHeading>
        <S.PartnerLogos>
          {partnerSymbols.map((symbol) => <div key={symbol.file}><Image src={`/images/partners/${symbol.file}`} alt={en ? symbol.en : symbol.pt} width={96} height={96} /></div>)}
        </S.PartnerLogos>
      </Container>
    </S.PartnerSection>
  );
}