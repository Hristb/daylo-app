import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useDayloStore } from '../store/dayloStore'
import { ACTIVITY_OPTIONS, getShuffledFacets } from '../utils/constants'
import ActivityCard from '../components/cards/ActivityCard'
import TimeSlider from '../components/sliders/TimeSlider'
import ActivityModal from '../components/modals/ActivityModal'
import RatingCard from '../components/cards/RatingCard'
import BooleanCard from '../components/cards/BooleanCard'
import ChecklistSection from '../components/ChecklistSection'
import DiarySection from '../components/DiarySection'
import EmotionalCheckIn from '../components/EmotionalCheckIn'
import DayClosing from '../components/DayClosing'
import HistoryLog from '../components/HistoryLog'
import { Sparkles, Cloud, CloudOff, AlertCircle, Target, Clock } from 'lucide-react'
import { ActivityOption, ActivityFacet } from '../types'
import { getTodayEntry } from '../services/firebaseService'

type TabType = 'purpose' | 'activities'

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
    hasCompletedCheckIn,
    addActivity, 
    removeActivity,
    updateActivityDuration,
    updateActivityFacets,
    setModalOpen,
    completeCheckIn,
    checkAndResetIfNewDay,
    autoSave,
  } = useDayloStore()

  const [selectedForEdit, setSelectedForEdit] = useState<ActivityOption | null>(null)
  const [tempFacets, setTempFacets] = useState<Record<string, number | boolean>>({})
  const [tempDuration, setTempDuration] = useState(0)
  const [tempNotes, setTempNotes] = useState('')
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced')
  const [timeContext] = useState<'morning' | 'afternoon' | 'evening'>(getTimeContext())
  const [shuffledFacets, setShuffledFacets] = useState<ActivityFacet[]>([])
  const [showEmotionalCheckIn, setShowEmotionalCheckIn] = useState(false)
  const [showDayClosing, setShowDayClosing] = useState(false)
  const [exceedsTimeWarning, setExceedsTimeWarning] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('purpose')

  // Cargar datos al iniciar - PRIMERO localStorage, LUEGO Firebase
  useEffect(() => {
    const loadTodayData = async () => {
      // 1. Verificar si es un nuevo día y resetear automáticamente
      const wasReset = checkAndResetIfNewDay()
      
      if (wasReset) {
        console.log('✨ Inicio de nuevo día - datos reseteados')
        return // Si se reseteó, no cargar nada más
      }
      
      // 2. PRIMERO: Cargar desde localStorage (instantáneo, siempre actualizado)
      const today = new Date().toISOString().split('T')[0]
      const localEntries = JSON.parse(localStorage.getItem('daylo-entries') || '[]')
      const todayLocal = localEntries.find((e: any) => 
        new Date(e.date).toISOString().split('T')[0] === today
      )
      
      if (todayLocal) {
        console.log('📦 Cargando desde localStorage:', todayLocal)
        
        // Cargar actividades
        if (todayLocal.activities && todayLocal.activities.length > 0) {
          todayLocal.activities.forEach((activity: any) => {
            addActivity(activity)
          })
        }
        
        // Cargar tareas/prioridades
        if (todayLocal.tasks && todayLocal.tasks.length > 0) {
          const { currentEntry } = useDayloStore.getState()
          useDayloStore.setState({
            currentEntry: {
              ...currentEntry,
              tasks: todayLocal.tasks
            }
          })
          console.log('✅ Tareas cargadas:', todayLocal.tasks.length)
        }
        
        // Cargar notas del diario
        if (todayLocal.diaryNote) {
          useDayloStore.getState().setDiaryNote(todayLocal.diaryNote)
        }
        
        // Cargar emotional check-in
        if (todayLocal.emotionalCheckIn) {
          useDayloStore.getState().setEmotionalCheckIn(todayLocal.emotionalCheckIn)
        }
        
        // Cargar day intention
        if (todayLocal.dayIntention) {
          useDayloStore.getState().setDayIntention(todayLocal.dayIntention)
        }
        
        // Cargar day story
        if (todayLocal.dayStory) {
          useDayloStore.getState().setDayStory(todayLocal.dayStory)
        }
      }
      
      // 3. LUEGO: Sincronizar con Firebase en background
      try {
        const todayData = await getTodayEntry()
        if (todayData && todayData.activities) {
          console.log('☁️ Firebase sincronizado')
        }
      } catch (error) {
        console.log('⚠️ Firebase no disponible, usando datos locales')
      }
    }
    loadTodayData()

    // Mostrar EmotionalCheckIn automáticamente en la mañana
    const today = new Date().toISOString().split('T')[0]
    const lastCheckIn = localStorage.getItem('daylo-last-checkin')
    
    if (timeContext === 'morning' && !hasCompletedCheckIn && lastCheckIn !== today) {
      setTimeout(() => {
        setShowEmotionalCheckIn(true)
        setModalOpen(true) // Ocultar navegación
      }, 1000)
    }
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

  const handleSaveActivity = async () => {
    if (!selectedForEdit || isSaving) return

    const existing = selectedActivities.find(a => a.icon === selectedForEdit.id)
    
    // VALIDACIÓN: Verificar si excede 24 horas ANTES de guardar
    const MAX_MINUTES_PER_DAY = 1440 // 24 horas
    let newTotalMinutes = totalMinutes
    
    if (existing) {
      // Al editar: restar duración anterior y sumar nueva
      newTotalMinutes = totalMinutes - existing.duration + tempDuration
    } else {
      // Al agregar: sumar nueva duración
      newTotalMinutes = totalMinutes + tempDuration
    }
    
    console.log('🔍 Validación 24h:', { 
      totalActual: totalMinutes, 
      duracionAnterior: existing?.duration || 0,
      duracionNueva: tempDuration,
      totalNuevo: newTotalMinutes,
      excede: newTotalMinutes > MAX_MINUTES_PER_DAY
    })
    
    // BLOQUEAR si excede 24 horas
    const exceedsLimit = newTotalMinutes > MAX_MINUTES_PER_DAY
    
    if (exceedsLimit) {
      // NO cerrar el modal de actividad, mostrar advertencia ENCIMA
      setExceedsTimeWarning(true)
      return // NO guardar
    }
    
    // Solo llega aquí si NO excede el límite
    setIsSaving(true)
    setSyncStatus('syncing')
    
    try {
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

      // GUARDAR a localStorage Y Firebase - ESPERAR a que termine
      await new Promise(resolve => setTimeout(resolve, 100))
      await autoSave()
      setSyncStatus('synced')
      console.log('✅ Actividad guardada en Firebase')

      // Cerrar modal solo si guarda exitosamente
      setSelectedForEdit(null)
      setModalOpen(false)
      setTempFacets({})
      setTempNotes('')
    } catch (error) {
      console.error('❌ Error guardando:', error)
      setSyncStatus('offline')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteActivity = async () => {
    if (!selectedForEdit) return
    const existing = selectedActivities.find(a => a.icon === selectedForEdit.id)
    if (existing) {
      removeActivity(existing.id)
      
      // GUARDAR - ESPERAR a que termine
      await new Promise(resolve => setTimeout(resolve, 100))
      await autoSave()
      console.log('✅ Actividad eliminada y guardado en Firebase')
    }
    setSelectedForEdit(null)
    setModalOpen(false)
  }

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

      {/* Emotional Check-In Modal */}
      <AnimatePresence>
        {showEmotionalCheckIn && (
          <EmotionalCheckIn
            onComplete={() => {
              setShowEmotionalCheckIn(false)
              setModalOpen(false) // Mostrar navegación de nuevo
              completeCheckIn()
              autoSave() // Guardar después del check-in
            }}
          />
        )}
      </AnimatePresence>

      {/* Day Closing Modal */}
      <AnimatePresence>
        {showDayClosing && (
          <DayClosing
            onComplete={() => {
              setShowDayClosing(false)
              setModalOpen(false) // Mostrar navegación de nuevo
              autoSave() // Guardar después del cierre
            }}
          />
        )}
      </AnimatePresence>

      {/* Modal de Advertencia 24h - Centrado */}
      <AnimatePresence>
        {exceedsTimeWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full"
            >
              {/* Icono */}
              <div className="flex justify-center mb-4">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertCircle className="w-10 h-10 text-orange-600" strokeWidth={2.5} />
                </motion.div>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                ⏰ Superaste las 24 horas
              </h3>

              {/* Mensaje */}
              <p className="text-sm text-gray-600 text-center mb-2">
                {(() => {
                  const existing = selectedActivities.find(a => a.icon === selectedForEdit?.id)
                  const newTotal = existing 
                    ? totalMinutes - existing.duration + tempDuration
                    : totalMinutes + tempDuration
                  return (
                    <>
                      Estás intentando registrar <span className="font-semibold text-orange-600">{Math.floor(newTotal / 60)}h {newTotal % 60}min</span> en total.
                    </>
                  )
                })()}
              </p>
              <p className="text-xs text-gray-500 text-center mb-6">
                Un día tiene solo 24 horas. Ajusta la duración de esta actividad o elimina otra para continuar.
              </p>

              {/* Botón Entendido */}
              <motion.button
                onClick={() => {
                  setExceedsTimeWarning(false)
                  // NO cerrar el modal de actividad, permitir que el usuario ajuste
                }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✓ Entendido, voy a ajustar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intention Display (si ya completó check-in) */}
      {currentEntry.dayIntention && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="text-xs text-purple-600 font-semibold mb-1">
                Tu intención de hoy
              </p>
              <p className="text-sm text-gray-800">
                {currentEntry.dayIntention}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Compassion Message (cuando no hay actividades en la noche) */}
      {timeContext === 'evening' && selectedActivities.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-5 border border-green-200"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💚</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                No pasa nada si hoy no registraste actividades
              </p>
              <p className="text-xs text-gray-600">
                Los días de descanso también cuentan. ¿Qué SÍ hiciste hoy, aunque parezca pequeño?
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reminder Banner - Invitación suave a cerrar el día (8pm-11pm) */}
      {(() => {
        const currentHour = new Date().getHours()
        const isReminderTime = currentHour >= 20 && currentHour < 23 // 8pm a 11pm
        const hasActivities = selectedActivities.length > 0
        const hasNotClosed = !currentEntry.dayStory?.mostSignificant
        
        if (timeContext === 'evening' && isReminderTime && hasActivities && hasNotClosed) {
          return (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-indigo-200"
            >
              <div className="flex items-start gap-4">
                <motion.span 
                  className="text-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌙
                </motion.span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    ¿Tomas un momento para cerrar tu día?
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Reflexionar antes de dormir te ayuda a procesar lo vivido y descansar mejor
                  </p>
                  <motion.button
                    onClick={() => {
                      setShowDayClosing(true)
                      setModalOpen(true)
                    }}
                    className="w-full py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✨ Sí, cerrar mi día ahora
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        }
        
        // Botón siempre visible si hay actividades y no ha cerrado (fuera de horario reminder)
        if (timeContext === 'evening' && hasActivities && hasNotClosed && !isReminderTime) {
          return (
            <motion.button
              onClick={() => {
                setShowDayClosing(true)
                setModalOpen(true)
              }}
              className="w-full py-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🌙 Cerrar mi día con reflexión
            </motion.button>
          )
        }
        
        return null
      })()}

      {/* Tabs System - Separar Propósito de Actividades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden"
      >
        {/* Tab Headers */}
        <div className="flex border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <button
            onClick={() => setActiveTab('purpose')}
            className={`flex-1 py-4 px-6 font-semibold transition-all relative ${
              activeTab === 'purpose'
                ? 'text-purple-700 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Target size={20} />
              <span>Propósito</span>
            </div>
            {activeTab === 'purpose' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex-1 py-4 px-6 font-semibold transition-all relative ${
              activeTab === 'activities'
                ? 'text-blue-700 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock size={20} />
              <span>Lo que hice hoy</span>
              {selectedActivities.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                  {selectedActivities.length}
                </span>
              )}
            </div>
            {activeTab === 'activities' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'purpose' ? (
            <motion.div
              key="purpose"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              {/* Checklist Section - Tareas del día */}
              <ChecklistSection timeContext={timeContext} />
            </motion.div>
          ) : (
            <motion.div
              key="activities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              {/* Activity Grid */}
              <div>
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
                    className="mt-6 pt-4 border-t border-gray-200 space-y-3"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-600">
                        {selectedActivities.length} {selectedActivities.length === 1 ? 'actividad' : 'actividades'}
                      </span>
                      <span className={`text-xl font-bold ${
                        totalMinutes > 1440 ? 'text-red-600' : 
                        totalMinutes > 1200 ? 'text-orange-600' : 
                        'text-purple-600'
                      }`}>
                        {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
                      </span>
                    </div>
                    
                    {/* Barra de progreso del día (24h) - MEJORADA */}
                    <div className="space-y-3">
                      {/* Header con estadísticas */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                          >
                            <span className="text-sm">⏰</span>
                          </motion.div>
                          <div>
                            <p className="text-xs font-medium text-gray-600">Tiempo registrado</p>
                            <p className="text-sm font-bold text-gray-800">
                              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}min de tu día
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Disponible</p>
                          <p className={`text-sm font-semibold ${
                            totalMinutes > 1440 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {totalMinutes > 1440 
                              ? `-${Math.floor((totalMinutes - 1440) / 60)}h ${(totalMinutes - 1440) % 60}m`
                              : `${Math.floor((1440 - totalMinutes) / 60)}h ${(1440 - totalMinutes) % 60}m`
                            }
                          </p>
                        </div>
                      </div>

                      {/* Barra de progreso mejorada con etiquetas */}
                      <div className="relative">
                        {/* Etiquetas de tiempo del día */}
                        <div className="flex justify-between text-[10px] text-gray-400 mb-1 px-1">
                          <span>🌅 6am</span>
                          <span>☀️ 12pm</span>
                          <span>🌆 6pm</span>
                          <span>🌙 12am</span>
                        </div>
                        
                        {/* Barra con gradiente y animación */}
                        <div className="relative w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${Math.min((totalMinutes / 1440) * 100, 100)}%`,
                            }}
                            className={`h-full rounded-full relative ${
                              totalMinutes > 1440 
                                ? 'bg-gradient-to-r from-red-400 via-orange-500 to-red-600' 
                                : totalMinutes > 1200 
                                ? 'bg-gradient-to-r from-orange-300 via-yellow-400 to-orange-500' 
                                : totalMinutes > 960 
                                ? 'bg-gradient-to-r from-yellow-300 via-green-400 to-green-500'
                                : 'bg-gradient-to-r from-green-300 via-teal-400 to-blue-400'
                            }`}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          >
                            {/* Brillo animado */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        </div>
                        
                        {/* Marcadores de límites */}
                        <div className="relative w-full h-1 mt-1">
                          <div className="absolute left-[66.66%] top-0 w-px h-full bg-yellow-300 opacity-50" />
                          <div className="absolute left-[83.33%] top-0 w-px h-full bg-orange-300 opacity-50" />
                          <div className="absolute left-[100%] top-0 w-px h-full bg-red-400" />
                        </div>
                      </div>

                      {/* Mensaje contextual mejorado */}
                      <AnimatePresence>
                        {totalMinutes > 1200 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className={`rounded-xl p-3 border-2 ${
                              totalMinutes > 1440 
                                ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
                                : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <motion.span
                                className="text-xl"
                                animate={{ 
                                  scale: totalMinutes > 1440 ? [1, 1.2, 1] : 1,
                                  rotate: totalMinutes > 1440 ? [0, -10, 10, 0] : 0,
                                }}
                                transition={{ duration: 0.5, repeat: totalMinutes > 1440 ? Infinity : 0, repeatDelay: 1 }}
                              >
                                {totalMinutes > 1440 ? '⚠️' : '⚡'}
                              </motion.span>
                              <div className="flex-1">
                                <p className={`text-xs font-semibold ${
                                  totalMinutes > 1440 ? 'text-red-700' : 'text-orange-700'
                                }`}>
                                  {totalMinutes > 1440 
                                    ? '¡Superaste las 24 horas!' 
                                    : 'Te estás acercando al límite del día'}
                                </p>
                                <p className={`text-[11px] mt-0.5 ${
                                  totalMinutes > 1440 ? 'text-red-600' : 'text-orange-600'
                                }`}>
                                  {totalMinutes > 1440 
                                    ? 'Revisa las duraciones de tus actividades antes de agregar más' 
                                    : `Quedan ${Math.floor((1440 - totalMinutes) / 60)}h ${(1440 - totalMinutes) % 60}m disponibles`}
                                  </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Checklist Section - Tareas del día */}

      {/* Historial de Actividades */}
      <HistoryLog />

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
                  disabled={isSaving}
                  className="px-6 py-4 rounded-full font-bold text-base bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSaving ? { scale: 1.05 } : {}}
                  whileTap={!isSaving ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Borrar
                </motion.button>
              )}
              <motion.button
                onClick={handleSaveActivity}
                disabled={isSaving}
                className="flex-1 py-5 rounded-full font-bold text-xl flex items-center justify-center gap-3 shadow-2xl border-2 border-white disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedForEdit?.color}, ${selectedForEdit?.color}DD)`,
                  color: '#1F2937'
                }}
                whileHover={!isSaving ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isSaving ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {isSaving ? (
                  <>
                    <motion.div
                      className="w-6 h-6 border-3 border-gray-800 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>{selectedActivities.some(a => a.icon === selectedForEdit?.id) ? 'Actualizar' : 'Guardar'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </ActivityModal>

      {/* Time Sliders - REMOVED (now inside modal) */}

      {/* Diary Section - Diario personal (al final) */}
      <DiarySection timeContext={timeContext} />
    </div>
  )
}
