import { screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Header } from "@/components/layout/header";
import { LanguageProvider } from "@/components/layout/language-context";
import { renderWithTheme } from "@/test/render";
import { DoctorsView } from "./doctors-view";

// Restaura o idioma do documento após cada teste.
afterEach(() => {
  document.documentElement.lang = "pt-BR";
});

// Verifica banners, cartões, links de cadastro e troca de idioma da página de médicos.
describe("DoctorsView", () => {
  it("selects each hero banner exclusively by keyboard and announces its heading", async () => {
    const { user } = renderWithTheme(<DoctorsView />);
    const heading = screen.getByRole("heading", { level: 1 });
    const titles = [/^Saúde que cuida\s*e transforma vidas$/, /^Mudamos pessoas,\s*transformamos o mundo\.$/, /^Educação sem fronteiras,\s*transformação sem limites\.$/];
    const banners = within(screen.getByRole("group", { name: "Escolher banner" })).getAllByRole("button");
    expect(screen.getByRole("region", { name: titles[0] })).toHaveAttribute("aria-roledescription", "carrossel");
    expect(heading).toHaveAttribute("aria-live", "polite");
    expect(heading).toHaveAccessibleName(titles[0]);
    expect(banners).toHaveLength(3);
    banners.forEach((banner, index) => {
      expect(banner).toHaveAttribute("type", "button");
      expect(banner).toHaveAccessibleName(new RegExp(`^Banner ${index + 1}:`));
      expect(banner).toHaveAttribute("aria-pressed", String(index === 0));
    });
    for (const index of [1, 2, 0]) {
      banners[index].focus();
      await user.keyboard("{Enter}");
      expect(heading).toHaveAccessibleName(titles[index]);
      banners.forEach((banner, candidate) => expect(banner).toHaveAttribute("aria-pressed", String(candidate === index)));
    }
  });

  it("renders the shared purpose section and named volunteer testimonials separately from doctor cards", () => {
    renderWithTheme(<DoctorsView />);
    const careIntro = screen.getByRole("heading", { level: 2, name: "Conheça o jeito Lacrei Saúde de cuidar" });
    expect(screen.getByText("Atendimento de qualidade e inclusivo")).toBeVisible();
    const purposeRegion = screen.getByRole("region", { name: "Nossa Missão" });
    const purpose = within(purposeRegion);
    expect(careIntro.compareDocumentPosition(purpose.getByRole("heading", { level: 2, name: "Nossa Missão" })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const introduction = purposeRegion.querySelector("p");
    expect(introduction).toHaveTextContent(/Nos preocupamos com cada detalhe de sua experiência,.*cuidado acolhedor, seguro e sem preconceitos\./);
    expect(introduction?.querySelector("br")).toBeInTheDocument();
    expect(purpose.getByRole("link", { name: "Dúvidas Frequentes" })).toHaveAttribute("href", "https://lacreisaude.com.br/ajuda/");
    for (const name of ["Segurança", "Acessibilidade", "Dúvidas Frequentes"]) {
      expect(purpose.getByRole("heading", { level: 3, name })).toBeVisible();
    }
    expect(purpose.getByText("Entenda como validamos pacientes e profissionais da saúde.")).toBeVisible();
    expect(purpose.getByText("Conheça nossos recursos que tornam a plataforma Lacrei Saúde acessível.")).toBeVisible();
    expect(purpose.getByText("Acesse nossa lista de perguntas frequentes e tire suas dúvidas.")).toBeVisible();
    const purposeImage = purpose.getByRole("img", { name: "Pessoas celebrando o Orgulho LGBTQIA+" });
    expect(purposeImage).toBeVisible();
    expect(decodeURIComponent(purposeImage.getAttribute("src") ?? "")).toContain("/images/figma/medicos/diversidade.png");
    expect(screen.getByText("Nossos pacientes")).toBeVisible();
    const testimonials = within(screen.getByRole("region", { name: "Depoimentos inspiradores" }));
    expect(testimonials.getAllByRole("article")).toHaveLength(3);
    expect(testimonials.getByText("Perfis e relatos ilustrativos; não representam depoimentos reais.")).toBeVisible();
    for (const [name, profession, story] of [
      ["Fernanda", "Professora", "Encontrei profissionais competentes, que respeitaram minha identidade e acolheram a diversidade. Me senti segura desde o primeiro contato. A comunicação foi clara, cada etapa foi explicada com cuidado e pude falar sobre minhas necessidades sem receio. Saí mais tranquila e confiante para cuidar da minha saúde. Também recebi orientações claras para decidir com tranquilidade os próximos passos do meu cuidado."],
      ["Silvia", "Psicóloga", "Fui ouvida sem julgamentos e encontrei profissionais preparados e competentes para atender a diversidade. Isso me trouxe segurança em cada etapa. As orientações foram claras e minha identidade foi respeitada durante todo o cuidado. Poder falar abertamente das minhas necessidades fez toda a diferença. Ter espaço para conversar com liberdade e participar das decisões tornou a experiência ainda mais acolhedora."],
      ["Débora", "Enfermeira", "Recebi um cuidado competente e respeitoso com a diversidade. Minha identidade foi acolhida, e me senti segura durante todo o atendimento. A equipe explicou as opções com atenção e me incluiu nas decisões. Saí confiante de que minhas necessidades foram compreendidas. Também saí com dúvidas esclarecidas e com a confiança de que posso buscar atendimento sem esconder quem sou."],
    ]) {
      const card = within(testimonials.getByRole("article", { name: `Depoimento de ${name}` }));
      expect(card.getByRole("heading", { level: 3, name })).toBeVisible();
      expect(card.getByText(profession)).toBeVisible();
      expect(card.getByText(story)).toBeVisible();
    }
    const team = within(screen.getByRole("region", { name: "Conheça nossos profissionais" }));
    expect(team.getByText("Profissionais comprometidos com um atendimento de qualidade e inclusivo.")).toBeVisible();
    expect(team.getByText("Perfis demonstrativos; nomes e especialidades são ilustrativos.")).toBeVisible();
    const cards = team.getAllByRole("article");
    const profiles = [
      ["Ana Ribeiro", "Médica de família", "M1.png"], ["Camila Nunes", "Cardiologia", "M2.png"],
      ["Rafael Costa", "Medicina de família", "M3.png"], ["Gabriel Almeida", "Pediatria", "M4.png"],
      ["Helena Martins", "Dermatologia", "M5.png"], ["Daniel Tanaka", "Psiquiatria", "M6.png"],
      ["Joana Souza", "Ginecologia", "M7.png"], ["Marina Lopes", "Endocrinologia", "M8.jpg"],
      ["Bianca Ferreira", "Neurologia", "M9.png"],
    ];
    expect(cards).toHaveLength(9);
    cards.forEach((card, index) => {
      const [name, specialty, image] = profiles[index];
      expect(within(card).getByRole("heading", { level: 3, name })).toBeVisible();
      expect(within(card).getByText(specialty)).toBeVisible();
      const photo = card.querySelector("img");
      expect(decodeURIComponent(photo?.getAttribute("src") ?? "")).toContain(`/images/figma/medicos/${image}`);
      if (image === "M5.png") expect(photo?.getAttribute("style")).toContain("object-position: center top");
    });
    expect(screen.getByRole("heading", { level: 2, name: "Juntos pela causa!" })).toBeVisible();
  });

  it("links all audience CTAs to the appropriate official portals", () => {
    renderWithTheme(<DoctorsView />);
    expect(screen.getByRole("link", { name: "Para Pacientes" })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    expect(screen.getByRole("link", { name: "Para Profissionais" })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    expect(screen.getByRole("link", { name: "Buscar Atendimento" })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    expect(screen.getByRole("link", { name: "Oferecer atendimento" })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.queryByRole("link", { name: "Junte-se a nós" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Como cadastrar" })).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog", { hidden: true })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /cadastrar|agendar/i })).not.toBeInTheDocument();
  });

  it("uses the header's shared language state and preserves the selected slide when translating and switching back", async () => {
    const { user } = renderWithTheme(<LanguageProvider><Header /><DoctorsView /></LanguageProvider>);
    await user.click(screen.getByRole("button", { name: /^Banner 3:/ }));
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("button", { name: "EN English" }));
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Education without borders,\s*transformation without limits\.$/);
    expect(screen.getByRole("region", { name: /^Education without borders,/ })).toHaveAttribute("aria-roledescription", "carousel");
    expect(within(screen.getByRole("group", { name: "Choose a banner" })).getByRole("button", { name: /^Banner 3:/ })).toHaveAttribute("aria-pressed", "true");
    for (const name of ["Our Mission", "Inspiring testimonials", "Meet our professionals", "Together for the cause!"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    for (const name of ["Build a more compassionate world", "Bring hearts together and value lives", "Promote sustainable and inclusive education"]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeVisible();
    }
    expect(screen.getByRole("img", { name: "People together at a Pride event" })).toBeVisible();
    expect(screen.getByRole("img", { name: "Lacrei Saúde partner seal" })).toBeVisible();
    expect(screen.getByText("Illustrative profiles and stories; these are not real testimonials.")).toBeVisible();
    for (const [name, profession] of [["Fernanda", "Teacher"], ["Silvia", "Psychologist"], ["Débora", "Nurse"]]) {
      const card = within(screen.getByRole("article", { name: `Testimonial from ${name}` }));
      expect(card.getByText(profession)).toBeVisible();
    }
    const navigation = within(screen.getByRole("navigation", { name: "Main navigation" }));
    expect(navigation.getByRole("link", { name: "Doctors" })).toHaveAttribute("href", "/medicos");
    expect(screen.getByRole("link", { name: "For Patients" })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    expect(screen.getByRole("link", { name: "For Professionals" })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    expect(screen.getByRole("link", { name: "Find care" })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    expect(screen.getAllByRole("link", { name: "How to register" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Join us" })).toHaveLength(1);
    for (const name of ["How to register", "Join us"]) {
      for (const link of screen.getAllByRole("link", { name })) expect(link).toHaveAttribute("href", "/#cadastro");
    }
    await user.click(screen.getByRole("button", { name: "PT Português" }));
    expect(document.documentElement).toHaveAttribute("lang", "pt-BR");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Educação sem fronteiras,\s*transformação sem limites\.$/);
    expect(screen.getByRole("button", { name: /^Banner 3:/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Nossa Missão" })).toBeVisible();
  });
});