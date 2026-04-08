import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config'

import { getPostBySlug } from './post.data'

export const alt = 'Capa do post'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

type OpenGraphImageProps = {
  params: Promise<{
    slug: string
  }>
}

const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1)}...`
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const title = truncate(post?.frontmatter.title ?? 'Post nao encontrado', 84)
  const description = truncate(
    post?.frontmatter.description ??
      `Conteudo do blog ${siteConfig.name} sobre desenvolvimento de software.`,
    150,
  )
  const tags = post?.frontmatter.tags.slice(0, 3) ?? []

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px',
        background:
          'radial-gradient(circle at 15% 15%, rgba(252, 211, 77, 0.22) 0%, transparent 44%), radial-gradient(circle at 82% 76%, rgba(249, 115, 22, 0.2) 0%, transparent 40%), linear-gradient(130deg, #111111 0%, #191919 42%, #2a1405 100%)',
        color: '#fff7ed',
        fontFamily: 'Sora, Manrope, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '-180px',
          width: '560px',
          height: '560px',
          borderRadius: '560px',
          border: '1px solid rgba(253, 186, 116, 0.25)',
          background: 'rgba(251, 146, 60, 0.05)',
          transform: 'rotate(12deg)',
          display: 'flex',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '-180px',
          left: '-140px',
          width: '460px',
          height: '460px',
          borderRadius: '9999px',
          border: '1px solid rgba(251, 146, 60, 0.2)',
          display: 'flex',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: '-90px',
          bottom: '-72px',
          width: '420px',
          height: '170px',
          borderTopLeftRadius: '30px',
          background:
            'linear-gradient(90deg, rgba(251, 146, 60, 0.4), rgba(251, 191, 36, 0.1))',
          display: 'flex',
          transform: 'rotate(-8deg)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          borderRadius: '28px',
          border: '1px solid rgba(255, 237, 213, 0.24)',
          background: 'rgba(17, 17, 17, 0.68)',
          padding: '34px 38px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: 21,
              color: '#fdba74',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                display: 'flex',
                borderRadius: '9999px',
                background: '#f97316',
              }}
            />
            Destaque
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 17,
              color: '#fed7aa',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '92%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 800,
              color: '#fff7ed',
              textWrap: 'balance',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 29,
              lineHeight: 1.32,
              color: '#fed7aa',
              maxWidth: '98%',
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {tags.length > 0 ? (
              tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    borderRadius: '9999px',
                    border: '1px solid rgba(254, 215, 170, 0.45)',
                    padding: '9px 16px',
                    fontSize: 19,
                    color: '#ffedd5',
                    background: 'rgba(124, 45, 18, 0.3)',
                  }}
                >
                  #{truncate(tag, 16)}
                </div>
              ))
            ) : (
              <div
                style={{
                  display: 'flex',
                  borderRadius: '9999px',
                  border: '1px solid rgba(251, 146, 60, 0.55)',
                  padding: '9px 16px',
                  fontSize: 19,
                  color: '#fdba74',
                  background: 'rgba(154, 52, 18, 0.25)',
                }}
              >
                #blog
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#fdba74',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            /{slug}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
