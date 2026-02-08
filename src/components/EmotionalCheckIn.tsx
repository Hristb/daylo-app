import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useDayloStore } from '../store/dayloStore'

interface EmotionalCheckInProps {
  onComplete: () => void
}

const LIFE_AREAS = [
  { emoji: '💼', label: 'Trabajo/Carrera', color: '#C4E5FF' },
  { emoji: '🏋️', label: 'Salud/Bienestar', color: '#D4FFE5' },
  { emoji: '❤️', label: 'Relaciones', color: '#FFD4E5' },
  { emoji: '📚', label: 'Aprendizaje', color: '#E8D4FF' },
  { emoji: '🎨', label: 'Creatividad', color: '#FFF4D4' },
  { emoji: '💰', label: 'Finanzas', color: '#FFE5D4' },
]

export default function EmotionalCheckIn({ onComplete }: EmotionalCheckInProps) {
  const { setEmotionalCheckIn, setDayIntention, autoSave } = useDayloStore()
  const [step, setStep] = useState(1)
  const [selectedArea, setSelectedArea] = useState('')
  const [mainGoal, setMainGoal] = useState('')
  const [idealDay, setIdealDay] = useState('')
  const [intention, setIntention] = useState('')

  const handleNext = async () => {
    if (step === 1 && selectedArea) {
      setEmotionalCheckIn({
        feeling: selectedArea,
        mentalNoise: mainGoal || undefined,
        needsToday: idealDay || undefined,
      })
      // Guardar inmediatamente el check-in inicial
      await autoSave()
      setStep(2)
    } else if (step === 2 && intention) {
      setDayIntention(intention)
      // Esperar a que se guarde antes de cerrar el modal
      await new Promise(resolve => setTimeout(resolve, 100))
      await autoSave()
      console.log('✅ Intención guardada:', intention)
      onComplete()
    }
  }

  const canProceedStep1 = selectedArea !== ''
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
                      Conocer tus objetivos nos ayuda a personalizar tu experiencia y sugerirte lo más relevante para ti
                    </p>
                  </div>
                </motion.div>

                {/* Question 1: ¿En qué área quieres enfocarte? */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    🎯 ¿En qué área de tu vida quieres enfocarte más?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {LIFE_AREAS.map((area) => (
                      <motion.button
                        key={area.label}
                        onClick={() => setSelectedArea(area.label)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedArea === area.label
                            ? 'border-purple-400 shadow-md scale-105'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        style={{
                          backgroundColor: selectedArea === area.label ? area.color : 'white'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-1">{area.emoji}</div>
                        <div className="text-xs font-medium text-gray-700">{area.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Question 2: ¿Cuál es tu objetivo principal? */}
                {selectedArea && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      🎯 ¿Cuál es tu objetivo principal en esta área? <span className="text-xs text-gray-400">(opcional)</span>
                    </label>
                    <textarea
                      value={mainGoal}
                      onChange={(e) => setMainGoal(e.target.value)}
                      placeholder="Ej: Mejorar mi condición física, aprender React, ahorrar para un viaje..."
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                      rows={2}
                    />
                  </motion.div>
                )}

                {/* Question 3: ¿Cómo sería tu día ideal? */}
                {selectedArea && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      ✨ ¿Cómo sería tu día ideal?
                    </label>
                    <input
                      type="text"
                      value={idealDay}
                      onChange={(e) => setIdealDay(e.target.value)}
                      placeholder="Ej: Productivo y balanceado, tranquilo sin presión, lleno de energía..."
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
                  <p className="text-sm text-gray-600 mb-2">Área de enfoque:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {LIFE_AREAS.find(a => a.label === selectedArea)?.emoji} {selectedArea}
                  </p>
                  {idealDay && (
                    <p className="text-sm text-purple-700 mt-2">
                      ✨ Tu día ideal: {idealDay}
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
