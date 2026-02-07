import { create } from 'zustand'
import { Activity, DailyEntry } from '../types'

interface DayloStore {
  currentEntry: Partial<DailyEntry>
  selectedActivities: Activity[]
  totalMinutes: number
  isModalOpen: boolean
  
  addActivity: (activity: Activity) => void
  removeActivity: (id: string) => void
  updateActivityDuration: (id: string, duration: number) => void
  updateActivityFacets: (id: string, facets: Record<string, number | boolean>, notes?: string) => void
  setReflection: (reflection: Partial<DailyEntry['reflection']>) => void
  saveEntry: () => void
  resetEntry: () => void
  setModalOpen: (isOpen: boolean) => void
}

export const useDayloStore = create<DayloStore>((set, get) => ({
  currentEntry: {
    date: new Date(),
    activities: [],
    reflection: {
      highlights: '',
      mood: '😊',
    },
  },
  selectedActivities: [],
  totalMinutes: 0,
  isModalOpen: false,

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
        reflection: {
          highlights: '',
          mood: '😊',
        },
      },
      selectedActivities: [],
      totalMinutes: 0,
    })
  },

  setModalOpen: (isOpen: boolean) => {
    set({ isModalOpen: isOpen })
  },
}))
