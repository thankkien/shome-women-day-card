import { useMemo } from 'react'
import { motion } from 'framer-motion'

function FloatDaisy({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx="30" cy="11" rx="7.5" ry="14" fill="#FFFBF5"
          stroke="#F0E8E0" strokeWidth="0.5" transform={`rotate(${i * 45} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="9" fill="#F5C842" />
      <circle cx="30" cy="30" r="5.5" fill="#E8B830" />
    </svg>
  )
}

function FloatPink({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx="22" cy="8" rx="5.5" ry="10" fill="#F5B8C4"
          stroke="#E8A0B0" strokeWidth="0.5" transform={`rotate(${i * 60} 22 22)`} />
      ))}
      <circle cx="22" cy="22" r="5.5" fill="#F5C842" />
    </svg>
  )
}

function FloatPetal({ size }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 14 20" fill="none" aria-hidden="true">
      <ellipse cx="7" cy="10" rx="6" ry="9.5" fill="#F5C6B8" opacity="0.8" />
      <ellipse cx="7" cy="10" rx="3" ry="5" fill="#FFFBF5" opacity="0.25" />
    </svg>
  )
}

function rand(min, max) { return Math.random() * (max - min) + min }

export default function FloatingElements({ show }) {
  const items = useMemo(() => Array.from({ length: 35 }, (_, i) => {
    const kinds = ['daisy', 'daisy', 'pink', 'petal', 'petal']
    return {
      id: i,
      kind: kinds[i % kinds.length],
      size: rand(14, 38),
      startX: rand(3, 97),
      startY: rand(5, 90),
      driftX: rand(-40, 40),
      driftY: rand(-35, 35),
      rotateFull: rand(-200, 200),
      duration: rand(7, 16),
      delay: rand(0, 3),
      opacity: rand(0.45, 0.9),
    }
  }), [])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }} aria-hidden="true">
      {items.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ left: `${f.startX}%`, top: `${f.startY}%`, willChange: 'transform' }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: [0, f.opacity, f.opacity, 0],
            scale:   [0.2, 1, 0.95, 0.85],
            x: [0, f.driftX, f.driftX * 0.3, f.driftX],
            y: [0, f.driftY, -f.driftY * 0.5, f.driftY * 0.6],
            rotate: [0, f.rotateFull],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {f.kind === 'daisy' && <FloatDaisy size={f.size} />}
          {f.kind === 'pink'  && <FloatPink size={f.size} />}
          {f.kind === 'petal' && <FloatPetal size={f.size} />}
        </motion.div>
      ))}
    </div>
  )
}
