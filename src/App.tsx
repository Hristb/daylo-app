import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter basename="/daylo-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/hoy" replace />} />
          <Route path="hoy" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
