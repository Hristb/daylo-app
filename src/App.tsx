import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Layout from './components/Layout'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/hoy" replace />} />
          <Route path="hoy" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
