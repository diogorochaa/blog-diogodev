# Blog DiogoDev

Blog em Next.js com App Router e publicacao de conteudo via Prismic.

## Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Prismic (CMS)

## Requisitos

- Node.js 18+
- npm 9+

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
