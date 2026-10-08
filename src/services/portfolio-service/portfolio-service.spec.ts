import { describe, expect, it } from 'vitest'

import {
  mapCareerEntry,
  mapInterest,
  mapProfileContent,
  mapProject,
  sortCareer,
  sortProjects,
} from './portfolio-service.mappers'

describe('PortfolioService mappers', () => {
  it('maps profile data and drops invalid stats, links and tactics', () => {
    const profile = mapProfileContent({
      name: 'Diogo Rocha',
      role: 'Engenheiro de software',
      specialties: 'Fullstack · Arquitetura, IA',
      overall: 120,
      shirt_number: 10,
      player_stats: [
        { label: 'Backend', value: 94.4 },
        { label: '', value: 80 },
        { label: 'AI', value: null },
      ],
      tactics: [
        { line: 'ataque', label: 'Frontend', detail: 'Next.js' },
        { line: 'lateral', label: 'Backend', detail: '' },
        { line: 'defesa', label: '' },
      ],
      linkedin_url: 'javascript:alert(1)',
      instagram_url: { link_type: 'Web', url: 'https://instagram.com/x' },
      email: 'not-an-email',
    })

    expect(profile.specialties).toEqual(['Fullstack', 'Arquitetura', 'IA'])
    expect(profile.overall).toBe(99)
    expect(profile.shirtNumber).toBe(10)
    expect(profile.playerStats).toEqual([{ label: 'Backend', value: 94 }])
    expect(profile.tactics).toEqual([
      { line: 'ataque', label: 'Frontend', detail: 'Next.js' },
      { line: 'meio-campo', label: 'Backend', detail: '' },
    ])
    expect(profile.links.linkedin).toBe('')
    expect(profile.links.instagram).toBe('https://instagram.com/x')
    expect(profile.links.email).toBe('')
  })

  it('returns empty values for an empty profile without inventing data', () => {
    const profile = mapProfileContent({})

    expect(profile.name).toBe('')
    expect(profile.overall).toBeNull()
    expect(profile.playerStats).toEqual([])
    expect(profile.trophies).toEqual([])
    expect(profile.education).toEqual([])
    expect(profile.avatar).toEqual({})
  })

  it('maps education, treating a missing end year as in progress', () => {
    const profile = mapProfileContent({
      education: [
        { level: 'Pós-graduação', institution: 'Instituição A' },
        {
          level: 'Desconhecido',
          course: 'Bacharelado X',
          start_year: 2018,
          end_year: 2024,
        },
        { level: 'MBA' },
      ],
    })

    expect(profile.education).toEqual([
      {
        level: 'Pós-graduação',
        course: '',
        institution: 'Instituição A',
        location: '',
        startYear: null,
        endYear: null,
        inProgress: true,
      },
      {
        level: 'Graduação',
        course: 'Bacharelado X',
        institution: '',
        location: '',
        startYear: 2018,
        endYear: 2024,
        inProgress: false,
      },
    ])
  })

  it('maps project data with safe defaults', () => {
    const project = mapProject('grazz-ia', {
      title: 'Grazz IA',
      status: 'unknown',
      technologies: [{ name: 'Python' }, { name: '' }, { name: 'Next.js' }],
      github_url: { link_type: 'Web', url: 'https://github.com/x/y' },
      gallery: [{ image: {}, caption: 'vazia' }],
    })

    expect(project.uid).toBe('grazz-ia')
    expect(project.status).toBe('in_progress')
    expect(project.technologies).toEqual(['Python', 'Next.js'])
    expect(project.githubUrl).toBe('https://github.com/x/y')
    expect(project.demoUrl).toBe('')
    expect(project.gallery).toEqual([])
    expect(project.featured).toBe(false)
  })

  it('sorts projects by order, then title', () => {
    const sorted = sortProjects([
      mapProject('c', { title: 'C' }),
      mapProject('b', { title: 'B', order: 2 }),
      mapProject('a', { title: 'A', order: 1 }),
    ])

    expect(sorted.map((project) => project.uid)).toEqual(['a', 'b', 'c'])
  })

  it('marks career entries without end date as the current season', () => {
    const current = mapCareerEntry('1', {
      company: 'ACME',
      start_date: '2024-01-01',
    })
    const past = mapCareerEntry('2', {
      company: 'Old Co',
      start_date: '2020-03-01',
      end_date: '2023-12-31',
    })

    expect(current.isCurrent).toBe(true)
    expect(past.isCurrent).toBe(false)
    expect(sortCareer([current, past]).map((entry) => entry.id)).toEqual([
      '2',
      '1',
    ])
  })

  it('falls back to a known interest category', () => {
    const interest = mapInterest('1', { title: 'Cozinha', category: 'chef' })

    expect(interest.category).toBe('technology')
  })
})
