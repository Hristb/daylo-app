import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CalendarEvent } from '../../types'
import CalendarDay from './CalendarDay'
import DayModal from './DayModal'
import {
  getCalendarEvents,
  saveCalendarEvent,
  deleteCalendarEvent,
  toggleCalendarEvent
} from '../../services/firebaseService'
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getMonthName,
  getDayOfWeekShort,
  formatDate,
  calculateStreak,
  getPeruDate
} from './calendarUtils'

export default function HeatMapCalendar() {
  const [currentDate, setCurrentDate] = useState(getPeruDate())
  const [entries, setEntries] = useState<any[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  
  // Cargar entradas y eventos desde Firebase
  useEffect(() => {
    loadData()
  }, [currentDate])
  
  // Función para cargar datos (reutilizable)
  const loadData = async () => {
    // Cargar entradas de localStorage (rápido)
    const loadedEntries = JSON.parse(localStorage.getItem('daylo-entries') || '[]')
    setEntries(loadedEntries)
    
    // Cargar eventos desde Firebase (fuente de verdad)
    try {
      console.log('🔄 Cargando eventos desde Firebase...')
      const firebaseEvents = await getCalendarEvents()
      setEvents(firebaseEvents)
      // Guardar en localStorage como caché
      localStorage.setItem('daylo-calendar-events', JSON.stringify(firebaseEvents))
      console.log(`✅ ${firebaseEvents.length} eventos cargados y sincronizados`)
    } catch (error) {
      console.error('❌ Error cargando eventos desde Firebase:', error)
      // Fallback a localStorage si Firebase falla
      const localEvents = JSON.parse(localStorage.getItem('daylo-calendar-events') || '[]')
      setEvents(localEvents)
    }
  }
  
  // Navegar meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }
  
  const goToToday = () => {
    setCurrentDate(getPeruDate())
  }
  
  // Manejo de eventos con sincronización Firebase
  const handleAddEvent = async (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    try {
      console.log('💾 Guardando evento en Firebase...')
      // Guardar en Firebase
      const result = await saveCalendarEvent({
        date: event.date,
        type: event.type,
        description: event.description,
        completed: event.completed || false
      })
      
      if (result) {
        console.log('✅ Evento guardado, recargando desde Firebase...')
        // Recargar todos los eventos desde Firebase para mantener sincronización
        await loadData()
      } else {
        console.error('❌ No se pudo guardar el evento')
      }
    } catch (error) {
      console.error('❌ Error guardando evento:', error)
    }
  }
  
  const handleDeleteEvent = async (eventId: string) => {
    try {
      console.log('🗑️ Eliminando evento de Firebase...')
      // Eliminar de Firebase
      const success = await deleteCalendarEvent(eventId)
      
      if (success) {
        console.log('✅ Evento eliminado, recargando desde Firebase...')
        // Recargar todos los eventos desde Firebase
        await loadData()
      } else {
        console.error('❌ No se pudo eliminar el evento')
      }
    } catch (error) {
      console.error('❌ Error eliminando evento:', error)
    }
  }
  
  const handleToggleEvent = async (eventId: string) => {
    try {
      // Encontrar el evento actual
      const currentEvent = events.find(e => e.id === eventId)
      if (!currentEvent) return
      
      const newCompletedState = !currentEvent.completed
      console.log(`🔄 Actualizando estado de evento a ${newCompletedState ? 'completado' : 'pendiente'}...`)
      
      // Actualizar en Firebase
      const success = await toggleCalendarEvent(eventId, newCompletedState)
      
      if (success) {
        console.log('✅ Estado actualizado, recargando desde Firebase...')
        // Recargar todos los eventos desde Firebase
        await loadData()
      } else {
        console.error('❌ No se pudo actualizar el estado del evento')
      }
    } catch (error) {
      console.error('❌ Error actualizando estado de evento:', error)
    }
  }
  
  // Generar días del mes
  const calendarDays = []
  
  // Días vacíos al inicio (lunes = 1, domingo = 0 -> ajustado para empezar en lunes)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} />)
  }
  
  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateStr = formatDate(date)
    const entry = entries.find(e => formatDate(new Date(e.date)) === dateStr)
    const dayEvents = events.filter(e => e.date === dateStr)
    
    calendarDays.push(
      <CalendarDay
        key={day}
        date={date}
        dayNumber={day}
        entry={entry}
        events={dayEvents}
        onClick={() => setSelectedDate(date)}
      />
    )
  }
  
  // Calcular estadísticas
  const thisMonthEntries = entries.filter(e => {
    const entryDate = new Date(e.date)
    return entryDate.getMonth() === month && entryDate.getFullYear() === year
  })
  
  const streaks = calculateStreak(entries)
  const upcomingEvents = events.filter(e => {
    const eventDate = new Date(e.date)
    return eventDate > getPeruDate() && !e.completed
  }).length
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-800">Mi Calendario</h2>
        </div>
        
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition"
        >
          Hoy
        </button>
      </div>
      
      {/* Navegación de mes */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h3 className="text-lg font-bold text-gray-800">
          {getMonthName(month)} {year}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-semibold text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {calendarDays}
      </div>
      
      {/* Leyenda */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-400" />
          <span>Excelente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-300" />
          <span>Muy bueno</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-pink-300" />
          <span>Bueno</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-200" />
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200" />
          <span>Sin registro</span>
        </div>
      </div>
      
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-purple-500 mb-1">
            <Calendar className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{thisMonthEntries.length}</p>
          <p className="text-xs text-gray-500">Este mes</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-pink-500 mb-1">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{streaks.current}</p>
          <p className="text-xs text-gray-500">Racha actual</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-blue-500 mb-1">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{upcomingEvents}</p>
          <p className="text-xs text-gray-500">Eventos próximos</p>
        </div>
      </div>
      
      {/* Modal de día */}
      {selectedDate && (
        <DayModal
          date={selectedDate}
          entry={entries.find(e => formatDate(new Date(e.date)) === formatDate(selectedDate))}
          events={events.filter(e => e.date === formatDate(selectedDate))}
          onClose={() => setSelectedDate(null)}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onToggleEvent={handleToggleEvent}
        />
      )}
    </motion.div>
  )
}
