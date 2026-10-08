import type { RichTextField } from '@prismicio/client'

import type { ExperienceCategory } from '@/models/experience'
import type { PrismicSlice } from '@/slices/slice.types'

export type PrismicHomeData = {
  hero_badge?: unknown
  title?: unknown
  subtitle?: RichTextField | string
  description?: unknown
  featured_posts_limit?: unknown
  slices?: PrismicSlice[]
  og_title?: unknown
  og_description?: unknown
}

export type PrismicPageData = {
  title?: unknown
  description?: unknown
  show_in_header?: unknown
  nav_label?: unknown
  nav_order?: unknown
  show_in_footer?: unknown
  footer_label?: unknown
  footer_order?: unknown
  slices?: PrismicSlice[]
}

export type PrismicAboutExperience = {
  name?: unknown
  start_year?: unknown
  category?: ExperienceCategory | string
  icon_key?: unknown
  color?: unknown
  level?: unknown
  active?: unknown
}

export type PrismicAboutData = {
  title?: unknown
  greeting?: unknown
  intro?: RichTextField | string
  avatar_alt?: unknown
  repos_label?: unknown
  followers_label?: unknown
  experience_heading?: unknown
  experience_description?: unknown
  projects_heading?: unknown
  empty_projects_text?: unknown
  github_link_label?: unknown
  seo_title?: unknown
  seo_description?: unknown
  og_title?: unknown
  og_description?: unknown
  experiences?: PrismicAboutExperience[]
  slices?: PrismicSlice[]
}
