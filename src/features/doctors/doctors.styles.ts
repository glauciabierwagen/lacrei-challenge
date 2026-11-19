"use client";

import styled from "styled-components";
import { Container } from "@/components/ui/primitives";
import * as Home from "@/features/home/home.styles";

// Adapta os estilos da página inicial para o banner e a missão dos médicos.
export const Hero = styled(Home.Hero)`
  h1 { max-width: 53.125rem; }
  @media (min-width: 48rem) { h1 { font-size: 3.25rem; } }
  @media (min-width: 75rem) { h1 { font-size: 3.75rem; } }
`;

export const RegisterLink = styled(Home.HomeButton)`
  font-size: 1.25rem;
`;

export const SectionContent = styled(Container)`
  position: relative; display: grid; justify-items: center;
  gap: 2.625rem; min-width: 0;
`;

export const Heading = styled(Home.CenterHeading)`
  gap: 0;
  h2 { line-height: 1.3; }
`;

// Organiza os depoimentos em cartões que se ajustam ao tamanho da tela.
export const Testimonials = styled(Home.HomeSection)`
  background: #fff;
  ${Heading} { margin-bottom: .875rem; }
`;

export const TestimonialGrid = styled.div`
  display: grid; align-items: start; gap: 2rem; width: 100%;
  @media (min-width: 48rem) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 64rem) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
`;

export const TestimonialCard = styled.article`
  min-width: 0; padding: 1.5rem; border: 2px solid #118877;
  border-radius: 1.5rem; background: #fff;
  header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  header > img { flex: 0 0 4rem; width: 4rem; height: 4rem; border-radius: 50%; }
  header > div { min-width: 0; }
  h3 { font-size: 1.125rem; font-weight: 500; line-height: 1.3; margin-bottom: .25rem; }
  header p { font-family: ${({ theme }) => theme.fonts.heading}; color: #707070; }
  p { line-height: 1.3; }
  > p { color: ${({ theme }) => theme.colors.muted}; font-weight: 500; }
  > p + p { margin-top: .5rem; }
`;

// Define o fundo decorativo e os cartões com as fotos da equipe.
export const Team = styled(Home.HomeSection)`
  position: relative; isolation: isolate; overflow: clip;
  > img:first-child { z-index: -2; object-fit: cover; opacity: .12; pointer-events: none; }
  ${Heading} { margin-bottom: .625rem; }
  h2 { font-family: ${({ theme }) => theme.fonts.heading}; }
`;

export const TeamCurve = styled.div`
  position: absolute; z-index: -1; pointer-events: none;
  top: 50%; left: 50%; width: min(100vw, 90rem); aspect-ratio: 1441 / 258;
  transform: translate(-50%, -50%);
  img { position: absolute; width: 17.9042%; height: 558.527%; max-width: none;
    left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(90deg); }
`;

export const DoctorGrid = styled.div`
  display: grid; align-items: start; width: 100%; gap: 2.6875rem;
  @media (min-width: 48rem) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 64rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 3.875rem;
  }
`;

export const DoctorCard = styled.article<{ $marcelo: boolean }>`
  position: relative; isolation: isolate; overflow: hidden; min-width: 0;
  height: ${({ $marcelo }) => $marcelo ? "20.1875rem" : "21rem"};
  padding: 1.5rem; border-radius: 1.5rem; background: #304941;
  display: flex; flex-direction: column; justify-content: flex-end; gap: .5rem;
  color: #fff; font-family: ${({ theme }) => theme.fonts.heading};
  > img { z-index: -2; max-width: none; object-fit: fill; }
  &::before { content: ""; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(180deg, transparent 19%, rgba(0,0,0,.2) 45%, rgba(0,0,0,.82) 64%, rgba(0,0,0,.9) 100%); }
  h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.3; }
  p { font-size: 1rem; font-weight: 500; line-height: 1.3; }
`;