import { motion } from 'framer-motion'

export default function BubbleHint({ visible }) {
  if (!visible) return null

  return (
    <motion.div
      className="absolute z-30 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-text-heading font-medium text-sm sm:text-base"
      style={{ top: '-60px', left: '50%', x: '-50%' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      aria-hidden="true"
    >
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-block"
      >
        Touch💌
      </motion.span>
    </motion.div>
  )
}
