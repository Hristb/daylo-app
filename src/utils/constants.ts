import { ActivityOption, ActivityFacet } from '../types'

export const ACTIVITY_OPTIONS: ActivityOption[] = [
  {
    id: 'work',
    label: 'Productividad',
    color: '#C4E5FF',
    defaultDuration: 360,
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

// Preguntas optimizadas por actividad - Análisis basado en usuarios diarios
export const ACTIVITY_FACETS: Record<string, ActivityFacet[]> = {
  work: [
    { id: 'progress', label: '¿Avanzaste en algo importante?', type: 'boolean', emoji: '⭐' },
    { id: 'control', label: '¿Te sentiste en control?', type: 'boolean', emoji: '🎮' },
    { id: 'work_value', label: '¿Valor de lo realizado?', type: 'rating', emoji: '💎' },
  ],
  study: [
    { id: 'learned_new', label: '¿Aprendiste algo nuevo?', type: 'boolean', emoji: '💡' },
    { id: 'can_explain', label: '¿Podrías explicarlo?', type: 'boolean', emoji: '🗣️' },
    { id: 'usefulness', label: '¿Qué tan útil fue?', type: 'rating', emoji: '🎯' },
  ],
  home: [
    { id: 'space_better', label: '¿Tu espacio está mejor?', type: 'boolean', emoji: '🏡' },
    { id: 'did_necessary', label: '¿Hiciste lo necesario?', type: 'boolean', emoji: '✔️' },
    { id: 'how_feel', label: '¿Cómo te sientes ahora?', type: 'rating', emoji: '💭' },
  ],
  exercise: [
    { id: 'healthy_challenge', label: '¿Te desafiaste sanamente?', type: 'boolean', emoji: '🎯' },
    { id: 'pain_discomfort', label: '¿Dolor o molestia?', type: 'boolean', emoji: '🩹' },
    { id: 'enjoyed', label: '¿Disfrutaste la actividad?', type: 'boolean', emoji: '🎉' },
  ],
  social: [
    { id: 'authentic', label: '¿Conversación auténtica?', type: 'boolean', emoji: '💬' },
    { id: 'emotional_impact', label: '¿Impacto emocional?', type: 'rating', emoji: '❤️' },
    { id: 'added_value', label: '¿Agregó valor a tu día?', type: 'boolean', emoji: '✨' },
  ],
  hobbies: [
    { id: 'lost_track_time', label: '¿Perdiste noción del tiempo?', type: 'boolean', emoji: '⏰' },
    { id: 'enjoyed_process', label: '¿Disfrutaste el proceso?', type: 'boolean', emoji: '😊' },
    { id: 'recharged', label: '¿Te recargó energía?', type: 'boolean', emoji: '⚡' },
  ],
  food: [
    { id: 'nourished_well', label: '¿Te nutriste bien?', type: 'boolean', emoji: '🥗' },
    { id: 'taste_quality', label: '¿Sabor y presentación?', type: 'rating', emoji: '😋' },
    { id: 'listened_body', label: '¿Escuchaste tu cuerpo?', type: 'boolean', emoji: '💚' },
  ],
  sleep: [
    { id: 'hours_amount', label: '¿Cantidad de horas?', type: 'rating', emoji: '⏱️' },
    { id: 'slept_deeply', label: '¿Dormiste profundamente?', type: 'boolean', emoji: '💤' },
    { id: 'ready_for_day', label: '¿Listo para el día?', type: 'boolean', emoji: '☀️' },
  ],
  health: [
    { id: 'physical_feeling', label: '¿Cómo te sientes físicamente?', type: 'rating', emoji: '💪' },
    { id: 'health_stable', label: '¿Tu salud está estable?', type: 'boolean', emoji: '📊' },
    { id: 'did_something', label: '¿Hiciste algo por tu salud?', type: 'boolean', emoji: '🌱' },
  ],
}

// Función para obtener facets en orden aleatorio
export const getShuffledFacets = (activityId: string): ActivityFacet[] => {
  const facets = ACTIVITY_FACETS[activityId] || []
  const shuffled = [...facets]
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
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
