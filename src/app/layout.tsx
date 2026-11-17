import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Main, SkipLink } from "@/components/ui/primitives";
import { Providers } from "@/styles/providers";
import "@fontsource/nunito/latin-400.css";
import "@fontsource/nunito/latin-500.css";
import "@fontsource/nunito/latin-600.css";
import "@fontsource/nunito/latin-700.css";

// Define o título, a descrição e a orientação para não indexar o protótipo.
export const metadata: Metadata = {
  title: { default: "Lacrei Saúde | Saúde que fortalece e transforma vidas", template: "%s | Lacrei Saúde" },
  description: "Conheça o propósito, o impacto e a história da Lacrei Saúde. Implementação demonstrativa baseada no Figma LacreiChallenge.",
  robots: { index: false, follow: false },
};

// Monta a estrutura comum das páginas, com cabeçalho, conteúdo e rodapé.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body id="topo">
        <Providers>
          <SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>
          <Header />
          <Main id="conteudo" tabIndex={-1}>{children}</Main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
