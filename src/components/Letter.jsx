import { motion } from 'framer-motion'

const lines = [
  { text: 'Chúc Mừng Ngày', isHeading: true },
  { text: 'Quốc Tế Phụ Nữ 8/3', isHeading: true },
  { text: '───── ✿ ─────', isDivider: true },
  { text: 'Gửi đến các chị em thân mến,', isBody: true },
  { text: 'Nhân ngày 8/3, xin gửi đến các chị em', isBody: true },
  { text: 'những lời chúc tốt đẹp nhất.', isBody: true },
  { text: 'Chúc các chị em luôn tỏa sáng,', isBody: true },
  { text: 'hạnh phúc và thành công! 🌸', isBody: true },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Letter({ show }) {
  if (!show) return null

  return (
    <motion.div
      className="letter-paper rounded-2xl px-6 py-8 sm:px-8 sm:py-10 w-full max-w-xs sm:max-w-sm mx-auto text-center"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {lines.map((line, i) => {
          if (line.isHeading) {
            return (
              <motion.h1
                key={i}
                variants={lineVariants}
                className="font-heading text-text-heading text-2xl sm:text-3xl font-bold leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {line.text}
              </motion.h1>
            )
          }
          if (line.isDivider) {
            return (
              <motion.p
                key={i}
                variants={lineVariants}
                className="text-petal-pink text-lg my-3"
                aria-hidden="true"
              >
                {line.text}
              </motion.p>
            )
          }
          return (
            <motion.p
              key={i}
              variants={lineVariants}
              className="font-body text-text-body text-sm sm:text-base leading-relaxed"
            >
              {line.text}
            </motion.p>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
