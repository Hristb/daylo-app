import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'
import Layout from './components/Layout'

// Lazy load páginas secundarias para reducir bundle inicial
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/hoy" replace />} />
          <Route path="hoy" element={<Home />} />
          <Route 
            path="dashboard" 
            element={
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Cargando...</p>
                  </div>
                </div>
              }>
                <Dashboard />
              </Suspense>
            } 
          />
          <Route 
            path="perfil" 
            element={
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Cargando...</p>
                  </div>
                </div>
              }>
                <Profile />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
