import type { Metadata } from "next";
import { AboutView } from "@/features/about/about-view";

export const metadata: Metadata = {
  title: "Sobre o projeto",
  description: "Conheça os princípios e os limites deste protótipo independente de interface acolhedora e acessível.",
};

export default function AboutPage() {
  return <AboutView />;
}