import { create } from 'zustand'
import { Activity, DailyEntry, Task, ActivityLog, TimeLog } from '../types'

interface DayloStore {
  currentEntry: Partial<DailyEntry>
  selectedActivities: Activity[]
  totalMinutes: number
  isModalOpen: boolean
  hasCompletedCheckIn: boolean
  lastActiveDate: string | null
  activityHistory: ActivityLog[]
  timeHistory: TimeLog[]
  
  addActivity: (activity: Activity) => void
  restoreActivities: (activities: Activity[]) => void  // Nueva: para cargar sin historial
  removeActivity: (id: string) => void
  updateActivityDuration: (id: string, duration: number) => void
  updateActivityFacets: (id: string, facets: Record<string, number | boolean>, notes?: string) => void
  updateActivityEnergy: (id: string, energyImpact: 'drain' | 'neutral' | 'boost') => void
  setReflection: (reflection: Partial<DailyEntry['reflection']>) => void
  addTask: (text: string, isPriority?: boolean, isPersonal?: boolean) => void
  restoreTasks: (tasks: Task[]) => void  // Nueva: para cargar sin duplicar
  toggleTask: (id: string) => void
  removeTask: (id: string) => void
  setDiaryNote: (note: string) => void
  setEmotionalCheckIn: (checkIn: DailyEntry['emotionalCheckIn']) => void
  setDayIntention: (intention: string) => void
  setDayStory: (story: DailyEntry['dayStory']) => void
  completeCheckIn: () => void
  saveEntry: () => void
  resetEntry: () => void
  setModalOpen: (isOpen: boolean) => void
  checkAndResetIfNewDay: () => boolean
  autoSave: () => Promise<void>
  logActivity: (activity: Activity) => void
  logTime: (activity: Activity) => void
  getActivityHistory: (days?: number) => ActivityLog[]
  getTimeHistory: (days?: number) => TimeLog[]
  resetStore: () => void
}

