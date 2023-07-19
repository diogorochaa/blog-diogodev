import Link from 'next/link'

import { siteConfig, socialLinkConfig } from '@/config'

import { Layout } from '@/components/Layout'
import { List, ListItem } from '@/components/List'
import { Logo } from '@/components/Logo'
import { SocialMedia } from '@/components/SocialMedia'

import { NavItem } from '@/models'

import * as S from './styles'

type FooterProps = {
  items: NavItem[]
}

export const Footer = ({ items }: FooterProps) => {
  const fullYear = new Date().getFullYear()

  return (
    <Layout>
      <S.Container>
        <S.Content>
          <S.Section role="contentinfo">
            <Logo />
            <S.Title>{siteConfig.title}</S.Title>
          </S.Section>

          <S.Section role="contentinfo">
            <S.Title>Social</S.Title>

            <SocialMedia items={socialLinkConfig.mainNav} />
          </S.Section>

          <S.Section role="contentinfo">
            <S.Title>Links</S.Title>

            <List className="flex-col">
              {items.map((item) => (
                <ListItem key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </ListItem>
              ))}
            </List>
          </S.Section>
        </S.Content>

        <S.CopyrightContainer>
          <S.Copyright>
            Todos os direitos reservados © Diogo Rocha {fullYear}
          </S.Copyright>
        </S.CopyrightContainer>
      </S.Container>
    </Layout>
  )
}
