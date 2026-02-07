import { motion } from 'framer-motion'
import ActivityIcon from '../icons/ActivityIcon'
import { ActivityOption } from '../../types'
import { useState } from 'react'

interface ActivityCardProps {
  activity: ActivityOption
  isSelected: boolean
  onToggle: () => void
}

export default function ActivityCard({ 
  activity, 
  isSelected, 
  onToggle 
}: ActivityCardProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.button
      onClick={onToggle}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      className={`daylo-icon-card w-full aspect-square ${isSelected ? 'selected' : ''}`}
      style={{ 
        backgroundColor: isSelected ? activity.color : `${activity.color}40`,
        borderColor: activity.color,
        ringColor: activity.color,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isSelected ? {
        boxShadow: [
          `0 0 0 0 ${activity.color}40`,
          `0 0 0 8px ${activity.color}00`,
        ],
      } : {}}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={isSelected ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <ActivityIcon 
          type={activity.id} 
          size={40} 
          animate={isPressed}
          color={isSelected ? '#374151' : '#6B7280'}
        />
      </motion.div>
      
      <span className="text-sm font-semibold mt-2 text-gray-700">
        {activity.label}
      </span>
      
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  )
}
