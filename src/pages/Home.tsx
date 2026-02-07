import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useDayloStore } from '../store/dayloStore'
import { ACTIVITY_OPTIONS, MOODS, getShuffledFacets } from '../utils/constants'
import ActivityCard from '../components/cards/ActivityCard'
import TimeSlider from '../components/sliders/TimeSlider'
import ActivityModal from '../components/modals/ActivityModal'
import RatingCard from '../components/cards/RatingCard'
import BooleanCard from '../components/cards/BooleanCard'
import ChecklistSection from '../components/ChecklistSection'
import DiarySection from '../components/DiarySection'
import { Sparkles, MessageCircle, Cloud, CloudOff } from 'lucide-react'
import { ActivityOption, ActivityFacet } from '../types'
import { saveDailyEntry, getTodayEntry } from '../services/firebaseService'

// Función para obtener el contexto temporal del día
function getTimeContext(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 19) return 'afternoon'
  return 'evening'
}

export default function Home() {
  const { 
    selectedActivities, 
    totalMinutes, 
    currentEntry,
    addActivity, 
    removeActivity,
    updateActivityDuration,
    updateActivityFacets,
    setReflection,
    saveEntry,
    setModalOpen,
  } = useDayloStore()

  const [selectedForEdit, setSelectedForEdit] = useState<ActivityOption | null>(null)
  const [tempFacets, setTempFacets] = useState<Record<string, number | boolean>>({})
  const [tempDuration, setTempDuration] = useState(0)
  const [tempNotes, setTempNotes] = useState('')
  const [showReflection, setShowReflection] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced')
  const [timeContext] = useState<'morning' | 'afternoon' | 'evening'>(getTimeContext())
  // FIXED: Fijar orden de preguntas cuando se abre el modal (no cambiar en cada render)
  const [shuffledFacets, setShuffledFacets] = useState<ActivityFacet[]>([])

  // Cargar datos de Firebase al iniciar
  useEffect(() => {
    const loadTodayData = async () => {
      try {
        const todayData = await getTodayEntry()
        if (todayData && todayData.activities) {
          // Cargar actividades del día desde Firebase
          todayData.activities.forEach(activity => {
            addActivity(activity)
          })
        }
      } catch (error) {
        console.error('Error cargando datos de hoy:', error)
      }
    }
    loadTodayData()
  }, [])

  const handleActivityClick = (activityOption: ActivityOption) => {
    const existing = selectedActivities.find(a => a.icon === activityOption.id)
    
    // FIXED: Generar orden aleatorio UNA SOLA VEZ al abrir el modal
    const facetsForActivity = getShuffledFacets(activityOption.id)
    setShuffledFacets(facetsForActivity)
    
    if (existing) {
      // Si ya existe, abrir para editar
      setSelectedForEdit(activityOption)
      setTempFacets(existing.facets || {})
      setTempDuration(existing.duration)
      setTempNotes(existing.notes || '')
    } else {
      // Si es nueva, abrir modal para configurar
      setSelectedForEdit(activityOption)
      setTempFacets({})
      setTempDuration(activityOption.defaultDuration)
      setTempNotes('')
    }
    setModalOpen(true)
  }

  const handleSaveActivity = () => {
    if (!selectedForEdit) return

    const existing = selectedActivities.find(a => a.icon === selectedForEdit.id)
    
    if (existing) {
      // Actualizar existente
      updateActivityDuration(existing.id, tempDuration)
      updateActivityFacets(existing.id, tempFacets, tempNotes)
    } else {
      // Agregar nueva
      addActivity({
        id: Date.now().toString(),
        icon: selectedForEdit.id,
        label: selectedForEdit.label,
        duration: tempDuration,
        color: selectedForEdit.color,
        facets: tempFacets,
        notes: tempNotes,
      })
    }

    // Guardar en Firebase y localStorage
    setTimeout(async () => {
      setSyncStatus('syncing')
      const today = new Date().toISOString().split('T')[0]
      const entries = JSON.parse(localStorage.getItem('daylo-entries') || '[]')
      
      const updatedActivities = existing 
        ? selectedActivities.map(a => a.icon === selectedForEdit.id 
            ? { ...a, duration: tempDuration, facets: tempFacets, notes: tempNotes }
            : a)
        : [...selectedActivities, {
            id: Date.now().toString(),
            icon: selectedForEdit.id,
            label: selectedForEdit.label,
            duration: tempDuration,
            color: selectedForEdit.color,
            facets: tempFacets,
            notes: tempNotes,
          }]
      
      const todayIndex = entries.findIndex((e: any) => 
        new Date(e.date).toISOString().split('T')[0] === today
      )
      
      const entryData = {
        id: Date.now().toString(),
        date: new Date(),
        activities: updatedActivities,
        reflection: {
          highlights: '',
          mood: '😊',
        },
      }
      
      if (todayIndex >= 0) {
        entries[todayIndex] = entryData
      } else {
        entries.push(entryData)
      }
      
      // Guardar en localStorage
      localStorage.setItem('daylo-entries', JSON.stringify(entries))
      
      // Guardar en Firebase
      try {
        await saveDailyEntry(entryData)
        setSyncStatus('synced')
      } catch (error) {
        console.error('Error guardando en Firebase:', error)
        setSyncStatus('offline')
      }
    }, 100)

    // Cerrar modal
    setSelectedForEdit(null)
    setModalOpen(false)
    setTempFacets({})
    setTempNotes('')
  }

  const handleDeleteActivity = () => {
    if (!selectedForEdit) return
    const existing = selectedActivities.find(a => a.icon === selectedForEdit.id)
    if (existing) {
      removeActivity(existing.id)
      
      // Actualizar localStorage también
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0]
        const entries = JSON.parse(localStorage.getItem('daylo-entries') || '[]')
        
        const todayIndex = entries.findIndex((e: any) => 
          new Date(e.date).toISOString().split('T')[0] === today
        )
        
        if (todayIndex >= 0) {
          const updatedActivities = selectedActivities.filter(a => a.id !== existing.id)
          entries[todayIndex] = {
            ...entries[todayIndex],
            activities: updatedActivities,
          }
          localStorage.setItem('daylo-entries', JSON.stringify(entries))
        }
      }, 100)
    }
    setSelectedForEdit(null)
    setModalOpen(false)
  }

  const handleSave = async () => {
    if (selectedActivities.length === 0) return
    
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    saveEntry()
    setIsSaving(false)
    setShowSuccess(true)
    
    setTimeout(() => {
      setShowSuccess(false)
      setShowReflection(false)
    }, 2000)
  }

  const canProceed = selectedActivities.length > 0
  // FIXED: Usar facets fijas que se establecieron al abrir el modal
  const facets = shuffledFacets

  // Mensaje contextual del Hero según la hora
  const getHeroMessage = () => {
    if (timeContext === 'morning') {
      return {
        title: '🌅 ¡Buenos días!',
        subtitle: 'Comienza tu día con intención',
      }
    } else if (timeContext === 'afternoon') {
      return {
        title: '☀️ ¿Cómo va tu día?',
        subtitle: 'Registra lo que has vivido',
      }
    } else {
      return {
        title: '🌙 Reflexiona sobre tu día',
        subtitle: 'Un momento para cerrar el día conscientemente',
      }
    }
  }

  const heroMessage = getHeroMessage()

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="daylo-card text-center"
      >
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {heroMessage.title}
        </motion.h2>
        <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
          {heroMessage.subtitle}
          {syncStatus === 'synced' && (
            <span className="text-green-600 flex items-center gap-1 text-xs">
              <Cloud size={14} /> Sincronizado
            </span>
          )}
          {syncStatus === 'syncing' && (
            <motion.span 
              className="text-blue-600 flex items-center gap-1 text-xs"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Cloud size={14} /> Guardando...
            </motion.span>
          )}
          {syncStatus === 'offline' && (
            <span className="text-orange-600 flex items-center gap-1 text-xs">
              <CloudOff size={14} /> Sin conexión
            </span>
          )}
        </p>
      </motion.div>

      {/* Checklist Section - Tareas del día */}
      <ChecklistSection timeContext={timeContext} />

      {/* Diary Section - Diario personal */}
      <DiarySection timeContext={timeContext} />

      {/* Activity Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="daylo-card"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-pastel-purple" />
          ¿Qué hiciste hoy?
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          {ACTIVITY_OPTIONS.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ActivityCard
                activity={activity}
                isSelected={selectedActivities.some(a => a.icon === activity.id)}
                onToggle={() => handleActivityClick(activity)}
              />
            </motion.div>
          ))}
        </div>

        {/* Resumen de actividades seleccionadas */}
        {selectedActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-4 border-t border-gray-200"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">
                {selectedActivities.length} {selectedActivities.length === 1 ? 'actividad' : 'actividades'}
              </span>
              <span className="text-xl font-bold text-purple-600">
                {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Activity Detail Modal */}
      <ActivityModal
        isOpen={!!selectedForEdit}
        onClose={() => {
          setSelectedForEdit(null)
          setModalOpen(false)
        }}
        color={selectedForEdit?.color || '#C4E5FF'}
        title={selectedForEdit?.label || ''}
      >
        <div className="space-y-6 px-6 py-6">
          {/* Time Slider */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3">
              ⏱️ ¿Cuánto tiempo dedicaste?
            </h4>
            <TimeSlider
              label=""
              value={tempDuration}
              onChange={setTempDuration}
              color={selectedForEdit?.color || '#C4E5FF'}
              max={720}
            />
          </div>

          {/* Facets */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3">
              💭 Cuéntanos más sobre esta actividad
            </h4>
            <div className="space-y-4">
              {facets.map((facet, index) => (
                <motion.div
                  key={facet.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {facet.type === 'rating' ? (
                    <RatingCard
                      emoji={facet.emoji}
                      label={facet.label}
                      value={tempFacets[facet.id] as number || 0}
                      onChange={(value) => setTempFacets({ ...tempFacets, [facet.id]: value })}
                      color={selectedForEdit?.color || '#C4E5FF'}
                    />
                  ) : (
                    <BooleanCard
                      emoji={facet.emoji}
                      label={facet.label}
                      value={tempFacets[facet.id] as boolean | null}
                      onChange={(value) => setTempFacets({ ...tempFacets, [facet.id]: value })}
                      color={selectedForEdit?.color || '#C4E5FF'}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3">
              📝 Notas adicionales (opcional)
            </h4>
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              placeholder="Algo específico que quieras recordar..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pastel-purple focus:outline-none resize-none"
              rows={3}
              maxLength={150}
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {tempNotes.length}/150
            </div>
          </div>

          {/* Actions - Fixed Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/95 pt-6 pb-4 px-6 border-t-2 border-gray-200 shadow-2xl z-10">
            <div className="max-w-2xl mx-auto flex gap-3">
              {selectedActivities.some(a => a.icon === selectedForEdit?.id) && (
                <motion.button
                  onClick={handleDeleteActivity}
                  className="px-6 py-4 rounded-full font-bold text-base bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Borrar
                </motion.button>
              )}
              <motion.button
                onClick={handleSaveActivity}
                className="flex-1 py-5 rounded-full font-bold text-xl flex items-center justify-center gap-3 shadow-2xl border-2 border-white"
                style={{
                  background: `linear-gradient(135deg, ${selectedForEdit?.color}, ${selectedForEdit?.color}DD)`,
                  color: '#1F2937'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span>{selectedActivities.some(a => a.icon === selectedForEdit?.id) ? 'Actualizar' : 'Guardar'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </ActivityModal>

      {/* Time Sliders - REMOVED (now inside modal) */}

      {/* Reflection Section */}
      <AnimatePresence>
        {canProceed && !showReflection && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setShowReflection(true)}
            className="daylo-button-primary w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={20} />
            Agregar reflexión
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReflection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="daylo-card space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              💭 Reflexiona sobre tu día
            </h3>

            {/* Mood Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-600">
                ¿Cómo te sentiste?
              </label>
              <div className="flex gap-2 flex-wrap">
                {MOODS.map((mood) => (
                  <motion.button
                    key={mood.emoji}
                    onClick={() => setReflection({ mood: mood.emoji })}
                    className={`px-4 py-2 rounded-full text-2xl transition-all ${
                      currentEntry.reflection?.mood === mood.emoji
                        ? 'bg-pastel-yellow scale-110 shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={mood.label}
                  >
                    {mood.emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-600">
                ¿Qué rescatas del día?
              </label>
              <textarea
                value={currentEntry.reflection?.highlights || ''}
                onChange={(e) => setReflection({ highlights: e.target.value })}
                placeholder="Algo breve que te haya gustado o aprendido..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pastel-purple focus:outline-none resize-none"
                rows={3}
                maxLength={200}
              />
              <div className="text-xs text-gray-400 text-right">
                {currentEntry.reflection?.highlights?.length || 0}/200
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              disabled={isSaving || !currentEntry.reflection?.highlights}
              className="daylo-button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Guardando...
                </motion.span>
              ) : (
                '✨ Guardar mi día'
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <motion.div
              className="daylo-card text-center p-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, 360],
                }}
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Día guardado!
              </h3>
              <p className="text-gray-600">
                Sigue así, cada día cuenta ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
