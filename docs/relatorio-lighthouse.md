# Relatório Lighthouse

## Auditoria local — 20/11/2026

Auditoria do build de produção local do projeto na revisão `e3ac8c3`. O código estava sem alterações não commitadas no início da medição. Esses resultados não comprovam que a mesma versão esteja publicada na Vercel.

### Método

- Build: `npm run build`, concluído com sucesso; servidor de produção local na porta 3019.
- Lighthouse 13.6.0 e Chrome Headless 157 no Windows, emulação mobile e throttling simulado.
- Três execuções sequenciais para cada rota, com categorias Performance e Acessibilidade. SEO e Boas Práticas não foram medidos.
- Coleta entre 10:49 e 10:51 UTC. As notas podem variar conforme máquina, rede e condições da coleta.

### Resultados

| Rota | Performance — três execuções | Mediana | Acessibilidade — três execuções | Mediana | Contraste |
| --- | --- | --- | --- | --- | --- |
| Home `/` | 92 / 93 / 93 | **93** | 96 / 96 / 96 | **96** | Falhou nas três |
| Médicos `/medicos` | 94 / 94 / 94 | **94** | 96 / 96 / 96 | **96** | Falhou nas três |
| Sobre `/sobre` | 100 / 100 / 100 | **100** | 100 / 100 / 100 | **100** | Aprovado nas três |

As medianas atendem às metas configuradas de Performance ≥80 e Acessibilidade ≥90. **A auditoria de contraste, também exigida pela configuração, falhou na Home e em Médicos**, portanto a medição não atende a todos os critérios do projeto.

Na Home, os dois links **Conheça nosso time** foram identificados com contraste de **4,48:1**, abaixo do mínimo de **4,5:1**. Em Médicos, o link **Dúvidas Frequentes** apresentou a mesma relação. Revisar as cores desses links e repetir a auditoria após a correção.

O LCP variou de **3,06 a 3,15 s** na Home e de **3,05 a 3,08 s** em Médicos; em Sobre ficou em aproximadamente **0,76 s**. Esses dados são observações da coleta, não prova de uma causa específica.

### Como reproduzir

Instalar Node.js 24 LTS, dependências com `npm ci` e Chrome/Chromium. Executar:

```sh
npm run build
npm run lighthouse
```

O [lighthouserc.cjs](../lighthouserc.cjs) inicia o servidor de produção na porta 3000, audita `/`, `/medicos` e `/sobre` três vezes e salva resultados em `lighthouse-reports/`. As metas usam a mediana das notas e exigem aprovação de contraste. A coleta acima usou a CLI do Lighthouse diretamente na porta 3019, com as categorias citadas; não foi uma execução integral do Lighthouse CI. Garanta que a porta 3000 esteja livre para reproduzir com a configuração do projeto.

## Auditoria pública anterior

Os [relatórios de 17/11/2026](audits/2026-11-17-vercel/README.md) documentam três execuções na Home e em Médicos no domínio público. O commit do deploy não foi confirmado; seus resultados são históricos e não representam necessariamente o build local atual.

Lighthouse e axe não substituem avaliação manual. Consulte o [relatório NVDA](relatorio-nvda.md) e o [roteiro de revisão com leitor de tela](screen-reader-review.md).
