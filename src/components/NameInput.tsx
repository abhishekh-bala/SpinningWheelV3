import { useState } from 'react'
import { Plus } from 'lucide-react'

interface NameInputProps {
  onAdd: (name: string) => void
  maxNames: number
}

export function NameInput({ onAdd, maxNames }: NameInputProps) {
  const [newName, setNewName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName.trim()) {
      onAdd(newName.trim())
      setNewName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          maxLength={30}
          disabled={maxNames <= 0}
        />
        <button
          type="submit"
          disabled={maxNames <= 0}
          className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {maxNames}/50 names available
      </p>
    </form>
  )
}