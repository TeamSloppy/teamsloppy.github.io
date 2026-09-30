import { useEffect, useId, useRef, useState } from 'react'

const palettes = {
  circle: ['#42c9b5', '#fff9ed'],
  triangle: ['#9c8fff', '#fff9ed'],
  diamond: ['#acd66b', '#294732'],
  square: ['#f4c657', '#473023'],
}
export type Shape = keyof typeof palettes

// Same body assets, palette and eye geometry as the Dashboard bot renderer.
export function Sloppie({
  shape = 'circle',
  className = '',
}: {
  shape?: Shape
  className?: string
}) {
  const id = `sloppie-${useId().replace(/:/g, '')}`
  const artwork = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = artwork.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const [body, eyes] = palettes[shape]
  const rgb = [1, 3, 5].map(
    (index) => parseInt(body.slice(index, index + 2), 16) / 255,
  )
  const width = shape === 'circle' ? 1.9 : 2.3
  const height = shape === 'circle' ? 4.2 : 2.3
  return (
    <svg
      ref={artwork}
      className={`sloppie sloppie--${shape}${visible ? ' is-awake' : ''} ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values={`${rgb[0]} 0 0 0 0 0 ${rgb[1]} 0 0 0 0 0 ${rgb[2]} 0 0 0 0 0 1 0`}
          />
        </filter>
      </defs>
      <image
        href={`/pets/bots/bot-${shape}.png`}
        width="24"
        height="24"
        filter={`url(#${id})`}
      />
      <g className="sloppie-gaze">
        {[-2.45, 2.45].map((x) => (
          <g
            key={x}
            transform={`translate(${12 + x} ${12 - (shape === 'triangle' ? 0.25 : 1.2)})`}
          >
            <g className="sloppie-blink">
              <g
                className={`sloppie-expression${x < 0 ? ' sloppie-expression--left' : ''}`}
              >
                <g className="sloppie-eye">
                  {shape === 'triangle' ? (
                    <circle r={width / 2} fill={eyes} />
                  ) : (
                    <rect
                      x={-width / 2}
                      y={-height / 2}
                      width={width}
                      height={height}
                      rx={shape === 'circle' ? width / 2 : 0.5}
                      fill={eyes}
                      transform={shape === 'diamond' ? 'rotate(45)' : undefined}
                    />
                  )}
                </g>
                <path
                  className="sloppie-smile"
                  d={`M ${-width / 2} 0 Q 0 -1.3 ${width / 2} 0`}
                  fill="none"
                  stroke={eyes}
                  strokeWidth="0.65"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>
        ))}
      </g>
    </svg>
  )
}
