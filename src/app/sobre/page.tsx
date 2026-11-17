import type { Metadata } from "next";
import { AboutView } from "@/features/about/about-view";

// Define as informações da página Sobre para o navegador e buscadores.
export const metadata: Metadata = {
  title: "Sobre o projeto",
  description: "Conheça os princípios e os limites deste protótipo independente de interface acolhedora e acessível.",
};

// Exibe a apresentação do projeto na rota Sobre.
export default function AboutPage() {
  return <AboutView />;
}