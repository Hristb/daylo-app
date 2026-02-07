import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, Edit3, X, Save } from 'lucide-react'
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

  // Si es tarde y no está abierto, mostrar solo el botón
  if (timeContext === 'afternoon' && !isOpen && !note) {
    return (
      <>
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-center gap-3 text-white">
            <Edit3 className="w-6 h-6" />
            <span className="text-xl font-bold">📝 Registrar mi día</span>
          </div>
          <p className="text-white/90 text-sm mt-2">Toca para escribir sobre tu día</p>
        </motion.button>

        {/* Modal desde abajo */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />

              {/* Modal */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-purple-50 to-pink-50 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
              >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-br from-purple-400 to-pink-400 px-6 py-4 flex items-center justify-between border-b-2 border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{context.title}</h2>
                      <p className="text-sm text-white/90">{context.emoji} Tu espacio íntimo</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                  {/* Inspirational Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 p-3 bg-white/60 rounded-xl border border-purple-200"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-purple-700">
                        Tomarte un momento para reflexionar puede cambiar el rumbo de tu día
                      </p>
                    </div>
                  </motion.div>

                  {/* Text Area */}
                  <div className="relative">
                    <textarea
                      value={note}
                      onChange={(e) => setDiaryNote(e.target.value)}
                      placeholder={context.placeholder}
                      maxLength={characterLimit}
                      autoFocus
                      className="w-full h-64 p-4 rounded-xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-sm text-gray-700 placeholder:text-gray-400 bg-white/80 backdrop-blur-sm"
                      style={{ lineHeight: '1.6' }}
                    />
                    
                    {/* Character Counter */}
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-lg">
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

                {/* Footer con botón guardar */}
                <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-white/95 p-4 border-t-2 border-purple-100">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Save className="w-5 h-5" />
                    Guardar y cerrar
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

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
