import { motion } from 'framer-motion'
import { Mail, Calendar, Award, TrendingUp, Heart, LogOut, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import Avatar from '../components/Avatar'
import { getAllUserEntries } from '../services/firebaseService'

interface UserStats {
  totalDays: number
  currentStreak: number
  longestStreak: number
  totalActivities: number
  totalTasks: number
  completedTasks: number
  averageRating: number
  favoriteActivity: string
}

export default function Profile() {
  const userName = localStorage.getItem('userName') || 'Usuario'
  const userEmail = localStorage.getItem('userEmail') || ''
  const [stats, setStats] = useState<UserStats>({
    totalDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalActivities: 0,
    totalTasks: 0,
    completedTasks: 0,
    averageRating: 0,
    favoriteActivity: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUserStats()
  }, [])

  const loadUserStats = async () => {
    try {
      const entries = await getAllUserEntries()
      
      if (entries.length === 0) {
        setIsLoading(false)
        return
      }

      // Calcular estadísticas
      const totalDays = entries.length
      let totalActivities = 0
      let totalTasks = 0
      let completedTasks = 0
      let totalRating = 0
      let ratingCount = 0
      const activityCount: Record<string, number> = {}

      entries.forEach((entry: any) => {
        // Actividades
        totalActivities += entry.activities?.length || 0
        entry.activities?.forEach((act: any) => {
          activityCount[act.label] = (activityCount[act.label] || 0) + 1
        })

        // Tareas
        totalTasks += entry.tasks?.length || 0
        completedTasks += entry.tasks?.filter((t: any) => t.completed).length || 0

        // Ratings
        if (entry.reflection?.dayRating) {
          totalRating += entry.reflection.dayRating
          ratingCount++
        }
      })

      // Actividad favorita
      const favoriteActivity = Object.keys(activityCount).reduce((a, b) => 
        activityCount[a] > activityCount[b] ? a : b
      , '')

      // Calcular rachas
      const sortedEntries = entries.sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )

      let currentStreak = 0
      let longestStreak = 0
      let tempStreak = 0

      for (let i = 0; i < sortedEntries.length; i++) {
        const currentDate = new Date(sortedEntries[i].date)
        const expectedDate = new Date()
        expectedDate.setDate(expectedDate.getDate() - i)

        if (currentDate.toDateString() === expectedDate.toDateString()) {
          tempStreak++
          if (i === 0) currentStreak = tempStreak
          longestStreak = Math.max(longestStreak, tempStreak)
        } else {
          tempStreak = 0
        }
      }

      setStats({
        totalDays,
        currentStreak,
        longestStreak,
        totalActivities,
        totalTasks,
        completedTasks,
        averageRating: ratingCount > 0 ? totalRating / ratingCount : 0,
        favoriteActivity,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header con Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl p-8 mb-6 relative overflow-hidden shadow-xl"
        >
          {/* Decoración de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"/>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"/>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mb-4"
            >
              <Avatar name={userName} email={userEmail} size={140} className="drop-shadow-2xl" />
            </motion.div>

            {/* Nombre */}
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {userName}
            </h1>

            {/* Email */}
            <div className="flex items-center gap-2 text-white/90 mb-4">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{userEmail}</span>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Usuario Daylo</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Estadísticas */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full mx-auto"/>
            <p className="text-gray-500 mt-4">Cargando estadísticas...</p>
          </div>
        ) : (
          <>
            {/* Grid de estadísticas principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={<Calendar className="w-5 h-5" />}
                label="Días registrados"
                value={stats.totalDays}
                color="from-blue-400 to-cyan-400"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Racha actual"
                value={stats.currentStreak}
                suffix=" días"
                color="from-green-400 to-emerald-400"
              />
              <StatCard
                icon={<Award className="w-5 h-5" />}
                label="Mejor racha"
                value={stats.longestStreak}
                suffix=" días"
                color="from-yellow-400 to-orange-400"
              />
              <StatCard
                icon={<Heart className="w-5 h-5" />}
                label="Promedio día"
                value={stats.averageRating.toFixed(1)}
                suffix="/5"
                color="from-pink-400 to-rose-400"
              />
            </div>

            {/* Detalles adicionales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Tu Actividad</h2>
              
              <div className="space-y-4">
                <DetailRow
                  label="Actividades registradas"
                  value={stats.totalActivities}
                />
                <DetailRow
                  label="Tareas creadas"
                  value={stats.totalTasks}
                />
                <DetailRow
                  label="Tareas completadas"
                  value={stats.completedTasks}
                  extra={stats.totalTasks > 0 ? `${Math.round((stats.completedTasks / stats.totalTasks) * 100)}% completitud` : ''}
                />
                {stats.favoriteActivity && (
                  <DetailRow
                    label="Actividad favorita"
                    value={stats.favoriteActivity}
                    isText
                  />
                )}
              </div>
            </motion.div>

            {/* Mensaje motivacional */}
            {stats.currentStreak > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6 border border-purple-200"
              >
                <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  ¡Sigue así!
                </h3>
                <p className="text-purple-700 text-sm">
                  {stats.currentStreak >= 7 && '🔥 ¡Increíble! Llevas una semana completa registrando tu vida.'}
                  {stats.currentStreak >= 3 && stats.currentStreak < 7 && '⭐ ¡Excelente! Estás construyendo un hábito poderoso.'}
                  {stats.currentStreak < 3 && '💪 ¡Buen comienzo! La constancia es la clave del autodescubrimiento.'}
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Botón de cerrar sesión */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleLogout}
          className="w-full bg-white hover:bg-red-50 border border-red-200 text-red-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </motion.button>
      </div>
    </div>
  )
}

// Componente de tarjeta de estadística
interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  suffix?: string
  color: string
}

function StatCard({ icon, label, value, suffix = '', color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white shadow-lg`}
    >
      <div className="flex items-center justify-center mb-2">
        {icon}
      </div>
      <div className="text-2xl font-bold text-center mb-1">
        {value}{suffix}
      </div>
      <div className="text-xs text-center opacity-90">
        {label}
      </div>
    </motion.div>
  )
}

// Componente de fila de detalle
interface DetailRowProps {
  label: string
  value: number | string
  extra?: string
  isText?: boolean
}

function DetailRow({ label, value, extra, isText = false }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="text-right">
        <span className={`${isText ? 'text-sm' : 'text-lg'} font-bold text-gray-800`}>
          {value}
        </span>
        {extra && (
          <span className="text-xs text-gray-500 block">{extra}</span>
        )}
      </div>
    </div>
  )
}
