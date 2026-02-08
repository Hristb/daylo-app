import { motion } from 'framer-motion'
import { Check, X as XIcon } from 'lucide-react'

interface BooleanCardProps {
  emoji?: string
  label: string
  value: boolean | null
  onChange: (value: boolean) => void
  color: string
}

export default function BooleanCard({ emoji, label, value, onChange, color }: BooleanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-md border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        {emoji && <span className="text-3xl">{emoji}</span>}
        <h3 className="text-base font-semibold text-gray-700 flex-1">{label}</h3>
      </div>

      <div className="flex gap-3">
        <motion.button
          onClick={() => onChange(true)}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            value === true
              ? 'shadow-lg scale-105'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          style={{
            backgroundColor: value === true ? color : undefined,
            color: value === true ? '#374151' : undefined,
          }}
          whileHover={{ scale: value === true ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <Check size={20} strokeWidth={3} />
          Sí
        </motion.button>

        <motion.button
          onClick={() => onChange(false)}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            value === false
              ? 'bg-gray-300 text-gray-700 shadow-lg scale-105'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          whileHover={{ scale: value === false ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <XIcon size={20} strokeWidth={3} />
          No
        </motion.button>
      </div>
    </motion.div>
  )
}
