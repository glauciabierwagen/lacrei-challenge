# Lacrei Challenge — base de desenvolvimento

Projeto em **Next.js App Router + TypeScript + Styled-Components**. Páginas do Figma: `/` e `/medicos`. A rota `/sobre` foi preservada como demonstração adicional.

## Aplicação publicada

**Acesse na Vercel:** [https://lacrei-challenge-three.vercel.app/](https://lacrei-challenge-three.vercel.app/)

- [Deploy público do Vercel](https://github.com/glauciabierwagen/lacrei-challenge#deploy-p%C3%BAblico-na-vercel)
- [Home](https://lacrei-challenge-three.vercel.app/)
- [Profissionais](https://lacrei-challenge-three.vercel.app/medicos)

URL pública informada pelo responsável pelo projeto. Auditoria Lighthouse pública registrada em 17/11/2026; veja os [relatórios completos](docs/audits/2026-11-17-vercel/README.md). Os testes locais e o Lighthouse não substituem a revisão manual com leitor de tela.

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
- Cabeçalho e rodapé compartilhados entre Home, Profissionais.
- Alternância PT/EN na Home, em Médicos, no cabeçalho e no rodapé. 
- Newsletter validada no navegador; o status informa explicitamente que não envia nem armazena dados.
- O frame fornecido é desktop; a adaptação mobile foi derivada de sua hierarquia e testada de 320 a 1440 px, não reproduz um frame mobile específico.
- [Trabalhar com o Figma MCP](https://github.com/glauciabierwagen/lacrei-challenge#trabalhar-com-o-figma-mcp).

Assets originais foram baixados localmente. Por decisão de tipografia do projeto, todos os textos usam **Nunito**, exceto as chamadas manuscritas, que mantêm **TrashHand**. Nunito é distribuída por `@fontsource`, com licença no respectivo pacote; TrashHand foi obtida de https://fonts.cdnfonts.com/s/441/TrashHand.woff. Revisar a autorização de uso das fotos, marcas e fontes antes do deploy público.

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

**Limites conhecidos:** a execução documentada com NVDA e VoiceOver permanece pendente; consulte o [relatório NVDA](docs/relatorio-nvda.md) e o [roteiro de revisão](docs/screen-reader-review.md). O [Lighthouse público de 17/11/2026](docs/audits/2026-11-17-vercel/README.md) é um registro histórico. Antes de uma publicação final, revisar conteúdo, metadados e autorizações de uso das imagens, marcas e fontes.

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
| [src/app/medicos/page.tsx](src/app/medicos/page.tsx) | Entrada da página Médicos |
| [src/app/sobre/page.tsx](src/app/sobre/page.tsx) | Entrada da demonstração adicional |
| [src/features/home/home-view.tsx](src/features/home/home-view.tsx) | Composição visual da primeira página |
| [src/features/doctors/doctors-view.tsx](src/features/doctors/doctors-view.tsx) | Composição visual de Médicos |
| [src/features/about/about-view.tsx](src/features/about/about-view.tsx) | Composição da demonstração adicional |
| [src/components/layout/header.tsx](src/components/layout/header.tsx) | Navegação responsiva compartilhada |
| [src/components/layout/footer.tsx](src/components/layout/footer.tsx) | Rodapé compartilhado |
| [src/components/ui/button-link.tsx](src/components/ui/button-link.tsx) | Link de navegação com aparência de botão |
| [src/components/ui/accordion.tsx](src/components/ui/accordion.tsx) | Conteúdo interativo acessível |
| [src/styles/theme.ts](src/styles/theme.ts) | Tokens de cores, espaçamentos, tipografia e breakpoints |
| [src/styles/registry.tsx](src/styles/registry.tsx) | Coleta de estilos no SSR e streaming |
| [src/test/render.tsx](src/test/render.tsx) | Renderização com tema para testes |
| [e2e/pages.spec.ts](e2e/pages.spec.ts) | Navegação, WCAG automatizada e responsividade |

Rotas e layout permanecem Server Components; componentes que usam Styled-Components ou estado são Client Components. Novos estilos devem usar tokens e propriedades transitórias como `$variant`, sem enviar props de estilo para o DOM.

## Qualidade e testes

Os comandos principais são `npm run check` (lint, tipos, cobertura e build), `npm run test:e2e` (Playwright em Chromium desktop/mobile) e `npm run lighthouse` (build pronto e Chrome/Chromium). Use `npm test`, `npm run test:watch` ou `npm run test:coverage` para testes unitários. Para o primeiro E2E, instale o navegador com `npx playwright install chromium`.

A cobertura mínima de 80% vale apenas para quatro componentes compartilhados, não para toda a aplicação. Os E2E cobrem as larguras de 320 a 1440 px; Safari/WebKit e Firefox não fazem parte da configuração atual. O [pipeline](.github/workflows/quality.yml) guarda relatórios como artefatos e não publica automaticamente.

### Baseline registrado — 17/11/2026

Naquela execução, `npm run check` passou; foram registrados 57 testes unitários e 38 E2E aprovados, 100% de cobertura nos quatro componentes selecionados e nenhuma violação axe nos estados auditados. Esses números são históricos e não substituem uma nova execução após mudanças.

No Lighthouse mobile da Vercel, a Home marcou 89/96/76 (mediana 89) e `/medicos` 97/80/93 (mediana 93); Acessibilidade foi 100 nas três execuções de cada rota. Uma execução da Home ficou abaixo da meta de Performance 80. Os [seis relatórios e o resumo](docs/audits/2026-11-17-vercel/README.md) preservam os detalhes; o deploy testado não teve commit confirmado.

**Leitor de tela:** consulte o [relatório NVDA](docs/relatorio-nvda.md) e o [roteiro de validação](docs/screen-reader-review.md), que registra a situação em 17/11/2026. A execução documentada com NVDA e VoiceOver segue pendente. Os resultados automatizados e Lighthouse são registros datados, não certificação permanente.

## Acessibilidade e desempenho

- HTML semântico, landmarks, link para pular ao conteúdo, foco visível, alvos de toque ≥48 px e suporte a teclado e movimento reduzido.
- axe verifica WCAG A/AA automaticamente; consulte o [relatório NVDA](docs/relatorio-nvda.md) e o [roteiro de revisão manual](docs/screen-reader-review.md). A execução documentada com NVDA e VoiceOver segue pendente.
- Rotas pré-renderizadas, fontes locais e `next/image`; o hero é priorizado e as imagens abaixo da dobra mantêm lazy loading.
- [Lighthouse](lighthouserc.cjs) mede `/`, `/medicos` e `/sobre` em mobile, com metas de Performance ≥x`; revisar metadados, identidade, conteúdo provisório e essa opção antes de publicar uma versão final indexável.
- [Relatório NVDA](docs/relatorio-nvda.md)


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
