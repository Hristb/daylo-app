import { motion } from 'framer-motion'
import { CalendarEvent } from '../../types'
import { getDayColor, isToday, isFuture } from './calendarUtils'

interface CalendarDayProps {
  date: Date
  dayNumber: number
  entry?: any
  events: CalendarEvent[]
  onClick: () => void
}

export default function CalendarDay({ date, dayNumber, entry, events, onClick }: CalendarDayProps) {
  // Verificar si tiene entrada CON DATOS REALES (no solo objeto vacío)
  const hasRealEntry = !!(entry && (
    (entry.activities && entry.activities.length > 0) ||
    (entry.tasks && entry.tasks.length > 0) ||
    entry.diaryNote ||
    entry.reflection?.dayRating
  ))
  
  const hasEvents = events.length > 0
  const isCurrentDay = isToday(date)
  const isFutureDay = isFuture(date)
  
  // Detectar tipo de evento más importante
  const hasImportantDate = events.some(e => e.type === 'important-date')
  const hasReminder = events.some(e => e.type === 'reminder')
  const hasRegularEvent = events.some(e => e.type === 'event')
  
  // Color de fondo base o especial para día importante
  let colorClass = hasRealEntry ? getDayColor(entry) : 'bg-white hover:bg-gray-50/50'
  
  // Si es un día importante, agregar gradiente especial sutil
  if (hasImportantDate && isFutureDay) {
    colorClass = 'bg-gradient-to-br from-yellow-50/80 via-pink-50/60 to-purple-50/80 hover:from-yellow-100/90 hover:via-pink-100/70 hover:to-purple-100/90'
  } else if (hasImportantDate && !isFutureDay) {
    // Día importante pasado - más discreto
    colorClass = hasEntry ? getDayColor(entry) : 'bg-purple-50/40 hover:bg-purple-100/50'
  }
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative aspect-square rounded-lg border-2 transition-all
        ${colorClass}
        ${isCurrentDay 
          ? 'border-purple-300 shadow-sm shadow-purple-200' 
          : hasImportantDate && isFutureDay 
            ? 'border-yellow-300/60 shadow-sm shadow-yellow-200/40'
            : isFutureDay 
              ? 'border-blue-100/50' 
              : 'border-gray-100/50'
        }
        text-gray-700
      `}
      title={`${dayNumber} - ${hasRealEntry ? 'Registrado' : hasEvents ? 'Con eventos' : 'Sin datos'}`}
    >
      {/* Número del día */}
      <span className={`
        absolute top-1 left-1 text-xs font-semibold
        ${isCurrentDay ? 'text-purple-600' : isFutureDay ? 'text-blue-400/70' : 'text-gray-500'}
      `}>
        {dayNumber}
      </span>
      
      {/* Indicador de HOY - oculto en mobile */}
      {isCurrentDay && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="hidden sm:block absolute top-1 right-1 text-sm"
        >
          ✨
        </motion.div>
      )}
      
      {/* Indicador de eventos futuros - oculto en mobile */}
      {hasEvents && isFutureDay && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="hidden sm:block absolute top-1 right-1 text-base"
          title={hasImportantDate ? 'Día importante' : hasReminder ? 'Recordatorio' : 'Evento'}
        >
          {hasImportantDate ? '⭐' : hasReminder ? '📌' : '📅'}
        </motion.div>
      )}
      
      {/* Indicador de eventos pasados - oculto en mobile */}
      {hasEvents && !isFutureDay && !isCurrentDay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden sm:block absolute top-1 right-1 text-xs opacity-40"
        >
          {hasImportantDate ? '⭐' : '📍'}
        </motion.div>
      )}
      
      {/* Indicador de racha - oculto en mobile */}
      {hasRealEntry && entry.reflection?.dayRating >= 4 && (
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          className="hidden sm:block absolute bottom-1 left-1 text-sm"
        >
          🔥
        </motion.div>
      )}
      
      {/* Mini indicadores de actividad */}
      {hasRealEntry && entry.activities?.length > 0 && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
          {Array.from({ length: Math.min(entry.activities.length, 3) }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-purple-300/40"
            />
          ))}
        </div>
      )}
    </motion.button>
  )
}
