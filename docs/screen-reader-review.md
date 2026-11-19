# Revisão manual com leitor de tela

## Situação em 17/11/2026

**Pendente — não executada.** O ambiente é Windows; não foi encontrado processo, comando, executável nos caminhos usuais ou registro de instalação do NVDA. Uma instalação portátil em outro local não pode ser descartada. VoiceOver é um recurso dos sistemas Apple e não está disponível neste Windows.

As ferramentas disponíveis nesta sessão não permitem operar a interface nativa do Windows nem ouvir ou inspecionar a fala do leitor de tela. Por isso, não é possível declarar a revisão com NVDA/VoiceOver como realizada. Não foram instalados programas de acessibilidade nem alteradas configurações do computador.

O Lighthouse do deploy foi executado e está registrado [nos relatórios de 17/11/2026](audits/2026-11-17-vercel/README.md), mas **não substitui esta revisão**.

## Preparação pelo responsável

1. Instalar ou iniciar o [NVDA oficial](https://www.nvaccess.org/download/) no Windows e abrir Chrome ou Firefox. Usar o VoiceOver com Safari em macOS/iOS também é válido, mas deve ser registrado como outra combinação.
2. Abrir https://lacrei-challenge-three.vercel.app/, https://lacrei-challenge-three.vercel.app/medicos e https://lacrei-challenge-three.vercel.app/sobre, se a rota estiver publicada. Aguardar o carregamento e manter o idioma inicial em português.
3. Registrar versões do sistema, navegador e leitor, data, URL e, se disponível, o deployment/commit auditado.
4. No NVDA, usar modo de navegação para ler títulos/landmarks e alternar para modo de foco quando necessário nos controles. O modificador NVDA costuma ser Insert ou Caps Lock. No VoiceOver com Safari, usar o Rotor (VO+U) para navegar por títulos e landmarks; interagir com controles usando os comandos padrão do VoiceOver.
5. Se desejar evidência textual, abrir o **Visualizador de fala** no menu de ferramentas do NVDA. Remover informações pessoais de qualquer captura antes de compartilhá-la.

## Roteiro e resultados esperados

Nenhum item abaixo foi marcado como aprovado: são instruções para a revisão que falta executar. Registrar **aprovado, falhou ou não aplicável**, com observações.

| Cenário | Ação sugerida com NVDA | Resultado esperado |
| --- | --- | --- |
| Títulos e regiões | Usar H para títulos, 1 para o título principal e D para regiões | Um h1 por página, ordem compreensível e regiões de navegação/conteúdo/rodapé reconhecíveis. |
| Pular ao conteúdo | Recarregar a página, pressionar Tab e Enter no primeiro link | O link é anunciado e o foco vai ao conteúdo principal, sem percorrer toda a navbar. |
| Links de navegação | Usar Tab/Shift+Tab; ativar Médicos e os dois links Conheça nosso time na Home | Destinos compreensíveis, abertura de Médicos, página atual anunciada e ausência de foco perdido. |
| Menu em tela estreita | Reduzir a largura até o botão Menu aparecer; ativar com Enter/Espaço, percorrer links e pressionar Escape | Estado expandido/recolhido anunciado; links ocultos não entram no percurso; Escape fecha e devolve foco ao botão. |
| Troca de idioma | Ativar EN e depois PT | Estado selecionado e mudança de idioma anunciados adequadamente; textos de Home/Médicos e controles mudam. |
| Banners | Acionar os três seletores pelo teclado | Nome do seletor, seleção e novo título compreensíveis, sem troca automática ou leitura repetitiva excessiva. |
| Mapa da Home | Percorrer e ativar os quatro marcadores | País e estado selecionado anunciados; mensagem de status legível, sem promessas de dados inexistentes. |
| Linha do tempo | Focar a região rolável e usar os controles anterior/próximo | Conteúdo acessível sem mouse, rótulos claros e nenhuma perda de foco ao rolar. |
| Diálogo de cadastro | Abrir pelo hero, navbar e CTAs de Médicos; percorrer com Tab/Shift+Tab; fechar por botão e Escape | Título e aviso anunciados; foco fica no diálogo enquanto aberto; após fechar, retorna à origem quando ela existe na página, sem cair em controle oculto. |
| Newsletter | Enviar vazio, com e-mail inválido e com endereço fictício válido | Campo e erros compreensíveis; envio demonstrativo anunciado como status; nenhuma confirmação falsa de cadastro real. |
| Depoimentos e profissionais | Percorrer a página Médicos por títulos e leitura contínua | Nomes, textos e ordem dos cards compreensíveis; imagens decorativas não geram ruído. |
| Rodapé | Percorrer contatos, redes e Voltar ao topo | Destinos compreensíveis; indisponibilidade do YouTube anunciada; retorno ao topo funciona. |

Complementar com zoom de 200% e 400% e inspeção visual de foco/recortes. Se uma combinação de leitor/navegador não anunciar algo corretamente, registrar a falha em vez de inferir aprovação pelo HTML ou pelo Lighthouse.

## Cobertura e resultados por página

Executar os fluxos aplicáveis em cada rota e registrar separadamente o resultado de cada leitor. Use **Aprovado**, **Falhou**, **Não aplicável** ou **Não executado**; não marque como aprovado com base apenas em inspeção de código, axe ou Lighthouse.

| Página | Fluxo | NVDA + navegador/versão | VoiceOver + Safari/versão | Falha, correção e reteste |
| --- | --- | --- | --- | --- |
| Home `/` | Títulos, landmarks, link para pular ao conteúdo e navegação | Não executado | Não executado | — |
| Home `/` | Banners, mapa, marcadores e anúncio do status | Não executado | Não executado | — |
| Home `/` | Linha do tempo, CTAs, diálogo de cadastro e foco ao fechar | Não executado | Não executado | — |
| Home `/` | Idioma, newsletter demonstrativa e rodapé | Não executado | Não executado | — |
| Médicos `/medicos` | Títulos, landmarks, navegação e carrossel do hero | Não executado | Não executado | — |
| Médicos `/medicos` | Missão, depoimentos, perfis e ordem de leitura | Não executado | Não executado | — |
| Médicos `/medicos` | Links de atendimento, parceiros e rodapé | Não executado | Não executado | — |
| Sobre `/sobre` | Títulos, landmarks, link para voltar ao início e navegação | Não executado | Não executado | — |
| Sobre `/sobre` | Acordeão: nome, estado expandido, conteúdo e teclado | Não executado | Não executado | — |
| Sobre `/sobre` | Conteúdo demonstrativo, links e rodapé | Não executado | Não executado | — |

### Como registrar uma falha

Para cada falha, anotar página/URL e elemento, leitor/navegador/versões, passos para reproduzir, resultado esperado e anúncio/foco observado. Associar a correção ao arquivo ou PR; depois, repetir o mesmo fluxo com o mesmo leitor e registrar a data e o resultado do reteste. Se o problema variar entre NVDA e VoiceOver, manter registros separados. Remover dados pessoais de capturas ou transcrições antes de compartilhá-las.

## Registro da execução real

| Campo | Resultado |
| --- | --- |
| Responsável | Não informado |
| Data e horário da revisão | Não executada |
| Sistema e versão | A preencher |
| Navegador e versão | A preencher |
| Leitor e versão | A preencher |
| URLs e versão/deployment | A preencher |
| Cenários aprovados | Não avaliados |
| Falhas e passos para reproduzir | Não avaliados; preencher na matriz por página acima |
| Correções realizadas e arquivos/PRs | Nenhuma registrada |
| Evidências de fala/capturas | Não coletadas |
| Resultado da revisão e reteste | Pendente; preencher após executar os testes |