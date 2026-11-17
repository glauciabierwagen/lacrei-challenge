import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

function TestTheme({ children }: { children: ReactNode }) {
  return (
    <StyleSheetManager stylisPlugins={[
      function mobileViewport(element) {
        // O jsdom 31 fixa o CSS em 1024px, mesmo alterando innerWidth/matchMedia.
        // Remove regras de desktop nos testes móveis; a responsividade é testada no navegador.
        if (element.type === "@media" && element.value.includes("min-width:")) {
          element.children = [];
        }
      },
    ]}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}

// Renderiza com o tema do site e prepara as interações do usuário.
export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return {
    user: userEvent.setup(),
    ...render(ui, { ...options, wrapper: TestTheme }),
  };
}