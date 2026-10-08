import { describe, expect, it } from 'vitest'

import { mockProfile } from '@/storybook/mocks/portfolio'

import { buildPlayerIdentity } from './buildPlayerIdentity'
import { formatCareerPeriod } from './formatCareerPeriod'
import { getExperienceYears } from './getExperienceYears'

const github = {
  avatar_url: 'https://avatars.githubusercontent.com/u/1',
  name: 'Nome GitHub',
  company: null,
  location: 'Brasil',
  bio: null,
  public_repos: 1,
  followers: 1,
}

describe('buildPlayerIdentity', () => {
  it('uses GitHub data and fallback links while the profile is missing', () => {
    const identity = buildPlayerIdentity({
      profile: null,
      github,
      githubUrl: 'https://github.com/x',
      fallbackLinks: { linkedin: 'https://linkedin.com/in/x' },
    })

    expect(identity.name).toBe('Nome GitHub')
    expect(identity.avatarUrl).toBe(github.avatar_url)
    expect(identity.role).toBe('')
    expect(identity.links.map((link) => link.kind)).toEqual([
      'github',
      'linkedin',
    ])
  })

  it('prefers Prismic profile data and links', () => {
    const identity = buildPlayerIdentity({
      profile: mockProfile,
      github,
      githubUrl: 'https://github.com/x',
      fallbackLinks: { instagram: 'https://instagram.com/fallback' },
    })

    expect(identity.name).toBe(mockProfile.name)
    expect(identity.shirtNumber).toBe(10)
    expect(identity.links.map((link) => link.kind)).toEqual([
      'github',
      'linkedin',
    ])
  })
})

describe('formatCareerPeriod', () => {
  it('formats past and current seasons', () => {
    expect(formatCareerPeriod('2020-01-01', '2022-12-31', false)).toBe(
      'jan 2020 — dez 2022',
    )
    expect(formatCareerPeriod('2024-03-01', '', true)).toBe('mar 2024 — atual')
    expect(formatCareerPeriod('', '', false)).toBe('')
  })
})

describe('getExperienceYears', () => {
  it('counts years since the earliest technology', () => {
    expect(
      getExperienceYears(
        [
          {
            name: 'A',
            startYear: 2018,
            color: '#fff',
            category: 'frontend',
            iconKey: 'Code',
          },
          {
            name: 'B',
            startYear: 2021,
            color: '#fff',
            category: 'backend',
            iconKey: 'Code',
          },
        ],
        2026,
      ),
    ).toBe(8)
    expect(getExperienceYears([], 2026)).toBe(0)
  })
})
