import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, ChevronDown } from 'lucide-react'
import { useDayloStore } from '../store/dayloStore'
import { useState } from 'react'

interface DiarySectionProps {
  timeContext: 'morning' | 'afternoon' | 'evening'
}

export default function DiarySection({ timeContext }: DiarySectionProps) {
  const { currentEntry, setDiaryNote } = useDayloStore()
  const note = currentEntry.diaryNote || ''
  const [isOpen, setIsOpen] = useState(false)

  const getContextPrompt = () => {
    if (timeContext === 'morning') {
      return {
        title: '🌅 ¿Cómo te sientes hoy?',
        placeholder: 'Hoy me siento... Espero que sea un día en el que...\n\nÚsalo como tu espacio personal para expresarte libremente.',
        emoji: '✨',
      }
    } else if (timeContext === 'afternoon') {
      return {
        title: '🌤️ ¿Cómo va tu día?',
        placeholder: 'Hasta ahora mi día ha sido... Me siento...\n\nComparte lo que llevas vivido hoy.',
        emoji: '💭',
      }
    } else {
      return {
        title: '🌙 Reflexión del día',
        placeholder: 'Hoy fue un día... Lo mejor fue... También sentí...\n\nEste es tu espacio seguro para reflexionar.',
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
