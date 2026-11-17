# Lacrei Challenge — base de desenvolvimento

Projeto em **Next.js App Router + TypeScript + Styled-Components**. Páginas do Figma: `/` e `/medicos`. A rota `/sobre` foi preservada como demonstração adicional.

## Página Médicos e navegação

A rota `/medicos` implementa o [frame Médicos](https://www.figma.com/design/rvDbI6SujvrVj71ldR4c8I/LacreiChallenge?node-id=6-644): hero, missão, depoimentos, grade de nove profissionais, parceiros e rodapé compartilhado.

- O item **Médicos** da navbar aponta para `/medicos`, com identificação de página atual.
- Os dois botões **Conheça nosso time** da Home apontam para essa mesma rota, em PT e EN.
- Os links são internos: abrem a página implementada, não o editor do Figma.
- Cadastros continuam demonstrativos; os CTAs abrem as orientações já existentes na Home.
- Nomes repetidos e textos Lorem Ipsum foram mantidos conforme o frame; não representam uma lista verificada de profissionais disponíveis.
- Validação desta integração: **57 testes unitários**, **38 testes E2E** desktop/mobile, lint, tipos e build aprovados. Os testes cobrem os três pontos de entrada, recarregamento direto de `/medicos`, idiomas, contraste automatizado, teclado e ausência de overflow de 320 a 1440 px.

**Home implementada a partir do [frame Home do Figma](https://www.figma.com/design/rvDbI6SujvrVj71ldR4c8I/LacreiChallenge?node-id=1-476).** A rota `/sobre` continua demonstrativa, aguardando seu próprio frame. Não há cadastro, agendamento ou envio real de newsletter.

## Home baseada no Figma

- Hero com foto original, navegação sobreposta e três mensagens selecionáveis, sem autoplay.
- Seção Nosso Propósito, mapa com países selecionáveis, linha do tempo rolável e parceiros.
- Cabeçalho e rodapé compartilhados adaptados ao frame; a segunda página ainda não foi redesenhada.
- Alternância PT/EN na Home, cabeçalho e rodapé. O conteúdo da segunda página permanece em português.
- Diálogo nativo de orientações de cadastro, com foco contido e retorno ao acionador.
- Newsletter validada no navegador; o status informa explicitamente que não envia nem armazena dados.
- Os textos Lorem Ipsum e as imagens repetidas de parceiros foram mantidos conforme o arquivo fornecido; não foram inventados dados de impacto ou marcos históricos.
- O frame fornecido é desktop; a adaptação mobile foi derivada de sua hierarquia e testada de 320 a 1440 px, não reproduz um frame mobile específico.
- Verde de botões escurecido para contraste com branco; destaque do hero clareado e textos sobre fotos receberam fundo mais opaco por acessibilidade.

Assets originais foram baixados localmente. Por decisão de tipografia do projeto, todos os textos usam **Nunito**, exceto as chamadas manuscritas, que mantêm **TrashHand**. Nunito é distribuída por `@fontsource`, com licença no respectivo pacote; TrashHand foi obtida de https://fonts.cdnfonts.com/s/441/TrashHand.woff. Revisar a autorização de uso das fotos, marcas e fontes antes do deploy público.

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
| [src/app/layout.tsx](src/app/layout.tsx) | Idioma, metadados, skip link e estrutura compartilhada |
| [src/app/page.tsx](src/app/page.tsx) | Entrada da página inicial |
| [src/app/sobre/page.tsx](src/app/sobre/page.tsx) | Entrada da segunda página |
| [src/features/home/home-view.tsx](src/features/home/home-view.tsx) | Composição visual da primeira página |
| [src/features/about/about-view.tsx](src/features/about/about-view.tsx) | Composição visual da segunda página |
| [src/components/layout/header.tsx](src/components/layout/header.tsx) | Navegação responsiva compartilhada |
| [src/components/layout/footer.tsx](src/components/layout/footer.tsx) | Rodapé compartilhado |
| [src/components/ui/button-link.tsx](src/components/ui/button-link.tsx) | Link de navegação com aparência de botão |
| [src/components/ui/accordion.tsx](src/components/ui/accordion.tsx) | Conteúdo interativo acessível |
| [src/styles/theme.ts](src/styles/theme.ts) | Tokens de cores, espaçamentos, tipografia e breakpoints |
| [src/styles/registry.tsx](src/styles/registry.tsx) | Coleta de estilos no SSR e streaming |
| [src/test/render.tsx](src/test/render.tsx) | Renderização com tema para testes |
| [e2e/pages.spec.ts](e2e/pages.spec.ts) | Navegação, WCAG automatizada e responsividade |

Rotas e layout permanecem Server Components; componentes que usam Styled-Components ou estado são Client Components. Novos estilos devem usar tokens e propriedades transitórias como `$variant`, sem enviar props de estilo para o DOM.

## Trabalhar com o Figma MCP

A conexão remota oficial está preparada em [.vscode/mcp.json](.vscode/mcp.json).

1. No VS Code, abrir a paleta e procurar **MCP: List Servers**, selecionar `figma` e iniciar.
2. Autorizar a conexão diretamente na tela de autenticação do Figma. Não colocar tokens neste repositório ou no chat.
3. Disponibilizar o link de cada um dos dois frames, com o respectivo `node-id`, e seus equivalentes mobile/desktop quando existirem.
4. Solicitar a leitura do contexto de design e das capturas dos frames antes de implementar. Substituir os tokens, conteúdo e assets demonstrativos, preservando a semântica e os testes.
5. Conferir os estados de hover, foco, expansão, navegação e comportamento entre breakpoints; não apenas a captura estática.

O acesso ao arquivo e a leitura do frame Home foram confirmados via Figma MCP nesta sessão. A autenticação continua dependendo da conta e do ambiente de cada pessoa.

## Qualidade e testes

| Comando | Resultado |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run typecheck` | Gera tipos das rotas e verifica TypeScript |
| `npm test` | Testes unitários |
| `npm run test:watch` | Testes em modo interativo |
| `npm run test:coverage` | Cobertura; mínimo de 80% por componente selecionado |
| `npm run check` | Lint + tipos + cobertura + build |
| `npm run test:e2e` | Chromium desktop/mobile contra o build de produção |
| `npm run lighthouse` | Auditoria das duas páginas; exige build pronto e Chrome/Chromium |

Antes do primeiro E2E, instalar o navegador com `npx playwright install chromium` e gerar o build. O Playwright inicia e encerra o servidor automaticamente. São verificados 320, 375, 768, 1024 e 1440 px, o atalho para o conteúdo, navegação e acordeão.

Há testes para **quatro componentes**: link-botão, Header, Footer e Accordion. Cobrem semântica, destinos, estado expandido, teclado, Escape, retorno do foco e verificações com axe. A cobertura declarada refere-se a esses componentes, não à aplicação inteira.

O [pipeline](.github/workflows/quality.yml) executa verificações, E2E e Lighthouse. Os relatórios são guardados como artefatos, sem publicação externa automática.

### Validação inicial — 17/11/2026

- Lint, TypeScript e build de produção: aprovados.
- 27 testes unitários: aprovados; 100% de cobertura nos quatro componentes selecionados.
- 12 testes E2E Chromium: aprovados nos perfis desktop e mobile; nenhuma violação automática WCAG A/AA detectada nos estados auditados.
- Lighthouse mobile local, três execuções por rota:

| Rota | Performance (mediana) | Acessibilidade | Contraste |
| --- | --- | --- | --- |
| `/` | 98 | 100 | Aprovado |
| `/sobre` | 99 | 100 | Aprovado |

Os resultados acima pertencem à base demonstrativa anterior à implementação do Figma.

### Validação após integração da Home — 17/11/2026

- 50 testes unitários em cinco arquivos: aprovados; 100% de cobertura nos quatro componentes compartilhados selecionados. A Home tem testes adicionais, mas não integra esse percentual.
- 26 testes E2E: aprovados em desktop/mobile, incluindo menu, idiomas, mapa, banners, rolagem, diálogo, newsletter e verificações axe em estados abertos.
- Lint, TypeScript e build de produção: aprovados.
- Lighthouse mobile local, três execuções por rota: Home Performance **67/90/91**, mediana **90**; segunda página **100/100/100**, mediana **100**. A primeira execução da Home, com cache frio, ficou abaixo de 80; a meta configurada usa a mediana, não todas as execuções.
- Acessibilidade **100** e contraste aprovado em todas as execuções.

Não cobrem navegadores não testados, leitor de tela manual ou URL pública. Revalidar após alterações e no deploy. A execução fria da Home ainda merece otimização adicional antes da publicação final.

## Acessibilidade

- HTML semântico, landmarks e hierarquia de títulos.
- Link para pular ao conteúdo, foco visível e alvos de toque de pelo menos 48 px.
- Botões nativos para ações e links para navegação.
- `aria-expanded`, `aria-controls`, `aria-current` e painéis nomeados apenas quando necessários.
- Respeito a movimento reduzido e imagens decorativas com `alt=""`.
- axe no navegador verifica WCAG A/AA e contraste; o Lighthouse exige acessibilidade ≥90 e aprovação específica de contraste.

**Teste manual de leitor de tela ainda necessário**, preferencialmente com NVDA + Firefox/Chrome no Windows ou VoiceOver + Safari no macOS/iOS:

1. Percorrer landmarks e títulos; confirmar um conteúdo principal e um `h1` por página.
2. Usar Tab/Shift+Tab; confirmar ordem lógica e foco sempre visível.
3. Acionar o link de pular ao conteúdo.
4. No mobile, abrir o menu; ouvir seu estado, navegar pelos links, usar Escape e confirmar retorno do foco.
5. No acordeão, usar Enter/Espaço; ouvir expandido/recolhido e ler a resposta apenas quando aberta.
6. Conferir zoom de 200% e 400%, orientação paisagem e ausência de conteúdo cortado.

Registrar navegador, leitor, versões, data e problemas encontrados. Testes automatizados não substituem essa revisão.

## Performance e assets

- As duas rotas são pré-renderizadas no build e o Next.js divide o JavaScript por rota.
- Fontes Nunito e TrashHand são servidas localmente; não há request de fontes a provedores externos em runtime.
- Usar `next/image` com dimensões e `sizes` adequados; imagens abaixo da dobra devem manter o lazy loading padrão.
- A imagem do hero tem `preload` intencional: aplicar lazy load à imagem principal prejudicaria o LCP. Imagens das demais seções mantêm carregamento adiado.
- Para futuras seções pesadas fora da dobra, usar importação dinâmica quando houver benefício medido, sem atrasar conteúdo essencial ou acessível.
- Auditar após integrar assets do Figma; não adicionar bibliotecas inteiras de ícones para poucos elementos.

[lighthouserc.cjs](lighthouserc.cjs) faz três medições mobile por rota e valida a mediana: **Performance ≥80**, **Acessibilidade ≥90** e contraste aprovado. Relatórios locais ficam na pasta ignorada de relatórios Lighthouse. No Windows, se Chrome não for detectado, definir `CHROME_PATH` para o executável instalado. As metas precisam ser medidas novamente no deploy final; não são garantia permanente.

## Deploy público na Vercel

1. Publicar este repositório na sua conta GitHub.
2. Na Vercel, escolher **Add New → Project** e importar o repositório.
3. Usar o preset **Next.js**, raiz do repositório, Node.js **24.x**, instalação `npm ci` e build `npm run build`.
4. Fazer o deploy e conferir `/` e `/sobre` na URL pública, incluindo acesso direto e recarregamento.
5. Reexecutar Lighthouse e a revisão com leitor de tela na URL final, após integração com Figma.
6. Substituir este trecho pela URL pública e pelo registro das auditorias quando publicados.

**Nenhum deploy foi realizado automaticamente.** A publicação exige acesso à conta e ao repositório do responsável. O protótipo usa `robots: noindex`; revisar metadados, identidade, conteúdo provisório e essa opção antes de publicar uma versão final indexável.
