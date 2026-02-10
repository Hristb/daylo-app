export interface Activity {
  id: string
  icon: ActivityIcon
  label: string
  duration: number
  color: string
  facets?: Record<string, number | boolean>
  notes?: string
  energyImpact?: 'drain' | 'neutral' | 'boost'
}

export type ActivityIcon = 
  | 'work'
  | 'home'
  | 'exercise'
  | 'social'
  | 'study'
  | 'sleep'
  | 'food'
  | 'hobbies'
  | 'health'

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  isPriority?: boolean
  isPersonal?: boolean
}

export interface DailyEntry {
  id: string
  date: Date
  activities: Activity[]
  tasks: Task[]
  diaryNote: string
  emotionalCheckIn?: {
    feeling: string
    needsToday?: string
    mentalNoise?: string
    currentGoal?: string // ¿Qué quieres cambiar o lograr ahora mismo en tu vida?
    futureVision?: string // ¿Cómo quiero que sea mi vida en los próximos años?
    mainObstacle?: string // ¿Qué es lo que más me frena hoy?
    shareThoughts?: string // ¿Hay algo que quieras compartir? (usuarios existentes - emociones negativas)
    actionIntention?: string // Intención/acción específica del día (usuarios existentes)
  }
  dayIntention?: string
  dayStory?: {
    howStarted?: string
    mostSignificant?: string
    howClosing?: string
  }
  reflection: {
    highlights: string
    mood: string
    improvement?: string
    dayRating?: number
  }
}

export interface ActivityOption {
  id: ActivityIcon
  label: string
  color: string
  defaultDuration: number
}

export interface ActivityFacet {
  id: string
  label: string
  type: 'rating' | 'boolean'
  emoji?: string
}

export interface ActivityLog {
  id: string
  activityIcon: ActivityIcon
  activityLabel: string
  duration: number
  facets?: Record<string, number | boolean>
  notes?: string
  energyImpact?: 'drain' | 'neutral' | 'boost'
  timestamp: Date
  date: string
}

export interface TimeLog {
  id: string
  activityIcon: ActivityIcon
  activityLabel: string
  duration: number
  timestamp: Date
  date: string
}

export interface CalendarEvent {
  id: string
  date: string // YYYY-MM-DD format
  type: 'event' | 'reminder' | 'important-date'
  description: string
  completed: boolean
  createdAt: Date
}
