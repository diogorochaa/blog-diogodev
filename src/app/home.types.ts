import type { PlayerCardStat } from '@/components/PlayerCard'
import type {
  BlogPost,
  CareerEntry,
  HomeContent,
  Interest,
  ProfileContent,
  Project,
  Repo,
} from '@/models'
import type { PlayerIdentity } from '@/utils/player-identity'

export type HomeWebsiteJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  inLanguage: 'pt-BR'
  description: string
}

export type HomeBlogJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'Blog'
  name: string
  url: string
  description: string
  inLanguage: 'pt-BR'
  blogPost: Array<{
    '@type': 'BlogPosting'
    headline: string
    description: string
    datePublished: string
    url: string
    timeRequired: string
  }>
}

export type HomeTrophy = {
  title: string
  value?: number
  description?: string
  year?: string
}

export type HomePageData = {
  homeContent: HomeContent
  identity: PlayerIdentity
  profile: ProfileContent | null
  githubUsername?: string
  playerCard: {
    title: string
    stats: PlayerCardStat[]
    overall: number | null
    note: string
  }
  currentSeason: CareerEntry | null
  featuredProjects: Project[]
  friendlyRepos: Repo[]
  career: CareerEntry[]
  careerOffset: number
  trophies: HomeTrophy[]
  interests: Interest[]
  latestPosts: BlogPost[]
  totalPosts: number
}

export type HomePageContentProps = HomePageData & {
  websiteJsonLd: HomeWebsiteJsonLd
  blogJsonLd: HomeBlogJsonLd
}
