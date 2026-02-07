import { motion } from 'framer-motion'

interface RatingCardProps {
  emoji: string
  label: string
  value: number
  onChange: (value: number) => void
  color: string
}

export default function RatingCard({ emoji, label, value, onChange, color }: RatingCardProps) {
  const ratings = [1, 2, 3, 4, 5]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-md border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{emoji}</span>
        <h3 className="text-base font-semibold text-gray-700 flex-1">{label}</h3>
      </div>

      <div className="flex justify-between gap-2">
        {ratings.map((rating) => (
          <motion.button
            key={rating}
            onClick={() => onChange(rating)}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
              value === rating
                ? 'shadow-lg scale-105'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: value === rating ? color : undefined,
              color: value === rating ? '#374151' : undefined,
            }}
            whileHover={{ scale: value === rating ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            {rating}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between mt-2 px-1">
        <span className="text-xs text-gray-400">Bajo</span>
        <span className="text-xs text-gray-400">Alto</span>
      </div>
    </motion.div>
  )
}
