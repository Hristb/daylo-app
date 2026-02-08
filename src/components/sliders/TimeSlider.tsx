import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { formatMinutes } from '../../utils/constants'
import { Hand } from 'lucide-react'

interface TimeSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  color?: string
  icon?: React.ReactNode
}

export default function TimeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 720, // 12 horas
  step = 15,
  color = '#C4E5FF',
  icon,
}: TimeSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const percentage = ((value - min) / (max - min)) * 100

  useEffect(() => {
    // Ocultar hint después de 5 segundos o al interactuar
    const timer = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (newValue: number) => {
    onChange(newValue)
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHint(false)
    }
  }

  const handleInteractionStart = () => {
    setIsDragging(true)
    setShowHint(false)
    setHasInteracted(true)
  }

  const handleInteractionEnd = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      className="w-full space-y-3 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-600">{icon}</div>}
          <div>
            <span className="text-sm font-semibold text-gray-700">{label}</span>
            {/* Hint de interacción */}
            <AnimatePresence>
              {showHint && !hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-1 mt-1"
                >
                  <Hand className="w-3 h-3 text-purple-500" />
                  <span className="text-[10px] text-purple-600 font-medium">Desliza para ajustar</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-2"
          animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-2xl font-black bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
            animate={isDragging ? { scale: [1, 1.15, 1] } : {}}
          >
            {formatMinutes(value)}
          </motion.span>
        </motion.div>
      </div>

      {/* Slider container con mejor diseño */}
      <div className="relative">
        {/* Fondo con marcadores de tiempo */}
        <div className="relative h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full overflow-visible shadow-inner">
          {/* Marcadores de tiempo (cada hora) */}
          {Array.from({ length: Math.floor(max / 60) + 1 }).map((_, i) => {
            const pos = (i * 60 / max) * 100
            if (pos > 100) return null
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-gray-300"
                style={{ left: `${pos}%` }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-gray-400 font-medium">
                  {i}h
                </div>
              </div>
            )
          })}

          {/* Barra de progreso con gradiente */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 rounded-full shadow-md"
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            }}
            initial={false}
            animate={{ 
              width: `${percentage}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Brillo animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Input range invisible */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleChange(Number(e.target.value))}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            className="absolute w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-10"
            style={{ margin: 0 }}
          />

          {/* Thumb mejorado con animación pulsante */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
            style={{ 
              left: `${percentage}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: isDragging ? 1.4 : (showHint && !hasInteracted ? [1, 1.1, 1] : 1),
            }}
            transition={{ 
              scale: showHint && !hasInteracted 
                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }}
          >
            {/* Sombra del thumb */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: isDragging ? [1, 1.8, 1] : 1,
                opacity: isDragging ? [0.3, 0, 0.3] : 0.3,
              }}
              transition={{ duration: 0.6, repeat: isDragging ? Infinity : 0 }}
            />
            
            {/* Thumb principal */}
            <div 
              className="relative w-7 h-7 rounded-full shadow-xl border-4 border-white flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              {/* Icono de mano cuando no ha interactuado */}
              <AnimatePresence>
                {showHint && !hasInteracted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <Hand className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marcadores de tiempo abajo */}
      <div className="flex justify-between text-xs font-medium px-1">
        <span className="text-gray-500">{formatMinutes(min)}</span>
        <span className="text-gray-400">{formatMinutes(max / 2)}</span>
        <span className="text-gray-500">{formatMinutes(max)}</span>
      </div>

      {/* Sugerencias contextuales */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-xs text-purple-600 font-medium">
            👍 Ajustando tiempo...
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
