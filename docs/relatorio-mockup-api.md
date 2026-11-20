# Relatório Mockup API local

## Objetivo

Demonstrar uma integração simples entre a página **Médicos/Profissionais** e uma API simulada, sem depender de um serviço externo. Os depoimentos e perfis apresentados são ilustrativos e não representam relatos reais.

## Como funciona

1. Os três depoimentos estão no arquivo local [testimonials.json](../src/features/doctors/testimonials.json).
2. A rota Next.js [GET /api/depoimentos](../src/app/api/depoimentos/route.ts) retorna os dados desse arquivo em JSON.
3. A [página Médicos](../src/features/doctors/doctors-view.tsx) solicita a rota pelo navegador, valida a estrutura da resposta e exibe os cards no idioma selecionado, português ou inglês.

Cada depoimento contém nome, nome do arquivo da imagem, profissão e texto, com traduções de profissão e texto para PT e EN. Enquanto os dados carregam, a página informa esse estado; uma lista vazia ou uma falha de rede, resposta HTTP ou dados inválidos também gera uma mensagem visível. Em caso de erro, a orientação é recarregar a página.

Esta API é somente para leitura: não recebe nem armazena depoimentos, não usa banco de dados e não consulta a API oficial da Lacrei Saúde. Alterações no JSON precisam ser incluídas em um novo build/deploy para aparecerem na aplicação publicada.

## Como verificar localmente

Com as dependências instaladas, inicie `npm run dev`, acesse [Médicos](http://localhost:3000/medicos) e confira a seção de depoimentos. A resposta JSON também pode ser vista em [http://localhost:3000/api/depoimentos](http://localhost:3000/api/depoimentos).

## Validação realizada — 20/11/2026

- **Vitest:** 8 testes da página Médicos passaram, incluindo lista vazia, erro HTTP, erro de rede e resposta inválida.
- **Playwright:** 4 execuções passaram em Chromium desktop e mobile, verificando a resposta real da API local e a apresentação de um erro simulado.
- **Build de produção:** concluído com sucesso, incluindo a rota `/api/depoimentos`.

Essas verificações foram feitas localmente e não comprovam que a integração já esteja publicada na Vercel. O [relatório de testes](relatorio-testes.md) registra outras verificações e suas limitações.
