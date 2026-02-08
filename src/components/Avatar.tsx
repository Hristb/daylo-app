// Sistema de avatar generativo mejorado
interface AvatarConfig {
  name: string
  email: string
  size?: number
}

// Generar colores vibrantes desde string
function stringToColor(str: string): { primary: string; secondary: string; accent: string; bg: string } {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const hue = Math.abs(hash % 360)
  
  return {
    primary: `hsl(${hue}, 70%, 50%)`,
    secondary: `hsl(${(hue + 60) % 360}, 75%, 55%)`,
    accent: `hsl(${(hue + 120) % 360}, 80%, 60%)`,
    bg: `hsl(${(hue + 180) % 360}, 60%, 92%)`,
  }
}

// Generar estilo de avatar basado en nombre
function getAvatarStyle(name: string): 'gradient' | 'geometric' | 'pixel' | 'stripe' {
  const styles: Array<'gradient' | 'geometric' | 'pixel' | 'stripe'> = ['gradient', 'geometric', 'pixel', 'stripe']
  const index = name.charCodeAt(0) % styles.length
  return styles[index]
}

// Obtener iniciales
function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Generar patrón de fondo según estilo
function generateBackground(style: string, colors: any, email: string): string {
  if (style === 'gradient') {
    return `
      <circle cx="60" cy="60" r="60" fill="url(#mainGradient)"/>
      <circle cx="45" cy="45" r="25" fill="${colors.accent}" opacity="0.15"/>
      <circle cx="80" cy="75" r="20" fill="${colors.secondary}" opacity="0.12"/>
    `
  } else if (style === 'geometric') {
    const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    let shapes = `<circle cx="60" cy="60" r="60" fill="${colors.bg}"/>`
    
    for (let i = 0; i < 6; i++) {
      const x = ((hash * (i + 1)) % 80) + 20
      const y = ((hash * (i + 2)) % 80) + 20
      const size = ((hash * (i + 3)) % 12) + 8
      const color = i % 2 === 0 ? colors.primary : colors.secondary
      shapes += `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="0.15"/>`
    }
    return shapes
  } else if (style === 'pixel') {
    const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    let pattern = `<rect width="120" height="120" fill="${colors.bg}"/>`
    
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const index = y * 8 + x
        if ((hash >> index) & 1) {
          const size = 15
          pattern += `<rect x="${x * size}" y="${y * size}" width="${size}" height="${size}" fill="${colors.primary}" opacity="0.2" rx="2"/>`
        }
      }
    }
    return pattern
  } else { // stripe
    return `
      <rect width="120" height="120" fill="${colors.bg}"/>
      <rect x="0" y="15" width="120" height="15" fill="${colors.primary}" opacity="0.15"/>
      <rect x="0" y="45" width="120" height="15" fill="${colors.secondary}" opacity="0.12"/>
      <rect x="0" y="75" width="120" height="15" fill="${colors.accent}" opacity="0.1"/>
    `
  }
}

export function generateAvatar({ name, email, size = 120 }: AvatarConfig): string {
  const colors = stringToColor(name + email)
  const style = getAvatarStyle(name)
  const initials = getInitials(name)

  // SVG base con mejor renderizado
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%;">`

  // Degradados mejorados
  svg += `
    <defs>
      <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:0.7" />
      </linearGradient>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:white;stop-opacity:1" />
        <stop offset="100%" style="stop-color:white;stop-opacity:0.9" />
      </linearGradient>
    </defs>
  `

  // Fondo con patrón
  svg += generateBackground(style, colors, email)

  // Círculo central para las iniciales
  svg += `<circle cx="60" cy="60" r="35" fill="white" opacity="0.25"/>`
  
  // Iniciales con mejor contraste
  svg += `
    <text 
      x="60" 
      y="60" 
      text-anchor="middle" 
      dominant-baseline="central" 
      font-family="system-ui, -apple-system, sans-serif" 
      font-size="32" 
      font-weight="700" 
      fill="url(#textGradient)"
      style="text-shadow: 0 2px 4px rgba(0,0,0,0.1);"
    >${initials}</text>
  `

  // Borde decorativo
  svg += `<circle cx="60" cy="60" r="58" fill="none" stroke="white" stroke-width="2.5" opacity="0.4"/>`

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
      className={`inline-block rounded-full overflow-hidden shadow-lg ${className}`}
      style={{ width: size, height: size }}
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