export const useDayloStore = create<DayloStore>((set, get) => ({
  currentEntry: {
    date: new Date(),
    activities: [],
    tasks: [],
    diaryNote: '',
    emotionalCheckIn: undefined,
    dayIntention: undefined,
    dayStory: undefined,
    reflection: {
      highlights: '',
      mood: '😊',
      dayRating: 3,
    },
  },
  selectedActivities: [],
  totalMinutes: 0,
  isModalOpen: false,
  hasCompletedCheckIn: false,
  lastActiveDate: new Date().toISOString().split('T')[0],
  activityHistory: JSON.parse(localStorage.getItem('daylo-activity-history') || '[]'),
  timeHistory: JSON.parse(localStorage.getItem('daylo-time-history') || '[]'),

  addActivity: (activity) => {
    set((state) => {
      const newActivities = [...state.selectedActivities, activity]
      const totalMinutes = newActivities.reduce((sum, a) => sum + a.duration, 0)
      
      // Registrar en historial
      get().logActivity(activity)
      get().logTime(activity)
      
      return {
        selectedActivities: newActivities,
        totalMinutes,
        currentEntry: {
          ...state.currentEntry,
          activities: newActivities,
        },
      }
    })
    
    // Auto-guardar después de agregar actividad
    console.log('💾 Actividad agregada, guardando...')
    setTimeout(() => get().autoSave(), 100)
  },

  // Nueva función: Restaurar actividades sin crear historial (para cargar desde localStorage)
  restoreActivities: (activities) => {
    set((state) => {
      const totalMinutes = activities.reduce((sum, a) => sum + a.duration, 0)
      return {
        selectedActivities: activities,
        totalMinutes,
        currentEntry: {
          ...state.currentEntry,
          activities: activities,
        },
      }
    })
  },

  removeActivity: (id) => {
    set((state) => {
      const newActivities = state.selectedActivities.filter((a) => a.id !== id)
      const totalMinutes = newActivities.reduce((sum, a) => sum + a.duration, 0)
      return {
        selectedActivities: newActivities,
        totalMinutes,
        currentEntry: {
          ...state.currentEntry,
          activities: newActivities,
        },
      }
    })
  },

  updateActivityDuration: (id, duration) => {
    set((state) => {
      const newActivities = state.selectedActivities.map((a) => {
        if (a.id === id) {
          const updatedActivity = { ...a, duration }
          // Registrar actualización en historial
          get().logTime(updatedActivity)
          return updatedActivity
        }
        return a
      })
      const totalMinutes = newActivities.reduce((sum, a) => sum + a.duration, 0)
      return {
        selectedActivities: newActivities,
        totalMinutes,
        currentEntry: {
          ...state.currentEntry,
          activities: newActivities,
        },
      }
    })
  },

  updateActivityFacets: (id, facets, notes) => {
    set((state) => {
      const newActivities = state.selectedActivities.map((a) => {
        if (a.id === id) {
          const updatedActivity = { ...a, facets, notes }
          // Registrar actualización en historial
          get().logActivity(updatedActivity)
          return updatedActivity
        }
        return a
      })
      return {
        selectedActivities: newActivities,
        currentEntry: {
          ...state.currentEntry,
          activities: newActivities,
        },
      }
    })
  },

  updateActivityEnergy: (id, energyImpact) => {
    set((state) => {
      const newActivities = state.selectedActivities.map((a) =>
        a.id === id ? { ...a, energyImpact } : a
      )
      return {
        selectedActivities: newActivities,
        currentEntry: {
          ...state.currentEntry,
          activities: newActivities,
        },
      }
    })
  },

  setReflection: (reflection) => {
    set((state) => ({
      currentEntry: {
        ...state.currentEntry,
        reflection: {
          ...state.currentEntry.reflection,
          ...reflection,
        } as DailyEntry['reflection'],
      },
    }))
  },

  addTask: (text, isPriority = false, isPersonal = false) => {
    set((state) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date(),
        isPriority,
        isPersonal,
      }
      const newTasks = [...(state.currentEntry.tasks || []), newTask]
      return {
        currentEntry: {
          ...state.currentEntry,
          tasks: newTasks,
        },
      }
    })
    
    // Auto-guardar después de agregar tarea
    console.log('📝 Tarea agregada, guardando...')
    setTimeout(() => get().autoSave(), 100)
  },

  // Nueva función: Restaurar tareas sin duplicar (para cargar desde localStorage)
  restoreTasks: (tasks) => {
    set((state) => ({
      currentEntry: {
        ...state.currentEntry,
        tasks: tasks,
      },
    }))
  },

  toggleTask: (id) => {
    set((state) => {
      const newTasks = (state.currentEntry.tasks || []).map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
      return {
        currentEntry: {
          ...state.currentEntry,
          tasks: newTasks,
        },
      }
    })
    
    // Auto-guardar después de cambiar estado de tarea
    setTimeout(() => get().autoSave(), 100)
  },

  removeTask: (id) => {
    set((state) => {
      const newTasks = (state.currentEntry.tasks || []).filter((task) => task.id !== id)
      return {
        currentEntry: {
          ...state.currentEntry,
          tasks: newTasks,
        },
      }
    })
  },

  setEmotionalCheckIn: (checkIn) => {
    set((state) => ({
      currentEntry: {
        ...state.currentEntry,
        emotionalCheckIn: checkIn,
      },
    }))
  },

  setDayIntention: (intention) => {
    set((state) => ({
      currentEntry: {
        ...state.currentEntry,
        dayIntention: intention,
      },
    }))
  },

  setDayStory: (story) => {
    set((state) => ({
      currentEntry: {
        ...state.currentEntry,
        dayStory: story,
      },
    }))
  },

  completeCheckIn: () => {
    set({ hasCompletedCheckIn: true })
    // Guardar en localStorage para no volver a mostrar hoy
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem('daylo-last-checkin', today)
  },

  setDiaryNote: (note) => {
    set((state) => ({
      currentEntry: {
        ...state.currentEntry,
        diaryNote: note,
      },
    }))
    
    // Auto-guardar después de escribir nota
    setTimeout(() => get().autoSave(), 500) // Delay más largo para no guardar en cada tecla
  },

  saveEntry: () => {
    const state = get()
    // Aquí guardaríamos en localStorage o API
    const entry = {
      ...state.currentEntry,
      id: Date.now().toString(),
      date: new Date(),
    }
    
    // Guardar en localStorage por ahora
    const entries = JSON.parse(localStorage.getItem('daylo-entries') || '[]')
    entries.push(entry)
    localStorage.setItem('daylo-entries', JSON.stringify(entries))
    
    // Reset
    get().resetEntry()
  },

  resetEntry: () => {
    const today = new Date().toISOString().split('T')[0]
    set({
      currentEntry: {
        date: new Date(),
        activities: [],
        tasks: [],
        diaryNote: '',
        emotionalCheckIn: undefined,
        dayIntention: undefined,
        dayStory: undefined,
        reflection: {
          highlights: '',
          mood: '😊',
          dayRating: 3,
        },
      },
      selectedActivities: [],
      totalMinutes: 0,
      hasCompletedCheckIn: false,
      lastActiveDate: today,
    })
    // Limpiar check-in del día anterior
    localStorage.removeItem('daylo-last-checkin')
  },

  checkAndResetIfNewDay: () => {
    const state = get()
    const today = new Date().toISOString().split('T')[0]
    const lastDate = state.lastActiveDate || today
    
    if (lastDate !== today) {
      // Es un nuevo día - resetear automáticamente
      console.log('🌅 Nuevo día detectado - reseteando datos')
      get().resetEntry()
      return true // Retorna true si hubo reset
    }
    return false // No hubo reset
  },

  autoSave: async () => {
    const state = get()
    const today = new Date().toISOString().split('T')[0]
    
    // Actualizar fecha de última actividad
    set({ lastActiveDate: today })
    
    const entryData = {
      id: state.currentEntry.id || Date.now().toString(),
      date: new Date(),
      activities: state.selectedActivities,
      tasks: state.currentEntry.tasks || [],
      diaryNote: state.currentEntry.diaryNote || '',
      emotionalCheckIn: state.currentEntry.emotionalCheckIn,
      dayIntention: state.currentEntry.dayIntention,
      dayStory: state.currentEntry.dayStory,
      reflection: state.currentEntry.reflection,
    }
    
    // 1. Guardar en localStorage (rápido)
    const entries = JSON.parse(localStorage.getItem('daylo-entries') || '[]')
    const todayIndex = entries.findIndex((e: any) => 
      new Date(e.date).toISOString().split('T')[0] === today
    )
    
    if (todayIndex >= 0) {
      entries[todayIndex] = entryData
    } else {
      entries.push(entryData)
    }
    
    localStorage.setItem('daylo-entries', JSON.stringify(entries))
    
    // 2. Guardar en Firebase (sincronización en background - NUEVA ARQUITECTURA)
    try {
      const userEmail = localStorage.getItem('daylo-user-email')
      
      if (!userEmail) {
        console.warn('⚠️ No hay email de usuario - saltando guardado en Firebase')
        console.log('💾 Datos guardados solo en localStorage')
        return
      }

      console.log('📤 Guardando en Firebase con arquitectura especializada...')
      const {
        saveUserObjectives,
        saveDailyEmotion,
        saveDailyIntention,
        saveDailyActivities,
        saveTasks,
        saveDiaryNote,
      } = await import('../services/firebaseService')

      // Guardar en colecciones especializadas
      const savePromises: Promise<void>[] = []

      // 1. Objetivos del usuario (solo para usuarios nuevos en su primer check-in)
      if (state.currentEntry.emotionalCheckIn?.currentGoal && 
          state.currentEntry.emotionalCheckIn?.futureVision && 
          state.currentEntry.emotionalCheckIn?.mainObstacle) {
        savePromises.push(
          saveUserObjectives({
            currentGoal: state.currentEntry.emotionalCheckIn.currentGoal,
            futureVision: state.currentEntry.emotionalCheckIn.futureVision,
            mainObstacle: state.currentEntry.emotionalCheckIn.mainObstacle,
          }).catch(err => console.error('❌ Error guardando objetivos:', err))
        )
      }

      // 2. Emoción diaria (si existe)
      if (state.currentEntry.emotionalCheckIn?.feeling) {
        const isNewUser = !!(state.currentEntry.emotionalCheckIn.currentGoal)
        savePromises.push(
          saveDailyEmotion({
            feeling: state.currentEntry.emotionalCheckIn.feeling,
            shareThoughts: state.currentEntry.emotionalCheckIn.shareThoughts,
            actionIntention: state.currentEntry.emotionalCheckIn.actionIntention,
            isNewUser,
          }).catch(err => console.error('❌ Error guardando emoción:', err))
        )
      }

      // 3. Intención diaria (si existe)
      if (state.currentEntry.emotionalCheckIn?.actionIntention) {
        const isNegative = ['Ansioso/a', 'Cansado/a', 'Abrumado/a'].includes(
          state.currentEntry.emotionalCheckIn.feeling || ''
        )
        savePromises.push(
          saveDailyIntention({
            intention: state.currentEntry.emotionalCheckIn.actionIntention,
            feelingContext: state.currentEntry.emotionalCheckIn.feeling || '',
            isNegativeEmotion: isNegative,
            shareThoughts: state.currentEntry.emotionalCheckIn.shareThoughts,
          }).catch(err => console.error('❌ Error guardando intención:', err))
        )
      }

      // 4. Actividades diarias (si existen)
      if (state.selectedActivities.length > 0) {
        savePromises.push(
          saveDailyActivities(state.selectedActivities)
            .catch(err => console.error('❌ Error guardando actividades:', err))
        )
      }

      // 5. Tareas (si existen)
      if (state.currentEntry.tasks && state.currentEntry.tasks.length > 0) {
        savePromises.push(
          saveTasks(state.currentEntry.tasks)
            .catch(err => console.error('❌ Error guardando tareas:', err))
        )
      }

      // 6. Nota de diario (si existe)
      if (state.currentEntry.diaryNote && state.currentEntry.diaryNote.trim()) {
        savePromises.push(
          saveDiaryNote(state.currentEntry.diaryNote)
            .catch(err => console.error('❌ Error guardando nota:', err))
        )
      }

      // Ejecutar todas las operaciones en paralelo
      await Promise.all(savePromises)
      console.log('✅ Auto-guardado completo en Firebase (arquitectura especializada)')
    } catch (error) {
      console.error('⚠️ Error auto-guardando en Firebase (datos seguros en local):', error)
    }
  },

  setModalOpen: (isOpen: boolean) => {
    set({ isModalOpen: isOpen })
  },

  logActivity: (activity: Activity) => {
    const log: ActivityLog = {
      id: Date.now().toString(),
      activityIcon: activity.icon,
      activityLabel: activity.label,
      duration: activity.duration,
      facets: activity.facets,
      notes: activity.notes,
      energyImpact: activity.energyImpact,
      timestamp: new Date(),
      date: new Date().toISOString().split('T')[0],
    }
    
    set((state) => {
      const newHistory = [...state.activityHistory, log]
      localStorage.setItem('daylo-activity-history', JSON.stringify(newHistory))
      
      // Guardar en Firebase en background
      import('../services/firebaseService').then(({ saveActivityLog }) => {
        saveActivityLog(log).catch(err => 
          console.error('Error guardando activity log en Firebase:', err)
        )
      })
      
      return { activityHistory: newHistory }
    })
  },

  logTime: (activity: Activity) => {
    const log: TimeLog = {
      id: Date.now().toString(),
      activityIcon: activity.icon,
      activityLabel: activity.label,
      duration: activity.duration,
      timestamp: new Date(),
      date: new Date().toISOString().split('T')[0],
    }
    
    set((state) => {
      const newHistory = [...state.timeHistory, log]
      localStorage.setItem('daylo-time-history', JSON.stringify(newHistory))
      
      // Guardar en Firebase en background
      import('../services/firebaseService').then(({ saveTimeLog }) => {
        saveTimeLog(log).catch(err => 
          console.error('Error guardando time log en Firebase:', err)
        )
      })
      
      return { timeHistory: newHistory }
    })
  },

  getActivityHistory: (days = 30) => {
    const state = get()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    return state.activityHistory.filter((log) => {
      const logDate = new Date(log.date)
      return logDate >= cutoffDate
    })
  },

  getTimeHistory: (days = 30) => {
    const state = get()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    return state.timeHistory.filter((log) => {
      const logDate = new Date(log.date)
      return logDate >= cutoffDate
    })
  },

  resetStore: () => {
    // Resetear a estado inicial completo
    set({
      currentEntry: {
        date: new Date(),
        activities: [],
        tasks: [],
        diaryNote: '',
        emotionalCheckIn: undefined,
        dayIntention: undefined,
        dayStory: undefined,
        reflection: {
          highlights: '',
          mood: '😊',
          dayRating: 3,
        },
      },
      selectedActivities: [],
      totalMinutes: 0,
      isModalOpen: false,
      hasCompletedCheckIn: false,
      lastActiveDate: new Date().toISOString().split('T')[0],
      activityHistory: [],
      timeHistory: [],
    })
    console.log('🔄 Store reseteado por logout')
  },
}))
