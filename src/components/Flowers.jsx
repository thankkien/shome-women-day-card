import { motion } from 'framer-motion'

/* Single daisy SVG – 8 petals around a yellow center */
function Daisy({ size = 40, className = '' }) {
  const petals = Array.from({ length: 8 })
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="30"
          cy="12"
          rx="7"
          ry="14"
          fill="#FFFBF5"
          stroke="#F0E8E0"
          strokeWidth="0.5"
          transform={`rotate(${i * 45} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="8" fill="#F5C842" />
      <circle cx="30" cy="30" r="5" fill="#E8B830" />
    </svg>
  )
}

/* Small pink flower */
function PinkFlower({ size = 28, className = '' }) {
  const petals = Array.from({ length: 5 })
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="8"
          rx="6"
          ry="10"
          fill="#F5C6B8"
          stroke="#E8A090"
          strokeWidth="0.5"
          transform={`rotate(${i * 72} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="5" fill="#F5C842" />
    </svg>
  )
}

/* Positions for flowers bursting out (relative to center) */
const flowerData = [
  { x: -60, y: -90, size: 44, rotate: -15, delay: 0, type: 'daisy' },
  { x: 30, y: -100, size: 38, rotate: 20, delay: 0.08, type: 'daisy' },
  { x: -30, y: -120, size: 48, rotate: -8, delay: 0.12, type: 'daisy' },
  { x: 55, y: -80, size: 36, rotate: 12, delay: 0.16, type: 'daisy' },
  { x: -70, y: -60, size: 32, rotate: -25, delay: 0.2, type: 'pink' },
  { x: 0, y: -135, size: 42, rotate: 5, delay: 0.1, type: 'daisy' },
  { x: 65, y: -55, size: 28, rotate: 30, delay: 0.24, type: 'pink' },
  { x: -15, y: -70, size: 26, rotate: -10, delay: 0.18, type: 'pink' },
]

/* Green leaf SVG */
function Leaf({ style }) {
  return (
    <svg
      width="16"
      height="34"
      viewBox="0 0 16 34"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M8 0 C8 0 16 12 8 34 C8 34 0 12 8 0Z"
        fill="#6B8F5E"
        opacity="0.8"
      />
    </svg>
  )
}

export default function Flowers({ show }) {
  if (!show) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20"
      style={{ overflow: 'visible' }}
    >
      {/* Leaves behind flowers */}
      {flowerData.slice(0, 4).map((f, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
          animate={{
            scale: 1,
            x: f.x * 0.7,
            y: f.y * 0.9,
            opacity: 0.7,
          }}
          transition={{
            duration: 0.7,
            delay: f.delay,
            ease: 'easeOut',
          }}
        >
          <Leaf style={{ transform: `rotate(${f.rotate + 30}deg)` }} />
        </motion.div>
      ))}

      {/* Flowers */}
      {flowerData.map((f, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{
            scale: 1,
            x: f.x,
            y: f.y,
            opacity: 1,
            rotate: f.rotate,
          }}
          transition={{
            duration: 0.6,
            delay: f.delay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {f.type === 'daisy' ? (
            <Daisy size={f.size} />
          ) : (
            <PinkFlower size={f.size} />
          )}
        </motion.div>
      ))}
    </div>
  )
}
