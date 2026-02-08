import { Plus, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useDayloStore } from '../store/dayloStore'

interface ChecklistSectionProps {
  timeContext: 'morning' | 'afternoon' | 'evening'
}

export default function ChecklistSection({ timeContext }: ChecklistSectionProps) {
  const [newTaskText, setNewTaskText] = useState('')
  const [newPersonalAction, setNewPersonalAction] = useState('')
  const [isTaskSaving, setIsTaskSaving] = useState(false)
  const [savingTaskId, setSavingTaskId] = useState<string | null>(null)
  const { currentEntry, addTask, toggleTask, removeTask, autoSave } = useDayloStore()
  const tasks = currentEntry.tasks || []
  
  const priorities = tasks.filter(t => t.isPriority && !t.isPersonal)
  const personalAction = tasks.find(t => t.isPersonal)
  const otherTasks = tasks.filter(t => !t.isPriority && !t.isPersonal)

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskText.trim() && !isTaskSaving) {
      setIsTaskSaving(true)
      try {
        // Siempre intentar agregar como prioridad si hay espacio
        const isPriority = priorities.length < 3
        addTask(newTaskText.trim(), isPriority, false)
        setNewTaskText('')
        await new Promise(resolve => setTimeout(resolve, 100))
        await autoSave()
        console.log('✅ Tarea agregada y guardada')
      } catch (error) {
        console.error('❌ Error guardando tarea:', error)
      } finally {
        setIsTaskSaving(false)
      }
    }
  }

  const handleAddPersonalAction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPersonalAction.trim() && !personalAction && !isTaskSaving) {
      setIsTaskSaving(true)
      try {
        addTask(newPersonalAction.trim(), false, true)
        setNewPersonalAction('')
        await new Promise(resolve => setTimeout(resolve, 100))
        await autoSave()
        console.log('✅ Acción personal agregada y guardada')
      } catch (error) {
        console.error('❌ Error guardando acción:', error)
      } finally {
        setIsTaskSaving(false)
      }
    }
  }

  const handleToggleTask = async (taskId: string) => {
    if (savingTaskId) return // Evitar múltiples clicks
    setSavingTaskId(taskId)
    try {
      toggleTask(taskId)
      await new Promise(resolve => setTimeout(resolve, 100))
      await autoSave()
      console.log('✅ Tarea marcada y guardada')
    } catch (error) {
      console.error('❌ Error guardando cambio de tarea:', error)
    } finally {
      setSavingTaskId(null)
    }
  }

  const handleRemoveTask = async (taskId: string) => {
    if (savingTaskId) return // Evitar múltiples clicks
    setSavingTaskId(taskId)
    try {
      removeTask(taskId)
      await new Promise(resolve => setTimeout(resolve, 100))
      await autoSave()
      console.log('✅ Tarea eliminada y guardada')
    } catch (error) {
      console.error('❌ Error eliminando tarea:', error)
    } finally {
      setSavingTaskId(null)
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
      // Si no hay tareas, pregunta diferente
      if (tasks.length === 0) {
        return {
          title: '📋 ¿Qué hiciste hoy?',
          subtitle: 'Registra las cosas que realizaste',
          placeholder: 'Ej: Reunión con equipo, almorzar con amigos...',
        }
      } else {
        return {
          title: '🎯 ¿Qué lograste hoy?',
          subtitle: 'Marca lo que ya completaste',
          placeholder: 'Ej: Completé el proyecto...',
        }
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
  const canAddPriority = priorities.length < 3

  const renderTask = (task: any) => (
    <motion.div
      key={task.id}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        task.completed
          ? 'bg-green-50 border-green-200'
          : task.isPriority 
          ? 'bg-purple-50 border-purple-200 hover:border-purple-300'
          : task.isPersonal
          ? 'bg-pink-50 border-pink-200 hover:border-pink-300'
          : 'bg-gray-50 border-gray-200 hover:border-purple-300'
      }`}
    >
      <button
        onClick={() => handleToggleTask(task.id)}
        disabled={savingTaskId === task.id}
        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all relative ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-purple-400'
        } ${savingTaskId === task.id ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {savingTaskId === task.id ? (
          <motion.div
            className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        ) : task.completed ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        ) : null}
      </button>
      <span
        className={`flex-1 text-sm ${
          task.completed
            ? 'line-through text-gray-400'
            : 'text-gray-700 font-medium'
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => handleRemoveTask(task.id)}
        disabled={savingTaskId === task.id}
        className={`flex-shrink-0 w-6 h-6 rounded-lg hover:bg-red-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ${
          savingTaskId === task.id ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6"
    >
      {/* 3 PRIORIDADES */}
      <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                🎯 Máximo 3 prioridades
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Menos es más. Enfócate en lo que realmente importa
              </p>
            </div>
            {priorities.length >= 3 && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-medium">
                Completo
              </span>
            )}
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {priorities.map(renderTask)}
            </AnimatePresence>
            
            {priorities.length === 0 && (
              <div className="text-center py-6 border-2 border-dashed border-purple-200 rounded-xl bg-purple-50/30">
                <p className="text-sm text-gray-500">
                  ¿Qué 3 cosas moverían la aguja hoy?
                </p>
              </div>
            )}
          </div>

          {canAddPriority && (
            <form onSubmit={handleAddTask} className="flex gap-2">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder={`Prioridad ${priorities.length + 1}...`}
                className="flex-1 px-3 py-2.5 rounded-xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm bg-purple-50/30"
                maxLength={100}
              />
              <button
                type="submit"
                disabled={!newTaskText.trim()}
                className="px-3 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>
          )}
          
          {!canAddPriority && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-purple-50 rounded-xl border border-purple-200"
            >
              <p className="text-xs text-purple-700 text-center">
                ✨ Perfecto. Más de 3 prioridades reduce tu probabilidad de completarlas en 50%
              </p>
            </motion.div>
          )}
        </div>

      {/* 1 ACCIÓN PARA TI */}
      <div className="space-y-3 border-t-2 border-gray-100 pt-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              💚 1 Acción para ti
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Algo que cuide tu bienestar, aunque "no sea productivo"
            </p>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {personalAction && renderTask(personalAction)}
            </AnimatePresence>
            
            {!personalAction && (
              <div className="text-center py-6 border-2 border-dashed border-pink-200 rounded-xl bg-pink-50/30">
                <p className="text-sm text-gray-500">
                  ¿Qué te haría bien hoy?
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Caminar, descansar, llamar a alguien...
                </p>
              </div>
            )}
          </div>

          {!personalAction && (
            <form onSubmit={handleAddPersonalAction} className="flex gap-2">
              <input
                type="text"
                value={newPersonalAction}
                onChange={(e) => setNewPersonalAction(e.target.value)}
                placeholder="Ej: Caminar 10 min, desconectar..."
                className="flex-1 px-3 py-2.5 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm bg-pink-50/30"
                maxLength={100}
              />
              <button
                type="submit"
                disabled={!newPersonalAction.trim()}
                className="px-3 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

      {/* OTRAS TAREAS O RESUMEN */}
      {(timeContext !== 'morning' || otherTasks.length > 0) && (
        <div className="space-y-3 border-t-2 border-gray-100 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{context.title}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{context.subtitle}</p>
            </div>
            {tasks.length > 0 && (
              <span className="text-xs text-gray-500">
                {completedCount}/{tasks.length}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {tasks.length > 0 && (
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
              />
            </div>
          )}

          <div className="space-y-2 max-h-60 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {timeContext === 'morning' 
                ? otherTasks.map(renderTask)
                : tasks.map(renderTask)
              }
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

          {timeContext !== 'morning' && (
            <form onSubmit={handleAddTask} className="flex gap-2">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder={context.placeholder}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
                maxLength={100}
              />
              <button
                type="submit"
                disabled={!newTaskText.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      )}

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
