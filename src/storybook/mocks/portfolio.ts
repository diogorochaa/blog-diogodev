import type * as prismic from '@prismicio/client'

import type { ProfileContent } from '@/models'

/**
 * Development/test fixtures only. Real content lives in Prismic; these values
 * are placeholders and must never be imported by application routes.
 */

const paragraph = (text: string): prismic.RichTextField => [
  { type: 'paragraph', text, spans: [] },
]

export const mockProfile: ProfileContent = {
  name: 'Jogador Exemplo',
  role: 'Engenheiro de software',
  specialties: ['Fullstack', 'Arquitetura', 'IA'],
  location: 'Cidade Exemplo',
  avatar: {},
  bio: paragraph('Bio de exemplo usada apenas no Storybook e nos testes.'),
  goals: paragraph('Objetivo de exemplo.'),
  currentlyStudying: ['Tópico A', 'Tópico B'],
  education: [
    {
      level: 'Pós-graduação',
      course: 'Curso de exemplo',
      institution: 'Instituição Exemplo',
      location: 'Cidade Exemplo',
      startYear: 2025,
      endYear: null,
      inProgress: true,
    },
    {
      level: 'Graduação',
      course: 'Bacharelado de exemplo',
      institution: 'Instituição Exemplo',
      location: 'Cidade Exemplo',
      startYear: 2018,
      endYear: 2022,
      inProgress: false,
    },
  ],
  shirtNumber: 10,
  position: 'Meia-armador',
  playStyle: 'Construção de jogadas',
  formation: '4-3-3',
  overall: null,
  playerStats: [
    { label: 'Arquitetura', value: 80 },
    { label: 'Backend', value: 75 },
    { label: 'Frontend', value: 70 },
  ],
  tacticsTitle: 'Quadro tático de exemplo',
  tacticsDescription: 'Descrição de exemplo.',
  tactics: [
    { line: 'ataque', label: 'Frontend', detail: 'Camada A' },
    { line: 'meio-campo', label: 'API', detail: 'Camada B' },
    { line: 'defesa', label: 'Serviços', detail: 'Camada C' },
    { line: 'goleiro', label: 'Dados', detail: 'Camada D' },
  ],
  tacticsPrinciples: ['Princípio A', 'Princípio B'],
  trophies: [
    { title: 'Troféu exemplo', description: 'Contexto', year: '2026' },
  ],
  githubUsername: '',
  links: {
    github: '',
    linkedin: 'https://www.linkedin.com/in/exemplo',
    instagram: '',
    twitter: '',
    email: '',
  },
}
