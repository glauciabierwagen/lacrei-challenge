"use client";

import Image from "next/image";
import { useLanguage } from "@/components/layout/language-context";
import * as S from "./home.styles";

const purposeIcons = ["inclusion-handshake.svg", "diversity-people.svg", "equality-scale.svg"] as const;
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

export function PurposeSection({ title }: { title?: string }) {
  const { language } = useLanguage();
  const en = language === "en";
  const content = purposeCopy[en ? "en" : "pt"];

  return (
    <S.HomeSection id="proposito" aria-labelledby="purpose-title">
      <S.AboutGrid>
        <S.AboutImageCard>
          <Image src="/images/figma/medicos/Médicos.png" alt={en ? "A diverse team of health professionals" : "Equipe diversa de profissionais de saúde"} fill sizes="(min-width: 64rem) 55vw, (min-width: 48rem) 50vw, calc(100vw - 3rem)" />
        </S.AboutImageCard>
        <S.PurposeContent>
          <div><h2 id="purpose-title">{title ?? content.title}</h2><p>{content.introduction}</p></div>
          <S.Values>
            {content.values.map(({ title, description }, index) => <li key={title}>
              <span aria-hidden="true"><Image src={`/images/purpose/${purposeIcons[index]}`} width={48} height={48} alt="" /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>)}
          </S.Values>
          <S.HomeButton href="/medicos" $variant="secondary">{en ? "Meet our team" : "Conheça nosso time"}</S.HomeButton>
          <Image src="/images/figma/imgMisc09.svg" width={24} height={93} alt="" />
        </S.PurposeContent>
      </S.AboutGrid>
    </S.HomeSection>
  );
}