
type Props = any

function getObjectPosition(fx?: number, fy?: number) {
  const x = typeof fx === 'number' ? Math.max(0, Math.min(100, fx)) : 50
  const y = typeof fy === 'number' ? Math.max(0, Math.min(100, fy)) : 50
  return `${x}% ${y}%`
}

export default function VideoPreview(props: Props) {
  // Sanity passes selected fields directly or under props.value depending on context
  const data = props?.value ?? props
  const poster = data?.poster?.asset?.url || data?.poster?.url
  const focusX = data?.focusX
  const focusY = data?.focusY
  const display = data?.display ?? 'cover'

  const objectFit = display === 'cover' ? 'cover' : 'contain'
  const objectPosition = getObjectPosition(focusX, focusY)

  return (
    <div style={{ width: 320, height: 180, background: '#111', borderRadius: 6, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={data?.title || 'video poster'}
          style={{ width: '100%', height: '100%', objectFit, objectPosition }}
        />
      ) : (
        <div style={{ color: '#888', fontSize: 12 }}>No poster preview</div>
      )}
      <div style={{ position: 'absolute', left: 8, bottom: 6, color: 'white', fontSize: 12, textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>{display}</div>
    </div>
  )
}
