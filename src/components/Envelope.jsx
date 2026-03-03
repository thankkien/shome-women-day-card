import { motion } from 'framer-motion'

export default function Envelope({ isOpened, onOpen }) {
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onClick={isOpened ? undefined : onOpen}
      style={{ width: 'min(80vw, 320px)', aspectRatio: '4/3' }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role="button"
      aria-label={isOpened ? 'Phong thư đã mở' : 'Bấm để mở phong thư'}
      tabIndex={isOpened ? -1 : 0}
      onKeyDown={(e) => { if (!isOpened && (e.key === 'Enter' || e.key === ' ')) onOpen() }}
    >
      {/* Envelope body */}
      <div className="absolute inset-0 rounded-lg bg-envelope-body shadow-lg" />

      {/* Inner dark area (visible when flap opens) */}
      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-lg bg-envelope-inner" />

      {/* Bottom fold triangle decoration */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '55%' }}
      >
        <div
          className="w-full h-full bg-envelope-body"
          style={{
            clipPath: 'polygon(0 100%, 50% 0%, 100% 100%)',
          }}
        />
      </div>

      {/* Front face of envelope (covers inner) */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-envelope-body rounded-b-lg"
        style={{ height: '58%' }}
      />

      {/* Flap (triangle on top) */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: '52%',
          transformOrigin: 'top center',
          perspective: '800px',
        }}
        animate={isOpened ? { rotateX: -180 } : { rotateX: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div
          className="w-full h-full bg-envelope-flap"
          style={{
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            borderRadius: '8px 8px 0 0',
          }}
        />
      </motion.div>

      {/* Small heart seal */}
      {!isOpened && (
        <motion.div
          className="absolute z-20 text-2xl sm:text-3xl"
          style={{ top: '42%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          💌
        </motion.div>
      )}
    </motion.div>
  )
}
