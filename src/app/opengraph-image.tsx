import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config'

export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        background:
          'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.8) 40%, rgba(15, 23, 42, 1) 100%)',
        color: '#22d3ee',
        fontFamily: 'system-ui, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -24,
          left: -40,
          width: 260,
          height: 260,
          borderRadius: '9999px',
          background: 'rgba(34, 211, 238, 0.2)',
          filter: 'blur(60px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 110,
          right: -28,
          width: 220,
          height: 220,
          borderRadius: '9999px',
          background: 'rgba(139, 92, 246, 0.25)',
          filter: 'blur(56px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: -18,
          left: 390,
          width: 180,
          height: 180,
          borderRadius: '9999px',
          background: 'rgba(59, 130, 246, 0.25)',
          filter: 'blur(52px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(110deg, transparent 25%, rgba(139, 92, 246, 0.15) 50%, transparent 75%)',
          backgroundSize: '200% 100%',
          backgroundPosition: '100% 0',
        }}
      />

      <div
        style={{
          zIndex: 1,
          display: 'flex',
          borderRadius: '9999px',
          border: '1px solid rgba(34, 211, 238, 0.4)',
          background: 'rgba(34, 211, 238, 0.1)',
          padding: '18px 32px',
          fontSize: 52,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        Post
      </div>
    </div>,
    {
      ...size,
    },
  )
}
