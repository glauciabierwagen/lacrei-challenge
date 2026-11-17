"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

// Coleta os estilos durante a renderização no servidor.
export function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  // Insere o CSS no HTML e limpa as regras já enviadas.
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // No navegador, a biblioteca já cuida dos estilos.
  if (typeof window !== "undefined") return <>{children}</>;

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}