import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Envelope from './components/Envelope'
import BubbleHint from './components/BubbleHint'
import Flowers from './components/Flowers'
import Letter from './components/Letter'
import PetalRain from './components/PetalRain'
import './App.css'

function App() {
  const [isOpened, setIsOpened] = useState(false)
  const [showFlowers, setShowFlowers] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpened(true)

    // Stage 1: Flowers burst out after flap opens
    setTimeout(() => setShowFlowers(true), 500)

    // Stage 2: Letter slides up after flowers
    setTimeout(() => setShowLetter(true), 1400)
  }, [])

  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-main">
      {/* Petal rain background */}
      <PetalRain show={isOpened} />

      {/* Center stage */}
      <div className="relative flex flex-col items-center z-10">
        {/* Bubble hint */}
        <AnimatePresence>
          {!isOpened && <BubbleHint visible={!isOpened} />}
        </AnimatePresence>

        {/* Envelope with floating animation */}
        <div className={isOpened ? '' : 'animate-float'}>
          <div className="relative" style={{ overflow: 'visible' }}>
            <Envelope isOpened={isOpened} onOpen={handleOpen} />
            {/* Flowers burst from envelope */}
            <Flowers show={showFlowers} />
          </div>
        </div>

        {/* Letter slides up */}
        <div className="mt-6">
          <AnimatePresence>
            {showLetter && <Letter show={showLetter} />}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}

export default App
