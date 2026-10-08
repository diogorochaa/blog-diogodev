import { OG_IMAGE_SIZE } from './metadata.constants'

export const ogImageSize = OG_IMAGE_SIZE
export const ogImageContentType = 'image/png'

const COLORS = {
  bg: '#2f7f27',
  surface: '#16226a',
  ink: '#ffffff',
  muted: '#c3cdf5',
  accent: '#ffd23f',
  line: '#e4e9ff',
  divider: '#3a4aa6',
  pitch: '#286f21',
  pitchLine: '#f4f8ee',
  score: '#ffd23f',
  outline: '#08102f',
}

type BrandOgImageProps = {
  badge: string
  title: string
  description?: string
  footer?: string
  chips?: string[]
}

const truncateOgText = (value: string, maxLength: number) =>
  value.length <= maxLength ? value : `${value.slice(0, maxLength - 1)}…`

export const BrandOgImage = ({
  badge,
  title,
  description,
  footer,
  chips = [],
}: BrandOgImageProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: COLORS.bg,
        color: COLORS.ink,
        fontFamily: 'system-ui, sans-serif',
        padding: '36px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          border: `4px solid ${COLORS.line}`,
          background: COLORS.surface,
          boxShadow: `12px 12px 0 0 ${COLORS.outline}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 32px',
            borderBottom: `4px solid ${COLORS.divider}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '18px',
                height: '18px',
                background: COLORS.accent,
              }}
            />
            Diogo FC
          </div>
          <div
            style={{
              display: 'flex',
              border: `3px solid ${COLORS.accent}`,
              color: COLORS.accent,
              padding: '8px 16px',
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            flexGrow: 1,
            padding: '0 40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 66,
              lineHeight: 1.05,
              fontWeight: 800,
              maxWidth: '96%',
            }}
          >
            {truncateOgText(title, 90)}
          </div>
          {description ? (
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                lineHeight: 1.35,
                color: COLORS.muted,
                maxWidth: '92%',
              }}
            >
              {truncateOgText(description, 150)}
            </div>
          ) : null}
          {chips.length > 0 ? (
            <div style={{ display: 'flex', gap: '12px' }}>
              {chips.slice(0, 3).map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: 'flex',
                    border: `3px solid ${COLORS.divider}`,
                    padding: '6px 14px',
                    fontSize: 20,
                    color: COLORS.ink,
                  }}
                >
                  {truncateOgText(chip, 18)}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 32px',
            background: COLORS.pitch,
            borderTop: `4px solid ${COLORS.pitchLine}`,
            fontSize: 20,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', color: COLORS.score }}>
            {footer ?? 'Diogo Rocha · Engenharia de software'}
          </div>
          <div style={{ display: 'flex', color: COLORS.ink }}>
            Aperte start ▶
          </div>
        </div>
      </div>
    </div>
  )
}
