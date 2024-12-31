import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Wheel } from './components/Wheel'
import AdminPanel from './components/AdminPanel' // Update import to use default export
import { Login } from './components/Login'
import { useWheelStore } from './store/wheel'
import { Gift } from 'lucide-react'

function App() {
  const { fetchNames, winner } = useWheelStore()

  useEffect(() => {
    fetchNames()
  }, [fetchNames])

  return (
    <Router>
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80')`
        }}
      >
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2 drop-shadow-lg">
                  <Gift className="text-purple-300" />
                  Fortune Wheel
                </h1>
                {winner && (
                  <div className="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg inline-block">
                    <h2 className="text-2xl font-bold text-purple-600">
                      Winner: {winner}! 🎉
                    </h2>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mb-8">
                <Wheel />
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <div className="container mx-auto px-4 py-8">
              <AdminPanel />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App