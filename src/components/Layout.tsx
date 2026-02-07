import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { User, Mail } from 'lucide-react'
import { getUserByEmail, createOrUpdateUser } from '../services/firebaseService'

export default function Layout() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [userName, setUserName] = useState('')
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedName = localStorage.getItem('daylo-user-name')
    const storedEmail = localStorage.getItem('daylo-user-email')
    if (storedName && storedEmail) {
      setUserName(storedName)
    } else {
      setShowWelcome(true)
    }
  }, [])

  const handleSaveUser = async () => {
    if (!inputName.trim() || !inputEmail.trim()) {
      setError('Por favor completa todos los campos')
      return
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inputEmail)) {
      setError('Por favor ingresa un correo válido')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Verificar si el usuario ya existe
      const existingUser = await getUserByEmail(inputEmail.trim())
      
      if (existingUser) {
        // Usuario existente - cargar sus datos
        localStorage.setItem('daylo-user-name', existingUser.name)
        localStorage.setItem('daylo-user-email', existingUser.email)
        setUserName(existingUser.name)
        setShowWelcome(false)
        
        // Mostrar mensaje de bienvenida de regreso
        setTimeout(() => {
          alert(`¡Bienvenido de vuelta, ${existingUser.name}! 🎉\nHemos cargado tus datos.`)
        }, 500)
      } else {
        // Nuevo usuario - guardar en Firebase
        await createOrUpdateUser(inputName.trim(), inputEmail.trim())
        
        localStorage.setItem('daylo-user-name', inputName.trim())
        localStorage.setItem('daylo-user-email', inputEmail.trim())
        setUserName(inputName.trim())
        setShowWelcome(false)
      }
    } catch (error) {
      console.error('Error al verificar usuario:', error)
      setError('Error al conectar. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
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
                    Tu diario personal en la nube
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
                        onKeyPress={(e) => e.key === 'Enter' && document.getElementById('email-input')?.focus()}
                        placeholder="Tu nombre"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pastel-purple focus:outline-none transition-colors text-lg"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Cuál es tu correo?
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        id="email-input"
                        type="email"
                        value={inputEmail}
                        onChange={(e) => {
                          setInputEmail(e.target.value)
                          setError('')
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveUser()}
                        placeholder="tu@correo.com"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pastel-purple focus:outline-none transition-colors text-lg"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    onClick={handleSaveUser}
                    disabled={!inputName.trim() || !inputEmail.trim() || isLoading}
                    className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-pastel-pink to-pastel-purple text-gray-800 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: (inputName.trim() && inputEmail.trim() && !isLoading) ? 1.02 : 1 }}
                    whileTap={{ scale: (inputName.trim() && inputEmail.trim() && !isLoading) ? 0.98 : 1 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          ⏳
                        </motion.span>
                        Verificando...
                      </span>
                    ) : (
                      '✨ Comenzar'
                    )}
                  </motion.button>
                </div>

                <p className="mt-6 text-xs text-center text-gray-500">
                  Tus datos se guardan de forma segura en Firebase
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>    </div>
  )
}
