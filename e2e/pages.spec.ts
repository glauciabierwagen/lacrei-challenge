import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function gotoHome(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("banner").getByRole("link", { name: "Lacrei Saúde — início" })).toBeVisible();
  // Under parallel load the server-rendered header can be visible before hydration.
  await page.waitForLoadState("networkidle");
}

async function openNavigation(page: Page) {
  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  if (await toggle.isVisible()) await toggle.click();
  return page.getByRole("navigation", { name: "Navegação principal" });
}

for (const route of ["/", "/sobre", "/medicos"]) {
  test(`${route}: sem violações automáticas WCAG AA`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test(`${route}: sem overflow em telas pequenas e grandes`, async ({ page }) => {
    for (const width of [320, 375, 768, 832, 895, 1024, 1199, 1200, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(noOverflow, `Overflow na rota ${route}, largura ${width}`).toBe(true);
    }
  });
}

test("navegação e conteúdo interativo funcionam", async ({ page, isMobile }) => {
  await gotoHome(page);
  if (isMobile) await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Quem Somos", exact: true }))
    .toHaveAttribute("href", "https://lacreisaude.com.br/quem-somos/");
  await page.goto("/sobre");
  const trigger = page.getByRole("button", { name: "De onde vem esta proposta visual?" });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region", { name: "De onde vem esta proposta visual?" })).toBeVisible();
});

test("Blog e Unidades abrem modais informativos pela navbar", async ({ page }) => {
  await gotoHome(page);
  for (const [label, copy] of [
    ["Blog", "O conteúdo do blog não está disponível nesta demonstração."],
    ["Unidades", "As informações sobre unidades de atendimento não estão disponíveis nesta demonstração."],
  ]) {
    const navigation = await openNavigation(page);
    const trigger = navigation.getByRole("link", { name: label, exact: true });
    await expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: label, exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(copy);
    await expect(dialog.getByRole("link", { name: "Para Pacientes", exact: true })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    await expect(dialog.getByRole("link", { name: "Para Profissionais", exact: true })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    await expect(page).toHaveURL(/\/$/);
    await dialog.getByRole("button", { name: "Fechar", exact: true }).click();
    await expect(dialog).not.toBeVisible();
    const toggle = page.getByRole("button", { name: "Menu", exact: true });
    if (await toggle.isVisible()) await expect(toggle).toBeFocused();
    else await expect(trigger).toBeFocused();
  }
});

test("Médicos abre pela navegação, recarrega diretamente e permite voltar ao Início", async ({ page }) => {
  await gotoHome(page);
  await expect(page.getByRole("banner")).toHaveCSS("position", "absolute");
  const navigation = await openNavigation(page);
  const doctors = navigation.getByRole("link", { name: "Médicos", exact: true });
  await expect(doctors).toHaveAttribute("href", "/medicos");
  await doctors.click();
  await expect(page).toHaveURL(/\/medicos$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Saúde que cuida\s*e transforma vidas$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("banner")).toHaveCSS("position", "absolute");
  const currentNavigation = await openNavigation(page);
  await expect(currentNavigation.getByRole("link", { name: "Médicos", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(currentNavigation.locator('[aria-current="page"]')).toHaveCount(1);
  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/medicos$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Saúde que cuida\s*e transforma vidas$/);
  const reloadedNavigation = await openNavigation(page);
  await expect(reloadedNavigation.getByRole("link", { name: "Médicos", exact: true })).toHaveAttribute("aria-current", "page");
  await reloadedNavigation.getByRole("link", { name: "Início", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Saúde que fortalece\s*e transforma vidas$/);
});

for (const language of ["pt", "en"] as const) {
  test(`os dois CTAs de equipe abrem Médicos e mantêm o idioma ${language}`, async ({ page }) => {
    await gotoHome(page);
    const en = language === "en";
    if (en) {
      await openNavigation(page);
      await page.getByRole("button", { name: "EN English", exact: true }).click();
      const close = page.getByRole("button", { name: "Close menu", exact: true });
      if (await close.isVisible()) await close.click();
    }
    const ctaName = en ? "Meet our team" : "Conheça nosso time";
    await expect(page.getByRole("link", { name: ctaName, exact: true })).toHaveCount(2);
    for (const section of ["proposito", "historias"]) {
      const cta = page.locator(`#${section}`).getByRole("link", { name: ctaName, exact: true });
      await expect(cta).toHaveAttribute("href", "/medicos");
      await cta.click();
      await expect(page).toHaveURL(/\/medicos$/);
      await expect(page.locator("html")).toHaveAttribute("lang", en ? "en" : "pt-BR");
      await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(en ? /^Health that cares\s*and transforms lives$/ : /^Saúde que cuida\s*e transforma vidas$/);
      await expect(page.getByRole("heading", { name: en ? "Our Mission" : "Nossa Missão", exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: en ? "Meet our professionals" : "Conheça nossos profissionais", exact: true })).toBeVisible();
      await expect(page.getByRole("region", { name: en ? "Meet our professionals" : "Conheça nossos profissionais", exact: true }).getByRole("article")).toHaveCount(9);
      await openNavigation(page);
      await expect(page.getByRole("navigation", { name: en ? "Main navigation" : "Navegação principal", exact: true }).getByRole("link", { name: en ? "Doctors" : "Médicos", exact: true })).toHaveAttribute("aria-current", "page");
      const close = page.getByRole("button", { name: en ? "Close menu" : "Fechar menu", exact: true });
      if (await close.isVisible()) await close.click();
      await page.goBack();
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator(`#${section}`).getByRole("link", { name: ctaName, exact: true })).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("lang", en ? "en" : "pt-BR");
    }
  });
}

test("os CTAs de público de Médicos vão aos portais e os demais abrem o aviso na Home", async ({ page }) => {
  for (const index of [0]) {
    await page.goto("/medicos");
    await page.waitForLoadState("networkidle");
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: "Para Pacientes", exact: true })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    await expect(main.getByRole("link", { name: "Para Profissionais", exact: true })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    const findCare = main.getByRole("link", { name: "Buscar Atendimento", exact: true });
    await expect(findCare).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    await expect(findCare).toHaveCSS("box-shadow", "rgba(0, 0, 0, 0.2) 4px 4px 4px 0px");
    await findCare.hover();
    await expect(findCare).toHaveCSS("background-color", "rgb(17, 136, 119)");
    const links = main.getByRole("link", { name: /^(Como cadastrar|Junte-se a nós)$/ });
    await expect(links).toHaveCount(1);
    await expect(links.nth(index)).toHaveAttribute("href", "/#cadastro");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await links.nth(index).click();
    await expect(page).toHaveURL(/\/#cadastro$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Saúde que fortalece\s*e transforma vidas$/);
    const dialog = page.getByRole("dialog", { name: "Como cadastrar", exact: true });
    await expect(dialog).toBeVisible();
    expect(await dialog.evaluate((element) => element.matches(":modal"))).toBe(true);
    await expect(dialog).toContainText("Cadastros e agendamentos não estão disponíveis aqui.");
    await expect(dialog.getByRole("textbox")).toHaveCount(0);
    await expect(dialog.getByRole("link", { name: "Para Pacientes", exact: true })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
    await expect(dialog.getByRole("link", { name: "Para Profissionais", exact: true })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
    await dialog.getByRole("button", { name: "Fechar", exact: true }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  }
});

test("atalho de teclado leva ao conteúdo principal", async ({ page }) => {
  await gotoHome(page);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("banners e mapa atualizam seleção e conteúdo acessível", async ({ page }) => {
  await gotoHome(page);
  const heading = page.getByRole("heading", { level: 1 });
  const banners = page.getByRole("group", { name: "Escolher banner" }).getByRole("button");
  const titles = [/^Saúde que fortalece\s*e transforma vidas$/, /^Mudamos pessoas,\s*transformamos o mundo\.$/, /^Saúde sem fronteiras,\s*transformação sem limites\.$/];
  await expect(banners).toHaveCount(3);
  await expect(heading).toHaveAccessibleName(titles[0]);
  await expect(banners.nth(0)).toHaveAttribute("aria-pressed", "true");
  for (const index of [1, 2, 0]) {
    await banners.nth(index).click();
    await expect(heading).toHaveAccessibleName(titles[index]);
    for (let candidate = 0; candidate < 3; candidate++) {
      await expect(banners.nth(candidate)).toHaveAttribute("aria-pressed", String(candidate === index));
    }
  }
  const impact = page.getByRole("region", { name: "Impacto do Lacrei Saúde", exact: true });
  const map = impact.getByRole("group", { name: "Explore os países destacados no mapa" });
  await expect(impact.getByRole("status")).toBeEmpty();
  await expect(map.getByRole("button")).toHaveCount(4);
  for (const country of ["Brasil", "Senegal", "Moçambique", "Madagáscar"]) {
    const marker = map.getByRole("button", { name: `Explorar ${country}`, exact: true });
    await marker.click();
    await expect(marker).toHaveAttribute("aria-pressed", "true");
    await expect(map.locator('button[aria-pressed="true"]')).toHaveCount(1);
    await expect(impact.getByRole("status")).toHaveText(`${country} — destaque no mapa do projeto. Dados de impacto ainda não disponibilizados.`);
  }
});

test("próximas histórias desloca a linha do tempo sem overflow da página", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoHome(page);
  const timeline = page.getByRole("region", { name: "Linha do tempo — role para explorar" });
  await expect(timeline.getByRole("listitem")).toHaveCount(6);
  await expect(timeline).toHaveAttribute("tabindex", "0");
  const start = await timeline.evaluate((element) => element.scrollLeft);
  const timelineEdges = () => timeline.evaluate((element) => {
    const { left, right } = element.getBoundingClientRect();
    return [left, document.documentElement.clientWidth - right];
  });
  expect(await timelineEdges()).toEqual([0, 0]);
  await expect(timeline.getByRole("list")).toHaveCSS("padding-inline", "0px");
  const nextArrow = page.getByRole("button", { name: "Próximas histórias" });
  const previousArrow = page.getByRole("button", { name: "Histórias anteriores" });
  await expect(nextArrow).toHaveCSS("opacity", "0");
  await expect(previousArrow).toHaveCSS("opacity", "0");
  await timeline.click();
  await expect(nextArrow).toHaveCSS("opacity", "1");
  await expect(previousArrow).toHaveCSS("opacity", "1");
  expect(await timelineEdges()).toEqual([0, 0]);
  await nextArrow.click();
  await expect.poll(() => timeline.evaluate((element) => element.scrollLeft)).toBeGreaterThan(start);
  const next = await timeline.evaluate((element) => element.scrollLeft);
  await previousArrow.click();
  await expect.poll(() => timeline.evaluate((element) => element.scrollLeft)).toBeLessThan(next);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("CTAs do hero direcionam aos portais oficiais de pacientes e profissionais", async ({ page }) => {
  await gotoHome(page);
  await expect(page.getByRole("link", { name: "Para Pacientes", exact: true })).toHaveAttribute("href", "https://paciente.lacreisaude.com.br/");
  await expect(page.getByRole("link", { name: "Para Profissionais", exact: true })).toHaveAttribute("href", "https://profissional.lacreisaude.com.br/");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("CTA do cabeçalho reabre cadastro após fechar o mesmo hash", async ({ page }) => {
  await gotoHome(page);
  const dialog = page.getByRole("dialog", { name: "Como cadastrar" });
  for (const closeWithEscape of [false, true]) {
    const navigation = await openNavigation(page);
    const trigger = navigation.getByRole("link", { name: "Entrar", exact: true });
    await expect(trigger).toHaveAttribute("href", "/#cadastro");
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\/#cadastro$/);
    expect(await dialog.evaluate((element) => element.matches(":modal"))).toBe(true);
    if (closeWithEscape) await page.keyboard.press("Escape");
    else await dialog.getByRole("button", { name: "Fechar", exact: true }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(/\/$/);
    // On a collapsed mobile menu the CTA is hidden, so focus must land on
    // the visible menu toggle instead of disappearing into hidden navigation.
    const toggle = page.getByRole("button", { name: "Menu", exact: true });
    if (await toggle.isVisible()) await expect(toggle).toBeFocused();
    else await expect(trigger).toBeFocused();
  }
});

test("idioma atualiza documento, Home, navegação e newsletter", async ({ page }) => {
  await gotoHome(page);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await page.getByRole("button", { name: /^Banner 2:/ }).click();
  await page.getByRole("button", { name: "Explorar Brasil", exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await openNavigation(page);
  await page.getByRole("button", { name: "EN English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^We change people,\s*we transform the world\.$/);
  await expect(page.getByRole("button", { name: /^Banner 2:/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About Us", exact: true })).toHaveAttribute("href", "https://lacreisaude.com.br/quem-somos/");
  await expect(page.getByRole("heading", { name: "Our Purpose", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Explore Brazil", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("region", { name: "The impact of Lacrei Saúde", exact: true }).getByRole("status")).toContainText("Brazil — highlighted in the design map.");
  await expect(page.getByRole("region", { name: "History timeline — scroll to explore" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Subscribe for updates", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "PT Português", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(/^Mudamos pessoas,\s*transformamos o mundo\.$/);
  await expect(page.getByRole("heading", { name: "Assine para receber novidades", exact: true })).toBeVisible();
});

test("newsletter valida e-mail e não anuncia uma assinatura real", async ({ page }) => {
  await gotoHome(page);
  const newsletter = page.getByRole("region", { name: "Assine para receber novidades", exact: true });
  await expect(newsletter).toContainText("Assine gratuitamente e receba notícias, histórias inspiradoras e muito mais direto no seu e-mail.");
  await expect(newsletter).toContainText("Ao se inscrever, você concorda com nossa Política de Privacidade e consente em receber atualizações da nossa empresa.");
  await expect(newsletter).toContainText("Demonstração de newsletter. Nenhum dado é enviado ou armazenado.");
  await expect(newsletter.getByRole("link")).toHaveCount(0);
  const social = page.getByRole("navigation", { name: "Siga-nos", exact: true });
  await expect(social.getByRole("link")).toHaveCount(3);
  await expect(social.getByRole("button", { name: "YouTube", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Fale conosco", exact: true }).getByRole("link", { name: "contato@lacreisaude.com.br", exact: true })).toHaveAttribute("href", "mailto:contato@lacreisaude.com.br");
  const email = newsletter.getByRole("textbox", { name: "Seu e-mail", exact: true });
  const submit = newsletter.getByRole("button", { name: "Assinar", exact: true });
  const status = newsletter.getByRole("status");
  await expect(status).toHaveCount(1);
  await expect(status).toHaveAttribute("aria-live", "polite");
  await expect(status).toBeEmpty();
  await submit.click();
  expect(await email.evaluate((element: HTMLInputElement) => element.validity.valueMissing)).toBe(true);
  await expect(email).toBeFocused();
  await expect(status).toBeEmpty();
  await email.fill("not-an-email");
  await submit.click();
  expect(await email.evaluate((element: HTMLInputElement) => element.validity.typeMismatch)).toBe(true);
  await expect(email).toHaveValue("not-an-email");
  await expect(status).toBeEmpty();
  await email.fill("pessoa@example.com");
  await submit.click();
  await expect(email).toHaveValue("");
  await expect(status).toHaveText("Demonstração: nenhum e-mail foi enviado ou armazenado.");
  await expect(status).not.toContainText(/sucesso|inscri[çc][ãa]o confirmada|assinatura confirmada/i);
  await expect(page).toHaveURL(/\/$/);
});

test("menu aberto e modal de cadastro não têm violações automáticas WCAG AA", async ({ page }) => {
  await gotoHome(page);
  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  if (await toggle.isVisible()) {
    await toggle.click();
    const menuResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(menuResults.violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
  }
  const navigation = await openNavigation(page);
  await navigation.getByRole("link", { name: "Entrar", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Como cadastrar" })).toBeVisible();
  const modalResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(modalResults.violations).toEqual([]);
});