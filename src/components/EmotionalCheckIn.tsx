import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useDayloStore } from '../store/dayloStore'

interface EmotionalCheckInProps {
  onComplete: () => void
  isNewUser?: boolean // Indicar si es primera vez del usuario
}

const FEELINGS = [
  { emoji: '😊', label: 'Bien', color: '#D4FFE5' },
  { emoji: '😰', label: 'Ansioso/a', color: '#FFE5D4' },
  { emoji: '😴', label: 'Cansado/a', color: '#E8D4FF' },
  { emoji: '😤', label: 'Abrumado/a', color: '#FFD4E5' },
  { emoji: '🤗', label: 'Motivado/a', color: '#FFF4D4' },
  { emoji: '😐', label: 'Neutral', color: '#E8E8E8' },
]

// Emociones que requieren seguimiento
const NEGATIVE_FEELINGS = ['Ansioso/a', 'Cansado/a', 'Abrumado/a']

// Mensajes y preguntas personalizadas según emoción
const EMOTION_CONTEXTS = {
  'Ansioso/a': {
    encouragement: 'Respira. Un paso a la vez. Hoy puedes enfocarte en lo que SÍ controlas.',
    actionQuestion: '¿Qué PEQUEÑO paso te ayudaría a sentirte mejor?',
    placeholder: 'Ej: Hacer una lista, hablar con alguien, salir a caminar 10 minutos...'
  },
  'Cansado/a': {
    encouragement: 'Tu cuerpo te está pidiendo algo. Hoy puedes ir a tu ritmo, sin culpa.',
    actionQuestion: '¿Qué necesitas priorizar para cuidar tu energía?',
    placeholder: 'Ej: Dormir temprano, delegar tareas, decir no a algo, tomar pausas...'
  },
  'Abrumado/a': {
    encouragement: 'Está bien hacer menos. ¿Qué es lo MÁS importante hoy?',
    actionQuestion: 'Si solo pudieras hacer UNA cosa hoy, ¿cuál sería?',
    placeholder: 'Ej: Terminar ese proyecto, hablar con mi jefe, descansar sin culpa...'
  },
  'Bien': {
    encouragement: '✨ ¡Aprovecha esta energía! ¿En qué quieres enfocarla hoy?',
    actionQuestion: '¿Qué quieres lograr o cómo quieres sentirte al final del día?',
    placeholder: 'Ej: Avanzar en mis proyectos, conectar con otros, mantener este equilibrio...'
  },
  'Motivado/a': {
    encouragement: '🔥 Ese impulso es oro. ¿Qué quieres lograr hoy?',
    actionQuestion: '¿En qué vas a canalizar esta motivación?',
    placeholder: 'Ej: Empezar ese proyecto, aprender algo nuevo, hacer ejercicio, crear...'
  },
  'Neutral': {
    encouragement: 'Un día equilibrado es un buen punto de partida. ¿Cómo quieres sentirte al cerrarlo?',
    actionQuestion: '¿Qué le daría sentido a tu día de hoy?',
    placeholder: 'Ej: Completar tareas pendientes, tener un momento para mí, conectar con alguien...'
  }
}

// Preguntas profundas para usuarios nuevos
const NEW_USER_QUESTIONS = [
  {
    key: 'currentGoal',
    emoji: '🎯',
    question: '¿Qué quieres cambiar o lograr ahora mismo en tu vida?',
    placeholder: 'Ej: Mejorar mi salud, cambiar de trabajo, fortalecer mis relaciones...'
  },
  {
    key: 'futureVision',
    emoji: '✨',
    question: '¿Cómo quieres que sea tu vida en los próximos años?',
    placeholder: 'Ej: Ser más independiente, tener un mejor equilibrio, sentirme realizado/a...'
  },
  {
    key: 'mainObstacle',
    emoji: '🚧',
    question: '¿Qué es lo que más te frena hoy?',
    placeholder: 'Ej: La falta de tiempo, el miedo, la incertidumbre, la procrastinación...'
  }
]

