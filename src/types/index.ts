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

export interface DailyEntry {
  id: string
  date: Date
  activities: Activity[]
  reflection: {
    highlights: string
    mood: string
    improvement?: string
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
