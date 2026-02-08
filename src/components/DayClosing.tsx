import { motion } from 'framer-motion'
import { BookOpen, Sparkles, Heart } from 'lucide-react'
import { useState } from 'react'
import { useDayloStore } from '../store/dayloStore'

interface DayClosingProps {
  onComplete: () => void
}

export default function DayClosing({ onComplete }: DayClosingProps) {
  const { setDayStory } = useDayloStore()
  const [howStarted, setHowStarted] = useState('')
  const [mostSignificant, setMostSignificant] = useState('')
  const [howClosing, setHowClosing] = useState('')

  const handleSave = () => {
    setDayStory({
      howStarted,
      mostSignificant,
      howClosing,
    })
    onComplete()
  }

  const canSave = mostSignificant.trim() !== ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-indigo-100/90 to-purple-100/90 backdrop-blur-md z-50 flex items-center justify-center p-4 pb-24"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-purple-100 px-6 py-4 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                🌙 Cuenta tu día
              </h2>
              <p className="text-xs text-purple-600">Cierre narrativo</p>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-6 space-y-6">
          {/* Inspirational Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-purple-50 rounded-xl border border-purple-200"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-purple-700">
                Convertir tu día en una historia te ayuda a procesar experiencias y consolidar recuerdos con significado emocional
              </p>
            </div>
          </motion.div>

          {/* Question 1 */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              🌅 ¿Cómo comenzó tu día?
              <span className="text-xs text-gray-400">(opcional)</span>
            </label>
            <input
              type="text"
              value={howStarted}
              onChange={(e) => setHowStarted(e.target.value)}
              placeholder="Ej: Desperté sin energía, pero con ganas de avanzar..."
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
              maxLength={150}
            />
          </div>

          {/* Question 2 - REQUIRED */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              ⚡ ¿Qué fue lo más significativo hoy?
              <span className="text-xs text-purple-600">(requerido)</span>
            </label>
            <textarea
              value={mostSignificant}
              onChange={(e) => setMostSignificant(e.target.value)}
              placeholder="Ej: Una conversación me hizo reflexionar sobre...\nLogré terminar algo que venía posponiendo...\nMe di cuenta de que necesito..."
              className="w-full p-3 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm resize-none"
              rows={4}
              maxLength={300}
            />
            <p className="text-xs text-gray-500">
              {mostSignificant.length}/300 caracteres
            </p>
          </div>

          {/* Question 3 */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              🌙 ¿Con qué sensación cierras tu día?
              <span className="text-xs text-gray-400">(opcional)</span>
            </label>
            <input
              type="text"
              value={howClosing}
              onChange={(e) => setHowClosing(e.target.value)}
              placeholder="Ej: Tranquilo, Agradecido, Cansado pero satisfecho..."
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
              maxLength={100}
            />
          </div>

          {/* Optional gratitude */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200"
          >
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  💭 Reflexión final (opcional)
                </p>
                <p className="text-xs text-gray-600">
                  ¿Qué agradeces de hoy aunque haya sido difícil?<br />
                  ¿Qué aprendiste que no sabías ayer?
                </p>
              </div>
            </div>
          </motion.div>
          </div>
        </div>

        {/* Footer - Always visible */}
        <div className="flex-shrink-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-3xl shadow-lg">
          <div className="flex gap-3">
            <motion.button
              onClick={() => onComplete()}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Saltar
            </motion.button>
            <motion.button
              onClick={handleSave}
              disabled={!canSave}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                canSave
                  ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canSave ? { scale: 1.02 } : {}}
              whileTap={canSave ? { scale: 0.98 } : {}}
            >
              Cerrar mi día 🌙
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
