import type { Metadata } from "next";
import { DoctorsView } from "@/features/doctors/doctors-view";

export const metadata: Metadata = {
  title: "Médicos",
  description: "Conheça a página demonstrativa de médicos e voluntários da Lacrei Saúde, baseada no protótipo do Figma. Cadastros e agendamentos não estão disponíveis neste protótipo.",
};

export default function DoctorsPage() {
  return <DoctorsView />;
}