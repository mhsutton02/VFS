interface SectionDividerProps {
  variant: 'wave' | 'slant' | 'curve'
  flip?: boolean
  color?: string
  className?: string
}

export default function SectionDivider({
  variant,
  flip = false,
  color = 'currentColor',
  className = ''
}: SectionDividerProps) {
  const svgPaths = {
    wave: 'M0,32 C160,80 320,0 480,48 C640,96 800,16 960,64 L960,0 L0,0 Z',
    slant: 'M0,0 L960,64 L960,0 Z',
    curve: 'M0,0 C320,80 640,80 960,0 L960,0 L0,0 Z'
  }

  return (
    <div className={`vf-divider-top ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 960 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: flip ? 'scaleY(-1)' : 'none'
        }}
      >
        <path d={svgPaths[variant]} fill={color} />
      </svg>
    </div>
  )
}
