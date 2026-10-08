export type PrismicGroup = Array<Record<string, unknown>>

export type PrismicProfileData = {
  name?: unknown
  role?: unknown
  specialties?: unknown
  location?: unknown
  avatar?: unknown
  bio?: unknown
  goals?: unknown
  currently_studying?: PrismicGroup
  education?: PrismicGroup
  shirt_number?: unknown
  position?: unknown
  play_style?: unknown
  formation?: unknown
  overall?: unknown
  player_stats?: PrismicGroup
  tactics_title?: unknown
  tactics_description?: unknown
  tactics?: PrismicGroup
  tactics_principles?: PrismicGroup
  trophies?: PrismicGroup
  github_username?: unknown
  linkedin_url?: unknown
  instagram_url?: unknown
  twitter_url?: unknown
  email?: unknown
}

export type PrismicProjectData = {
  title?: unknown
  short_description?: unknown
  description?: unknown
  cover_image?: unknown
  gallery?: PrismicGroup
  status?: unknown
  featured?: unknown
  order?: unknown
  category?: unknown
  technologies?: PrismicGroup
  github_url?: unknown
  demo_url?: unknown
  problem?: unknown
  solution?: unknown
  architecture?: unknown
  technical_decisions?: unknown
  technical_challenges?: unknown
  learnings?: unknown
}

export type PrismicCareerData = {
  company?: unknown
  role?: unknown
  stage_label?: unknown
  start_date?: unknown
  end_date?: unknown
  description?: unknown
  responsibilities?: unknown
  highlights?: PrismicGroup
  technologies?: PrismicGroup
  order?: unknown
  active?: unknown
}

export type PrismicInterestData = {
  title?: unknown
  category?: unknown
  description?: unknown
  image?: unknown
  order?: unknown
  active?: unknown
}
