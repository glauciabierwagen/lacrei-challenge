"use client";

import styled from "styled-components";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { Actions, Card, CardGrid, Container, Eyebrow, Lead, Notice, Section, SectionHeading, Stack } from "@/components/ui/primitives";

const Intro = styled(Container)`
  display: grid;
  gap: ${({ theme }) => theme.space.xxl};
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;
const Statement = styled.aside`
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  p { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; line-height: 1.3; letter-spacing: -0.025em; }
  span { display: block; margin-top: ${({ theme }) => theme.space.lg}; font-size: 0.875rem; }
`;
const Reading = styled(Container)`
  max-width: 52rem;
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
`;

const questions: AccordionItem[] = [
  { id: "design", question: "De onde vem esta proposta visual?", answer: "A composição, a ilustração e os textos foram criados como uma proposta provisória para este exercício. Nenhum arquivo Figma foi disponibilizado; não se trata da implementação de um layout oficial." },
  { id: "acessibilidade", question: "Como a acessibilidade aparece no protótipo?", answer: "A interface inclui navegação por teclado, indicação de foco, link para pular ao conteúdo, menu com estado anunciado e perguntas expansíveis. Essas escolhas são um ponto de partida e não representam certificação de acessibilidade." },
  { id: "dados", question: "É preciso informar algum dado pessoal?", answer: "Não. Esta demonstração não possui formulários, contas ou agendamento. Não envie informações pessoais ou de saúde por este protótipo." },
];

export function AboutView() {
  return (
    <>
      <Section aria-labelledby="about-title">
        <Intro>
          <Stack>
            <Eyebrow>Sobre o projeto</Eyebrow>
            <h1 id="about-title">Um espaço para imaginar novas conexões.</h1>
            <Lead>Acreditamos que uma experiência digital pode ser clara, respeitosa e acolhedora desde o primeiro contato.</Lead>
            <p>Este projeto demonstrativo explora essa ideia com conteúdo em português e atenção à diversidade LGBTQIAPN+. É um exercício de interface, não uma plataforma de serviços.</p>
            <Actions><ButtonLink href="/" $variant="secondary">Voltar ao início <span aria-hidden="true">↗</span></ButtonLink></Actions>
          </Stack>
          <Statement aria-label="Princípio do projeto">
            <p>O primeiro passo para acolher é reconhecer que cada história importa.</p>
            <span>Uma intenção que orienta esta proposta.</span>
          </Statement>
        </Intro>
      </Section>

      <Section $tinted aria-labelledby="principles-title">
        <Container>
          <SectionHeading>
            <Eyebrow>Da intenção à experiência</Eyebrow>
            <h2 id="principles-title">Escolhas simples, feitas com atenção.</h2>
          </SectionHeading>
          <CardGrid>
            <Card><h3>Clareza</h3><p>Textos diretos e caminhos previsíveis, sem promessas de serviços que não existem neste protótipo.</p></Card>
            <Card><h3>Autonomia</h3><p>Você escolhe o que explorar e quais respostas abrir, sem precisar criar uma conta.</p></Card>
            <Card><h3>Pertencimento</h3><p>Linguagem respeitosa, que reconhece diferentes identidades e formas de estar no mundo.</p></Card>
          </CardGrid>
        </Container>
      </Section>

      <Section aria-labelledby="scope-title">
        <Reading>
          <SectionHeading>
            <Eyebrow>Limites e próximos passos</Eyebrow>
            <h2 id="scope-title">Um protótipo, com transparência.</h2>
            <Lead>Antes de evoluir, é importante deixar claro o ponto de partida.</Lead>
          </SectionHeading>
          <Notice><strong>Design provisório.</strong> O Figma não foi fornecido. Esta interface é uma interpretação original para demonstração e não representa o design oficial ou um serviço real.</Notice>
          <Accordion items={questions} />
          <Actions><ButtonLink href="/">Explorar a página inicial <span aria-hidden="true">↗</span></ButtonLink></Actions>
        </Reading>
      </Section>
    </>
  );
}