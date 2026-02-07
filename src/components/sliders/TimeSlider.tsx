import { motion } from 'framer-motion'
import { useState } from 'react'
import { formatMinutes } from '../../utils/constants'

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
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <motion.div
      className="w-full space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-600">{icon}</div>}
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        <motion.span
          className="text-xl font-black text-gray-800"
          animate={isDragging ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {formatMinutes(value)}
        </motion.span>
      </div>

      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress bar */}
        <motion.div
          className="absolute h-full rounded-full"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
          }}
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Slider input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Thumb indicator */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-lg pointer-events-none z-20"
          style={{ 
            left: `${percentage}%`,
            backgroundColor: color,
            transform: `translate(-50%, -50%) scale(${isDragging ? 1.3 : 1})`,
          }}
          animate={{
            boxShadow: isDragging 
              ? `0 0 0 8px ${color}40`
              : `0 0 0 0px ${color}00`,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Time markers */}
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <span>{formatMinutes(min)}</span>
        <span>{formatMinutes(max / 2)}</span>
        <span>{formatMinutes(max)}</span>
      </div>
    </motion.div>
  )
}
