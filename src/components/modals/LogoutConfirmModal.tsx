import { motion } from 'framer-motion'
import { LogOut, AlertCircle } from 'lucide-react'

interface LogoutConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function LogoutConfirmModal({ onConfirm, onCancel }: LogoutConfirmModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 px-6 py-5 border-b border-red-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-2xl flex items-center justify-center">
              <LogOut className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Cerrar Sesión
              </h2>
              <p className="text-xs text-red-600">Se perderán datos no sincronizados</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">¿Estás seguro?</p>
              <p className="text-xs text-amber-700">
                Se cerrará tu sesión y volverás a la pantalla de bienvenida. Tus datos se mantendrán seguros.
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t border-gray-100">
          <motion.button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cerrar Sesión
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
