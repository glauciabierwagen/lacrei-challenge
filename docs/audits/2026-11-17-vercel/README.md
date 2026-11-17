# Lighthouse no deploy público — 17/11/2026

## Método

- URLs: https://lacrei-challenge-three.vercel.app/ e https://lacrei-challenge-three.vercel.app/medicos.
- Lighthouse **13.6.0**, Chromium headless **159**, Windows, emulação **mobile** e throttling simulado padrão do Lighthouse.
- Três execuções sequenciais por URL, cada uma com novo perfil do navegador. O cache do navegador não foi reaproveitado; não se controla o cache da CDN/Vercel.
- Categorias auditadas: **Performance** e **Acessibilidade**. SEO e Boas Práticas não fazem parte desta medição.
- Coleta de 14:58:31 a 14:59:54 UTC. Os horários individuais estão no [resumo JSON](summary.json) e nos relatórios originais.
- O alvo foi o domínio público, não o servidor local. Não foi confirmado o commit/deployment ID servido pelo domínio; as conclusões valem para o conteúdo entregue na coleta.

## Resultados

| Página | Performance — três execuções | Mediana | Acessibilidade — três execuções | Contraste |
| --- | --- | --- | --- | --- |
| Home | 89 / 96 / 76 | **89** | 100 / 100 / 100 | Aprovado nas três |
| Médicos | 97 / 80 / 93 | **93** | 100 / 100 / 100 | Aprovado nas três |

As duas páginas atingem **Performance ≥80 e Acessibilidade ≥90 pela mediana**, conforme a política do projeto. Entretanto, **a terceira execução da Home ficou em 76**: não há aprovação em todas as execuções. Se a avaliação exigir mínimo de 80 em qualquer execução, ainda há uma pendência de estabilidade de performance na Home.

O Total Blocking Time da Home variou de **192,5 a 687 ms** e o LCP de **1,57 a 2,34 s**. Isso indica que a ocupação da thread principal merece investigação adicional; os relatórios não provam uma causa única. As notas podem variar conforme máquina, rede e estado do deploy.

## Relatórios completos

| Página / execução | HTML | JSON |
| --- | --- | --- |
| Home 1 | [Abrir relatório](home-1.html) | [Dados originais](home-1.json) |
| Home 2 | [Abrir relatório](home-2.html) | [Dados originais](home-2.json) |
| Home 3 | [Abrir relatório](home-3.html) | [Dados originais](home-3.json) |
| Médicos 1 | [Abrir relatório](medicos-1.html) | [Dados originais](medicos-1.json) |
| Médicos 2 | [Abrir relatório](medicos-2.html) | [Dados originais](medicos-2.json) |
| Médicos 3 | [Abrir relatório](medicos-3.html) | [Dados originais](medicos-3.json) |

Os HTMLs podem ser baixados e abertos no navegador. Os JSONs também podem ser importados no visualizador do Lighthouse. Estes arquivos são evidências desta coleta e não devem ser editados para modificar notas.

## Reproduzir

Com as dependências instaladas por `npm ci`, executar `node scripts/audit-public.mjs` a partir da raiz do projeto. O script usa Lighthouse e chrome-launcher disponíveis nas dependências de desenvolvimento instaladas com `@lhci/cli`. É necessário Chrome/Chromium; se ele não for detectado, definir `CHROME_PATH` para o executável instalado.

O script não inicia servidor local nem altera a Vercel. Gera HTML e JSON em uma pasta datada dentro de `docs/audits`. **Executá-lo novamente no mesmo dia substitui os arquivos daquela data**; copiar a pasta antes se for necessário preservar várias coletas diárias.

## Leitor de tela

**NVDA/VoiceOver não foram executados.** Lighthouse não simula a experiência de um leitor de tela. A indisponibilidade do ambiente e o roteiro manual estão em [Revisão com leitor de tela](../../screen-reader-review.md).