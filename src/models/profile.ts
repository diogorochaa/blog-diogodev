import type { ImageField, RichTextField } from '@prismicio/client'

export type PlayerStat = {
  label: string
  value: number
}

export const TACTICS_LINES = [
  'ataque',
  'meio-campo',
  'defesa',
  'goleiro',
] as const

export type TacticsLine = (typeof TACTICS_LINES)[number]

export type TacticsItem = {
  line: TacticsLine
  label: string
  detail: string
}

export type Trophy = {
  title: string
  description: string
  year: string
}

export const EDUCATION_LEVELS = [
  'Graduação',
  'Pós-graduação',
  'MBA',
  'Mestrado',
  'Doutorado',
  'Técnico',
  'Curso livre',
] as const

export type EducationLevel = (typeof EDUCATION_LEVELS)[number]

export type Education = {
  level: EducationLevel
  course: string
  institution: string
  location: string
  startYear: number | null
  endYear: number | null
  inProgress: boolean
}

export type ProfileLinks = {
  github: string
  linkedin: string
  instagram: string
  twitter: string
  email: string
}

export type ProfileContent = {
  name: string
  role: string
  specialties: string[]
  location: string
  avatar: ImageField
  bio: RichTextField
  goals: RichTextField
  currentlyStudying: string[]
  education: Education[]
  shirtNumber: number | null
  position: string
  playStyle: string
  formation: string
  overall: number | null
  playerStats: PlayerStat[]
  tacticsTitle: string
  tacticsDescription: string
  tactics: TacticsItem[]
  tacticsPrinciples: string[]
  trophies: Trophy[]
  githubUsername: string
  links: ProfileLinks
}
