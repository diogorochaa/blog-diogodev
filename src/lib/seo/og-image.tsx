import { OG_IMAGE_SIZE } from './metadata.constants'

export const ogImageSize = OG_IMAGE_SIZE
export const ogImageContentType = 'image/png'

type BrandOgImageProps = {
  badge: string
  title: string
  description?: string
  footer?: string
}

export const BrandOgImage = ({
  badge,
  title,
  description,
  footer,
}: BrandOgImageProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px',
        background:
          'radial-gradient(circle at 15% 20%, rgba(168, 85, 247, 0.18) 0%, transparent 42%), radial-gradient(circle at 85% 10%, rgba(34, 211, 238, 0.14) 0%, transparent 38%), linear-gradient(180deg, #05050a 0%, #12121f 48%, #05050a 100%)',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          borderRadius: '28px',
          border: '1px solid rgba(34, 211, 238, 0.25)',
          background: 'rgba(18, 18, 31, 0.82)',
          padding: '34px 38px',
        }}
      >
        <div
          style={{
            display: 'flex',
            borderRadius: '9999px',
            border: '1px solid rgba(168, 85, 247, 0.45)',
            background: 'rgba(168, 85, 247, 0.12)',
            padding: '10px 18px',
            fontSize: 22,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#22d3ee',
            alignSelf: 'flex-start',
          }}
        >
          {badge}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '92%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            {title}
          </div>

          {description ? (
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                lineHeight: 1.35,
                color: '#cbd5e1',
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        {footer ? (
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#94a3b8',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
