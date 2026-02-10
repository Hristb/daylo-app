// Obtener fecha actual en timezone de Perú (America/Lima, UTC-5)
export function getPeruDate(): Date {
  const now = new Date()
  
  // Perú está en UTC-5 (sin horario de verano)
  const peruOffset = -5 * 60 // -5 horas en minutos
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000)
  const peruTime = new Date(utcTime + (peruOffset * 60000))
  
  return peruTime
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function formatDate(date: Date): string {
  // Usar componentes de fecha locales en lugar de ISO para evitar problemas de timezone
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  return formatDate(d1) === formatDate(d2)
}

export function isToday(date: Date | string): boolean {
  return isSameDay(date, getPeruDate())
}

export function isFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = getPeruDate()
  today.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)
  return d > today
}

export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = getPeruDate()
  today.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)
  return d < today
}

export function getDayColor(entry: any): string {
  if (!entry) return 'bg-white hover:bg-gray-50/50'
  
  const rating = entry.reflection?.dayRating || 0
  const activityCount = entry.activities?.length || 0
  
  // Escala de intensidad con colores pastel muy sutiles
  if (rating >= 4 && activityCount >= 3) {
    return 'bg-purple-100/60 hover:bg-purple-100'
  }
  if (rating >= 3 && activityCount >= 2) {
    return 'bg-purple-50/80 hover:bg-purple-100/70'
  }
  if (rating >= 2) {
    return 'bg-pink-50/80 hover:bg-pink-100/70'
  }
  if (rating >= 1) {
    return 'bg-blue-50/60 hover:bg-blue-100/60'
  }
  
  return 'bg-gray-50/50 hover:bg-gray-100/60'
}

export function getMonthName(month: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  return months[month]
}

export function getDayOfWeekShort(day: number): string {
  const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
  return days[day]
}

export function calculateStreak(entries: any[]): { current: number; longest: number } {
  if (entries.length === 0) return { current: 0, longest: 0 }
  
  const sortedEntries = entries
    .map(e => new Date(e.date))
    .sort((a, b) => b.getTime() - a.getTime())
  
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  
  for (let i = 0; i < sortedEntries.length; i++) {
    const currentDate = sortedEntries[i]
    const expectedDate = getPeruDate()
    expectedDate.setDate(expectedDate.getDate() - i)
    
    if (isSameDay(currentDate, expectedDate)) {
      tempStreak++
      if (i === 0) currentStreak = tempStreak
      longestStreak = Math.max(longestStreak, tempStreak)
    } else {
      tempStreak = 0
    }
  }
  
  return { current: currentStreak, longest: longestStreak }
}
