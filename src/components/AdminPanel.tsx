import { useState } from 'react'
import { useWheelStore } from '../store/wheel'
import { Trash2, Plus, RotateCcw, LogOut, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { NameList } from './NameList'
import { NameInput } from './NameInput'
import { NameCounter } from './NameCounter'

const MAX_NAMES = 50

// Change to default export
export default function AdminPanel() {
  const [pendingNames, setPendingNames] = useState<string[]>([])
  const { names, selectedNames, addName, removeName, reset } = useWheelStore()
  const navigate = useNavigate()

  const totalNameCount = names.length + pendingNames.length
  const remainingSlots = MAX_NAMES - totalNameCount

  const handleAddToPending = (name: string) => {
    if (name.trim() && !pendingNames.includes(name.trim()) && remainingSlots > 0) {
      setPendingNames([...pendingNames, name.trim()])
    }
  }

  const handleRemoveFromPending = (name: string) => {
    setPendingNames(pendingNames.filter(n => n !== name))
  }

  const handleSaveNames = async () => {
    for (const name of pendingNames) {
      await addName(name)
    }
    setPendingNames([])
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <button
          onClick={handleSignOut}
          className="text-gray-600 hover:text-gray-800"
        >
          <LogOut size={20} />
        </button>
      </div>

      <NameCounter currentCount={totalNameCount} maxCount={MAX_NAMES} />
      
      <NameInput onAdd={handleAddToPending} maxNames={remainingSlots} />
      
      {pendingNames.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Pending Names:</h3>
          <div className="space-y-2 mb-4">
            {pendingNames.map((name) => (
              <div
                key={name}
                className="flex justify-between items-center p-2 bg-purple-50 rounded"
              >
                <span>{name}</span>
                <button
                  onClick={() => handleRemoveFromPending(name)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleSaveNames}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 
                     flex items-center justify-center gap-2 mb-6"
          >
            <Save size={18} />
            Save Names ({pendingNames.length})
          </button>
        </div>
      )}

      <NameList names={names} onRemove={removeName} />

      {selectedNames.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold mb-2">Selected Names:</h3>
          <div className="bg-gray-100 p-2 rounded">
            {selectedNames.join(', ')}
          </div>
        </div>
      )}

      <button
        onClick={reset}
        className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 
                 flex items-center justify-center gap-2"
      >
        <RotateCcw size={18} />
        Reset Wheel
      </button>
    </div>
  )
}