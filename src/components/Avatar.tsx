// Sistema de avatar generativo minimalista futurista
// Inspirado en Duolingo pero más abstracto y moderno

interface AvatarConfig {
  name: string
  email: string
  size?: number
}

// Generar colores consistentes desde string
function stringToColor(str: string): { primary: string; secondary: string; accent: string } {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const hue = Math.abs(hash % 360)
  
  return {
    primary: `hsl(${hue}, 70%, 60%)`,
    secondary: `hsl(${(hue + 40) % 360}, 75%, 65%)`,
    accent: `hsl(${(hue + 80) % 360}, 80%, 70%)`,
  }
}

// Generar forma única basada en nombre
function getAvatarShape(name: string): 'circle' | 'triangle' | 'square' | 'hexagon' | 'star' {
  const shapes: Array<'circle' | 'triangle' | 'square' | 'hexagon' | 'star'> = ['circle', 'triangle', 'square', 'hexagon', 'star']
  const index = name.length % shapes.length
  return shapes[index]
}

// Generar patrón único basado en email
function getPattern(email: string): 'dots' | 'waves' | 'grid' | 'rings' | 'gradient' {
  const patterns: Array<'dots' | 'waves' | 'grid' | 'rings' | 'gradient'> = ['dots', 'waves', 'grid', 'rings', 'gradient']
  const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return patterns[hash % patterns.length]
}

// Obtener iniciales
function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function generateAvatar({ name, email, size = 120 }: AvatarConfig): string {
  const colors = stringToColor(name + email)
  const shape = getAvatarShape(name)
  const pattern = getPattern(email)
  const initials = getInitials(name)

  // SVG base
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">`

  // Degradado de fondo
  svg += `
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
      </linearGradient>
      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:0.3" />
      </linearGradient>
    </defs>
  `

  // Fondo circular base
  svg += `<circle cx="60" cy="60" r="60" fill="url(#bgGradient)"/>`

  // Patrón decorativo según tipo
  if (pattern === 'dots') {
    // Puntos flotantes
    svg += `
      <circle cx="25" cy="25" r="8" fill="url(#accentGradient)" opacity="0.7"/>
      <circle cx="95" cy="30" r="6" fill="url(#accentGradient)" opacity="0.6"/>
      <circle cx="30" cy="90" r="10" fill="url(#accentGradient)" opacity="0.5"/>
      <circle cx="85" cy="85" r="7" fill="url(#accentGradient)" opacity="0.8"/>
    `
  } else if (pattern === 'waves') {
    // Ondas abstractas
    svg += `
      <path d="M 0 40 Q 30 30, 60 40 T 120 40 L 120 60 L 0 60 Z" fill="url(#accentGradient)" opacity="0.3"/>
      <path d="M 0 80 Q 30 70, 60 80 T 120 80 L 120 120 L 0 120 Z" fill="url(#accentGradient)" opacity="0.2"/>
    `
  } else if (pattern === 'grid') {
    // Grid futurista
    svg += `
      <line x1="30" y1="0" x2="30" y2="120" stroke="white" stroke-width="1" opacity="0.2"/>
      <line x1="60" y1="0" x2="60" y2="120" stroke="white" stroke-width="1" opacity="0.2"/>
      <line x1="90" y1="0" x2="90" y2="120" stroke="white" stroke-width="1" opacity="0.2"/>
      <line x1="0" y1="30" x2="120" y2="30" stroke="white" stroke-width="1" opacity="0.2"/>
      <line x1="0" y1="60" x2="120" y2="60" stroke="white" stroke-width="1" opacity="0.2"/>
      <line x1="0" y1="90" x2="120" y2="90" stroke="white" stroke-width="1" opacity="0.2"/>
    `
  } else if (pattern === 'rings') {
    // Anillos concéntricos
    svg += `
      <circle cx="60" cy="60" r="45" fill="none" stroke="white" stroke-width="2" opacity="0.15"/>
      <circle cx="60" cy="60" r="35" fill="none" stroke="white" stroke-width="2" opacity="0.2"/>
      <circle cx="60" cy="60" r="25" fill="none" stroke="white" stroke-width="2" opacity="0.25"/>
    `
  }

  // Forma central según tipo
  const centerSize = 50
  const centerX = 60
  const centerY = 60

  if (shape === 'circle') {
    svg += `<circle cx="${centerX}" cy="${centerY}" r="${centerSize / 2}" fill="white" opacity="0.95"/>`
  } else if (shape === 'triangle') {
    const h = centerSize * 0.866 // altura triángulo equilátero
    svg += `<path d="M ${centerX} ${centerY - h / 2} L ${centerX + centerSize / 2} ${centerY + h / 2} L ${centerX - centerSize / 2} ${centerY + h / 2} Z" fill="white" opacity="0.95"/>`
  } else if (shape === 'square') {
    const half = centerSize / 2
    svg += `<rect x="${centerX - half}" y="${centerY - half}" width="${centerSize}" height="${centerSize}" rx="8" fill="white" opacity="0.95"/>`
  } else if (shape === 'hexagon') {
    const r = centerSize / 2
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = centerX + r * Math.cos(angle)
      const y = centerY + r * Math.sin(angle)
      points.push(`${x},${y}`)
    }
    svg += `<polygon points="${points.join(' ')}" fill="white" opacity="0.95"/>`
  } else if (shape === 'star') {
    const outerR = centerSize / 2
    const innerR = outerR * 0.5
    const points = []
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI / 5) * i - Math.PI / 2
      const r = i % 2 === 0 ? outerR : innerR
      const x = centerX + r * Math.cos(angle)
      const y = centerY + r * Math.sin(angle)
      points.push(`${x},${y}`)
    }
    svg += `<polygon points="${points.join(' ')}" fill="white" opacity="0.95"/>`
  }

  // Iniciales centradas
  svg += `<text x="60" y="60" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${colors.primary}">${initials}</text>`

  // Detalles decorativos finales (mini formas en esquinas)
  svg += `
    <circle cx="10" cy="10" r="3" fill="white" opacity="0.6"/>
    <circle cx="110" cy="10" r="3" fill="white" opacity="0.6"/>
    <circle cx="10" cy="110" r="3" fill="white" opacity="0.6"/>
    <circle cx="110" cy="110" r="3" fill="white" opacity="0.6"/>
  `

  svg += `</svg>`

  return svg
}

// Componente React del Avatar
interface AvatarProps {
  name: string
  email: string
  size?: number
  className?: string
}

export default function Avatar({ name, email, size = 120, className = '' }: AvatarProps) {
  const svgString = generateAvatar({ name, email, size })

  return (
    <div
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  )
}

// Función para obtener URL de data del avatar (para usar en img src)
export function getAvatarDataUrl({ name, email, size = 120 }: AvatarConfig): string {
  const svg = generateAvatar({ name, email, size })
  const base64 = btoa(unescape(encodeURIComponent(svg)))
  return `data:image/svg+xml;base64,${base64}`
}
