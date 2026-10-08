import type { GithubProfile, ProfileContent } from '@/models'

export type SocialLinkKind =
  | 'github'
  | 'linkedin'
  | 'instagram'
  | 'twitter'
  | 'email'

export type SocialLink = {
  kind: SocialLinkKind
  label: string
  href: string
}

export type PlayerIdentity = {
  name: string
  role: string
  specialties: string[]
  location: string
  avatarUrl: string
  avatarAlt: string
  shirtNumber: number | null
  position: string
  playStyle: string
  formation: string
  links: SocialLink[]
}

type FallbackLinks = Partial<Record<SocialLinkKind, string>>

type BuildPlayerIdentityParams = {
  profile: ProfileContent | null
  github: GithubProfile
  githubUrl: string
  /** Used only while the Prismic profile document has no social links. */
  fallbackLinks: FallbackLinks
}

const LINK_LABELS: Record<SocialLinkKind, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  twitter: 'Twitter / X',
  email: 'Email',
}

const LINK_ORDER: SocialLinkKind[] = [
  'github',
  'linkedin',
  'instagram',
  'twitter',
  'email',
]

export const buildPlayerIdentity = ({
  profile,
  github,
  githubUrl,
  fallbackLinks,
}: BuildPlayerIdentityParams): PlayerIdentity => {
  const name = profile?.name || github.name
  const profileLinks = profile?.links
  const hasProfileLinks = Boolean(
    profileLinks &&
      (profileLinks.linkedin ||
        profileLinks.instagram ||
        profileLinks.twitter ||
        profileLinks.email),
  )

  const hrefs: FallbackLinks = hasProfileLinks
    ? {
        github: githubUrl,
        linkedin: profileLinks?.linkedin,
        instagram: profileLinks?.instagram,
        twitter: profileLinks?.twitter,
        email: profileLinks?.email ? `mailto:${profileLinks.email}` : '',
      }
    : { ...fallbackLinks, github: githubUrl }

  return {
    name,
    role: profile?.role ?? '',
    specialties: profile?.specialties ?? [],
    location: profile?.location || github.location || '',
    avatarUrl: profile?.avatar.url || github.avatar_url,
    avatarAlt: profile?.avatar.alt || `Foto de ${name}`,
    shirtNumber: profile?.shirtNumber ?? null,
    position: profile?.position ?? '',
    playStyle: profile?.playStyle ?? '',
    formation: profile?.formation ?? '',
    links: LINK_ORDER.filter((kind) => hrefs[kind]).map((kind) => ({
      kind,
      label: LINK_LABELS[kind],
      href: hrefs[kind] as string,
    })),
  }
}
