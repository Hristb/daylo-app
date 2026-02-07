export interface Activity {
  id: string
  icon: ActivityIcon
  label: string
  duration: number
  color: string
  facets?: Record<string, number | boolean>
  notes?: string
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
}

export interface DailyEntry {
  id: string
  date: Date
  activities: Activity[]
  tasks: Task[]
  diaryNote: string
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
  emoji: string
}
