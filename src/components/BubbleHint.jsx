import { motion } from "framer-motion";

export default function BubbleHint({ visible }) {
  if (!visible) return null;

  return (
    <motion.div
      className="absolute z-30 px-4 py-2 rounded-full font-medium text-base sm:text-lg"
      style={{
        top: "-60px", left: "50%", x: "-50%", textWrap: "nowrap",
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.7)",
        color: "#b05070",
        boxShadow: "0 2px 12px rgba(180,80,100,0.12)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      aria-hidden="true"
    >
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block"
      >
        Chạm vào yêu thương💌
      </motion.span>
    </motion.div>
  );
}
