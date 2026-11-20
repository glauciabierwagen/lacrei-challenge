# Lacrei Challenge — base de desenvolvimento

Projeto em **Next.js App Router + TypeScript + Styled-Components**. Páginas do Figma: `/` e `/medicos`. A rota `/sobre` foi preservada como demonstração adicional.

## Aplicação publicada

**Acesse na Vercel:** [https://lacrei-challenge-three.vercel.app/](https://lacrei-challenge-three.vercel.app/)

- [Home](https://lacrei-challenge-three.vercel.app/)
- [Profissionais](https://lacrei-challenge-three.vercel.app/medicos)

## Home e Médicos/Profissionais

As páginas são baseadas nos [frames do Figma](https://www.figma.com/design/rvDbI6SujvrVj71ldR4c8I/LacreiChallenge?node-id=0-1&t=ZyXy7snGzwZD9qld-1), com adaptação para dispositivos móveis.

- A Home apresenta Nosso Propósito, mapa interativo e linha do tempo. Os botões **Conheça nosso time** levam à página `/medicos`.
- Médicos/Profissionais reúne Nossa Missão, depoimentos e perfis ilustrativos; o menu **Profissionais** também leva a essa página.
- Ambas compartilham navegação, rodapé, alternância PT/EN e banners selecionáveis sem reprodução automática. Os links de atendimento direcionam às plataformas oficiais.
- A aplicação é demonstrativa: não realiza cadastro ou agendamento, a newsletter não envia nem armazena dados e o mapa não apresenta métricas de impacto. A seção de parceiros usa ilustrações genéricas; veja as [fontes e licenças](docs/partner-assets.md).
- [Trabalhar com o Figma MCP](https://github.com/glauciabierwagen/lacrei-challenge#trabalhar-com-o-figma-mcp).

As imagens incluem materiais do [Canva](https://canva.link/x9qpwn8n4h52j37), fotografias do [Pexels](https://www.pexels.com/) e elementos dos frames do Figma. A aplicação também usa duas imagens remotas do site oficial nos cards de pacientes e profissionais da Home. As ilustrações de parceiros são do [SVG Repo](https://www.svgrepo.com/); veja as [fontes e licenças](docs/partner-assets.md). Revisar as autorizações de uso das fotos, marcas e fontes antes de uma publicação final.

Os textos usam **Nunito**, exceto as chamadas manuscritas, que mantêm **TrashHand**. Nunito é distribuída por `@fontsource`, com licença no respectivo pacote; TrashHand foi obtida de https://fonts.cdnfonts.com/s/441/TrashHand.woff.

## Escolhas e justificativas visuais e técnicas

| Decisão | Justificativa |
| --- | --- |
| Composição baseada nos frames Home e Médicos do Figma | Manter a relação visual entre as páginas, com adaptações de conteúdo, imagens e layout para a demonstração. |
| Cards de Inclusão, Acolhimento e Segurança na Home | Separar os três temas de Nosso Propósito, reutilizando a estrutura visual de Nossa Missão em Médicos, com conteúdo e ícones próprios para cada página. |
| Nunito nos textos e TrashHand nas chamadas manuscritas | Manter a consistência de leitura e o contraste visual das chamadas. |
| Cores, destaque do hero e fundos sobre fotos | Favorecer contraste e legibilidade mantendo a paleta do projeto. |
| Grid/Flex, medidas fluidas e breakpoints | Adaptar os frames desktop a telas menores; a versão mobile é uma interpretação do projeto, não a reprodução de um frame mobile fornecido. |
| Banners controlados pela pessoa, sem autoplay | Evitar trocas inesperadas; a linha do tempo também respeita a preferência por movimento reduzido. |
| Links internos para a página de profissionais | Os botões **Conheça nosso time** da Home levam a `/medicos`, enquanto links de atendimento apontam para as plataformas oficiais. |
| Idioma compartilhado PT/EN | Atualizar textos e controles da Home, de Médicos, do cabeçalho e do rodapé; o idioma do documento acompanha a seleção. |
| HTML semântico, foco visível, controles nativos e diálogos | Facilitar a navegação por teclado e tecnologias assistivas; os diálogos informam quando um recurso não está disponível na demonstração. |
| Mapa interativo sem métricas inventadas | Permitir selecionar os países destacados e informar que os dados de impacto ainda não foram disponibilizados. |
| Next.js App Router e TypeScript | Organizar rotas e metadados e verificar tipos antes do deploy; o protótipo está configurado para não ser indexado. |
| Styled-Components com tema e registry de SSR | Compartilhar tokens e estilos e disponibilizá-los na renderização no servidor. |
| Fontes locais, imagens locais e `next/image` | Usar dimensões e `sizes` para apoiar o carregamento responsivo; as imagens principais dos banners são priorizadas. A Home também usa duas imagens remotas do site oficial, sem otimização do Next.js. |
| Ilustrações genéricas na seção de parceiros | Evitar apresentar marcas ou apoios institucionais não verificados; as fontes e licenças estão em [partner-assets.md](docs/partner-assets.md). |
| Vitest/Testing Library, Playwright e axe | Combinar testes de componentes com testes em Chromium desktop/mobile e verificações automatizadas de acessibilidade. A cobertura mínima configurada se aplica a quatro componentes compartilhados. |
| Lighthouse e pipeline de qualidade | Ajudar a detectar regressões de desempenho e acessibilidade; resultados dependem da versão e do ambiente e não substituem revisão manual. |
| Cadastro, perfis, depoimentos e newsletter demonstrativos | Informar os limites do protótipo: não há cadastro ou agendamento na aplicação, os perfis e depoimentos são ilustrativos e a newsletter não envia nem armazena dados. |

## Ambiente e execução

- Instalar Node.js **24 LTS**, com npm. A versão está fixada em [.nvmrc](.nvmrc).
- Instalar dependências com `npm ci`.
- Iniciar com `npm run dev` e acessar http://localhost:3000.
- Produção local: `npm run build`, depois `npm run start`.
- Este repositório não exige variáveis de ambiente nem credenciais.

Na preparação inicial foi usado Node portátil na pasta temporária, porque o Windows não tinha Node no PATH. Isso não configura o runtime permanentemente: instale Node 24 LTS para novos terminais.

## Organização

| Área | Responsabilidade |
| --- | --- |
| [src/app/layout.tsx](src/app/layout.tsx) | Metadados, link para pular ao conteúdo e estrutura compartilhada |
| [src/app/page.tsx](src/app/page.tsx) | Entrada da página inicial |
| [src/app/medicos/page.tsx](src/app/medicos/page.tsx) | Entrada e metadados da página Médicos/Profissionais |
| [src/app/sobre/page.tsx](src/app/sobre/page.tsx) | Entrada e metadados da página Sobre demonstrativa |
| [src/features/home/home-view.tsx](src/features/home/home-view.tsx) e [home.styles.ts](src/features/home/home.styles.ts) | Conteúdo, interações e estilos da Home |
| [src/features/home/purpose-section.tsx](src/features/home/purpose-section.tsx) e [partner-section.tsx](src/features/home/partner-section.tsx) | Seções de propósito/missão e parceiros compartilhadas pela Home e Médicos |
| [src/features/doctors/doctors-view.tsx](src/features/doctors/doctors-view.tsx) e [doctors.styles.ts](src/features/doctors/doctors.styles.ts) | Conteúdo e estilos da página Médicos/Profissionais |
| [src/features/about/about-view.tsx](src/features/about/about-view.tsx) | Conteúdo da página Sobre demonstrativa |
| [src/components/layout/header.tsx](src/components/layout/header.tsx) e [footer.tsx](src/components/layout/footer.tsx) | Navegação, avisos e rodapé com newsletter demonstrativa |
| [src/components/layout/language-context.tsx](src/components/layout/language-context.tsx) | Idioma compartilhado PT/EN e atualização do idioma do documento |
| [src/components/ui/](src/components/ui/) | Componentes e elementos visuais reutilizáveis, incluindo link com aparência de botão e acordeão |
| [src/styles/](src/styles/) | Tema, estilos globais, provedores e integração de Styled-Components com SSR |
| [public/images/](public/images/) e [public/fonts/](public/fonts/) | Imagens, ícones e fontes locais usados pela aplicação |
| [src/test/](src/test/) e arquivos `*.test.tsx` em [src/](src/) | Configuração e testes unitários de componentes e páginas |
| [e2e/pages.spec.ts](e2e/pages.spec.ts) | Testes de navegação, acessibilidade automatizada e responsividade |
| [docs/](docs/) | Relatórios, roteiro de revisão com leitor de tela e documentação de assets |

As rotas e o layout são Server Components; as views e os componentes interativos usam Client Components. Os provedores reúnem tema, estilos globais, registro de SSR e idioma. Novos estilos devem usar tokens e propriedades transitórias como `$variant`, sem enviar props de estilo para o DOM.

## Qualidade e testes

Os comandos principais são `npm run check` (lint, tipos, cobertura e build), `npm run test:e2e` (Playwright em Chromium desktop/mobile) e `npm run lighthouse` (build pronto e Chrome/Chromium). Use `npm test`, `npm run test:watch` ou `npm run test:coverage` para testes unitários. Para o primeiro E2E, instale o navegador com `npx playwright install chromium`.

A cobertura mínima de 80% vale apenas para quatro componentes compartilhados, não para toda a aplicação. Os E2E cobrem as larguras de 320 a 1440 px; Safari/WebKit e Firefox não fazem parte da configuração atual. O [pipeline](.github/workflows/quality.yml) guarda relatórios como artefatos e não publica automaticamente.

## Acessibilidade e desempenho

- HTML semântico, landmarks, link para pular ao conteúdo, foco visível, alvos de toque ≥48 px e suporte a teclado e movimento reduzido.
- axe verifica WCAG A/AA automaticamente; consulte o [relatório NVDA](docs/relatorio-nvda.md) e o [roteiro de revisão manual](docs/screen-reader-review.md). A execução documentada com NVDA e VoiceOver segue pendente.
- Rotas pré-renderizadas, fontes locais e `next/image`; o hero é priorizado e as imagens abaixo da dobra mantêm lazy loading.
- [Lighthouse](lighthouserc.cjs) mede `/`, `/medicos` e `/sobre` em mobile, com metas de Performance ≥x`; revisar metadados, identidade, conteúdo provisório e essa opção antes de publicar uma versão final indexável.
- [Relatório NVDA](docs/relatorio-nvda.md)
[roteiro de revisão](docs/screen-reader-review.md). O [Lighthouse público de 17/11/2026]
Relatório Rollback

### Corrigir o Git e retomar publicações

O rollback da plataforma **não reverte o código do repositório**. Para evitar republicar a regressão:

1. Abrir uma branch de correção a partir da branch de produção e desfazer a alteração problemática por um **commit de reversão (`git revert`)**, preservando o histórico. Se for um merge, revisar qual alteração deve ser revertida; não escolher parâmetros de merge sem verificar os pais.
2. Alternativamente, implementar uma correção direta em novo commit quando reverter prejudicaria outras alterações válidas.
3. Executar `npm run check` e `npm run test:e2e`, revisar a Preview e integrar o pull request aprovado. Evitar `reset --hard` e force push na branch compartilhada.
4. **Após Instant Rollback, a Vercel desativa a atribuição automática dos domínios de produção.** Um novo push pode gerar um deployment sem substituir a versão restaurada. Conferir esse estado em vez de presumir que o push já foi publicado.
5. No cartão de produção, usar **Manage**, selecionar o deployment corrigido adequado e confirmar a promoção para desfazer o estado de rollback e reativar a atribuição automática. Validar o resumo, o commit e o domínio antes de confirmar.
6. Repetir o checklist no domínio público e registrar o encerramento do incidente.

Se não houver um build anterior elegível, o commit de reversão também serve como alternativa de recuperação: gerar um novo build do código restaurado e publicá-lo pelo fluxo normal. Esse caminho depende do tempo de build, não é uma restauração instantânea. Se o projeto já estiver em estado de rollback, ainda é necessário gerenciar a promoção conforme o passo anterior.

### Limitações e ensaio do procedimento

- Instant Rollback reaproveita o build e sua configuração anterior; não recompila com alterações recentes de variáveis de ambiente. Conferir compatibilidade de configuração e serviços externos.
- Reverter o frontend não restaura bancos de dados, conteúdo de CMS, APIs externas ou dados já enviados. O projeto atual não possui banco, cadastro nem envio de newsletter; integrações futuras exigirão um plano próprio para dados e migrações.
- Testar o procedimento primeiro em um projeto de homologação: publicar uma versão A conhecida, publicar uma versão B identificável, voltar para A, conferir as rotas e depois promover uma versão corrigida. Registrar evidências e tempo de recuperação observado, sem prometer um prazo que ainda não foi medido.
- Não executar rollback na produção real sem autorização. A simulação local registrada abaixo não altera a Vercel e não equivale a uma restauração de domínio de produção.
