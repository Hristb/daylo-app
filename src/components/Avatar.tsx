// Sistema de avatar generativo estilo GitHub/Anime
// Patrones más complejos y divertidos

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
    primary: `hsl(${hue}, 75%, 55%)`,
    secondary: `hsl(${(hue + 60) % 360}, 80%, 60%)`,
    accent: `hsl(${(hue + 120) % 360}, 85%, 65%)`,
    bg: `hsl(${(hue + 180) % 360}, 70%, 95%)`,
  }
}

// Generar estilo de avatar
function getAvatarStyle(name: string): 'pixel' | 'anime' | 'geometric' | 'neko' | 'minimalist' {
  const styles: Array<'pixel' | 'anime' | 'geometric' | 'neko' | 'minimalist'> = ['pixel', 'anime', 'geometric', 'neko', 'minimalist']
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

// Generar patrón de pixel art (estilo GitHub)
function generatePixelPattern(email: string, colors: any): string {
  const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  let pattern = ''
  
  // Grid de 5x5 simétrico
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) { // Solo primera mitad (simetría)
      const index = y * 3 + x
      const shouldFill = (hash >> index) & 1
      if (shouldFill) {
        const size = 16
        const startX = 30 + x * size
        const startY = 20 + y * size
        const color = (index % 2 === 0) ? colors.primary : colors.secondary
        
        // Píxel izquierdo
        pattern += `<rect x="${startX}" y="${startY}" width="${size}" height="${size}" fill="${color}" rx="2"/>`
        // Píxel derecho (simetría)
        const mirrorX = 120 - startX - size
        pattern += `<rect x="${mirrorX}" y="${startY}" width="${size}" height="${size}" fill="${color}" rx="2"/>`
      }
    }
  }
  
  return pattern
}

// Generar cara anime/kawaii
function generateAnimeface(colors: any): string {
  return `
    <!-- Cara -->
    <circle cx="60" cy="60" r="35" fill="white" opacity="0.95"/>
    <circle cx="60" cy="60" r="35" fill="url(#animeGradient)" opacity="0.3"/>
    
    <!-- Ojos anime -->
    <ellipse cx="48" cy="55" rx="5" ry="8" fill="${colors.primary}"/>
    <ellipse cx="72" cy="55" rx="5" ry="8" fill="${colors.primary}"/>
    <circle cx="49" cy="53" r="2" fill="white"/>
    <circle cx="73" cy="53" r="2" fill="white"/>
    
    <!-- Boca sonriente -->
    <path d="M 48 68 Q 60 75 72 68" stroke="${colors.primary}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    
    <!-- Mejillas rosadas -->
    <circle cx="40" cy="65" r="6" fill="${colors.accent}" opacity="0.4"/>
    <circle cx="80" cy="65" r="6" fill="${colors.accent}" opacity="0.4"/>
    
    <!-- Cabello estilo anime -->
    <path d="M 25 45 Q 20 25 35 20 Q 45 15 60 18 Q 75 15 85 20 Q 100 25 95 45" fill="${colors.secondary}" opacity="0.8"/>
    <circle cx="35" cy="35" r="8" fill="${colors.secondary}" opacity="0.8"/>
    <circle cx="85" cy="35" r="8" fill="${colors.secondary}" opacity="0.8"/>
  `
}

// Generar cara neko (gatito)
function generateNekoFace(colors: any): string {
  return `
    <!-- Cara de gato -->
    <circle cx="60" cy="65" r="32" fill="white" opacity="0.95"/>
    
    <!-- Orejas de gato -->
    <path d="M 35 40 L 25 20 L 45 35 Z" fill="${colors.primary}"/>
    <path d="M 85 40 L 95 20 L 75 35 Z" fill="${colors.primary}"/>
    <path d="M 35 40 L 30 28 L 42 37 Z" fill="${colors.accent}" opacity="0.6"/>
    <path d="M 85 40 L 90 28 L 78 37 Z" fill="${colors.accent}" opacity="0.6"/>
    
    <!-- Ojos de gato -->
    <ellipse cx="48" cy="60" rx="4" ry="10" fill="${colors.primary}"/>
    <ellipse cx="72" cy="60" rx="4" ry="10" fill="${colors.primary}"/>
    <ellipse cx="48" cy="58" rx="2" ry="6" fill="black"/>
    <ellipse cx="72" cy="58" rx="2" ry="6" fill="black"/>
    <circle cx="48" cy="56" r="1.5" fill="white"/>
    <circle cx="72" cy="56" r="1.5" fill="white"/>
    
    <!-- Nariz y boca de gato -->
    <path d="M 60 68 L 58 72 L 60 70 L 62 72 Z" fill="${colors.primary}"/>
    <path d="M 60 70 Q 50 75 45 73" stroke="${colors.primary}" stroke-width="1.5" fill="none"/>
    <path d="M 60 70 Q 70 75 75 73" stroke="${colors.primary}" stroke-width="1.5" fill="none"/>
    
    <!-- Bigotes -->
    <line x1="30" y1="65" x2="45" y2="66" stroke="${colors.secondary}" stroke-width="1.5"/>
    <line x1="30" y1="70" x2="45" y2="70" stroke="${colors.secondary}" stroke-width="1.5"/>
    <line x1="90" y1="65" x2="75" y2="66" stroke="${colors.secondary}" stroke-width="1.5"/>
    <line x1="90" y1="70" x2="75" y2="70" stroke="${colors.secondary}" stroke-width="1.5"/>
  `
}

