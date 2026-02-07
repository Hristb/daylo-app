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

// Preguntas únicas por actividad - sin patrones repetitivos
export const ACTIVITY_FACETS: Record<string, ActivityFacet[]> = {
  work: [
    { id: 'goals_achieved', label: '¿Lograste tus objetivos?', type: 'boolean', emoji: '🎯' },
    { id: 'distracted', label: '¿Te costó concentrarte?', type: 'boolean', emoji: '🤔' },
    { id: 'work_value', label: '¿Valor de lo realizado?', type: 'rating', emoji: '💎' },
  ],
  study: [
    { id: 'learned_new', label: '¿Aprendiste algo nuevo?', type: 'boolean', emoji: '💡' },
    { id: 'need_review', label: '¿Necesitas repasar?', type: 'boolean', emoji: '📚' },
    { id: 'material_clarity', label: '¿Claridad del material?', type: 'rating', emoji: '🔍' },
  ],
  home: [
    { id: 'space_improved', label: '¿Mejoraste tu espacio?', type: 'boolean', emoji: '✨' },
    { id: 'effort_worth', label: '¿Valió la pena?', type: 'rating', emoji: '⚖️' },
    { id: 'energy_left', label: '¿Te sobró energía?', type: 'boolean', emoji: '🔋' },
  ],
  exercise: [
    { id: 'pushed_limits', label: '¿Superaste límites?', type: 'boolean', emoji: '💪' },
    { id: 'pain_discomfort', label: '¿Dolor o molestia?', type: 'boolean', emoji: '🩹' },
    { id: 'performance', label: '¿Rendimiento físico?', type: 'rating', emoji: '🏃' },
  ],
  social: [
    { id: 'authentic', label: '¿Conversación auténtica?', type: 'boolean', emoji: '💬' },
    { id: 'emotional_impact', label: '¿Impacto emocional?', type: 'rating', emoji: '❤️' },
    { id: 'would_repeat', label: '¿Repetirías esto?', type: 'boolean', emoji: '🔄' },
  ],
  hobbies: [
    { id: 'lost_track_time', label: '¿Perdiste noción del tiempo?', type: 'boolean', emoji: '⏰' },
    { id: 'creation_quality', label: '¿Calidad de tu creación?', type: 'rating', emoji: '🎨' },
    { id: 'want_continue', label: '¿Quieres continuar mañana?', type: 'boolean', emoji: '🚀' },
  ],
  food: [
    { id: 'conscious_choices', label: '¿Elecciones conscientes?', type: 'boolean', emoji: '🧠' },
    { id: 'taste_quality', label: '¿Sabor y presentación?', type: 'rating', emoji: '😋' },
    { id: 'any_regrets', label: '¿Te arrepientes de algo?', type: 'boolean', emoji: '🤷' },
  ],
  sleep: [
    { id: 'hours_amount', label: '¿Cantidad de horas?', type: 'rating', emoji: '⏱️' },
    { id: 'had_dreams', label: '¿Soñaste algo?', type: 'boolean', emoji: '🌙' },
    { id: 'ready_for_day', label: '¿Listo para el día?', type: 'boolean', emoji: '☀️' },
  ],
  health: [
    { id: 'addressed_symptoms', label: '¿Atendiste síntomas?', type: 'boolean', emoji: '🩺' },
    { id: 'improvement', label: '¿Mejora desde ayer?', type: 'rating', emoji: '📈' },
    { id: 'need_help', label: '¿Necesitas ayuda profesional?', type: 'boolean', emoji: '👨‍⚕️' },
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
