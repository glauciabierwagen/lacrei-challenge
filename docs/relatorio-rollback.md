# Relatório Rollback

## Setup

O projeto usa Next.js, TypeScript e Node.js 24. Para preparar uma revisão local:

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
```

`npm run check` inclui lint, tipos, testes com cobertura e build. Os testes E2E usam o build de produção e Chromium; os resultados devem ser conferidos antes de qualquer promoção.

## Deploy

A aplicação publicada está em [lacrei-challenge-three.vercel.app](https://lacrei-challenge-three.vercel.app/). O [pipeline de qualidade](../.github/workflows/quality.yml) executa verificações, mas **não publica automaticamente**. Antes de promover um deployment na Vercel, conferir o commit, a Preview, as rotas e os resultados dos testes. Nenhuma nova publicação foi realizada como parte deste relatório.

## Rollback e recuperação

Em caso de regressão, identificar um deployment anterior elegível e validar seu conteúdo, domínio e configuração. Com autorização, usar o [Instant Rollback da Vercel](https://vercel.com/docs/instant-rollback) para restaurá-lo e verificar as rotas no domínio público. Não executar rollback em produção sem autorização.

O rollback da plataforma **não reverte o código do repositório**. Para evitar republicar a regressão:

1. Criar uma correção ou usar `git revert` em uma branch, preservando o histórico; em merges, conferir os pais antes de escolher parâmetros.
2. Executar as verificações de qualidade, revisar a Preview e integrar a correção.
3. Após um Instant Rollback, conferir o estado da atribuição automática do domínio de produção. Um novo push não garante que o domínio passe para a versão corrigida.
4. Confirmar o deployment adequado e seguir o fluxo de [promoção da Vercel](https://vercel.com/docs/deployments/promoting-a-deployment); validar commit, domínio e comportamento após a promoção.

Se não houver deployment anterior elegível, um novo build da revisão corrigida ou revertida pode ser promovido pelo fluxo normal, sujeito ao tempo de build. Verificar a documentação atual da plataforma e as condições do plano antes de agir.

## Justificativas técnicas e limitações

- O Instant Rollback reutiliza um build anterior; validar a compatibilidade das configurações e variáveis de ambiente desse deployment.
- Reverter o frontend não restaura dados de bancos, CMS ou serviços externos. Esta demonstração não possui banco, cadastro ou envio real de newsletter.
- `git revert` registra a reversão no histórico sem reescrevê-lo. Evitar `reset --hard` ou force push em branches compartilhadas.
- Ensaiar primeiro em homologação e registrar evidências e tempo observado; não presumir um prazo de recuperação.

## Evidência disponível

Uma [simulação local em 19/11/2026](audits/2026-11-17-vercel/README.md#evidência-de-simulação-local--19112026) reconstruiu a revisão anterior em um worktree isolado. O build passou, mas testes unitários e E2E tiveram falhas; a revisão não foi certificada para promoção. Não houve rollback real nem alteração de deployment ou domínio da Vercel.
