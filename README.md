# Blog DiogoDev

Blog em Next.js com App Router e publicacao de conteudo via Prismic.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prismic (CMS)
- Vitest + Storybook

## Requisitos

- Node.js 24+
- npm 10+

## Configuracao do Prismic e Slice Machine

1. Crie um repositorio no Prismic.
2. Crie ou publique pelo Slice Machine um Custom Type repeatable chamado `post`
   com API ID `post`.
3. Adicione os campos abaixo no `post`:

- `title` (Rich Text - single paragraph recomendado)
- `description` (Rich Text - single paragraph recomendado)
- `date` (Date)
- `content` (Rich Text)

4. Opcional: use as tags nativas do documento no Prismic para categorizar posts.

O modelo local fica em [`customtypes/post/index.json`](customtypes/post/index.json).
Ele deve continuar separado do modelo `page`: posts aparecem em `/<uid>` e paginas
editoriais aparecem em `/pages/<uid>`.

### Slice Machine

Os Custom Types `home`, `about` e `page` sao versionados neste repositorio em
[`customtypes`](customtypes). Para editar/testar esses modelos localmente, rode:

```bash
npm run dev
npm run slicemachine
```

Abra a interface local do Slice Machine, faca login no Prismic quando solicitado
e publique os modelos no repositorio `blog-diodev` quando estiverem validados.

Para abrir a UI automaticamente:

```bash
npm run slicemachine:open
```

### Custom Type `home` (single type)

Modelo versionado em [`customtypes/home/index.json`](customtypes/home/index.json):

- `hero_badge` (Key Text)
- `title` (Key Text)
- `subtitle` (Rich Text ou Text)
- `description` (Text)
- `featured_posts_limit` (Number)
- `og_title` (Key Text)
- `og_description` (Text)
- `slices` (Slice Zone)

### Custom Type `about` (single type)

Modelo versionado em [`customtypes/about/index.json`](customtypes/about/index.json):

- `title` (Key Text)
- `greeting` (Key Text)
- `intro` (Rich Text ou Text)
- `avatar_alt` (Key Text)
- `repos_label` (Key Text)
- `followers_label` (Key Text)
- `experience_heading` (Key Text)
- `experience_description` (Text)
- `projects_heading` (Key Text)
- `empty_projects_text` (Text)
- `github_link_label` (Key Text)
- `seo_title` (Key Text)
- `seo_description` (Text)
- `og_title` (Key Text)
- `og_description` (Text)
- `slices` (Slice Zone)

Adicione tambem um grupo repetivel `experiences` com os campos:

- `name` (Key Text)
- `start_year` (Number)
- `category` (Select: `frontend`, `backend`)
- `icon_key` (Select: `javascript`, `typescript`, `css`, `html`, `react`,
  `nextjs`, `nodejs`, `docker`, `database`, `cloud`, `git`, `terminal`, `code`)
- `color` (Color ou Key Text com hexadecimal, exemplo `#22d3ee`)

Se os documentos `home` ou `about` ainda nao existirem no Prismic, o app usa
fallbacks locais para manter o site funcionando.

### Custom Type `page` (repeatable)

Modelo versionado em [`customtypes/page/index.json`](customtypes/page/index.json):

- `uid` (UID)
- `title` (Key Text)
- `description` (Text)
- `show_in_header` (Boolean)
- `nav_label` (Key Text)
- `nav_order` (Number)
- `show_in_footer` (Boolean)
- `footer_label` (Key Text)
- `footer_order` (Number)
- `slices` (Slice Zone)

As paginas editoriais usam a rota dedicada `src/app/pages/[uid]/page.tsx`,
publicadas em `/pages/<uid>`. A rota de posts continua separada em
`src/app/[slug]/page.tsx`, publicada em `/<slug>`, entao os posts existentes nao
mudam de URL.

### Shared Slices

Os slices ficam em [`src/slices`](src/slices), cada um com `model.json` e
`index.tsx`:

- `ProfileHero`: hero editorial com badge, titulo, subtitulo, alinhamento e superficie.
- `RichTextSection`: bloco de texto rico sem sumario.
- `CardGrid`: grid de cards editaveis com icones controlados.
- `AboutIntroStats`: intro do About com estatisticas do GitHub vindas do servidor.
- `TechnicalExperience`: experiencia tecnica editavel com graficos opcionais.
- `PostsFeed`: feed de posts por ultimos posts ou tag.
- `GitHubProjects`: projetos do GitHub com limite e layout configuraveis.
- `RecommendedPosts`: lista simples de posts recomendados por ultimos posts ou tag.

Slices dinamicos continuam buscando dados no servidor via `PostService` e
`GithubService`. O `SliceRenderer` e compartilhado por Home, About e
`/pages/[uid]`, buscando dados dinamicos apenas quando o slice precisa. O
Prismic configura texto, ordem, limite, fonte e layout, mas nao executa queries
livres nem CSS arbitrario.

## Variaveis de ambiente

Copie o template e preencha suas credenciais:

```bash
cp .env.example .env.local
```

Variaveis em [`.env.example`](.env.example):

