/** Square "D" badge used by favicon and apple-touch-icon. */
export const BrandIcon = ({ size }: { size: number }) => {
  const border = Math.max(2, Math.round(size / 10))

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#16226a',
        border: `${border}px solid #e4e9ff`,
        color: '#ffd23f',
        fontSize: Math.round(size * 0.6),
        fontWeight: 900,
        fontFamily: 'monospace',
      }}
    >
      D
    </div>
  )
}
