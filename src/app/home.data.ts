import { siteConfig } from '@/config'
import { buildPlayerCardStats, getPlayerData } from '@/lib/player'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'

import type { BlogPost, HomeContent } from '@/models'
import {
  ContentService,
  GithubService,
  PortfolioService,
  PostService,
} from '@/services'
import { getExperienceYears } from '@/utils'

import type {
  HomeBlogJsonLd,
  HomePageData,
  HomeTrophy,
  HomeWebsiteJsonLd,
} from './home.types'

const LATEST_ARTICLES_LIMIT = 3
const FEATURED_MATCHES_LIMIT = 3
const HOME_CAREER_LIMIT = 3

export const getHomeContent = () => ContentService.getHomeContent()

export const buildHomeMetadata = async () => {
  const content = await getHomeContent()

  return buildPageMetadata({
    title: content.ogTitle === siteConfig.name ? undefined : content.ogTitle,
    description: content.description || siteConfig.description,
    path: '/',
    image: '/opengraph-image',
    imageAlt: content.ogTitle || siteConfig.name,
  })
}

export const getHomePageData = async (): Promise<HomePageData> => {
  const [
    homeContent,
    aboutContent,
    player,
    postsResult,
    projects,
    career,
    interests,
  ] = await Promise.all([
    getHomeContent(),
    ContentService.getAboutContent(),
    getPlayerData(),
    PostService.getAll({ limit: LATEST_ARTICLES_LIMIT }),
    PortfolioService.getProjects(),
    PortfolioService.getCareer(),
    PortfolioService.getInterests(),
  ])

  const featuredProjects = await PortfolioService.getFeaturedProjects(
    FEATURED_MATCHES_LIMIT,
  )
  const friendlyRepos =
    featuredProjects.length === 0
      ? await GithubService.getRepos(player.githubUsername)
      : []

  const experienceYears = getExperienceYears(aboutContent.experiences)
  const trophyCandidates: Array<HomeTrophy | null> = [
    postsResult.totalPosts > 0
      ? { title: 'Artigos publicados', value: postsResult.totalPosts }
      : null,
    experienceYears > 0
      ? { title: 'Anos em campo', value: experienceYears }
      : null,
    aboutContent.experiences.length > 0
      ? {
          title: 'Tecnologias no elenco',
          value: aboutContent.experiences.length,
        }
      : null,
    projects.length > 0
      ? { title: 'Partidas documentadas', value: projects.length }
      : null,
    ...(player.profile?.trophies ?? []).map((trophy) => ({
      title: trophy.title,
      description: trophy.description,
      year: trophy.year,
    })),
  ]
  const trophies = trophyCandidates.filter(
    (trophy): trophy is HomeTrophy => trophy !== null,
  )

  return {
    homeContent,
    identity: player.identity,
    profile: player.profile,
    githubUsername: player.githubUsername,
    playerCard: buildPlayerCardStats(player.profile, aboutContent.experiences),
    currentSeason: career.find((entry) => entry.isCurrent) ?? null,
    featuredProjects,
    friendlyRepos: friendlyRepos.slice(0, FEATURED_MATCHES_LIMIT),
    career: career.slice(-HOME_CAREER_LIMIT),
    careerOffset: Math.max(0, career.length - HOME_CAREER_LIMIT),
    trophies,
    interests,
    latestPosts: postsResult.posts,
    totalPosts: postsResult.totalPosts,
  }
}

export const buildWebsiteJsonLd = (content: HomeContent): HomeWebsiteJsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'pt-BR',
    description: content.description || siteConfig.description,
  }
}

export const buildBlogJsonLd = (
  posts: BlogPost[],
  content: HomeContent,
): HomeBlogJsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    url: `${siteConfig.url}/blog`,
    description: content.description || siteConfig.description,
    inLanguage: 'pt-BR',
    blogPost: posts.slice(0, content.featuredPostsLimit).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      datePublished: post.frontmatter.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
      timeRequired: `PT${post.readingTime}M`,
    })),
  }
}
