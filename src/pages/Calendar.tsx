import { motion } from 'framer-motion'
import HeatMapCalendar from '../components/calendar/HeatMapCalendar'

export default function Calendar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="daylo-card text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            📅 Mi Calendario
          </h2>
          <p className="text-gray-600 text-sm">
            Visualiza tu historia, planifica eventos y mantén tu racha
          </p>
        </motion.div>

        {/* Calendario */}
        <HeatMapCalendar />
      </div>
    </div>
  )
}
