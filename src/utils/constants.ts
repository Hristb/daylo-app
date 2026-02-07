import { ActivityOption, ActivityFacet } from '../types'

export const ACTIVITY_OPTIONS: ActivityOption[] = [
  {
    id: 'work',
    label: 'Trabajo',
    color: '#C4E5FF',
    defaultDuration: 480,
  },
  {
    id: 'study',
    label: 'Estudio',
    color: '#E8D4FF',
    defaultDuration: 240,
  },
  {
    id: 'home',
    label: 'Hogar',
    color: '#FFD4E5',
    defaultDuration: 180,
  },
  {
    id: 'exercise',
    label: 'Ejercicio',
    color: '#D4FFE5',
    defaultDuration: 60,
  },
  {
    id: 'social',
    label: 'Social',
    color: '#FFE5D4',
    defaultDuration: 120,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    color: '#FFF4D4',
    defaultDuration: 90,
  },
  {
    id: 'food',
    label: 'Comida',
    color: '#FFE5D4',
    defaultDuration: 90,
  },
  {
    id: 'sleep',
    label: 'Descanso',
    color: '#E8D4FF',
    defaultDuration: 480,
  },
  {
    id: 'health',
    label: 'Salud',
    color: '#D4FFE5',
    defaultDuration: 60,
  },
]

// Facetas para entender mejor cada actividad
export const ACTIVITY_FACETS: Record<string, ActivityFacet[]> = {
  work: [
    { id: 'productivity', label: '¿Qué tan productivo fuiste?', type: 'rating', emoji: '⚡' },
    { id: 'energy', label: '¿Cómo estuvo tu energía?', type: 'rating', emoji: '🔋' },
    { id: 'satisfaction', label: '¿Qué tan satisfecho terminaste?', type: 'rating', emoji: '😊' },
    { id: 'challenges', label: '¿Enfrentaste desafíos importantes?', type: 'boolean', emoji: '💪' },
  ],
  study: [
    { id: 'focus', label: '¿Qué tan concentrado estuviste?', type: 'rating', emoji: '🎯' },
    { id: 'understanding', label: '¿Comprendiste lo que estudiaste?', type: 'rating', emoji: '💡' },
    { id: 'motivation', label: '¿Cómo estuvo tu motivación?', type: 'rating', emoji: '🚀' },
    { id: 'progress', label: '¿Sientes que avanzaste?', type: 'boolean', emoji: '📈' },
  ],
  home: [
    { id: 'organized', label: '¿Tu espacio quedó organizado?', type: 'boolean', emoji: '✨' },
    { id: 'tasks', label: '¿Completaste lo que querías?', type: 'rating', emoji: '✅' },
    { id: 'comfort', label: '¿Te sentiste cómodo/a?', type: 'rating', emoji: '🏠' },
    { id: 'relaxed', label: '¿Fue tiempo relajante?', type: 'boolean', emoji: '😌' },
  ],
  exercise: [
    { id: 'intensity', label: '¿Qué tan intenso fue?', type: 'rating', emoji: '💪' },
    { id: 'completion', label: '¿Completaste tu rutina?', type: 'boolean', emoji: '✅' },
    { id: 'energy', label: '¿Cómo te sentiste después?', type: 'rating', emoji: '⚡' },
    { id: 'enjoyed', label: '¿Lo disfrutaste?', type: 'boolean', emoji: '😊' },
  ],
  social: [
    { id: 'quality', label: '¿Qué tan valiosa fue la interacción?', type: 'rating', emoji: '💝' },
    { id: 'energy', label: '¿Te dio o quitó energía?', type: 'rating', emoji: '🔋' },
    { id: 'connected', label: '¿Te sentiste conectado/a?', type: 'boolean', emoji: '🤝' },
    { id: 'enjoyed', label: '¿Lo disfrutaste?', type: 'rating', emoji: '😄' },
  ],
  hobbies: [
    { id: 'flow', label: '¿Entraste en "flow"?', type: 'boolean', emoji: '🌊' },
    { id: 'creativity', label: '¿Qué tan creativo/a fuiste?', type: 'rating', emoji: '🎨' },
    { id: 'enjoyment', label: '¿Cuánto lo disfrutaste?', type: 'rating', emoji: '✨' },
    { id: 'progress', label: '¿Avanzaste en tu hobby?', type: 'boolean', emoji: '📈' },
  ],
  food: [
    { id: 'healthy', label: '¿Comiste saludable?', type: 'rating', emoji: '🥗' },
    { id: 'enjoyment', label: '¿Disfrutaste tus comidas?', type: 'rating', emoji: '😋' },
    { id: 'mindful', label: '¿Comiste con calma?', type: 'boolean', emoji: '🧘' },
    { id: 'satisfaction', label: '¿Quedaste satisfecho/a?', type: 'rating', emoji: '👌' },
  ],
  sleep: [
    { id: 'quality', label: '¿Qué tan bien dormiste?', type: 'rating', emoji: '😴' },
    { id: 'rested', label: '¿Despertaste descansado/a?', type: 'boolean', emoji: '☀️' },
    { id: 'interruptions', label: '¿Tuviste interrupciones?', type: 'boolean', emoji: '🌙' },
    { id: 'duration', label: '¿Fue suficiente tiempo?', type: 'boolean', emoji: '⏰' },
  ],
  health: [
    { id: 'physical', label: '¿Cómo te sentiste físicamente?', type: 'rating', emoji: '💪' },
    { id: 'mental', label: '¿Cómo estuvo tu salud mental?', type: 'rating', emoji: '🧠' },
    { id: 'care', label: '¿Te cuidaste bien?', type: 'boolean', emoji: '❤️' },
    { id: 'positive', label: '¿Fue una experiencia positiva?', type: 'rating', emoji: '✨' },
  ],
}

export const MOODS = [
  { emoji: '😊', label: 'Feliz' },
  { emoji: '😌', label: 'Tranquilo' },
  { emoji: '😴', label: 'Cansado' },
  { emoji: '😤', label: 'Estresado' },
  { emoji: '🤗', label: 'Motivado' },
  { emoji: '😐', label: 'Neutral' },
]

export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}
