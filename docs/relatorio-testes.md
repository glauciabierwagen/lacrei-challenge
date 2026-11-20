# Relatório de testes

## Execução local — 20/11/2026

Testes executados no Windows com Node.js 24, na revisão `c92a710`. Os resultados são locais e não comprovam que o mesmo código esteja publicado na Vercel.

| Verificação | Resultado |
| --- | --- |
| Testes unitários com cobertura (`npm run test:coverage`) | **62 testes aprovados**, em 6 arquivos. |
| Testes de navegador com Playwright | **37 aprovados e 5 falharam**, entre 42 execuções em Chromium desktop e mobile. |
| Build de produção (`npm run build`) | **Aprovado** após a correção de contraste. |
| Contraste dos três links alterados | **Aprovado** com axe nos estados normal e hover, em desktop e mobile. |

O comando de cobertura terminou sem erro. Embora a configuração inclua quatro componentes compartilhados, o resumo dessa execução exibiu somente `header.tsx`; a abrangência da medição deve ser verificada antes de interpretar os percentuais como cobertura dos quatro componentes ou do projeto inteiro.

Os testes de navegador usaram o servidor de desenvolvimento local já ativo, com dois workers. Passaram as verificações de overflow nas três rotas e as verificações automáticas com axe nas páginas em seu estado inicial, além de testes de navegação, idioma e outras interações. Os navegadores Firefox e WebKit não foram testados.

### Falhas nos testes de navegador

| Cenário | Resultado observado |
| --- | --- |
| Modais de Blog e Unidades, desktop e mobile | Em ambos, o teste não encontrou o link **Para Pacientes** no diálogo Blog e parou antes de concluir o restante do cenário. |
| Newsletter, desktop e mobile | Em ambos, o texto de privacidade exibido era diferente do esperado pelo teste; o fluxo de envio não chegou a ser executado nessa verificação. |
| Menu mobile aberto | O axe apontou contraste de **2,34:1** no botão de idioma **PT**, abaixo de 4,5:1. O teste parou antes de verificar o modal de cadastro nesse cenário mobile. |

Essas falhas precisam ser investigadas e retestadas; não indicam, por si só, se o problema está no teste ou na implementação. O teste correspondente ao modal de cadastro passou em desktop.

## Como reproduzir

Com Node.js 24 e as dependências instaladas:

```sh
npm run test:coverage
npm run build
npm run test:e2e -- --workers=2 --reporter=list
```

O Playwright reutiliza um servidor na porta 3000 quando disponível; caso contrário, inicia o servidor de produção. Para reproduzir a execução acima, inicie `npm run dev` antes do teste E2E. Se necessário, instale o navegador com `npx playwright install chromium`.

Para desempenho e contraste Lighthouse, consulte o [relatório Lighthouse](relatorio-lighthouse.md). Os testes automatizados não substituem a revisão com leitor de tela, que segue pendente; veja o [roteiro de revisão](screen-reader-review.md).
