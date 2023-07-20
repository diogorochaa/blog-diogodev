import { siteConfig } from '@/config'

import * as S from './styles'

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

export default function AboutPage() {
  return (
    <main>
      <S.Subtitle>Sobre mim</S.Subtitle>

      <S.ImageContainer>
        <S.Image
          src="/assets/images/logo.png"
          alt="Foto de exemplo"
          fill
          quality={100}
        />
      </S.ImageContainer>

      <S.Subtitle>Olá, Dev!!! É um prazer te receber no meu blog!.</S.Subtitle>

      <S.Paragraph>
        Me chamo Diogo Rocha e trabalho como Engenheiro de Software a 4 anos,
        meus estudos sempre foram focados para programação web, que foi onde me
        encontrei dentro da área.
      </S.Paragraph>

      <S.Paragraph>
        Conheci programação com 17 anos, logo quando finalizei os estudos
        básicos, ingressei no curso de Ciências da Computação, onde consegui me
        aprofundar melhor nos conceitos, e desde então não parei mais.
      </S.Paragraph>

      <S.Paragraph>
        Nas horas vagas eu geralmente estou lendo algumas novidades sobre
        tecnologia, agora estou me aprofundando em alguns conceitos de
        arquitetura limpa, iniciei meus estudos no backend no começo desse ano,
        pretendo me tornar fullstack até o final de 2024.
      </S.Paragraph>
      <S.Paragraph>
        Você pode me encontrar nas redes sociais que estão no rodapé do blog,
        sempre estou trocando ideias com a galera!
      </S.Paragraph>
      <S.Paragraph>
        Espero que meus artigos possam te ajudar de alguma forma, e se você tem
        alguma sugestão, me envie uma mensagem!
      </S.Paragraph>
    </main>
  )
}
