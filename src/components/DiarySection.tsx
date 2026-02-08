import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, ChevronDown, Save, Check } from 'lucide-react'
import { useDayloStore } from '../store/dayloStore'
import { useState, useEffect } from 'react'

interface DiarySectionProps {
  timeContext: 'morning' | 'afternoon' | 'evening'
}

export default function DiarySection({ timeContext }: DiarySectionProps) {
  const { currentEntry, setDiaryNote, autoSave } = useDayloStore()
  const note = currentEntry.diaryNote || ''
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  // Auto-save con debounce cuando el diario cambia
  useEffect(() => {
    if (note) {
      const timer = setTimeout(() => {
        autoSave()
      }, 1000) // Guardar 1 segundo después de que el usuario deje de escribir

      return () => clearTimeout(timer)
    }
  }, [note, autoSave])

  const handleManualSave = async () => {
    setIsSaving(true)
    try {
      await autoSave()
      setJustSaved(true)
      setTimeout(() => setJustSaved(false), 2000) // Mostrar "Guardado" por 2 segundos
    } catch (error) {
      console.error('Error guardando nota:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const getContextPrompt = () => {
    if (timeContext === 'morning') {
      return {
        title: '📝 Notas para hoy',
        placeholder: 'Anota lo que quieras: ideas, intenciones, cómo te sientes, recordatorios...\n\nEste es tu espacio libre para escribir lo que necesites.',
        emoji: '✨',
      }
    } else if (timeContext === 'afternoon') {
      return {
        title: '📝 Notas del día',
        placeholder: 'Escribe lo que quieras: pensamientos, ideas, algo que pasó, cómo te sientes...\n\nSin límites, sin filtros. Tu espacio personal.',
        emoji: '💭',
      }
    } else {
      return {
        title: '📝 Notas del día',
        placeholder: 'Aquí puedes escribir lo que quieras: reflexiones, versos, ideas sueltas, lo que viviste...\n\nTu espacio seguro para expresarte.',
        emoji: '📖',
      }
    }
  }

  const context = getContextPrompt()
  const characterCount = note.length
  const characterLimit = 1000

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border-2 border-purple-200 overflow-hidden shadow-sm"
    >
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">{context.title}</h3>
            <p className="text-sm text-purple-600">
              {note ? `${note.split(/\s+/).filter(w => w.length > 0).length} palabras escritas` : 'Tu espacio personal'}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-purple-500" />
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
            className="border-t-2 border-purple-100"
          >
            <div className="p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
              {/* Inspirational Message */}
              {!note && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 bg-white/80 rounded-xl border border-purple-200"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-700">
                      {timeContext === 'morning' && 'Comenzar el día escribiendo tus pensamientos te ayuda a tener claridad mental'}
                      {timeContext === 'afternoon' && 'Tomarte un momento para reflexionar puede cambiar el rumbo de tu día'}
                      {timeContext === 'evening' && 'Escribir antes de dormir te ayuda a procesar el día y descansar mejor'}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={note}
                  onChange={(e) => setDiaryNote(e.target.value)}
                  placeholder={context.placeholder}
                  maxLength={characterLimit}
                  className="w-full h-56 p-4 rounded-xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm text-gray-700 placeholder:text-gray-400 bg-white"
                  style={{ lineHeight: '1.6' }}
                />
                
                {/* Character Counter */}
                <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded-lg">
                  {characterCount}/{characterLimit}
                </div>
              </div>

              {/* Word Count Stats */}
              {note && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 flex justify-between text-xs text-purple-600 px-2"
                >
                  <span>{note.split(/\s+/).filter(w => w.length > 0).length} palabras</span>
                  <span>{note.split('\n').length} líneas</span>
                </motion.div>
              )}

              {/* Botón Guardar */}
              <motion.button
                onClick={handleManualSave}
                disabled={isSaving || !note}
                className={`mt-4 w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  justSaved
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
                whileHover={!isSaving && note ? { scale: 1.02 } : {}}
                whileTap={!isSaving && note ? { scale: 0.98 } : {}}
              >
                {justSaved ? (
                  <>
                    <Check size={18} />
                    <span>¡Guardado!</span>
                  </>
                ) : isSaving ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Guardar Notas</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
