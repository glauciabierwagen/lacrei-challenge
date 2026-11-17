"use client";

import styled from "styled-components";

// Elementos básicos de estrutura e acesso ao conteúdo pelo teclado.
export const Main = styled.main`
  min-height: 65vh;
  scroll-margin-top: 1rem;
`;

export const SkipLink = styled.a`
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  z-index: 20;
  padding: 0.75rem 1rem;
  min-height: ${({ theme }) => theme.layout.target};
  background: ${({ theme }) => theme.colors.white};
  transform: translateY(-200%);
  &:focus { transform: translateY(0); }
`;

// Organiza a largura, as seções e os textos compartilhados pelas páginas.
export const Container = styled.div`
  width: min(calc(100% - 2rem), ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: min(calc(100% - 4rem), ${({ theme }) => theme.layout.maxWidth});
  }
`;

export const Section = styled.section<{ $tinted?: boolean }>`
  padding-block: clamp(3rem, 7vw, ${({ theme }) => theme.space.section});
  background: ${({ theme, $tinted }) => $tinted ? theme.colors.surface : theme.colors.white};
`;

export const Stack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  min-width: 0;
`;

export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Lead = styled.p`
  max-width: 58ch;
  color: ${({ theme }) => theme.colors.muted};
  font-size: clamp(1.0625rem, 2vw, 1.1875rem);
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
  > a { max-width: 100%; }
`;

// Estilos dos cartões, títulos de seção e avisos.
export const CardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.xl};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Card = styled.article`
  min-width: 0;
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.white};
  h3 { margin-bottom: ${({ theme }) => theme.space.md}; }
  p { color: ${({ theme }) => theme.colors.muted}; }
`;

export const SectionHeading = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  max-width: 46rem;
`;

export const Notice = styled.p`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;