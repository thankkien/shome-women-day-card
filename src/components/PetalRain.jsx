import { useMemo } from 'react'
import { motion } from 'framer-motion'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function PetalRain({ show }) {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: randomBetween(5, 95),
      size: randomBetween(8, 16),
      delay: randomBetween(0, 4),
      duration: randomBetween(4, 8),
      rotate: randomBetween(-60, 60),
      drift: randomBetween(-30, 30),
      opacity: randomBetween(0.3, 0.7),
    }))
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            willChange: 'transform',
          }}
          initial={{
            y: -20,
            x: 0,
            rotate: p.rotate,
            opacity: 0,
          }}
          animate={{
            y: '110vh',
            x: p.drift,
            rotate: p.rotate + 180,
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.4}
            viewBox="0 0 12 17"
            fill="none"
          >
            <ellipse
              cx="6"
              cy="8.5"
              rx="5.5"
              ry="8"
              fill="#F5C6B8"
              opacity="0.85"
            />
            <ellipse
              cx="6"
              cy="8.5"
              rx="3"
              ry="5"
              fill="#FFFBF5"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
