# Blog DiogoDev — Diogo FC: Career Mode

Portfolio e blog de engenharia de software em Next.js com App Router e conteudo
via Prismic. A interface usa uma linguagem visual inspirada em jogos de futebol
8/16-bit (modo carreira, ficha do jogador, partidas, stages), com arte original
e sem assets de jogos comerciais.

## Rotas

| Rota                  | Conteudo                                                        |
| --------------------- | --------------------------------------------------------------- |
| `/`                   | Home: hero, ficha do jogador, temporada atual, partidas, GitHub, tatica, carreira, trofeus, extra e ultimos artigos |
| `/about`              | Player profile: ficha, bio, treino/objetivos, experiencia tecnica, repositorios e contato |
| `/projects`           | Lista de projetos (`project`) e repositorios do GitHub          |
| `/projects/<uid>`     | Match report do projeto (estudo de caso)                        |
| `/career`             | Linha do tempo completa (`career`)                              |
| `/blog`               | Arquivo de artigos com categorias, busca (Ctrl K) e paginacao   |
| `/blog/page/<n>`      | Paginas seguintes do arquivo                                    |
| `/blog/tag/<tag>`     | Artigos filtrados por tag                                       |
| `/blog/<slug>`        | Artigo (stage), com indice e navegacao anterior/proximo         |
| `/pages/<uid>`        | Paginas editoriais montadas com slices                          |

### Migracao de URLs

Os artigos sairam da raiz para `/blog`. As URLs antigas continuam funcionando
com redirect permanente (308), preservando links externos e SEO:

- `/<slug>` → `/blog/<slug>` (rota `src/app/[slug]/page.tsx`; so redireciona se
  o post existir, caso contrario responde 404).
- `/page/<n>` → `/blog/page/<n>` (regra `redirects()` em `next.config.mjs`).

O numero do stage de cada artigo e cronologico: o post mais antigo e o Stage 01.

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
Ele deve continuar separado do modelo `page`: posts aparecem em `/blog/<uid>` e
paginas editoriais aparecem em `/pages/<uid>`.

### Slice Machine

Os Custom Types `home`, `about`, `page`, `post`, `profile`, `project`, `career`
e `interest` sao versionados neste repositorio em
[`customtypes`](customtypes). Para editar/testar esses modelos localmente, rode:

```bash
npm run dev
npm run slicemachine
```

Abra a interface local do Slice Machine, faca login no Prismic quando solicitado
e publique os modelos no repositorio `zgi1adw1` quando estiverem validados.

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
- `icon_key` (Key Text com o nome do icone do Phosphor, exemplo `AtomIcon`)
- `color` (Color ou Key Text com hexadecimal, exemplo `#22d3ee`)
- `level` (Number, 0–100, opcional): nivel ilustrativo usado na barra da ficha
  do jogador quando o `profile` nao define `player_stats`.
- `active` (Boolean, opcional): marca tecnologias em uso na temporada atual.

Essas experiencias tambem fazem o papel de "skills": nao foi criado um tipo
`skill` separado para nao duplicar dados que ja existiam no `about`.

