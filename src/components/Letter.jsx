import { motion } from "framer-motion";
import { getLetterBody } from "../helpers/getLetterBody";

const lines = [
  { text: "Gửi đến một nửa", isHeading: true },
  { text: "YÊU THƯƠNG của S.Home❤️", isHeading: true },
  { text: "───── ✿ ─────", isDivider: true },
  ...getLetterBody(),
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* Letter always renders its card shell.
   `show` gates whether text content is visible. */
export default function Letter({ show }) {
  return (
    <article
      className="letter-paper rounded-2xl text-center shadow-inner"
      style={{
        width: "100%",
        maxWidth: "340px",
        padding: "1.5rem 1rem",
        minHeight: "360px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
      aria-label="Thiệp chúc mừng ngày Quốc tế Phụ nữ"
    >
      {show && (
        <motion.div
          className="w-full"
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
                  style={{ textWrap: "balance" }}
                >
                  {line.text}
                </motion.h1>
              );
            }
            if (line.isDivider) {
              return (
                <motion.p
                  key={i}
                  variants={lineVariants}
                  className="text-petal-pink text-xl my-3"
                  aria-hidden="true"
                >
                  {line.text}
                </motion.p>
              );
            }
            return (
              <motion.p
                key={i}
                variants={lineVariants}
                className="font-body text-text-body text-lg sm:text-md leading-relaxed"
              >
                {line.text}
              </motion.p>
            );
          })}
        </motion.div>
      )}
    </article>
  );
}
