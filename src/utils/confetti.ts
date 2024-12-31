import confetti from 'canvas-confetti'

export function triggerConfetti() {
  // First burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    })
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    })
  }, 250)

  // Confetti shower
  const end = Date.now() + 2000
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']

  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}