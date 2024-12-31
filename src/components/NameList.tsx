import { Trash2 } from 'lucide-react'

interface NameListProps {
  names: string[]
  onRemove: (name: string) => Promise<void>
}

export function NameList({ names, onRemove }: NameListProps) {
  if (names.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6">
        No names added yet
      </div>
    )
  }

  return (
    <div className="space-y-2 mb-6">
      <h3 className="font-bold mb-2">Current Names:</h3>
      {names.map((name) => (
        <div
          key={name}
          className="flex justify-between items-center p-2 bg-gray-50 rounded"
        >
          <span>{name}</span>
          <button
            onClick={() => onRemove(name)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}