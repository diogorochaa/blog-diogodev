import type { Metadata } from 'next'

import { siteConfig } from '@/config'

import { Reveal } from '@/components/Motion'
import { Profile, Repo } from '@/models'

const GITHUB_USER = 'diogorochaa'
const GITHUB_API_BASE_URL = 'https://api.github.com'

const githubFetchOptions = {
  next: { revalidate: 3600 },
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
}

const profileFallback: Profile = {
  avatar_url: '',
  name: 'Diogo Rocha',
  company: null,
  location: null,
  bio: null,
  public_repos: 0,
  followers: 0,
}

const OG_IMAGE = `${siteConfig.url}/assets/images/logo.png`

export const metadata: Metadata = {
  title: 'Sobre mim',
  description:
    'Conheça mais sobre Diogo Rocha, trajetória e projetos em destaque.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    title: 'Sobre mim',
    url: `${siteConfig.url}/about`,
    description:
      'Conheça mais sobre Diogo Rocha, trajetória e projetos em destaque.',
    siteName: siteConfig.name,
    images: [
      {
        url: OG_IMAGE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mim',
    description:
      'Conheça mais sobre Diogo Rocha, trajetória e projetos em destaque.',
    images: [OG_IMAGE],
  },
}

async function getApiGithub(): Promise<Profile> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE_URL}/users/${GITHUB_USER}`,
      githubFetchOptions,
    )

    if (!res.ok) {
      return profileFallback
    }

    return await res.json()
  } catch {
    return profileFallback
  }
}

async function getApiGithubRepos(): Promise<Repo[]> {
  try {
    const data = await fetch(
      `${GITHUB_API_BASE_URL}/users/${GITHUB_USER}/repos?sort=updated&per_page=6`,
      githubFetchOptions,
    )

    if (!data.ok) {
      return []
    }

    return await data.json()
  } catch {
    return []
  }
}

export default async function AboutPage() {
  const [profile, repos] = await Promise.all([
    getApiGithub(),
    getApiGithubRepos(),
  ])
  const { company, location, bio, public_repos, followers, name } = profile

  const displayLocation = location || 'Brasil'
  const displayName = name || 'Diogo Rocha'

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: displayName,
    url: `${siteConfig.url}/about`,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
    ],
    jobTitle: siteConfig.title,
    description:
      bio ||
      `Engenheiro de software com foco em performance, acessibilidade e boas práticas de desenvolvimento.`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: displayLocation,
    },
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 animate-soft-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Reveal y={20}>
        <div className="mb-8 flex flex-col items-center gap-4 text-center animate-slide-up">
          <div className="text-6xl animate-float-slow md:text-7xl">👨‍💻</div>
          <h1 className="bg-linear-to-r from-accent-purple via-accent-cyan to-accent-pink bg-clip-text text-4xl font-bold text-transparent animate-slide-up md:text-5xl">
            Sobre mim
          </h1>
        </div>
      </Reveal>

      <Reveal delay={0.06} y={18}>
        <div className="flex flex-col gap-6 rounded-2xl border border-accent-purple/20 bg-linear-to-br from-secondary/50 to-secondary/30 p-8 backdrop-blur-sm animate-slide-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Olá, Dev! 👋
          </h2>

          <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
            {bio ||
              `É um prazer te receber no meu blog! Atualmente trabalho ${company ? `no ${company}` : 'como desenvolvedor'} e moro em ${displayLocation}. Espero que meus artigos possam te ajudar de alguma forma, e se você tem alguma sugestão, me envie uma mensagem!`}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
              <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
                {public_repos}
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
                Repositórios
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
              <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
                {followers}
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
                Seguidores
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12} y={16}>
        <div className="flex flex-col gap-8 animate-slide-up">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-white md:text-4xl">
            <span className="text-accent-cyan">🚀</span> Projetos em Destaque
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <Reveal key={repo.id} delay={0.16 + index * 0.04} y={14}>
                <a
                  className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-accent-purple/20 bg-linear-to-br from-secondary/80 to-secondary/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55 hover:shadow-glow-cyan"
                  href={repo.html_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                      📦
                    </div>
                    <h3 className="truncate text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent-cyan">
                      {repo.name}
                    </h3>
                  </div>

                  <p className="line-clamp-2 grow text-sm text-gray-400">
                    {repo.description || 'Sem descrição disponível'}
                  </p>

                  <div className="flex items-center justify-between border-t border-accent-purple/20 pt-4">
                    {repo.language && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="h-3 w-3 rounded-full bg-accent-cyan" />
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <span>⭐</span> {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🔀</span> {repo.forks_count}
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
