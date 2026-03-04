import { motion } from 'framer-motion'

/* ---------- SVG shapes ---------- */
function DaisySVG({ size = 40 }) {
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

function PinkFlowerSVG({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx="22" cy="8" rx="6" ry="11" fill="#F5B8C4"
          stroke="#E8A0B0" strokeWidth="0.5" transform={`rotate(${i * 60} 22 22)`} />
      ))}
      <circle cx="22" cy="22" r="6" fill="#F5C842" />
    </svg>
  )
}

function SmallDaisySVG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx="20" cy="8" rx="5" ry="10" fill="#FFFBF5"
          stroke="#F0E8E0" strokeWidth="0.5" transform={`rotate(${i * 60} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="6" fill="#F5C842" />
    </svg>
  )
}

function PetalSVG({ size = 14 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 14 20" fill="none" aria-hidden="true">
      <ellipse cx="7" cy="10" rx="6" ry="9.5" fill="#F5C6B8" opacity="0.9" />
    </svg>
  )
}

/* ---------- Generate 60 firework-style burst items ---------- */
function makeBurstData() {
  const items = []
  const count = 60
  const types = ['daisy', 'daisy', 'pink', 'small', 'petal'] // daisy more common

  for (let i = 0; i < count; i++) {
    /* spread evenly across 360° with random jitter */
    const base = (i / count) * 360
    const angle = base + (Math.random() - 0.5) * 30
    const rad = (angle * Math.PI) / 180

    /* vary distance for wide spread: near=100, far=450 */
    const dist = 100 + Math.random() * 350

    /* bias upward (like flowers bursting from envelope) */
    const xMultiplier = 1
    const yMultiplier = angle > 180 ? 0.55 : 1.0  // bottom half goes less far

    items.push({
      id: i,
      x: Math.sin(rad) * dist * xMultiplier,
      y: -Math.abs(Math.cos(rad) * dist * yMultiplier) * (angle > 180 ? -1 : 1) - 20,
      rotate: Math.random() * 360,
      size: 18 + Math.random() * 26,
      delay: 0.02 + Math.random() * 0.35,
      type: types[Math.floor(Math.random() * types.length)],
    })
  }
  return items
}

const BURST = makeBurstData()

export default function Flowers({ show }) {
  if (!show) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20" style={{ overflow: 'visible' }}>
      {BURST.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ left: '50%', top: '40%' }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            x: f.x,
            y: f.y,
            opacity: [0, 1, 1, 0.9],
            rotate: f.rotate,
          }}
          transition={{
            duration: 0.65,
            delay: f.delay,
            ease: [0.22, 1.5, 0.36, 1],
          }}
        >
          {f.type === 'daisy'  && <DaisySVG size={f.size} />}
          {f.type === 'pink'   && <PinkFlowerSVG size={f.size * 0.75} />}
          {f.type === 'small'  && <SmallDaisySVG size={f.size * 0.65} />}
          {f.type === 'petal'  && <PetalSVG size={f.size * 0.5} />}
        </motion.div>
      ))}
    </div>
  )
}
