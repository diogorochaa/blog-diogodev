import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '36px',
        background:
          'linear-gradient(135deg, #22d3ee 0%, #a855f7 55%, #f472b6 100%)',
        color: '#05050a',
        fontSize: 96,
        fontWeight: 800,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      D
    </div>,
    {
      ...size,
    },
  )
}
