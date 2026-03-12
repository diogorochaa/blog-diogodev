# Blog DiogoDev

Blog em Next.js com App Router e publicacao de conteudo via Prismic.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prismic (CMS)

## Requisitos

- Node.js 24+
- npm 10+

## Configuracao do Prismic

1. Crie um repositorio no Prismic.
2. Crie um Custom Type chamado `post`.
3. Adicione os campos abaixo no `post`:

- `title` (Rich Text - single paragraph recomendado)
- `description` (Rich Text - single paragraph recomendado)
- `date` (Date)
- `content` (Rich Text)

4. Opcional: use as tags nativas do documento no Prismic para categorizar posts.

## Variaveis de ambiente

Crie um arquivo `.env.local` na raiz:

```bash
PRISMIC_REPOSITORY_NAME=seu-repositorio
PRISMIC_ACCESS_TOKEN=
```

`PRISMIC_ACCESS_TOKEN` so e necessario se seu repositorio nao for publico.

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Qualidade de codigo

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test:run
```

`npm run typecheck` executa `next typegen` antes do TypeScript para manter os tipos do App Router atualizados no Next 16.

## Storybook

Para abrir a documentacao e os playgrounds dos componentes:

```bash
npm run storybook
```

Para gerar o build estatico da documentacao:

```bash
npm run build-storybook
```

Para rodar os testes dos stories com Vitest:

```bash
npm run test:storybook:run
```

Em Linux, se o Chromium da Playwright reclamar de bibliotecas nativas ausentes, prepare as dependencias locais uma vez antes dos testes:

```bash
npm run test:storybook:prepare
```

Para executar testes unitarios e de Storybook no mesmo comando:

```bash
npm run test:all
```

Para rodar tudo de uma vez:

```bash
npm run verify
```

## Publicando posts

1. Crie um novo documento do tipo `post` no Prismic.
2. Preencha titulo, descricao, data e conteudo.
3. Defina o `UID` do documento (ele vira a URL do post).
4. Publique o documento.

Os posts publicados passam a aparecer no blog automaticamente.

## Deploy automatico na Vercel apos CI

Este projeto ja possui um job na CI que pode disparar deploy de producao na Vercel somente quando o push na `main` passar em `check`, `test` e `build`.

Para ativar:

1. Na Vercel, abra o projeto em `Settings > Git > Deploy Hooks`.
2. Crie um Deploy Hook para o branch `main`.
3. Copie a URL do hook.
4. No GitHub, adicione um secret no repositorio em `Settings > Secrets and variables > Actions`:

```bash
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

Observacao:

- Se seu projeto estiver com Auto Deploy do Git ativado na Vercel, voce pode ter deploy duplo (Git + Hook).
- Para usar apenas o fluxo da CI, desative o Auto Deploy na Vercel e mantenha somente o Deploy Hook.
