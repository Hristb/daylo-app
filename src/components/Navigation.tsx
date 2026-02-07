import { NavLink } from 'react-router-dom'
import { Home, BarChart3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDayloStore } from '../store/dayloStore'

export default function Navigation() {
  const isModalOpen = useDayloStore((state) => state.isModalOpen)
  const navItems = [
    { path: '/hoy', icon: Home, label: 'Hoy' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  ]

  return (
    <AnimatePresence>
      {!isModalOpen && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-t border-white/50 shadow-lg"
        >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-pastel-pink to-pastel-purple' 
                    : 'hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon 
                      size={24} 
                      strokeWidth={isActive ? 2.5 : 2}
                      color={isActive ? '#374151' : '#9CA3AF'}
                    />
                  </motion.div>
                  <span className={`text-xs font-semibold ${
                    isActive ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
