"use client";

import styled from "styled-components";
import { Container } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button-link";

// Estilos do banner inicial, dos botões e dos indicadores de seleção.
export const Hero = styled.section`
  position: relative; isolation: isolate; min-height: 45rem;
  display: grid; align-items: center; padding: 9rem 0 5rem;
  color: #fefefe; background: #193d3b;
  > img { z-index: -2; object-fit: cover; object-position: center; }
  &::before { content: ""; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(90deg, rgba(0,0,0,.76), rgba(0,0,0,.43)); }
  @media (min-width: 75rem) { padding-top: 12rem; }
`;
export const HeroContent = styled(Container)`
  display: grid; gap: 2rem;
  h1 { max-width: 50rem; font-size: clamp(2rem, 3.44vw, 3rem); font-weight: 700; line-height: 1.2; min-height: 3.9em; }
  h1[data-slide="2"] { max-width: 56rem; }
  h1[data-slide="2"] span { white-space: nowrap; }
  h1 span { color: ${({ theme }) => theme.colors.primary}; font-weight: 600; }
  @media (min-width: 75rem) { transform: translateY(-2.5rem); }
  @media (min-width: 48rem) {
    width: min(calc(100% - 2rem), ${({ theme }) => theme.layout.maxWidth});
    h1 { min-height: 2.6em; }
  }
`;
export const HomeButton = styled(ButtonLink)`
  border-radius: 8px; font-size: 1.125rem; font-weight: 700;
  width: fit-content; min-height: 3rem; padding: .5rem 1.5rem;
  img { width: auto; height: auto; }
`;
export const RegisterActions = styled.div`
  display: flex; flex-wrap: wrap; gap: 1.5rem;
`;
export const RegisterLink = styled.a`
  display: inline-flex; gap: .6rem; align-items: center; justify-content: center;
  width: fit-content; min-height: 3rem; padding: .5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary}; border-radius: 8px; background: ${({ theme }) => theme.colors.primary};
  color: #fff; font-size: 1.125rem; font-weight: 700; line-height: 1.5; letter-spacing: .02em;
  text-decoration: none;
  &:hover { background: ${({ theme }) => theme.colors.primaryHover}; }
`;
export const Dots = styled.div`
  position: absolute; bottom: 7.5rem; left: 50%; transform: translateX(-50%);
  display: flex; gap: .25rem;
  button { border: 0; padding: 1rem .5rem; background: transparent; }
  span { display: block; width: .75rem; height: .75rem; border: 1px solid #fff; border-radius: 50%; }
  button[aria-pressed="true"] span { background: #fff; }
  @media (max-width: 47.99rem) { bottom: 1rem; }
`;
// Organiza as seções de apresentação, os valores e os títulos.
export const HomeSection = styled.section`
  position: relative; padding-block: clamp(3rem, 6vw, 5rem);
`;
export const AboutGrid = styled(Container)`
  position: relative; display: grid; align-items: center; gap: 2.5rem;
  @media (min-width: 48rem) { width: min(calc(100% - 4rem), ${({ theme }) => theme.layout.maxWidth}); }
  @media (min-width: 64rem) {
    width: min(calc(100% - 4rem), ${({ theme }) => theme.layout.maxWidth});
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 0;
  }
`;
export const AboutImageCard = styled.figure`
  position: relative;
  width: 100%;
  max-width: 48rem;
  aspect-ratio: 1.15;
  justify-self: start;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #dedede;
  border-radius: 10px;
  background: #fff;
  img { position: absolute; inset: 0; width: 100%; height: 100%; max-width: none; object-fit: cover; }
`;
export const AboutContent = styled.div`
  position: relative; z-index: 1;
  display: grid; gap: 1.25rem; width: 100%; min-width: 0;
  margin-left: -1.5rem;
  padding: 1.75rem;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  background: #fff;
  h2 { color: #1f1f1f; font-size: clamp(1.75rem, 3.24vw, 2.5rem); font-weight: 700; line-height: 1.2; }
  > div:first-child h2::after { content: ""; display: block; width: 10rem; height: 2px; margin-top: .75rem; background: #018762; }
  p { color: #515151; font-size: 1rem; line-height: 1.5; }
  > div:first-child { display: grid; gap: .875rem; padding-right: 0; }
  > img { position: absolute; right: 3%; top: 6px; width: 24px; height: 93px; }
  ul li { padding: 1rem; border-radius: 8px; background: #f9f3ff; }
  ul li > span { background: #018762; }
  ${HomeButton} {
    min-height: 3rem;
    padding: .5rem .625rem;
    border: 2px solid #018762;
    border-radius: 8px;
    color: #018762;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.55;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .2);
  }
  ${HomeButton}:hover { background: #018762; color: #fff; }
  @media (min-width: 64rem) {
    gap: 1.25rem;
    padding: 1.5rem;
    p { font-size: 1rem; line-height: 1.5; }
    > div:first-child { gap: .875rem; }
    ul li { padding: 1rem; }
    ul li > div { min-width: 0; }
  }
  @media (max-width: 63.99rem) {
    margin-left: 0;
    padding: 1.25rem;
    > img { display: none; }
  }
`;
export const Values = styled.ul`
  display: grid; gap: 1.25rem; list-style: none; padding: 0; margin: 0;
  li { display: grid; grid-template-columns: 3.125rem minmax(0,1fr); gap: 1rem; }
  h3 { font-size: 1rem; font-weight: 600; line-height: 1.4; margin-bottom: .25rem; }
  p { font-size: .875rem; line-height: 1.4; }
  li > span { width: 50px; height: 50px; display: grid; place-items: center;
    border-radius: 5px; background: linear-gradient(90deg,#018363,#014687); }
  @media (min-width: 64rem) {
    li { grid-template-columns: 2.75rem minmax(0,1fr); gap: 1rem; }
    li > span { width: 2.75rem; height: 2.75rem; }
    li > span img { width: 1.25rem; height: auto; }
  }
`;
export const CenterHeading = styled.div`
  display: grid; justify-items: center; gap: 1rem; text-align: center;
  h2 { font-size: clamp(1.5rem, 2.87vw, 2.5rem); font-weight: 700; line-height: 1.2; }
  p { color: ${({ theme }) => theme.colors.muted}; max-width: 26rem; line-height: 1.5; }
`;
export const Handwritten = styled.p`
  && { color: ${({ theme }) => theme.colors.primary}; font-family: "TrashHand", "Nunito", cursive;
    font-size: 2rem; line-height: 1; text-transform: uppercase; }
`;
// Posiciona o mapa, seus marcadores e as imagens decorativas.
export const ImpactContent = styled(Container)`
  display: grid; justify-items: center; gap: 3.5rem;
`;
export const MapCanvas = styled.div`
  position: relative; width: min(100%, 47.5rem); aspect-ratio: 760/509;
  margin-bottom: 3.7rem;
  > img:first-child { position: absolute; left: -18.46%; top: 0; width: 118.46%; height: 111.5%; max-width: none; }
  button { position: absolute; width: 3rem; height: 3rem; padding: .7rem; border: 0; border-radius: 50%;
    display: grid; place-items: center; background: transparent; transform: translate(-50%,-50%); }
  button:hover, button[aria-pressed="true"] { background: #c8d53399; }
  button img { width: auto; height: 26px; }
`;
export const ImpactSection = styled(HomeSection)`
  overflow: clip;
  h2 { color: #1f1f1f; }
  ${Handwritten} { color: #018762; }
  ${CenterHeading} p { color: #515151; }
  ${HomeButton} { border-color: #018762; color: #018762; }
  ${HomeButton}:hover { background: #f9f3ff; }
  [role="status"] { color: #018762; }
  > img { position: absolute; pointer-events: none; width: 120px; height: 135px; }
  > img:first-of-type { right: -1.5rem; top: 35%; transform: rotate(196deg); }
  > img:last-of-type { left: 0; bottom: 4rem; transform: rotate(18deg); }
  @media (max-width: 47.99rem) { > img { width: 60px; height: auto; } }
`;
export const ImpactStatus = styled.p`
  min-height: 1.6em; text-align: center; color: ${({ theme }) => theme.colors.primary};
  margin-top: -2rem;
`;
// Define a linha do tempo horizontal e os cartões com imagens recortadas.
export const HistorySection = styled(HomeSection)`
  padding-top: 0; overflow: clip;
  > div:first-child h2 { font-family: ${({ theme }) => theme.fonts.heading}; }
`;
export const TimelineCarousel = styled.div`
  display: grid; grid-template-columns: 3rem minmax(0, 1fr) 3rem; align-items: center;
  gap: clamp(.25rem, 2vw, 1rem); width: 100%; margin-block: 2.625rem 1rem;
`;
export const TimelineArrow = styled.button`
  display: grid; place-items: center; width: 3rem; height: 3rem;
  border: 1px solid #087b6b; border-radius: 50%; background: #fff; color: #087b6b;
  font-size: 1.5rem; line-height: 1;
  &:hover { background: #fafbeb; }
`;
export const TimelineViewport = styled.div`
  min-width: 0;
  overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: x mandatory;
  scrollbar-width: none; -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
  &:focus-visible { outline-offset: -4px; }
`;
export const TimelineTrack = styled.ol`
  position: relative; display: flex; width: max-content; list-style: none; padding: 0 2rem 1rem; margin: 0;
  background: url("/images/figma/imgLine1.svg") 0 11.5rem / 194rem 5rem no-repeat;
  li { position: relative; display: flex; align-items: center; gap: 0; scroll-snap-align: start; }
  time { display: block; width: clamp(4rem,12vw,11rem); text-align: center; font-family: ${({ theme }) => theme.fonts.heading}; font-size: 1.5rem; font-weight: 500; }
`;
export const StoryCard = styled.article`
  position: relative; width: clamp(15rem, 68vw, 23rem); height: 25rem; overflow: hidden; border-radius: 1.5rem;
  display: flex; flex-direction: column; justify-content: flex-end; background: #304941;
  > img { object-fit: fill; max-width: none; }
  > div { position: relative; padding: 1rem 1.625rem; min-height: 11rem;
    background: rgba(15,35,29,.84); backdrop-filter: blur(9px); color: #fefefe; }
  h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.3; margin-bottom: .6rem; }
  p { font-family: ${({ theme }) => theme.fonts.heading}; font-size: .875rem; line-height: 1.3; }
`;
// Estilos dos parceiros e da janela de aviso sobre cadastro.
export const PartnerSection = styled(HomeSection)`
  padding-bottom: 5rem;
  h2 { font-family: ${({ theme }) => theme.fonts.heading}; }
`;
export const PartnerLogos = styled.div`
  width: min(100%, 58rem); margin: 2rem auto 0;
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem 2.5rem; align-items: center;
  > div { position: relative; height: 8rem; overflow: hidden; }
  img { object-fit: contain; }
  @media (min-width: 48rem) {
    grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.5rem;
    > div { height: 10rem; }
  }
`;
export const RegistrationDialog = styled.dialog`
  width: min(calc(100% - 2rem), 32rem); padding: 2rem; border: 0; border-radius: 1rem;
  color: ${({ theme }) => theme.colors.text}; background: #fff;
  &::backdrop { background: rgba(0,0,0,.65); }
  h2 { margin-bottom: 1rem; }
  p { margin-bottom: 1.5rem; }
  button { min-height: 3rem; border-radius: 5px; padding: .5rem 1rem; border: 1px solid #087b6b; background: #087b6b; color: #fff; }
  a { display: inline-flex; align-items: center; min-height: 3rem; margin-right: 1rem; }
`;