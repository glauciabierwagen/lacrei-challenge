# Lacrei Challenge — base de desenvolvimento

Projeto em **Next.js App Router + TypeScript + Styled-Components**. Páginas do Figma: `/` e `/medicos`. A rota `/sobre` foi preservada como demonstração adicional.

## Aplicação publicada

**Acesse na Vercel:** [https://lacrei-challenge-three.vercel.app/](https://lacrei-challenge-three.vercel.app/)

- [Home](https://lacrei-challenge-three.vercel.app/)
- [Médicos](https://lacrei-challenge-three.vercel.app/medicos)

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
- Cabeçalho e rodapé compartilhados entre Home, Médicos e a demonstração adicional.
- Alternância PT/EN na Home, em Médicos, no cabeçalho e no rodapé. Apenas o conteúdo da rota adicional `/sobre` permanece em português.
- Diálogo nativo de orientações de cadastro, com foco contido e retorno ao acionador.
- Newsletter validada no navegador; o status informa explicitamente que não envia nem armazena dados.
- Os textos Lorem Ipsum e as imagens repetidas de parceiros foram mantidos conforme o arquivo fornecido; não foram inventados dados de impacto ou marcos históricos.
- O frame fornecido é desktop; a adaptação mobile foi derivada de sua hierarquia e testada de 320 a 1440 px, não reproduz um frame mobile específico.
- Verde de botões escurecido para contraste com branco; destaque do hero clareado e textos sobre fotos receberam fundo mais opaco por acessibilidade.

Assets originais foram baixados localmente. Por decisão de tipografia do projeto, todos os textos usam **Nunito**, exceto as chamadas manuscritas, que mantêm **TrashHand**. Nunito é distribuída por `@fontsource`, com licença no respectivo pacote; TrashHand foi obtida de https://fonts.cdnfonts.com/s/441/TrashHand.woff. Revisar a autorização de uso das fotos, marcas e fontes antes do deploy público.

## Escolhas e justificativas visuais e técnicas

| Decisão | Justificativa |
| --- | --- |
| Hierarquia, fotos e composição orientadas pelos dois frames do Figma | Preservar a identidade visual e a relação entre as páginas, sem substituir assets por imagens genéricas. |
| Nunito nos textos e TrashHand nas chamadas manuscritas | Padronização solicitada para melhorar a consistência de leitura, mantendo o contraste expressivo das chamadas. |
| Ajustes de verde, destaque do hero e fundos de texto sobre fotos | Priorizar contraste e legibilidade sem abandonar a paleta do design. A fidelidade visual não deve impedir o atendimento à acessibilidade. |
| Mobile-first, Grid/Flex e medidas fluidas | Adaptar a hierarquia desktop a telas menores, sem depender de larguras fixas que causem overflow; validar de 320 a 1440 px. |
| Banners sem autoplay e respeito a movimento reduzido | Evitar troca inesperada de conteúdo e permitir que cada pessoa controle a leitura. |
| HTML semântico, foco visível, botões nativos e diálogo modal nativo | Favorecer teclado e tecnologias assistivas, reduzindo a necessidade de recriar comportamentos nativos com ARIA. |
| Next.js App Router e TypeScript | Organizar rotas e metadados, obter pré-renderização e detectar incompatibilidades de tipos antes do deploy. |
| Styled-Components com tema e registry de SSR | Centralizar decisões visuais e inserir os estilos durante a renderização no servidor, evitando depender apenas da aplicação de CSS após a hidratação. |
| Fontes e assets locais, `next/image`, dimensões e `sizes` | Evitar dependências externas em runtime, reduzir mudanças de layout e permitir otimização das imagens. A imagem principal recebe prioridade; as demais mantêm lazy loading. |
| Vitest/Testing Library, Playwright e axe | Combinar testes isolados de componentes com verificação de navegação, responsividade e acessibilidade no navegador real. |
| Metas automatizadas de Lighthouse e pipeline de qualidade | Detectar regressões; as notas são medições de uma versão e ambiente, não uma certificação permanente. |
| Cadastro e newsletter explicitamente demonstrativos | Não simular integrações inexistentes nem coletar dados pessoais sem infraestrutura, finalidade e política adequadas. |

**Limites conhecidos:** textos Lorem Ipsum, nomes e imagens repetidos permanecem conforme o Figma. Ainda são necessárias revisão editorial, validação manual com leitor de tela e auditoria da URL pública. A adaptação mobile foi derivada dos frames desktop disponíveis.

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
| `npm run lighthouse` | Auditoria de `/`, `/medicos` e `/sobre`; exige build pronto e Chrome/Chromium |

Antes do primeiro E2E, instalar o navegador com `npx playwright install chromium` e gerar o build. O Playwright inicia e encerra o servidor automaticamente. São verificados 320, 375, 768, 1024 e 1440 px, o atalho para o conteúdo, navegação e acordeão.

Há testes para **quatro componentes**: link-botão, Header, Footer e Accordion. Cobrem semântica, destinos, estado expandido, teclado, Escape, retorno do foco e verificações com axe. A cobertura declarada refere-se a esses componentes, não à aplicação inteira.

O [pipeline](.github/workflows/quality.yml) executa verificações, E2E e Lighthouse. Os relatórios são guardados como artefatos, sem publicação externa automática.

### Registro mais recente — 17/11/2026

Validação realizada após implementar Médicos e padronizar a tipografia em Nunito e TrashHand:

| Verificação | Resultado registrado | Abrangência |
| --- | --- | --- |
| `npm run check` | Aprovado | ESLint, tipos, testes com cobertura e build de produção. |
| Testes unitários | 57 aprovados em seis arquivos | Header, Footer, link-botão, acordeão e interações das views Home/Médicos. |
| Cobertura | 100% de linhas, instruções, funções e branches nos quatro componentes selecionados | Não representa cobertura de toda a aplicação nem certificação de acessibilidade. |
| Testes E2E | 38 aprovados | Chromium desktop/mobile, rotas, links de equipe, idiomas, banners, mapa, linha do tempo, diálogo, newsletter, teclado e recarregamento direto. |
| Responsividade | Sem overflow nos cenários automatizados | Larguras de 320, 375, 768, 1024 e 1440 px. |
| axe | Sem violações detectadas nos estados auditados | Verificações automatizadas WCAG A/AA, incluindo estados abertos de menu e diálogo. |
| Lighthouse no deploy público | Executado em 17/11/2026 | Três medições mobile por página; Performance mediana 89 na Home e 93 em Médicos; Acessibilidade 100 em todas. Uma execução da Home ficou em 76. |
| NVDA/VoiceOver | Pendente — não executado | NVDA não encontrado nos locais e registros verificados; sem acesso à interface/fala do leitor nesta sessão. [Roteiro e registro pendente](docs/screen-reader-review.md). |

Para reproduzir, instalar as dependências, executar `npm run check`, instalar o navegador com `npx playwright install chromium` e executar `npm run test:e2e`. O build precisa estar atualizado; encerrar qualquer servidor antigo para evitar testar outra versão. Os testes E2E não incluem Safari/WebKit ou Firefox.

Os relatórios de cobertura HTML/LCOV são gerados na pasta de cobertura; o relatório HTML do Playwright, na pasta de relatórios de navegador; o Lighthouse produz seus relatórios na pasta de auditorias. Essas saídas são ignoradas pelo Git e disponibilizadas como artefatos pelo pipeline quando ele é executado no GitHub. Este registro corresponde à execução local, não comprova uma execução do workflow na nuvem.

### Lighthouse na Vercel — 17/11/2026

Auditoria feita diretamente no domínio público, com **Lighthouse 13.6.0**, **Chromium 159**, emulação **mobile**, throttling simulado e perfil novo do navegador em cada execução. O cache da CDN/Vercel não é controlado pela coleta. Foram auditadas as categorias Performance e Acessibilidade; não se afirma aprovação de categorias não executadas.

| Página | Performance (3 execuções) | Mediana | Acessibilidade (3 execuções) | Contraste |
| --- | --- | --- | --- | --- |
| [Home](https://lacrei-challenge-three.vercel.app/) | 89 / 96 / 76 | **89** | 100 / 100 / 100 | Aprovado nas três |
| [Médicos](https://lacrei-challenge-three.vercel.app/medicos) | 97 / 80 / 93 | **93** | 100 / 100 / 100 | Aprovado nas três |

**As medianas atendem às metas configuradas**, mas a Home não atingiu Performance 80 em todas as execuções. A medição de 76 permanece registrada; se o critério de avaliação exigir mínimo de 80 por execução, ainda há uma pendência de estabilidade de performance. Não foi confirmado o commit/deployment ID servido pelo domínio; os resultados representam o conteúdo entregue durante a coleta, não qualquer alteração futura.

Os [seis relatórios HTML/JSON e o resumo](docs/audits/2026-11-17-vercel/README.md) foram preservados para consulta. A coleta pode ser repetida com `node scripts/audit-public.mjs`, após instalar as dependências e disponibilizar Chrome/Chromium (ou definir `CHROME_PATH`). O script não inicia o servidor local e uma nova execução no mesmo dia sobrescreve os relatórios daquela data.

### Histórico de auditorias

As próximas seções preservam resultados anteriores para rastreabilidade. **Não usar essas notas como medição da versão final ou da Vercel.**

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
- Lighthouse mobile local, três execuções por rota: Home Performance **67/90/91**, mediana **90**; demonstração `/sobre` **100/100/100**, mediana **100**. A primeira execução da Home, com cache frio, ficou abaixo de 80; a meta configurada usa a mediana, não todas as execuções. Essa auditoria ainda não incluía `/medicos`.
- Acessibilidade **100** e contraste aprovado em todas as execuções.

Não cobrem navegadores não testados, leitor de tela manual ou URL pública. Revalidar após alterações e no deploy. A execução fria da Home ainda merece otimização adicional antes da publicação final.

## Acessibilidade

- HTML semântico, landmarks e hierarquia de títulos.
- Link para pular ao conteúdo, foco visível e alvos de toque de pelo menos 48 px.
- Botões nativos para ações e links para navegação.
- `aria-expanded`, `aria-controls`, `aria-current` e painéis nomeados apenas quando necessários.
- Respeito a movimento reduzido e imagens decorativas com `alt=""`.
- axe no navegador verifica WCAG A/AA e contraste; o Lighthouse exige acessibilidade ≥90 e aprovação específica de contraste.

**Teste manual de leitor de tela ainda necessário.** Em 17/11/2026, não foi encontrado NVDA instalado/em execução nos locais e registros verificados. VoiceOver não está disponível neste Windows, e as ferramentas desta sessão não permitem operar a interface nativa nem avaliar a fala de um leitor. Portanto, essa revisão **não foi executada nem aprovada**. O [roteiro completo e a ficha de resultados](docs/screen-reader-review.md) estão preparados para execução com NVDA + Firefox/Chrome no Windows ou VoiceOver + Safari no macOS/iOS:

1. Percorrer landmarks e títulos; confirmar um conteúdo principal e um `h1` por página.
2. Usar Tab/Shift+Tab; confirmar ordem lógica e foco sempre visível.
3. Acionar o link de pular ao conteúdo.
4. No mobile, abrir o menu; ouvir seu estado, navegar pelos links, usar Escape e confirmar retorno do foco.
5. No acordeão, usar Enter/Espaço; ouvir expandido/recolhido e ler a resposta apenas quando aberta.
6. Conferir zoom de 200% e 400%, orientação paisagem e ausência de conteúdo cortado.

Registrar navegador, leitor, versões, data e problemas encontrados. Testes automatizados não substituem essa revisão.

## Performance e assets

- As rotas `/`, `/medicos` e `/sobre` são pré-renderizadas no build e o Next.js divide o JavaScript por rota.
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
4. Manter a **Output Directory** padrão do preset e conferir a branch de produção configurada, normalmente `main`. Não são necessárias variáveis de ambiente na implementação atual.
5. Fazer o deploy e conferir `/` e `/medicos` na URL pública, incluindo acesso direto e recarregamento; verificar também `/sobre` se essa rota adicional continuar publicada.
6. Reexecutar Lighthouse e a revisão com leitor de tela na URL final. O workflow de qualidade não constitui, sozinho, bloqueio automático do deploy da Vercel: configurar as proteções/checks necessários antes de adotar esse fluxo em produção.
7. Registrar a URL pública, o commit e o deployment aprovado. Guardar a referência da versão estável para recuperação.

**URL pública informada:** [lacrei-challenge-three.vercel.app](https://lacrei-challenge-three.vercel.app/). O deploy não foi realizado automaticamente pelo assistente; sua gestão exige acesso à conta e ao repositório do responsável. O protótipo usa `robots: noindex`; revisar metadados, identidade, conteúdo provisório e essa opção antes de publicar uma versão final indexável.

## Proposta de rollback simples e funcional

**Situação atual:** procedimento documentado, ainda não executado na Vercel. Para um rollback real, são necessários acesso autorizado ao projeto e um deployment anterior estável disponível. O primeiro deploy, isoladamente, não oferece uma versão anterior para restaurar.

### 1. Prevenção com Preview Deployments

1. Criar uma branch para a alteração e abrir um pull request, sem alterar diretamente a branch de produção.
2. Com a integração GitHub/Vercel habilitada, acessar a URL de **Preview** correspondente ao commit e aguardar os checks de qualidade.
3. Na Preview, validar Home, Médicos, navegação pelos três pontos de entrada, idiomas, menu mobile, teclado, diálogo e newsletter demonstrativa. Conferir console, imagens e layout mobile.
4. Aprovar e integrar o pull request somente após a validação. Confirmar também o deployment de produção: ambientes e builds podem diferir.
5. Registrar o commit, a URL e o ID do deployment estável. Não excluir essa versão antes de encerrar a validação da próxima entrega; conferir as políticas de retenção do plano.

Preview é uma proteção antes da publicação, **não um rollback automático**. Uma Preview que nunca recebeu tráfego de produção não é um alvo elegível de Instant Rollback. A opção **Promote to Production** é outro fluxo e pode gerar um rebuild com as variáveis de produção.

### 2. Restaurar rapidamente uma versão anterior na Vercel

Usar este caminho quando uma alteração publicada quebrar navegação, carregamento, layout ou uma interação essencial:

1. Identificar e registrar o deployment com problema e o último deployment de produção comprovadamente estável, usando o commit e a data.
2. No painel da Vercel, abrir o projeto e selecionar **Instant Rollback** no cartão de produção. Alternativamente, acessar **Deployments → ⋮ → Instant Rollback** quando a opção estiver disponível.
3. Selecionar o deployment anterior elegível, conferir os domínios envolvidos e avançar em **Continue**.
4. Revisar o resumo e selecionar **Confirm Rollback**. A Vercel redireciona os domínios de produção ao build existente, sem recompilar o projeto.
5. Aguardar a confirmação e validar o domínio de produção, não apenas a URL imutável do deployment antigo.

**Limites do plano:** na documentação consultada, Hobby permite retornar ao deployment imediatamente anterior; Pro/Enterprise permitem escolher outros deployments elegíveis. Disponibilidade, permissões e retenção precisam ser conferidas na conta utilizada. Se a versão desejada não estiver disponível, seguir a recuperação via Git abaixo.

### 3. Checklist de verificação após o rollback

- Confirmar no painel que o domínio aponta para o deployment/commit esperado.
- Abrir `/` e `/medicos` diretamente e recarregar ambas, preferencialmente também em janela privada para reduzir interferência do cache local.
- Testar **Médicos** na navbar e os dois links **Conheça nosso time**, além do retorno ao início.
- Conferir menu mobile, troca de idioma, banners, diálogo de cadastro e validação da newsletter.
- Verificar se imagens e fontes carregam e se não há erros novos no console.
- Reavaliar acessibilidade e desempenho quando o incidente envolver essas áreas.
- Registrar responsável, motivo, horário, deployment de origem, deployment restaurado e resultado dos testes. Não registrar credenciais ou dados pessoais.

### 4. Corrigir o Git e retomar publicações

O rollback da plataforma **não reverte o código do repositório**. Para evitar republicar a regressão:

1. Abrir uma branch de correção a partir da branch de produção e desfazer a alteração problemática por um **commit de reversão (`git revert`)**, preservando o histórico. Se for um merge, revisar qual alteração deve ser revertida; não escolher parâmetros de merge sem verificar os pais.
2. Alternativamente, implementar uma correção direta em novo commit quando reverter prejudicaria outras alterações válidas.
3. Executar `npm run check` e `npm run test:e2e`, revisar a Preview e integrar o pull request aprovado. Evitar `reset --hard` e force push na branch compartilhada.
4. **Após Instant Rollback, a Vercel desativa a atribuição automática dos domínios de produção.** Um novo push pode gerar um deployment sem substituir a versão restaurada. Conferir esse estado em vez de presumir que o push já foi publicado.
5. No cartão de produção, usar **Manage**, selecionar o deployment corrigido adequado e confirmar a promoção para desfazer o estado de rollback e reativar a atribuição automática. Validar o resumo, o commit e o domínio antes de confirmar.
6. Repetir o checklist no domínio público e registrar o encerramento do incidente.

Se não houver um build anterior elegível, o commit de reversão também serve como alternativa de recuperação: gerar um novo build do código restaurado e publicá-lo pelo fluxo normal. Esse caminho depende do tempo de build, não é uma restauração instantânea. Se o projeto já estiver em estado de rollback, ainda é necessário gerenciar a promoção conforme o passo anterior.

### 5. Limitações e ensaio do procedimento

- Instant Rollback reaproveita o build e sua configuração anterior; não recompila com alterações recentes de variáveis de ambiente. Conferir compatibilidade de configuração e serviços externos.
- Reverter o frontend não restaura bancos de dados, conteúdo de CMS, APIs externas ou dados já enviados. O projeto atual não possui banco, cadastro nem envio de newsletter; integrações futuras exigirão um plano próprio para dados e migrações.
- Testar o procedimento primeiro em um projeto de homologação: publicar uma versão A conhecida, publicar uma versão B identificável, voltar para A, conferir as rotas e depois promover uma versão corrigida. Registrar evidências e tempo de recuperação observado, sem prometer um prazo que ainda não foi medido.
- Não simular incidentes nem executar rollback na produção real sem autorização. Esta documentação não afirma que o ensaio já ocorreu.

Referências oficiais: [Instant Rollback](https://vercel.com/docs/instant-rollback) e [promoção de deployments](https://vercel.com/docs/deployments/promoting-a-deployment), consultadas em 17/11/2026. A interface e as condições dos planos podem mudar.