Padrao para `icon_key`: use o nome do componente do
[`@phosphor-icons/react`](https://phosphoricons.com/), como `AtomIcon`,
`FileTsIcon`, `TerminalWindowIcon`, `DatabaseIcon`, `CloudIcon` ou
`RocketLaunchIcon`. O sufixo `Icon` e opcional: `Atom` tambem funciona. Se o
nome nao existir, o site renderiza `CodeIcon`.

Os documentos `home` e `about` devem existir no Prismic. Em producao, eles sao
a fonte de verdade do conteudo dessas paginas.

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
publicadas em `/pages/<uid>`. Os posts ficam em `src/app/blog/[slug]/page.tsx`,
publicados em `/blog/<slug>`; a rota `src/app/[slug]/page.tsx` apenas redireciona
as URLs antigas.

### Custom Type `profile` (single type, opcional)

Modelo em [`customtypes/profile/index.json`](customtypes/profile/index.json).
Centraliza a identidade do "jogador" e tudo o que antes seria hardcoded:

- Identidade: `name`, `role`, `specialties` (separadas por virgula ou `·`),
  `location`, `avatar`, `bio`, `goals`, `currently_studying` (grupo `topic`).
- Formacao academica: `education` (grupo `level`, `course`, `institution`,
  `location`, `start_year`, `end_year`). Sem `end_year` aparece como
  "em andamento". Exibida no perfil e na secao "Temporada atual" da home.
- Ficha: `shirt_number`, `position`, `play_style`, `formation`, `overall`
  (0–100) e `player_stats` (grupo `label` + `value` 0–100). Os atributos sao
  ilustrativos e o site deixa isso explicito na ficha.
- Tatica: `tactics_title`, `tactics_description`, `tactics` (grupo `line`:
  `ataque`/`meio-campo`/`defesa`/`goleiro`, `label`, `detail`) e
  `tactics_principles` (grupo `name`).
- Trofeus: `trophies` (grupo `title`, `description`, `year`).
- Links: `github_username`, `linkedin_url`, `instagram_url`, `twitter_url`,
  `email`.

Sem o documento, o site usa os dados reais do GitHub (nome, avatar, bio,
localizacao), mostra a ficha com os anos por tecnologia do `about` e oculta as
secoes que dependem exclusivamente do `profile` (tatica, trofeus manuais).

### Custom Type `project` (repeatable, opcional)

Modelo em [`customtypes/project/index.json`](customtypes/project/index.json):

- Aba Main: `uid`, `title`, `short_description`, `description`, `cover_image`,
  `status` (`in_progress`/`completed`/`archived`), `featured`, `order`,
  `category`, `technologies` (grupo `name`), `github_url`, `demo_url`.
- Aba Case study: `problem`, `solution`, `architecture`,
  `technical_decisions`, `technical_challenges`, `learnings` e `gallery`
  (grupo `image` + `caption`).

Projetos com `featured` aparecem na Home. Cada projeto vira `/projects/<uid>`.

### Custom Type `career` (repeatable, opcional)

Modelo em [`customtypes/career/index.json`](customtypes/career/index.json):
`company`, `role`, `stage_label`, `start_date`, `end_date` (vazio = atual),
`description`, `responsibilities`, `highlights` (grupo `text`), `technologies`
(grupo `name`), `order` e `active`.

### Custom Type `interest` (repeatable, opcional)

Modelo em [`customtypes/interest/index.json`](customtypes/interest/index.json):
`title`, `category` (`football`/`cooking`/`retro_games`/`technology`/
`learning`/`side_projects`), `description`, `image`, `order` e `active`.
Alimenta a secao "Fora de campo" da Home.

### Documentos para criar no Prismic

Depois de publicar os modelos pelo Slice Machine:

1. Atualize o `about` existente preenchendo `level`/`active` nas experiencias
   (opcional).
2. Crie e publique o single `profile` com nome, cargo, especialidades, bio,
   avatar, ficha (`player_stats`, `overall`, numero, posicao) e links.
3. Crie um documento `project` por projeto (marque 1–3 como `featured`).
4. Crie um documento `career` por empresa/fase, usando `order` para ordenar.
5. Crie documentos `interest` para a secao "Fora de campo" (opcional).

Todos os tipos novos sao opcionais: enquanto nao existirem, as secoes
correspondentes mostram estado vazio ou sao omitidas, e o build nao falha.
Apenas `home` e `about` continuam obrigatorios.

### Shared Slices

Os slices ficam em [`src/slices`](src/slices), cada um com `model.json` e
`index.tsx`:

- `ProfileHero`: hero editorial com badge, titulo, subtitulo, alinhamento e superficie.
- `RichTextSection`: bloco de texto rico sem sumario.
- `TableSection`: tabela oficial do Prismic com titulo, descricao e largura configuravel.
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
PRISMIC_REPOSITORY_NAME=zgi1adw1
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
- Em CI/Vercel, `npm run build` valida acesso ao Prismic e exige os documentos singleton `home` e `about` publicados.

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
- Servicos em `src/services` (`PostService`, `GithubService`, `ContentService`, `PortfolioService`)
- `ContentService` centraliza `home`, `about`, `page`, links de header e links de footer vindos do Prismic
- `PortfolioService` busca `profile`, `project`, `career` e `interest` (todos opcionais)
- `GithubService` e a unica integracao com a API do GitHub; os componentes
  retro (`GitHubStats`, `ScoreBoard`) recebem dados ja normalizados
- `src/lib/player` combina `profile`, GitHub e `about` na identidade do jogador
- `src/lib/blog` calcula tags do arquivo e numeracao de stages
- Conteudo rich text do Prismic em `src/components/RichText`
- Slice Zone renderizada por `src/components/SliceRenderer`
- SEO compartilhado em `src/lib/seo` (metadata, Open Graph retro, icones);
  JSON-LD de Person, ProfilePage, CreativeWork, BlogPosting e BreadcrumbList

## Design system retro

- Referencia visual: jogos de futebol 16-bit do Super Nintendo (gramado
  listrado, linhas brancas, HUD azul-marinho, placar e textos amarelos com
  contorno escuro). Toda a arte e original, feita em CSS e sprites proprios.
- Tokens em [`styles/tailwind-theme.css`](styles/tailwind-theme.css):
  - HUD: `bg` `#0C1445`, `surface` `#16226A`, `surface-2` `#1F2E85`, `ink`
    `#FFFFFF`, `muted` `#C3CDF5`, `line` `#3A4AA6`, `line-strong` `#E4E9FF`.
  - Destaque/placar: `accent` e `score` `#FFD23F`; contorno `outline`
    `#08102F`.
  - Gramado: `pitch` `#2F7F27`, `pitch-dark` `#286F21`, linhas `pitch-line`
    `#F4F8EE`; times `team-home` `#E5452F` e `team-away` `#3B6CF2`.
  - Os tokens antigos viraram aliases da nova paleta.
- O `body` e um gramado listrado. Texto direto sobre a grama usa `.on-pitch`
  (contorno de 1px + sombra), `.on-pitch-soft` (descricoes) ou `.hud-title`
  (titulos gigantes); conteudo de leitura fica em paineis `.pixel-frame` ou
  `.hud-glass` (caixa translucida, como o radar do jogo).
- Hero da home como tela de inicio de partida: placar com escudo, relogio,
  placa de nome do jogador (`toPlateName`) e `PitchRadar`, que desenha a
  formacao a partir do campo `formation` do Prismic (ex.: `4-3-3`).
- Todos os textos fixos da interface estao em pt-BR.
- Fontes: Manrope (texto), Sora (titulos) e Jersey 10 (`font-pixel`, apenas
  labels, menus e placares). Press Start 2P e Pixelify Sans foram descartadas:
  a primeira deforma maiusculas acentuadas (`Ç`, `Ã`) e a segunda desenha o `2`
  como um `S` espelhado. Como a Jersey 10 tem altura de maiuscula pequena,
  `.font-pixel` usa `font-size-adjust: cap-height 1`.
- Componentes base: `PixelButton`, `RetroBadge`, `GameSection`, `PixelSprite`,
  `RetroMenu`, `PlayerCard`, `PlayerStat`, `ScoreBoard`, `MatchCard`,
  `CareerTimeline`, `TrophyCard`, `StageNav`, `Breadcrumbs`, `GameOver`,
  `PitchRadar`.
- Animacoes usam `steps()` e respeitam `prefers-reduced-motion`.

### Estatisticas do GitHub

A secao usa a API REST publica: repositorios, seguidores, estrelas, forks e
linguagens mais usadas, com estados de carregamento, erro e fallback.
Contribuicoes/commits nao sao exibidos porque exigem a API GraphQL com token.

## Publicando posts

1. Crie um novo documento do tipo `post` no Prismic.
2. Preencha titulo, descricao, data e conteudo.
3. Defina o `UID` do documento (ele vira a URL do post: `/blog/<uid>`).
4. Publique o documento.

Os posts publicados passam a aparecer no blog automaticamente. As tags nativas
do Prismic viram as categorias de `/blog/tag/<tag>`.

## Publicando paginas editoriais

1. Crie um novo documento do tipo `page` no Prismic.
2. Defina o `UID` do documento.
3. Preencha `title`, `description` e monte o conteudo pela Slice Zone.
4. Publique o documento.

Essas paginas ficam em `/pages/<uid>`. Essa rota e independente dos posts, que
ficam em `/blog/<slug>`.

Para exibir uma pagina editorial no header, marque `show_in_header` como
verdadeiro. Use `nav_label` para controlar o texto do link no menu e
`nav_order` para ordenar os links dinamicos depois dos links fixos (`Início`,
`Perfil`, `Projetos`, `Carreira` e `Blog`). Paginas sem `show_in_header` continuam publicadas, mas nao entram
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

**Variable** (opcional na CI; padrao `zgi1adw1`):

```bash
PRISMIC_REPOSITORY_NAME=zgi1adw1
```

Na Vercel (`Settings > Environment Variables`), configure pelo menos:

```bash
PRISMIC_REPOSITORY_NAME=zgi1adw1
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
PRISMIC_WEBHOOK_SECRET=seu-secret-de-webhook
PRISMIC_ACCESS_TOKEN=seu-token-permanente
```

O build com validacao do Prismic roda na Vercel. Na CI, o build e ignorado se `PRISMIC_ACCESS_TOKEN` nao estiver no GitHub — nesse caso a Vercel faz o build com as env vars dela.

Observacao:

- Se seu projeto estiver com Auto Deploy do Git ativado na Vercel, voce pode ter deploy duplo (Git + Hook).
- Para usar apenas o fluxo da CI, desative o Auto Deploy na Vercel e mantenha somente o Deploy Hook.
