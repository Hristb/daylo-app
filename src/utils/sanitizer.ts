/**
 * Utilidades para sanitizar y validar inputs del usuario
 * Previene XSS, injection y datos maliciosos
 */

// Sanitizar texto básico (eliminar scripts, tags HTML peligrosos)
export const sanitizeText = (text: string, maxLength: number = 5000): string => {
  if (!text || typeof text !== 'string') return ''
  
  return text
    .trim()
    .slice(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Eliminar scripts
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Eliminar iframes
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Eliminar event handlers
    .replace(/javascript:/gi, '') // Eliminar javascript: URLs
}

// Validar email
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 254
}

// Sanitizar nombre de usuario
export const sanitizeName = (name: string): string => {
  if (!name || typeof name !== 'string') return ''
  
  return name
    .trim()
    .slice(0, 100)
    .replace(/[<>'"]/g, '') // Eliminar caracteres peligrosos
}

// Sanitizar notas/diario (permite más texto pero sanitizado)
export const sanitizeNote = (note: string): string => {
  if (!note || typeof note !== 'string') return ''
  
  return note
    .trim()
    .slice(0, 10000) // Límite generoso para notas largas
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
}

// Validar número en rango
export const isValidNumber = (num: any, min: number, max: number): boolean => {
  const n = Number(num)
  return !isNaN(n) && n >= min && n <= max
}

// Validar duración de actividad (en minutos)
export const isValidDuration = (duration: number): boolean => {
  return isValidNumber(duration, 1, 1440) // 1 minuto a 24 horas
}

// Validar rating (1-5)
export const isValidRating = (rating: number): boolean => {
  return isValidNumber(rating, 1, 5)
}

// Sanitizar objeto con múltiples campos
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = { ...obj }
  
  for (const key in sanitized) {
    const value = sanitized[key]
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value) as any
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value)
    }
  }
  
  return sanitized
}

// Validar fecha (formato YYYY-MM-DD)
export const isValidDate = (dateStr: string): boolean => {
  if (!dateStr || typeof dateStr !== 'string') return false
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(dateStr)) return false
  
  const date = new Date(dateStr)
  return date instanceof Date && !isNaN(date.getTime())
}

// Rate limiting para prevenir spam
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export const checkRateLimit = (identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now()
  const record = requestCounts.get(identifier)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}
