import { siteConfig } from '@/config'

import * as S from './styles'
import { Profile, Repo } from '@/models'

export const metadata = {
  title: 'Sobre mim',
  description: 'Sobre mim',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    title: 'Sobre mim',
    url: '/about',
    description: 'Sobre mim',
    siteName: 'Sobre mim',
    images: [
      {
        url: `${siteConfig.url}/assets/images/logo.png`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mim',
    description: 'Sobre mim',
    images: [`${siteConfig.url}/assets/images/logo.png`],
  },
}

async function getApiGithub(): Promise<Profile> {
  const res = await fetch('https://api.github.com/users/diogorochaa')
  return await res.json()
}

async function getApiGithubRepos(): Promise<Repo> {
  const data = await fetch('https://api.github.com/users/diogorochaa/repos')
  return await data.json()
}

export default async function AboutPage() {
  const { avatar_url, company, location } = await getApiGithub()
  const data = await getApiGithubRepos()
  console.log('REPOS', data)

  return (
    <S.Container>
      <S.Subtitle>Sobre mim</S.Subtitle>
      <S.ImageContainer>
        <S.Image
          src={`${avatar_url}`}
          alt="Foto de exemplo"
          fill
          quality={100}
        />
      </S.ImageContainer>
      <S.Paragraph> Olá, Dev!!! </S.Paragraph>

      <S.Paragraph>
        É um prazer te receber no meu blog! Atualmente trabalho no {company} e
        moro em {location}. Espero que meus artigos possam te ajudar de alguma
        forma, e se você tem alguma sugestão, me envie uma mensagem!
      </S.Paragraph>

      <S.Subtitle> Conheça alguns dos meus Projetos</S.Subtitle>
      <S.CardContainer>
        {data.map((repo) => (
          <S.Card key={repo.id}>
            <S.CardLink href={repo.html_url} target="_blank">
              {repo.name}
            </S.CardLink>
          </S.Card>
        ))}
      </S.CardContainer>
    </S.Container>
  )
}
