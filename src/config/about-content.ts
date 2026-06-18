import type { AboutContent } from '@/models/about-content'

export const fallbackAboutContent: AboutContent = {
  title: 'Sobre mim',
  greeting: 'Olá, Dev! 👋',
  intro:
    'É um prazer te receber no meu blog!\nEspero que meus artigos possam te ajudar de alguma forma. Se você tiver alguma sugestão, me envie uma mensagem!',
  avatarAlt: 'Foto de perfil do Diogo Rocha',
  reposLabel: 'Repositórios',
  followersLabel: 'Seguidores',
  experienceHeading: 'Experiência Técnica',
  experienceDescription:
    'Linha do tempo das tecnologias com mais vivência prática no dia a dia.',
  projectsHeading: 'Projetos em Destaque',
  emptyProjectsText: 'Nenhum repositório disponível no momento.',
  githubLinkLabel: 'Visite meu GitHub',
  seoTitle: 'Sobre mim',
  seoDescription:
    'Conheça mais sobre Diogo Rocha, trajetória e projetos em destaque.',
  ogTitle: 'Diogo Rocha',
  ogDescription: 'Trajetória, experiência e projetos em destaque.',
  slices: [],
  experiences: [
    {
      name: 'JavaScript',
      startYear: 2019,
      color: '#facc15',
      category: 'frontend',
      iconKey: 'javascript',
    },
    {
      name: 'CSS',
      startYear: 2019,
      color: '#38bdf8',
      category: 'frontend',
      iconKey: 'css',
    },
    {
      name: 'HTML',
      startYear: 2019,
      color: '#fb923c',
      category: 'frontend',
      iconKey: 'html',
    },
    {
      name: 'React',
      startYear: 2020,
      color: '#22d3ee',
      category: 'frontend',
      iconKey: 'react',
    },
    {
      name: 'Next.js',
      startYear: 2021,
      color: '#f8fafc',
      category: 'frontend',
      iconKey: 'nextjs',
    },
    {
      name: 'Node.js',
      startYear: 2022,
      color: '#4ade80',
      category: 'backend',
      iconKey: 'nodejs',
    },
    {
      name: 'Docker',
      startYear: 2023,
      color: '#3b82f6',
      category: 'backend',
      iconKey: 'docker',
    },
  ],
}
