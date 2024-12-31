import { CircleSlash, Users } from 'lucide-react'

interface NameCounterProps {
  currentCount: number
  maxCount: number
}

export function NameCounter({ currentCount, maxCount }: NameCounterProps) {
  const remaining = maxCount - currentCount
  const isNearLimit = remaining <= 5
  const isAtLimit = remaining === 0

  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Users className={isAtLimit ? "text-red-500" : "text-purple-500"} size={20} />
        <span className="font-medium">Name Slots:</span>
      </div>
      <div className="flex items-center gap-2">
        {isAtLimit && <CircleSlash className="text-red-500" size={18} />}
        <span className={`font-bold ${isNearLimit ? 'text-red-500' : 'text-purple-600'}`}>
          {currentCount}/{maxCount}
        </span>
      </div>
    </div>
  )
}