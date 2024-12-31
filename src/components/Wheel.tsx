import { motion, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useWheelStore } from '../store/wheel'
import { triggerConfetti } from '../utils/confetti'

const spinSound = new Audio('/spin.mp3')
const winSound = new Audio('/win.mp3')

export function Wheel() {
  const { names, isSpinning, winner, spin } = useWheelStore()
  const wheelRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isSpinning) {
      spinSound.currentTime = 0
      spinSound.play()
    } else if (winner) {
      winSound.currentTime = 0
      winSound.play()
      triggerConfetti()
    }
  }, [isSpinning, winner])

  const handleSpin = async () => {
    if (!isSpinning && names.length > 0) {
      const wheel = wheelRef.current
      if (wheel) {
        animate(wheel, 
          { rotate: [0, 1800] },
          { duration: 3, ease: "easeOut" }
        )
      }
      await spin()
    }
  }

  return (
    <div className="relative w-96 h-96">
      <motion.div
        ref={wheelRef}
        className="absolute inset-0 rounded-full border-8 border-yellow-400 bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl"
        style={{ transformOrigin: "center" }}
      >
        {names.map((name, i) => (
          <div
            key={name}
            className="absolute w-full h-full text-white font-bold"
            style={{
              transform: `rotate(${(i * 360) / names.length}deg)`,
              transformOrigin: "50% 50%",
            }}
          >
            <span className="absolute left-1/2 -translate-x-1/2 top-4">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
      
      <button
        onClick={handleSpin}
        disabled={isSpinning || names.length === 0}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                   bg-red-500 text-white font-bold py-4 px-8 rounded-full shadow-lg
                   transform hover:scale-105 transition-transform disabled:opacity-50
                   hover:bg-red-600 active:scale-95"
      >
        {isSpinning ? 'Spinning...' : 'SPIN!'}
      </button>
    </div>
  )
}