"use client";

import Image from "next/image";
import { useLanguage } from "@/components/layout/language-context";
import * as S from "./home.styles";

const purposeIcons = ["security-shield.svg", "accessibility.svg", "faq-circle.svg"] as const;
const purposeCopy = {
  pt: {
    title: "Nosso Propósito",
    introduction: "Conectar a comunidade LGBTQIAPN+ a profissionais que oferecem cuidado sem preconceitos.",
    values: [
      { title: "Segurança", description: "Entenda como validamos pacientes e profissionais da saúde." },
      { title: "Acessibilidade", description: "Conheça nossos recursos que tornam a plataforma Lacrei Saúde acessível." },
      { title: "Dúvidas Frequentes", description: "Acesse nossa lista de perguntas frequentes e tire suas dúvidas." },
    ],
  },
  en: {
    title: "Our Purpose",
    introduction: "We exist to transform access to healthcare by connecting the LGBTQIAPN+ community with qualified, compassionate health professionals. We are committed to safe, inclusive, prejudice-free care, celebrating diversity in all its forms and ensuring every person is welcomed with dignity and respect for their whole self.",
    values: [
      { title: "Security", description: "Learn how we verify patients and health professionals." },
      { title: "Accessibility", description: "Discover the resources that make the Lacrei Saúde platform accessible." },
      { title: "Frequently Asked Questions", description: "Browse our FAQ and get answers to common questions." },
    ],
  },
};

export function PurposeSection({ title, introductionLines, action, image }: {
  title?: string;
  introductionLines?: readonly [string, string];
  action?: { label: string; href: string };
  image?: { src: string; alt: string };
}) {
  const { language } = useLanguage();
  const en = language === "en";
  const content = purposeCopy[en ? "en" : "pt"];

  return (
    <S.HomeSection id="proposito" aria-labelledby="purpose-title">
      <S.AboutGrid>
        <S.AboutImageCard>
          <Image src={image?.src ?? "/images/figma/medicos/Médicos.png"} alt={image?.alt ?? (en ? "A diverse team of health professionals" : "Equipe diversa de profissionais de saúde")} fill sizes="(min-width: 64rem) 55vw, (min-width: 48rem) 50vw, calc(100vw - 3rem)" />
        </S.AboutImageCard>
        <S.PurposeContent>
          <div>
            <h2 id="purpose-title">{title ?? content.title}</h2>
            <p>{introductionLines ? <>{introductionLines[0]}<br />{introductionLines[1]}</> : content.introduction}</p>
          </div>
          <S.Values>
            {content.values.map(({ title, description }, index) => <li key={title}>
              <span aria-hidden="true"><Image src={`/images/purpose/${purposeIcons[index]}`} width={48} height={48} alt="" /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>)}
          </S.Values>
          <S.HomeButton href={action?.href ?? "/medicos"} $variant="secondary">{action?.label ?? (en ? "Meet our team" : "Conheça nosso time")}</S.HomeButton>
          <Image src="/images/figma/imgMisc09.svg" width={24} height={93} alt="" />
        </S.PurposeContent>
      </S.AboutGrid>
    </S.HomeSection>
  );
}