```bash
PRISMIC_REPOSITORY_NAME=blog-diodev
PRISMIC_ACCESS_TOKEN=
PRISMIC_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `PRISMIC_ACCESS_TOKEN` so e necessario se seu repositorio nao for publico.
- `PRISMIC_WEBHOOK_SECRET` protege o endpoint `POST /api/revalidate` (envie `Authorization: Bearer <secret>` no webhook do Prismic).
- `NEXT_PUBLIC_SITE_URL` e obrigatoria em producao para canonical, Open Graph e Twitter Cards.

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para editar modelos de conteudo no Slice Machine:

```bash
npm run slicemachine
```

## Qualidade de codigo

O projeto usa [Biome](https://biomejs.dev/) para lint e formatacao.

```bash
npm run typecheck
npm run lint
npm run format
npm run test:run
```

- `npm run typecheck` executa `next typegen` antes do TypeScript para manter os tipos do App Router atualizados no Next 16.
- `npm run lint` e `npm run check` executam `biome check` (lint + formatacao).
- `npm run lint:fix` aplica correcoes automaticas do Biome.

Para validar tudo de uma vez:

```bash
npm run verify
npm run test:all
npm run build
```

## Tailwind CSS v4

O tema (cores, fontes, gradientes, sombras e safelist do grid) fica em [`styles/tailwind-theme.css`](styles/tailwind-theme.css) com `@theme` e `@source` nativos do Tailwind v4. O app importa esse arquivo via [`styles/globals.css`](styles/globals.css).

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

## Arquitetura

- Rotas em `src/app` com split `page.tsx` / `*.data.ts` / `*Content.tsx`
- Servicos em `src/services` (`PostService`, `GithubService`, `ContentService`)
- `ContentService` centraliza `home`, `about`, `page`, links de header e links de footer vindos do Prismic
- Conteudo rich text do Prismic em `src/components/RichText`
- Slice Zone renderizada por `src/components/SliceRenderer`
- SEO compartilhado em `src/lib/seo/buildMetadata.ts`
- Listagem de posts reutilizada em `src/components/PostsFeed`

## Publicando posts

1. Crie um novo documento do tipo `post` no Prismic.
2. Preencha titulo, descricao, data e conteudo.
3. Defina o `UID` do documento (ele vira a URL do post).
4. Publique o documento.

Os posts publicados passam a aparecer no blog automaticamente.

## Publicando paginas editoriais

1. Crie um novo documento do tipo `page` no Prismic.
2. Defina o `UID` do documento.
3. Preencha `title`, `description` e monte o conteudo pela Slice Zone.
4. Publique o documento.

Essas paginas ficam em `/pages/<uid>`. Essa rota e independente dos posts, que
continuam em `/<slug>`.

Para exibir uma pagina editorial no header, marque `show_in_header` como
verdadeiro. Use `nav_label` para controlar o texto do link no menu e
`nav_order` para ordenar os links dinamicos depois dos links fixos (`Home` e
`Sobre mim`). Paginas sem `show_in_header` continuam publicadas, mas nao entram
no menu principal. Quando duas paginas usam a mesma ordem, o desempate e feito
pelo label em `pt-BR`.

Para exibir uma pagina editorial no footer, marque `show_in_footer` como
verdadeiro. Use `footer_label` para controlar o texto do link no rodape e
`footer_order` para ordenar os links dinamicos depois dos links fixos.
Esse controle e independente do header. Quando duas paginas usam a mesma ordem,
o desempate tambem e feito pelo label em `pt-BR`.

## Webhook de revalidacao

Configure no Prismic um webhook apontando para:

```bash
POST https://seu-dominio.com/api/revalidate
Authorization: Bearer <PRISMIC_WEBHOOK_SECRET>
```

Mudancas em `home`, `about`, `page`, Slice Zone ou campos de navegacao de
header/footer dependem da revalidacao para refletir em producao quando o site
estiver usando cache da Vercel/Next.

## Deploy automatico na Vercel apos CI

Este projeto ja possui um job na CI que pode disparar deploy de producao na Vercel somente quando o push na `main` passar em `verify` (e `build`, se configurado).

Para ativar:

1. Na Vercel, abra o projeto em `Settings > Git > Deploy Hooks`.
2. Crie um Deploy Hook para o branch `main`.
3. Copie a URL do hook.
4. No GitHub, adicione em `Settings > Secrets and variables > Actions`:

**Secret** (obrigatorio para o deploy hook):

```bash
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

**Secrets** (opcional — so se quiser rodar `npm run build` tambem na CI):

```bash
PRISMIC_ACCESS_TOKEN=seu-token-permanente
```

**Variable** (opcional na CI; padrao `blog-diodev`):

```bash
PRISMIC_REPOSITORY_NAME=blog-diodev
```

Na Vercel (`Settings > Environment Variables`), configure pelo menos:

```bash
PRISMIC_REPOSITORY_NAME=blog-diodev
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
PRISMIC_WEBHOOK_SECRET=seu-secret-de-webhook
PRISMIC_ACCESS_TOKEN=seu-token-permanente
```

O build com validacao do Prismic roda na Vercel. Na CI, o build e ignorado se `PRISMIC_ACCESS_TOKEN` nao estiver no GitHub — nesse caso a Vercel faz o build com as env vars dela.

Observacao:

- Se seu projeto estiver com Auto Deploy do Git ativado na Vercel, voce pode ter deploy duplo (Git + Hook).
- Para usar apenas o fluxo da CI, desative o Auto Deploy na Vercel e mantenha somente o Deploy Hook.
