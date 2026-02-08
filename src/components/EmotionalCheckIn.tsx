import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useDayloStore } from '../store/dayloStore'

interface EmotionalCheckInProps {
  onComplete: () => void
}

const FEELINGS = [
  { emoji: '😊', label: 'Bien', color: '#D4FFE5' },
  { emoji: '😰', label: 'Ansioso/a', color: '#FFE5D4' },
  { emoji: '😴', label: 'Cansado/a', color: '#E8D4FF' },
  { emoji: '😤', label: 'Abrumado/a', color: '#FFD4E5' },
  { emoji: '🤗', label: 'Motivado/a', color: '#FFF4D4' },
  { emoji: '😐', label: 'Neutral', color: '#E8E8E8' },
]

export default function EmotionalCheckIn({ onComplete }: EmotionalCheckInProps) {
  const { setEmotionalCheckIn, setDayIntention } = useDayloStore()
  const [step, setStep] = useState(1)
  const [selectedFeeling, setSelectedFeeling] = useState('')
  const [mentalNoise, setMentalNoise] = useState('')
  const [needsToday, setNeedsToday] = useState('')
  const [intention, setIntention] = useState('')

  const handleNext = () => {
    if (step === 1 && selectedFeeling) {
      setEmotionalCheckIn({
        feeling: selectedFeeling,
        mentalNoise: mentalNoise || undefined,
        needsToday: needsToday || undefined,
      })
      setStep(2)
    } else if (step === 2 && intention) {
      setDayIntention(intention)
      onComplete()
    }
  }

  const canProceedStep1 = selectedFeeling !== ''
  const canProceedStep2 = intention.trim() !== ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-100/90 to-pink-100/90 backdrop-blur-md z-50 flex items-center justify-center p-4 pb-24"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-purple-100 px-6 py-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {step === 1 ? '☀️ Antes de empezar...' : '🎯 Tu intención de hoy'}
                </h2>
                <p className="text-xs text-purple-600">Paso {step} de 2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Inspirational Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-purple-50 rounded-xl border border-purple-200"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-purple-700">
                      Tomarte un momento para reconocer cómo te sientes te ayuda a regular tus emociones antes de actuar
                    </p>
                  </div>
                </motion.div>

                {/* Question 1: How do you feel? */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    💭 ¿Cómo te sientes ahora mismo?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {FEELINGS.map((feeling) => (
                      <motion.button
                        key={feeling.label}
                        onClick={() => setSelectedFeeling(feeling.label)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedFeeling === feeling.label
                            ? 'border-purple-400 shadow-md scale-105'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        style={{
                          backgroundColor: selectedFeeling === feeling.label ? feeling.color : 'white'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-1">{feeling.emoji}</div>
                        <div className="text-xs font-medium text-gray-700">{feeling.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Question 2: Mental noise (optional) */}
                {selectedFeeling && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      💭 ¿Hay algo que te preocupa? <span className="text-xs text-gray-400">(opcional)</span>
                    </label>
                    <textarea
                      value={mentalNoise}
                      onChange={(e) => setMentalNoise(e.target.value)}
                      placeholder="Ej: El proyecto, una decisión pendiente, algo que no puedo dejar de pensar..."
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                      rows={2}
                    />
                  </motion.div>
                )}

                {/* Question 3: What do you need? */}
                {selectedFeeling && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      💚 ¿Qué necesitas hoy para estar bien?
                    </label>
                    <input
                      type="text"
                      value={needsToday}
                      onChange={(e) => setNeedsToday(e.target.value)}
                      placeholder="Ej: Calma, tiempo para mí, desconectar, energía..."
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Summary of Step 1 */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">Te sientes:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {FEELINGS.find(f => f.label === selectedFeeling)?.emoji} {selectedFeeling}
                  </p>
                  {needsToday && (
                    <p className="text-sm text-purple-700 mt-2">
                      💚 Necesitas: {needsToday}
                    </p>
                  )}
                </div>

                {/* Inspirational Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-purple-50 rounded-xl border border-purple-200"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-purple-700">
                      Una intención clara cambia cómo vives todo el día. No es una tarea, es tu brújula.
                    </p>
                  </div>
                </motion.div>

                {/* Main Question */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    ✨ ¿Cuál es tu intención para hoy?
                  </label>
                  <textarea
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    placeholder="Ej: Hoy quiero avanzar con calma\nHoy quiero cuidar mi energía\nHoy quiero estar presente..."
                    className="w-full p-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                    rows={4}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    💡 No es "qué tienes que hacer", sino "cómo quieres sentirte" o "qué quieres lograr"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* Footer - Always visible */}
        <div className="flex-shrink-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-3xl shadow-lg">
          <div className="flex gap-3">
            {step === 2 && (
              <motion.button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Atrás
              </motion.button>
            )}
            <motion.button
              onClick={handleNext}
              disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                (step === 1 ? canProceedStep1 : canProceedStep2)
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={(step === 1 ? canProceedStep1 : canProceedStep2) ? { scale: 1.02 } : {}}
              whileTap={(step === 1 ? canProceedStep1 : canProceedStep2) ? { scale: 0.98 } : {}}
            >
              {step === 1 ? 'Continuar' : 'Comenzar mi día ✨'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
