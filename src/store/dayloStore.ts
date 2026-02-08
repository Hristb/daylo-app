import { create } from 'zustand'
import { Activity, DailyEntry, Task } from '../types'

interface DayloStore {
  currentEntry: Partial<DailyEntry>
  selectedActivities: Activity[]
  totalMinutes: number
  isModalOpen: boolean
  hasCompletedCheckIn: boolean
  
  addActivity: (activity: Activity) => void
  removeActivity: (id: string) => void
  updateActivityDuration: (id: string, duration: number) => void
  updateActivityFacets: (id: string, facets: Record<string, number | boolean>, notes?: string) => void
  updateActivityEnergy: (id: string, energyImpact: 'drain' | 'neutral' | 'boost') => void
  setReflection: (reflection: Partial<DailyEntry['reflection']>) => void
  addTask: (text: string, isPriority?: boolean, isPersonal?: boolean) => void
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

  addActivity: (activity) => {
    set((state) => {
      const newActivities = [...state.selectedActivities, activity]
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
      const newActivities = state.selectedActivities.map((a) =>
        a.id === id ? { ...a, duration } : a
      )
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
      const newActivities = state.selectedActivities.map((a) =>
        a.id === id ? { ...a, facets, notes } : a
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
    })
  },

  setModalOpen: (isOpen: boolean) => {
    set({ isModalOpen: isOpen })
  },
}))