// Generar formas geométricas abstractas
function generateGeometric(colors: any, email: string): string {
  const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const shapeType = hash % 4
  
  let shapes = ''
  
  // Fondo con formas geométricas
  for (let i = 0; i < 8; i++) {
    const x = (hash * (i + 1)) % 90 + 15
    const y = (hash * (i + 2)) % 90 + 15
    const size = (hash * (i + 3)) % 15 + 8
    const color = i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent
    const opacity = (i % 2 === 0) ? 0.6 : 0.3
    
    if (shapeType === 0) {
      // Círculos
      shapes += `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="${opacity}"/>`
    } else if (shapeType === 1) {
      // Cuadrados
      shapes += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}" rx="2"/>`
    } else if (shapeType === 2) {
      // Triángulos
      shapes += `<path d="M ${x} ${y} L ${x + size} ${y + size} L ${x - size} ${y + size} Z" fill="${color}" opacity="${opacity}"/>`
    } else {
      // Hexágonos pequeños
      const hex = `M ${x} ${y - size} L ${x + size * 0.866} ${y - size / 2} L ${x + size * 0.866} ${y + size / 2} L ${x} ${y + size} L ${x - size * 0.866} ${y + size / 2} L ${x - size * 0.866} ${y - size / 2} Z`
      shapes += `<path d="${hex}" fill="${color}" opacity="${opacity}"/>`
    }
  }
  
  return shapes
}

export function generateAvatar({ name, email, size = 120 }: AvatarConfig): string {
  const colors = stringToColor(name + email)
  const style = getAvatarStyle(name)
  const initials = getInitials(name)

  // SVG base
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">`

  // Degradados
  svg += `
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.2" />
      </linearGradient>
      <linearGradient id="animeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.1" />
      </linearGradient>
      <radialGradient id="glowGradient">
        <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0" />
      </radialGradient>
    </defs>
  `

  // Fondo circular
  svg += `<circle cx="60" cy="60" r="60" fill="url(#bgGradient)"/>`

  // Según el estilo
  if (style === 'pixel') {
    // Estilo GitHub pixel art
    svg += generatePixelPattern(email, colors)
    // Agregar iniciales abajo
    svg += `<text x="60" y="105" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${colors.primary}">${initials}</text>`
    
  } else if (style === 'anime') {
    // Cara anime kawaii
    svg += generateAnimeface(colors)
    
  } else if (style === 'neko') {
    // Cara de gatito
    svg += generateNekoFace(colors)
    
  } else if (style === 'geometric') {
    // Formas geométricas abstractas
    svg += generateGeometric(colors, email)
    // Círculo central con iniciales
    svg += `<circle cx="60" cy="60" r="28" fill="white" opacity="0.95"/>`
    svg += `<text x="60" y="60" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.primary}">${initials}</text>`
    
  } else {
    // Minimalist (fallback)
    svg += `<circle cx="60" cy="60" r="35" fill="white" opacity="0.95"/>`
    svg += `<text x="60" y="60" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${colors.primary}">${initials}</text>`
  }

  // Brillo/glow sutil
  svg += `<circle cx="60" cy="60" r="55" fill="url(#glowGradient)" opacity="0.15"/>`

  // Borde decorativo
  svg += `<circle cx="60" cy="60" r="58" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>`

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