export default function EmotionalCheckIn({ onComplete, isNewUser = false }: EmotionalCheckInProps) {
  const { setEmotionalCheckIn, autoSave } = useDayloStore()
  const [step, setStep] = useState(1)
  
  const [selectedFeeling, setSelectedFeeling] = useState('')
  const [currentGoal, setCurrentGoal] = useState('')
  const [futureVision, setFutureVision] = useState('')
  const [mainObstacle, setMainObstacle] = useState('')
  const [shareThoughts, setShareThoughts] = useState('')
  const [actionIntention, setActionIntention] = useState('')

  // Usuarios nuevos: 4 pasos (emoción, objetivo, visión, obstáculo)
  // Usuarios existentes con emoción negativa: 3 pasos (emoción → compartir → acción)
  // Usuarios existentes con emoción positiva/neutral: 2 pasos (emoción → acción)
  const isNegativeFeeling = NEGATIVE_FEELINGS.includes(selectedFeeling)
  const totalSteps = isNewUser ? 4 : (isNegativeFeeling ? 3 : 2)

  const handleNext = async () => {
    if (step === 1 && selectedFeeling) {
      // Paso 1: Guardar emoción inicial
      setEmotionalCheckIn({
        feeling: selectedFeeling,
      })
      
      // Verificar que hay email antes de guardar
      const userEmail = localStorage.getItem('daylo-user-email')
      console.log('📧 Email usuario:', userEmail)
      
      await autoSave()
      console.log('✅ Paso 1 guardado - Emoción:', selectedFeeling)
      
      // Usuarios existentes: siempre ir a paso 2 (negativas o positivas)
      // Usuarios nuevos: continuar flujo de 5 pasos
      setStep(2)
    } else if (step === 2 && isNewUser && currentGoal.trim()) {
      // Paso 2 (solo nuevos usuarios): Primera pregunta profunda
      setEmotionalCheckIn({
        feeling: selectedFeeling,
        currentGoal: currentGoal.trim(),
      })
      await autoSave()
      console.log('✅ Paso 2 guardado - Objetivo actual:', currentGoal)
      setStep(3)
    } else if (step === 3 && isNewUser && futureVision.trim()) {
      // Paso 3 (solo nuevos usuarios): Segunda pregunta profunda
      setEmotionalCheckIn({
        feeling: selectedFeeling,
        currentGoal: currentGoal.trim(),
        futureVision: futureVision.trim(),
      })
      await autoSave()
      console.log('✅ Paso 3 guardado - Visión futura:', futureVision)
      setStep(4)
    } else if (step === 4 && isNewUser && mainObstacle.trim()) {
      // Paso 4 (solo nuevos usuarios): Tercera pregunta profunda - PASO FINAL
      const finalCheckIn = {
        feeling: selectedFeeling,
        currentGoal: currentGoal.trim() || undefined,
        futureVision: futureVision.trim() || undefined,
        mainObstacle: mainObstacle.trim(),
      }
      setEmotionalCheckIn(finalCheckIn)
      await autoSave()
      console.log('✅ Check-in completo guardado (usuario nuevo):', finalCheckIn)
      console.log('🔍 Verifica Firebase en: dailyEntries/' + localStorage.getItem('daylo-user-email') + '_' + new Date().toISOString().split('T')[0])
      onComplete()
    } else if (step === 2 && !isNewUser && !isNegativeFeeling && actionIntention.trim()) {
      // Usuario existente con emoción POSITIVA/NEUTRAL - guardar acción directa (paso final)
      setEmotionalCheckIn({
        feeling: selectedFeeling,
        actionIntention: actionIntention.trim(),
      })
      await autoSave()
      console.log('✅ Check-in completo (positivo):', { feeling: selectedFeeling, actionIntention })
      console.log('🔍 Verifica Firebase en: dailyEntries/' + localStorage.getItem('daylo-user-email') + '_' + new Date().toISOString().split('T')[0])
      onComplete()
    } else if (step === 2 && !isNewUser && isNegativeFeeling) {
      // Usuario existente con emoción NEGATIVA - paso 2: compartir pensamientos (opcional)
      setEmotionalCheckIn({
        feeling: selectedFeeling,
        shareThoughts: shareThoughts.trim() || undefined,
      })
      await autoSave()
      console.log('✅ Paso 2 guardado (negativo):', { feeling: selectedFeeling, shareThoughts })
      setStep(3)
    } else if (step === 3 && !isNewUser && isNegativeFeeling && actionIntention.trim()) {
      // Usuario existente con emoción NEGATIVA - paso 3: intención/acción (paso final)
      setEmotionalCheckIn({
        feeling: selectedFeeling,
        shareThoughts: shareThoughts.trim() || undefined,
        actionIntention: actionIntention.trim(),
      })
      await autoSave()
      console.log('✅ Check-in completo (negativo):', { feeling: selectedFeeling, shareThoughts, actionIntention })
      console.log('🔍 Verifica Firebase en: dailyEntries/' + localStorage.getItem('daylo-user-email') + '_' + new Date().toISOString().split('T')[0])
      onComplete()
    }
  }

  const canProceedStep1 = selectedFeeling !== ''
  // Paso 2: Usuarios nuevos (currentGoal requerido) | Existentes negativos (siempre puede continuar) | Existentes positivos (actionIntention requerido)
  const canProceedStep2 = isNewUser 
    ? currentGoal.trim() !== '' 
    : (isNegativeFeeling ? true : actionIntention.trim() !== '')
  const canProceedStep3 = isNewUser ? futureVision.trim() !== '' : actionIntention.trim() !== '' // Para existentes negativos: actionIntention
  const canProceedStep4 = mainObstacle.trim() !== ''

  const getStepTitle = () => {
    if (step === 1) return '💭 Hola, bienvenido/a'
    if (step === 2 && !isNewUser && isNegativeFeeling) return '💭 Quieres compartir algo?'
    if (step === 2 && !isNewUser && !isNegativeFeeling) return '✨ Tu intención de hoy'
    if (step === 3 && !isNewUser) return '🎯 Tu intención de hoy'
    if (step === 2 && isNewUser) return '🎯 Tu objetivo actual'
    if (step === 3 && isNewUser) return '✨ Tu visión futura'
    if (step === 4 && isNewUser) return '🚧 Tus obstáculos'

    return ''
  }

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
                  {getStepTitle()}
                </h2>
                <p className="text-xs text-purple-600">Paso {step} de {totalSteps}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {/* PASO 1: ¿Cómo te sientes? */}
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
                      {isNewUser 
                        ? 'Reconocer tus emociones es el primer paso para vivir con más conciencia'
                        : 'Tomarte un momento para reconocer cómo te sientes te ayuda a regular tus emociones'}
                    </p>
                  </div>
                </motion.div>

                {/* Question 1: ¿Cómo te sientes? */}
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
              </motion.div>
            )}

            {/* PASO 2: Primera pregunta profunda (solo usuarios nuevos) */}
            {step === 2 && isNewUser && (
              <motion.div
                key="step2-new-user"
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
                      Definir claramente lo que quieres cambiar es el primer paso hacia la transformación
                    </p>
                  </div>
                </motion.div>

                {/* Pregunta 1: ¿Qué quieres cambiar o lograr ahora mismo? */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    {NEW_USER_QUESTIONS[0].emoji} {NEW_USER_QUESTIONS[0].question}
                  </label>
                  <textarea
                    value={currentGoal}
                    onChange={(e) => setCurrentGoal(e.target.value)}
                    placeholder={NEW_USER_QUESTIONS[0].placeholder}
                    className="w-full p-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                    rows={4}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    💡 Sé honesto/a contigo mismo/a, esto nos ayuda a guiarte mejor
                  </p>
                </div>
              </motion.div>
            )}

            {/* PASO 3: Segunda pregunta profunda (solo usuarios nuevos) */}
            {step === 3 && isNewUser && (
              <motion.div
                key="step3-new-user"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Summary */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Quieres cambiar/lograr:</p>
                      <p className="text-sm text-gray-800 line-clamp-2">{currentGoal}</p>
                    </div>
                  </div>
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
                      Visualizar tu futuro ideal te ayuda a tomar mejores decisiones en el presente
                    </p>
                  </div>
                </motion.div>

                {/* Pregunta 2: ¿Cómo quieres que sea tu vida? */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    {NEW_USER_QUESTIONS[1].emoji} {NEW_USER_QUESTIONS[1].question}
                  </label>
                  <textarea
                    value={futureVision}
                    onChange={(e) => setFutureVision(e.target.value)}
                    placeholder={NEW_USER_QUESTIONS[1].placeholder}
                    className="w-full p-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                    rows={4}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    💡 No hay respuestas correctas o incorrectas, solo tu visión
                  </p>
                </div>
              </motion.div>
            )}

            {/* PASO 4: Tercera pregunta profunda (solo usuarios nuevos) */}
            {step === 4 && isNewUser && (
              <motion.div
                key="step4-new-user"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Summary */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Tu visión futura:</p>
                      <p className="text-sm text-gray-800 line-clamp-2">{futureVision}</p>
                    </div>
                  </div>
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
                      Reconocer lo que te frena es el primer paso para superarlo
                    </p>
                  </div>
                </motion.div>

                {/* Pregunta 3: ¿Qué te frena? */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    {NEW_USER_QUESTIONS[2].emoji} {NEW_USER_QUESTIONS[2].question}
                  </label>
                  <textarea
                    value={mainObstacle}
                    onChange={(e) => setMainObstacle(e.target.value)}
                    placeholder={NEW_USER_QUESTIONS[2].placeholder}
                    className="w-full p-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                    rows={4}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    💡 Identificar obstáculos es clave para trabajar en ellos
                  </p>
                </div>
              </motion.div>
            )}

            {/* PASO 2 para usuarios existentes con EMOCIONES NEGATIVAS: Compartir pensamientos (opcional) */}
            {step === 2 && !isNewUser && isNegativeFeeling && (
              <motion.div
                key="step2-existing-negative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Summary */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">Te sientes:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {FEELINGS.find(f => f.label === selectedFeeling)?.emoji} {selectedFeeling}
                  </p>
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
                      A veces expresar lo que sentimos nos ayuda a procesarlo mejor
                    </p>
                  </div>
                </motion.div>

                {/* Pregunta sutil: compartir pensamientos */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    💭 ¿Hay algo que quieras compartir?
                  </label>
                  <textarea
                    value={shareThoughts}
                    onChange={(e) => setShareThoughts(e.target.value)}
                    placeholder="Opcional: Escribe lo que sientas, sin presión..."
                    className="w-full p-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                    rows={4}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    💡 Este campo es completamente opcional, puedes continuar sin escribir nada
                  </p>
                </div>
              </motion.div>
            )}

            {/* PASO 2 para usuarios existentes con EMOCIONES POSITIVAS/NEUTRALES: Acción directa */}
            {step === 2 && !isNewUser && !isNegativeFeeling && (
              <motion.div
                key="step2-existing-positive"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Summary */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">Te sientes:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {FEELINGS.find(f => f.label === selectedFeeling)?.emoji} {selectedFeeling}
                  </p>
                </div>

                {/* Mensaje motivacional personalizado */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-base font-semibold text-purple-800">
                      {EMOTION_CONTEXTS[selectedFeeling as keyof typeof EMOTION_CONTEXTS]?.encouragement}
                    </p>
                  </div>
                </motion.div>

                {/* Pregunta de acción */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    🎯 {EMOTION_CONTEXTS[selectedFeeling as keyof typeof EMOTION_CONTEXTS]?.actionQuestion}
                  </label>
                  <textarea
                    value={actionIntention}
                    onChange={(e) => setActionIntention(e.target.value)}
                    placeholder={EMOTION_CONTEXTS[selectedFeeling as keyof typeof EMOTION_CONTEXTS]?.placeholder}
                    className="w-full p-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                    rows={3}
                    autoFocus
                  />
                </div>
              </motion.div>
            )}

            {/* PASO 3 para usuarios existentes con EMOCIONES NEGATIVAS: Intención con mensaje de ánimo */}
            {step === 3 && !isNewUser && isNegativeFeeling && (
              <motion.div
                key="step3-existing-negative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Mensaje de ánimo personalizado */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-base font-semibold text-purple-800">
                      {EMOTION_CONTEXTS[selectedFeeling as keyof typeof EMOTION_CONTEXTS]?.encouragement}
                    </p>
                  </div>
                </motion.div>

                {/* Pregunta de acción específica */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    🎯 {EMOTION_CONTEXTS[selectedFeeling as keyof typeof EMOTION_CONTEXTS]?.actionQuestion}
                  </label>
                  <textarea
                    value={actionIntention}
                    onChange={(e) => setActionIntention(e.target.value)}
                    placeholder={EMOTION_CONTEXTS[selectedFeeling as keyof typeof EMOTION_CONTEXTS]?.placeholder}
                    className="w-full p-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm"
                    rows={3}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    💡 Algo pequeño y concreto que esté en tu control
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
            {step > 1 && (
              <motion.button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Atrás
              </motion.button>
            )}
            <motion.button
              onClick={handleNext}
              disabled={
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2) ||
                (step === 3 && !canProceedStep3) ||
                (step === 4 && !canProceedStep4)
              }
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                ((step === 1 && canProceedStep1) || 
                 (step === 2 && canProceedStep2) || 
                 (step === 3 && canProceedStep3) ||
                 (step === 4 && canProceedStep4))
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={
                ((step === 1 && canProceedStep1) || 
                 (step === 2 && canProceedStep2) || 
                 (step === 3 && canProceedStep3) ||
                 (step === 4 && canProceedStep4)) 
                  ? { scale: 1.02 } 
                  : {}
              }
              whileTap={
                ((step === 1 && canProceedStep1) || 
                 (step === 2 && canProceedStep2) || 
                 (step === 3 && canProceedStep3) ||
                 (step === 4 && canProceedStep4)) 
                  ? { scale: 0.98 } 
                  : {}
              }
            >
              {step === totalSteps ? 'Comenzar mi día ✨' : 'Continuar'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
