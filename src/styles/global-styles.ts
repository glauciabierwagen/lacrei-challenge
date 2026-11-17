"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face { font-family: "TrashHand"; src: url("/fonts/trashhand.woff") format("woff"); font-weight: 400; font-style: normal; font-display: swap; }
  *, *::before, *::after { box-sizing: border-box; }
  html { color-scheme: light; scroll-behavior: smooth; scroll-padding-top: 1.5rem; }
  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    overflow-wrap: anywhere;
  }
  body > div { min-width: 0; }
  h1, h2, h3, p { margin: 0; }
  h1, h2, h3 { line-height: 1.18; text-wrap: balance; }
  h1 { font-size: clamp(2.25rem, 5.2vw, 4.375rem); font-weight: 500; }
  h2 { font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 500; }
  h3 { font-size: 1.25rem; }
  a { color: ${({ theme }) => theme.colors.primary}; text-underline-offset: 0.25em; }
  button, input { font: inherit; }
  button { cursor: pointer; }
  img, svg { display: block; max-width: 100%; }
  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 5px;
  }
  [hidden] { display: none !important; }
  ::selection { background: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.text}; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;