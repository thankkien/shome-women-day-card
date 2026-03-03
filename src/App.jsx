import { useState } from 'react'
import { motion } from 'framer-motion'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex items-center justify-center gap-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <motion.h1
        className="text-5xl font-bold my-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Vite + React
      </motion.h1>

      <div className="card">
        <motion.button
          onClick={() => setCount((count) => count + 1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          count is {count}
        </motion.button>
        <p className="mt-4 text-gray-400">
          Edit <code className="text-amber-400">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <motion.p
        className="read-the-docs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Click on the Vite and React logos to learn more
      </motion.p>
    </>
  )
}

export default App
