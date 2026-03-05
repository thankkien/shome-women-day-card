import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "./components/Envelope";
import BubbleHint from "./components/BubbleHint";
import Flowers from "./components/Flowers";
import Letter from "./components/Letter";
import PetalRain from "./components/PetalRain";
import FloatingElements from "./components/FloatingElements";
import Logo from "./components/Logo";
import "./App.css";

/*
  Animation stages:
  0 = idle
  1 = click -> flap opens, flowers burst
  2 = letter peeks above envelope
  3 = envelope slides down, letter follows
  4 = letter animates to full-screen center
*/

export default function App() {
  const [stage, setStage] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const handleOpen = useCallback(() => {
    if (stage !== 0) return;
    setStage(1);
    setTimeout(() => setStage(2), 650);
    setTimeout(() => setStage(3), 1500);
    setTimeout(() => setStage(4), 2600);
  }, [stage]);

  const handleReset = useCallback(() => {
    setStage(0);
    setResetKey((k) => k + 1);
  }, []);

  const isOpened = stage >= 1;
  const showFlowers = stage >= 1;
  const showFloating = stage >= 1;

  // Letter top = logo (48px) + gap (12px) = 60px từ top
  // letter_half = 180px (minHeight 360px / 2)
  // y offset từ screen center = 60 + 180 - window.innerHeight/2
  const stage4Y = 48 + 12 + 180 + 20 - window.innerHeight / 2;

  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-main">
      {/* Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <Logo />
      </div>

      {/* ── Nội dung animation — key thay đổi khi reset để force remount ── */}
      <React.Fragment key={resetKey}>
        <PetalRain show={showFloating} />
        <FloatingElements show={showFloating} />

        {/* ── Center stage: Envelope group ── */}
        <div
          className="relative flex flex-col items-center z-10"
          style={{ perspective: "1000px" }}
        >
          <AnimatePresence>
            {!isOpened && <BubbleHint visible key="bubble" />}
          </AnimatePresence>

          <motion.div
            animate={
              stage >= 4
                ? { y: 300, scale: 0.7, opacity: 0.8, filter: "blur(2px)" }
                : stage >= 3
                  ? { y: 200, scale: 0.85 }
                  : { y: 0, scale: 1 }
            }
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className={stage === 0 ? "animate-float" : ""}
          >
            <Envelope isOpened={isOpened} onOpen={handleOpen}>
              <Flowers show={showFlowers} />
            </Envelope>
          </motion.div>
        </div>

        {/* ── Một lá thư duy nhất, animate qua tất cả các stage ── */}
        {stage >= 2 && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              zIndex: stage >= 4 ? 50 : 20,
              pointerEvents: stage >= 4 ? "auto" : "none",
            }}
          >
            <motion.div
              className="flex justify-center"
              style={{ width: "min(340px, 90vw)" }}
              initial={{ y: 120, scale: 0.8, opacity: 0 }}
              animate={
                stage === 2
                  ? { y: -290, scale: 0.7, opacity: 1 }
                  : stage === 3
                    ? { y: -130, scale: 0.64, opacity: 1 }
                    : { y: stage4Y, scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }}
            >
              <Letter show={stage >= 4} />
            </motion.div>
          </div>
        )}
      </React.Fragment>

      {/* ── Nút reset — hiện sau khi lá thư mở ra ── */}
      <AnimatePresence>
        {stage === 4 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            onClick={handleReset}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-base sm:text-lg font-medium"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.7)",
              color: "#b05070",
              boxShadow: "0 2px 12px rgba(180,80,100,0.12)",
            }}
          >
            Xem lại
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
