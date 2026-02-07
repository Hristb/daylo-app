import { motion } from 'framer-motion'
import { BookOpen, Sparkles } from 'lucide-react'
import { useDayloStore } from '../store/dayloStore'

interface DiarySectionProps {
  timeContext: 'morning' | 'afternoon' | 'evening'
}

export default function DiarySection({ timeContext }: DiarySectionProps) {
  const { currentEntry, setDiaryNote } = useDayloStore()
  const note = currentEntry.diaryNote || ''

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
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-purple-100"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{context.title}</h2>
          <p className="text-sm text-purple-600">Tu espacio íntimo y personal</p>
        </div>
      </div>

      {/* Inspirational Message */}
      {!note && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-white/60 rounded-xl border border-purple-200"
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
          className="w-full h-48 p-4 rounded-xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm text-gray-700 placeholder:text-gray-400 bg-white/80 backdrop-blur-sm"
          style={{ lineHeight: '1.6' }}
        />
        
        {/* Character Counter */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-lg">
          {characterCount}/{characterLimit}
        </div>
      </div>

      {/* Footer Message */}
      {note && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-purple-600">
            {context.emoji} Tus pensamientos son valiosos. Este espacio es solo tuyo.
          </p>
        </motion.div>
      )}

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
    </motion.div>
  )
}
