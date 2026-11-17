import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

function TestTheme({ children }: { children: ReactNode }) {
  return (
    <StyleSheetManager stylisPlugins={[
      function mobileViewport(element) {
        // jsdom 31 fixes CSS viewport width at 1024px; innerWidth/matchMedia
        // overrides cannot change it. Omit desktop-only rules for mobile units.
        // Responsive breakpoint evaluation belongs in browser-based E2E tests.
        if (element.type === "@media" && element.value.includes("min-width:")) {
          element.children = [];
        }
      },
    ]}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return {
    user: userEvent.setup(),
    ...render(ui, { ...options, wrapper: TestTheme }),
  };
}