import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { DailyEntry } from '../types'
import { Calendar, TrendingUp, Clock, Smile } from 'lucide-react'
import { formatMinutes } from '../utils/constants'

export default function Dashboard() {
  const [entries, setEntries] = useState<DailyEntry[]>([])
  const [weekData, setWeekData] = useState<any[]>([])
  const [activityDistribution, setActivityDistribution] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalDays: 0,
    averageActivities: 0,
    totalMinutes: 0,
    mostCommonMood: '😊',
  })

  useEffect(() => {
    // Cargar datos de localStorage
    const storedEntries = JSON.parse(localStorage.getItem('daylo-entries') || '[]')
    setEntries(storedEntries)

    if (storedEntries.length > 0) {
      calculateStats(storedEntries)
    }
  }, [])

  const calculateStats = (entries: DailyEntry[]) => {
    // Stats básicos
    const totalDays = entries.length
    const totalActivities = entries.reduce((sum, e) => sum + (e.activities?.length || 0), 0)
    const averageActivities = totalActivities / totalDays
    const totalMinutes = entries.reduce((sum, e) => 
      sum + (e.activities?.reduce((s, a) => s + a.duration, 0) || 0), 0
    )

    // Mood más común
    const moodCount: Record<string, number> = {}
    entries.forEach(e => {
      const mood = e.reflection?.mood || '😊'
      moodCount[mood] = (moodCount[mood] || 0) + 1
    })
    const mostCommonMood = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '😊'

    setStats({
      totalDays,
      averageActivities: Math.round(averageActivities * 10) / 10,
      totalMinutes,
      mostCommonMood,
    })

    // Datos para gráfico de barras (últimos 7 días)
    const last7Days = entries.slice(-7)
    const weekChartData = last7Days.map(entry => ({
      day: new Date(entry.date).toLocaleDateString('es-ES', { weekday: 'short' }),
      minutos: entry.activities?.reduce((sum, a) => sum + a.duration, 0) || 0,
    }))
    setWeekData(weekChartData)

    // Distribución de actividades (pie chart)
    const activityMap: Record<string, number> = {}
    entries.forEach(entry => {
      entry.activities?.forEach(activity => {
        activityMap[activity.label] = (activityMap[activity.label] || 0) + activity.duration
      })
    })

    const pieData = Object.entries(activityMap).map(([name, value]) => ({
      name,
      value,
    })).sort((a, b) => b.value - a.value).slice(0, 6)

    setActivityDistribution(pieData)
  }

  const COLORS = ['#FFD4E5', '#C4E5FF', '#E8D4FF', '#D4FFE5', '#FFE5D4', '#FFF4D4']

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="daylo-card text-center py-12"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📊
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Aún no hay datos
        </h2>
        <p className="text-gray-600">
          Empieza a registrar tus días para ver tu dashboard
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="daylo-card text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Tu Resumen Semanal
        </h2>
        <p className="text-gray-600 text-sm">
          Así ha sido tu semana en Daylo
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="daylo-card text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Calendar className="text-pastel-blue" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{stats.totalDays}</div>
          <div className="text-sm text-gray-600">Días registrados</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="daylo-card text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="text-pastel-purple" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{stats.averageActivities}</div>
          <div className="text-sm text-gray-600">Actividades / día</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="daylo-card text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Clock className="text-pastel-green" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {Math.floor(stats.totalMinutes / 60)}h
          </div>
          <div className="text-sm text-gray-600">Total registrado</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="daylo-card text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Smile className="text-pastel-yellow" size={24} />
          </div>
          <div className="text-4xl font-bold">{stats.mostCommonMood}</div>
          <div className="text-sm text-gray-600">Estado más común</div>
        </motion.div>
      </div>

      {/* Bar Chart - Últimos 7 días */}
      {weekData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="daylo-card"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            📈 Actividad de la semana
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="day" 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [formatMinutes(value), 'Tiempo']}
              />
              <Bar 
                dataKey="minutos" 
                fill="url(#colorGradient)" 
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8D4FF" />
                  <stop offset="100%" stopColor="#C4E5FF" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Pie Chart - Distribución de actividades */}
      {activityDistribution.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="daylo-card"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            🎯 ¿En qué pasas tu tiempo?
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatMinutes(value)}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="daylo-card bg-gradient-to-r from-pastel-pink/30 to-pastel-purple/30"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          💡 Insights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span>✨</span>
            <span>
              Llevas <strong>{stats.totalDays} días</strong> registrando tu vida en Daylo
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>⏱️</span>
            <span>
              Has registrado un total de <strong>{formatMinutes(stats.totalMinutes)}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>📊</span>
            <span>
              Tu estado más frecuente es <strong>{stats.mostCommonMood}</strong>
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}
