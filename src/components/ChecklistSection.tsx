import { Plus, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useDayloStore } from '../store/dayloStore'

interface ChecklistSectionProps {
  timeContext: 'morning' | 'afternoon' | 'evening'
}

export default function ChecklistSection({ timeContext }: ChecklistSectionProps) {
  const [newTaskText, setNewTaskText] = useState('')
  const { currentEntry, addTask, toggleTask, removeTask } = useDayloStore()
  const tasks = currentEntry.tasks || []

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskText.trim()) {
      addTask(newTaskText.trim())
      setNewTaskText('')
    }
  }

  const completedCount = tasks.filter(t => t.completed).length
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0

  const getContextMessage = () => {
    if (timeContext === 'morning') {
      return {
        title: '✨ ¿Qué quieres lograr hoy?',
        subtitle: 'Planifica tus intenciones para el día',
        placeholder: 'Ej: Terminar reporte, hacer ejercicio...',
      }
    } else if (timeContext === 'afternoon') {
      return {
        title: '🎯 ¿Qué lograste hoy?',
        subtitle: 'Marca lo que ya completaste',
        placeholder: 'Ej: Completé el proyecto...',
      }
    } else {
      return {
        title: '📝 Resumen de tu día',
        subtitle: 'Revisa lo que lograste',
        placeholder: 'Ej: Día productivo...',
      }
    }
  }

  const context = getContextMessage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{context.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{context.subtitle}</p>
      </div>

      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Progreso</span>
            <span className="font-semibold">{completedCount}/{tasks.length} completadas</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
            />
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200 hover:border-purple-300'
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-purple-400'
                }`}
              >
                {task.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </button>

              {/* Task Text */}
              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-700 font-medium'
                }`}
              >
                {task.text}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => removeTask(task.id)}
                className="flex-shrink-0 w-6 h-6 rounded-lg hover:bg-red-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">Aún no hay tareas</p>
            <p className="text-xs mt-1">
              {timeContext === 'morning' 
                ? '¡Comienza a planificar tu día!' 
                : '¿Qué hiciste hoy?'}
            </p>
          </div>
        )}
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder={context.placeholder}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
          maxLength={100}
        />
        <button
          type="submit"
          disabled={!newTaskText.trim()}
          className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {/* Completion Message */}
      {tasks.length > 0 && completedCount === tasks.length && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
        >
          <p className="text-sm text-green-700 font-medium text-center">
            🎉 ¡Completaste todas tus tareas! ¡Excelente trabajo!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
