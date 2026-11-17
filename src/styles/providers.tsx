"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { LanguageProvider } from "@/components/layout/language-context";
import { GlobalStyles } from "./global-styles";
import { StyledComponentsRegistry } from "./registry";
import { theme } from "./theme";

// Disponibiliza os estilos, o tema e o idioma para todas as páginas.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}