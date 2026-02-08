import { motion } from 'framer-motion'
import { History, Calendar, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import ActivityIcon from './icons/ActivityIcon'
import { getActivityHistory } from '../services/firebaseService'
import { ActivityLog } from '../types'

export default function HistoryLog() {
  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRecentActivities()
  }, [])

  const loadRecentActivities = async () => {
    setIsLoading(true)
    try {
      // Cargar desde Firebase (fuente principal)
      const logs = await getActivityHistory(7)
      const last5 = logs.slice(0, 5) // Solo los 5 más recientes
      setRecentLogs(last5)
      console.log('✅ Últimas 5 actividades desde Firebase')
    } catch (error) {
      console.error('Error cargando historial:', error)
      // Fallback a localStorage
      const localHistory = JSON.parse(localStorage.getItem('daylo-activity-history') || '[]')
      setRecentLogs(localHistory.slice(0, 5))
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    if (dateStr === today) return 'Hoy'
    if (dateStr === yesterday) return 'Ayer'
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border-2 border-green-200 shadow-sm mb-6"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-green-100 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-xl flex items-center justify-center">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Actividad Reciente</h3>
            <p className="text-xs text-green-600">Últimas 5 actividades registradas</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="text-center py-8">
            <motion.div
              className="w-10 h-10 mx-auto border-4 border-green-200 border-t-green-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-sm text-gray-500 mt-3">Cargando...</p>
          </div>
        ) : recentLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No hay actividades registradas aún</p>
            <p className="text-xs mt-1">Tus primeras actividades aparecerán aquí</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 hover:shadow-md transition-shadow"
              >
                {/* Icono de actividad */}
                <div className="flex-shrink-0">
                  <ActivityIcon type={log.activityIcon} size={28} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800 text-sm truncate">
                      {log.activityLabel}
                    </span>
                    <span className="text-sm font-bold text-green-600 flex-shrink-0 ml-2">
                      {Math.floor(log.duration / 60)}h {log.duration % 60}m
                    </span>
                  </div>
                  
                  {log.notes && (
                    <p className="text-xs text-gray-600 truncate mb-1">
                      💭 {log.notes}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(log.date)}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(log.timestamp).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
