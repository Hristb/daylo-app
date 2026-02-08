import { motion, AnimatePresence } from 'framer-motion'
import { History, Clock, ChevronDown, Calendar } from 'lucide-react'
import { useDayloStore } from '../store/dayloStore'
import { useState } from 'react'
import ActivityIcon from './icons/ActivityIcon'

type ViewMode = 'activities' | 'time'

export default function HistoryLog() {
  const { getActivityHistory, getTimeHistory } = useDayloStore()
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('activities')
  const [daysFilter, setDaysFilter] = useState(7)

  const activityLogs = getActivityHistory(daysFilter)
  const timeLogs = getTimeHistory(daysFilter)

  // Agrupar por fecha
  const groupByDate = (logs: any[]) => {
    const grouped: Record<string, any[]> = {}
    logs.forEach(log => {
      if (!grouped[log.date]) {
        grouped[log.date] = []
      }
      grouped[log.date].push(log)
    })
    return grouped
  }

  const groupedActivities = groupByDate(activityLogs)
  const groupedTime = groupByDate(timeLogs)

  // Formatear fecha
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    if (dateStr === today) return '🌟 Hoy'
    if (dateStr === yesterday) return '📅 Ayer'
    
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Calcular totales por fecha
  const getTotalMinutes = (logs: any[]) => {
    return logs.reduce((sum, log) => sum + log.duration, 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border-2 border-green-200 overflow-hidden shadow-sm"
    >
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-xl flex items-center justify-center">
            <History className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">📊 Historial de Actividades</h3>
            <p className="text-sm text-green-600">
              {activityLogs.length} actividades registradas
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-green-500" />
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t-2 border-green-100"
          >
            <div className="p-6 bg-gradient-to-br from-green-50/50 to-teal-50/50">
              {/* Filtros */}
              <div className="mb-4 flex gap-2 flex-wrap">
                <button
                  onClick={() => setDaysFilter(7)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    daysFilter === 7
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-green-100'
                  }`}
                >
                  Última semana
                </button>
                <button
                  onClick={() => setDaysFilter(30)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    daysFilter === 30
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-green-100'
                  }`}
                >
                  Último mes
                </button>
                <button
                  onClick={() => setDaysFilter(90)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    daysFilter === 90
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-green-100'
                  }`}
                >
                  3 meses
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="mb-4 flex bg-white rounded-xl p-1 border-2 border-green-200">
                <button
                  onClick={() => setViewMode('activities')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                    viewMode === 'activities'
                      ? 'bg-gradient-to-r from-green-400 to-teal-400 text-white shadow-md'
                      : 'text-gray-600'
                  }`}
                >
                  📋 Actividades Detalladas
                </button>
                <button
                  onClick={() => setViewMode('time')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                    viewMode === 'time'
                      ? 'bg-gradient-to-r from-green-400 to-teal-400 text-white shadow-md'
                      : 'text-gray-600'
                  }`}
                >
                  ⏱️ Registro de Horas
                </button>
              </div>

              {/* Content */}
              {viewMode === 'activities' ? (
                <div className="space-y-4">
                  {Object.keys(groupedActivities).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <History className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm">No hay actividades registradas</p>
                      <p className="text-xs mt-1">Comienza agregando actividades para ver tu historial</p>
                    </div>
                  ) : (
                    Object.keys(groupedActivities)
                      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                      .map((date) => (
                        <motion.div
                          key={date}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl border-2 border-green-200 overflow-hidden"
                        >
                          {/* Date Header */}
                          <div className="bg-gradient-to-r from-green-100 to-teal-100 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-green-700" />
                              <span className="font-semibold text-gray-800 text-sm">
                                {formatDate(date)}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-green-700">
                              {groupedActivities[date].length} actividades
                            </span>
                          </div>

                          {/* Activities List */}
                          <div className="divide-y divide-green-100">
                            {groupedActivities[date].map((log) => (
                              <div
                                key={log.id}
                                className="px-4 py-3 hover:bg-green-50 transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0">
                                    <ActivityIcon type={log.activityIcon} size={24} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-semibold text-gray-800 text-sm">
                                        {log.activityLabel}
                                      </span>
                                      <span className="text-sm font-bold text-green-600">
                                        {Math.floor(log.duration / 60)}h {log.duration % 60}m
                                      </span>
                                    </div>
                                    {log.notes && (
                                      <p className="text-xs text-gray-600 mb-1">
                                        💭 {log.notes}
                                      </p>
                                    )}
                                    {log.facets && Object.keys(log.facets).length > 0 && (
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {Object.entries(log.facets).map(([key, value]) => (
                                          <span
                                            key={key}
                                            className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium"
                                          >
                                            {typeof value === 'boolean'
                                              ? value
                                                ? '✓'
                                                : '✗'
                                              : `${value}/5`}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    <span className="text-[10px] text-gray-400 mt-1 block">
                                      {new Date(log.timestamp).toLocaleTimeString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.keys(groupedTime).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm">No hay registros de tiempo</p>
                      <p className="text-xs mt-1">Las horas trabajadas aparecerán aquí</p>
                    </div>
                  ) : (
                    Object.keys(groupedTime)
                      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                      .map((date) => (
                        <motion.div
                          key={date}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl border-2 border-teal-200 overflow-hidden"
                        >
                          {/* Date Header */}
                          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-teal-700" />
                              <span className="font-semibold text-gray-800 text-sm">
                                {formatDate(date)}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-teal-700">
                              {Math.floor(getTotalMinutes(groupedTime[date]) / 60)}h{' '}
                              {getTotalMinutes(groupedTime[date]) % 60}m
                            </span>
                          </div>

                          {/* Time List - Table Style */}
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-teal-50 text-xs text-gray-600">
                                  <th className="text-left px-4 py-2 font-semibold">Actividad</th>
                                  <th className="text-right px-4 py-2 font-semibold">Duración</th>
                                  <th className="text-right px-4 py-2 font-semibold">Hora</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-teal-100">
                                {groupedTime[date].map((log) => (
                                  <tr key={log.id} className="hover:bg-teal-50 transition-colors">
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2">
                                        <ActivityIcon type={log.activityIcon} size={20} />
                                        <span className="text-sm text-gray-800">
                                          {log.activityLabel}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                      <span className="text-sm font-semibold text-teal-600">
                                        {Math.floor(log.duration / 60)}h {log.duration % 60}m
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                      <span className="text-xs text-gray-500">
                                        {new Date(log.timestamp).toLocaleTimeString('es-ES', {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
