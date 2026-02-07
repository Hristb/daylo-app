import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { User, X } from 'lucide-react'

export default function Layout() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [userName, setUserName] = useState('')
  const [inputName, setInputName] = useState('')

  useEffect(() => {
    const storedName = localStorage.getItem('daylo-user-name')
    if (storedName) {
      setUserName(storedName)
    } else {
      setShowWelcome(true)
    }
  }, [])

  const handleSaveName = () => {
    if (inputName.trim()) {
      localStorage.setItem('daylo-user-name', inputName.trim())
      setUserName(inputName.trim())
      setShowWelcome(false)
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-white/50 shadow-sm"
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pastel-pink to-pastel-purple flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl">✨</span>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Daylo
                </h1>
                {userName && (
                  <p className="text-xs text-gray-600">Hola, {userName}! 👋</p>
                )}
              </div>
            </div>
            
            <motion.div
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short' 
              })}
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <Navigation />
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pastel-pink to-pastel-purple flex items-center justify-center shadow-xl">
                    <span className="text-4xl">✨</span>
                  </div>
                </motion.div>

                <div className="mt-8 text-center space-y-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    ¡Bienvenido a Daylo!
                  </h2>
                  <p className="text-gray-600">
                    Tu diario personal para registrar y mejorar tu día a día
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Cómo te llamas?
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                        placeholder="Escribe tu nombre"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pastel-purple focus:outline-none transition-colors text-lg"
                        autoFocus
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={handleSaveName}
                    disabled={!inputName.trim()}
                    className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-pastel-pink to-pastel-purple text-gray-800 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: inputName.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: inputName.trim() ? 0.98 : 1 }}
                  >
                    ✨ Comenzar
                  </motion.button>
                </div>

                <p className="mt-6 text-xs text-center text-gray-500">
                  Tu nombre se guardará localmente en tu navegador
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>    </div>
  )
}
