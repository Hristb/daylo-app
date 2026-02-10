import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, CheckCircle, Circle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { CalendarEvent } from '../../types'
import { formatDate, isToday, isFuture } from './calendarUtils'
import ActivityIcon from '../icons/ActivityIcon'

interface DayModalProps {
  date: Date
  entry?: any
  events: CalendarEvent[]
  onClose: () => void
  onAddEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => void
  onDeleteEvent: (eventId: string) => void
  onToggleEvent: (eventId: string) => void
}

export default function DayModal({
  date,
  entry,
  events,
  onClose,
  onAddEvent,
  onDeleteEvent,
  onToggleEvent
}: DayModalProps) {
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [newEventType, setNewEventType] = useState<CalendarEvent['type']>('event')
  const [newEventDescription, setNewEventDescription] = useState('')
  
  const dayNumber = date.getDate()
  const monthName = date.toLocaleDateString('es-ES', { month: 'long' })
  const year = date.getFullYear()
  const isCurrentDay = isToday(date)
  const isFutureDay = isFuture(date)
  
  const handleAddEvent = () => {
    if (newEventDescription.trim()) {
      onAddEvent({
        date: formatDate(date),
        type: newEventType,
        description: newEventDescription.trim(),
        completed: false
      })
      setNewEventDescription('')
      setIsAddingEvent(false)
    }
  }
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-6 rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex items-center gap-3 text-white">
              <Calendar className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold">
                  {isCurrentDay ? '🌟 HOY' : `${dayNumber} de ${monthName}`}
                </h2>
                <p className="text-sm opacity-90">{year}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Contenido del día pasado */}
            {entry && !isFutureDay && (
              <>
                {/* Rating */}
                {entry.reflection?.dayRating && (
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-2">✨ Valoración del día</p>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-2xl">
                          {i < entry.reflection.dayRating ? '⭐' : '☆'}
                        </span>
                      ))}
                      <span className="ml-2 font-bold text-purple-600">
                        {entry.reflection.dayRating}/5
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Actividades */}
                {entry.activities && entry.activities.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span>📊</span> Actividades ({entry.activities.length})
                    </h3>
                    <div className="space-y-2">
                      {entry.activities.map((activity: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <ActivityIcon type={activity.icon} size={24} />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{activity.label}</p>
                            <p className="text-sm text-gray-500">{activity.duration} min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tareas */}
                {entry.tasks && entry.tasks.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span>✅</span> Tareas
                    </h3>
                    <div className="space-y-2">
                      {entry.tasks.map((task: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                          <p className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {entry.tasks.filter((t: any) => t.completed).length}/{entry.tasks.length} completadas
                    </p>
                  </div>
                )}
                
                {/* Nota de diario */}
                {entry.diaryNote && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span>📝</span> Nota del día
                    </h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-xl whitespace-pre-wrap">
                      {entry.diaryNote}
                    </p>
                  </div>
                )}
              </>
            )}
            
            {/* Sin datos del pasado */}
            {!entry && !isFutureDay && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-2">📭</p>
                <p>No hay registro de este día</p>
              </div>
            )}
            
            {/* Eventos (futuros o pasados) */}
            {events.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📌</span> Eventos programados
                </h3>
                <div className="space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl"
                    >
                      <button
                        onClick={() => onToggleEvent(event.id)}
                        className="shrink-0"
                      >
                        {event.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${event.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {event.description}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{event.type}</p>
                      </div>
                      <button
                        onClick={() => onDeleteEvent(event.id)}
                        className="p-1 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Agregar evento */}
            {isFutureDay || isCurrentDay ? (
              <div>
                {!isAddingEvent ? (
                  <button
                    onClick={() => setIsAddingEvent(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition text-gray-600 hover:text-purple-600 font-medium"
                  >
                    + Agregar evento
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-purple-50 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex gap-2">
                      {(['event', 'reminder', 'important-date'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setNewEventType(type)}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm transition ${
                            newEventType === type
                              ? 'bg-purple-500 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {type === 'event' && '📅 Evento'}
                          {type === 'reminder' && '⏰ Recordatorio'}
                          {type === 'important-date' && '⭐ Fecha importante'}
                        </button>
                      ))}
                    </div>
                    
                    <input
                      type="text"
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddEvent()}
                      placeholder="Descripción..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                      autoFocus
                    />
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsAddingEvent(false)}
                        className="flex-1 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-100 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleAddEvent}
                        className="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
                        disabled={!newEventDescription.trim()}
                      >
                        Guardar
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
