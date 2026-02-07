import { motion } from 'framer-motion'
import { 
  Briefcase, 
  Home as HomeIcon, 
  Bus, 
  Dumbbell, 
  Users, 
  Book, 
  Moon, 
  UtensilsCrossed,
  Palette,
  Heart
} from 'lucide-react'
import { ActivityIcon as ActivityIconType } from '../../types'

interface ActivityIconProps {
  type: ActivityIconType
  size?: number
  animate?: boolean
  color?: string
}

const iconMap = {
  work: Briefcase,
  home: HomeIcon,
  exercise: Dumbbell,
  social: Users,
  study: Book,
  sleep: Moon,
  food: UtensilsCrossed,
  hobbies: Palette,
  health: Heart,
}

export default function ActivityIcon({ 
  type, 
  size = 32, 
  animate = false,
  color = '#667085' 
}: ActivityIconProps) {
  const Icon = iconMap[type]

  return (
    <motion.div
      initial={animate ? { scale: 0, rotate: -180 } : {}}
      animate={animate ? { 
        scale: 1, 
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      } : {}}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={size} color={color} strokeWidth={2.5} />
    </motion.div>
  )
}
