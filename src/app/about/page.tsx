import type { Metadata } from 'next'

import { siteConfig } from '@/config'

import { Reveal } from '@/components/Motion'
import { Profile, Repo } from '@/models'
import * as S from './styles'

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
    <S.Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Reveal y={20}>
        <S.Header>
          <S.Badge>👨‍💻</S.Badge>
          <S.Title>Sobre mim</S.Title>
        </S.Header>
      </Reveal>

      <Reveal delay={0.06} y={18}>
        <S.IntroSection>
          <S.Greeting>Olá, Dev! 👋</S.Greeting>

          <S.Description>
            {bio ||
              `É um prazer te receber no meu blog! Atualmente trabalho ${company ? `no ${company}` : 'como desenvolvedor'} e moro em ${displayLocation}. Espero que meus artigos possam te ajudar de alguma forma, e se você tem alguma sugestão, me envie uma mensagem!`}
          </S.Description>

          <S.StatsContainer>
            <S.StatCard>
              <S.StatNumber>{public_repos}</S.StatNumber>
              <S.StatLabel>Repositórios</S.StatLabel>
            </S.StatCard>
            <S.StatCard>
              <S.StatNumber>{followers}</S.StatNumber>
              <S.StatLabel>Seguidores</S.StatLabel>
            </S.StatCard>
          </S.StatsContainer>
        </S.IntroSection>
      </Reveal>

      <Reveal delay={0.12} y={16}>
        <S.ProjectsSection>
          <S.SectionTitle>
            <span className="text-accent-cyan">🚀</span> Projetos em Destaque
          </S.SectionTitle>

          <S.ProjectsGrid>
            {repos.map((repo, index) => (
              <Reveal key={repo.id} delay={0.16 + index * 0.04} y={14}>
                <S.ProjectCard href={repo.html_url} target="_blank">
                  <S.ProjectHeader>
                    <S.ProjectIcon>📦</S.ProjectIcon>
                    <S.ProjectName>{repo.name}</S.ProjectName>
                  </S.ProjectHeader>

                  <S.ProjectDescription>
                    {repo.description || 'Sem descrição disponível'}
                  </S.ProjectDescription>

                  <S.ProjectFooter>
                    {repo.language && (
                      <S.ProjectLanguage>
                        <S.LanguageDot />
                        {repo.language}
                      </S.ProjectLanguage>
                    )}
                    <S.ProjectStats>
                      <S.ProjectStat>
                        <span>⭐</span> {repo.stargazers_count}
                      </S.ProjectStat>
                      <S.ProjectStat>
                        <span>🔀</span> {repo.forks_count}
                      </S.ProjectStat>
                    </S.ProjectStats>
                  </S.ProjectFooter>
                </S.ProjectCard>
              </Reveal>
            ))}
          </S.ProjectsGrid>
        </S.ProjectsSection>
      </Reveal>
    </S.Container>
  )
}
