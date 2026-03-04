import { motion } from "framer-motion";

export default function Envelope({ isOpened, onOpen, children }) {
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onClick={isOpened ? undefined : onOpen}
      style={{ width: "min(80vw, 320px)", aspectRatio: "4/3" }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="button"
      aria-label={isOpened ? "Phong thư đã mở" : "Bấm để mở phong thư"}
      tabIndex={isOpened ? -1 : 0}
      onKeyDown={(e) => {
        if (!isOpened && (e.key === "Enter" || e.key === " ")) onOpen();
      }}
    >
      {/* 1. LAYER HẬU (BACK) - Nằm dưới cùng */}
      <div className="absolute inset-0 rounded-b-lg bg-envelope-body shadow-lg z-0" />
      
      {/* 2. LAYER BÊN TRONG - Vùng tối khi mở nắp */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-envelope-inner z-5" />

      {/* 3. NỘI DUNG (LETTER/FLOWERS) - Nằm ở giữa kẹp làm nhân bánh */}
      <div className="absolute inset-0 z-10 overflow-visible">
        {children}
      </div>

      {/* 4. LAYER TIỀN (FRONT) - 3 nắp Left, Right, Bottom dùng SVG vuốt cong mượt mà ở đỉnh */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-b-lg overflow-hidden">
        <svg viewBox="0 0 400 300" className="w-full h-full block" preserveAspectRatio="none">
           {/* Left flap */}
           <polygon points="0,0 210,158 0,300" className="fill-envelope-body" style={{ filter: "brightness(0.92)" }} />
           {/* Right flap */}
           <polygon points="400,0 190,158 400,300" className="fill-envelope-body" style={{ filter: "brightness(0.96)" }} />
           {/* Bottom flap với đỉnh vuốt cong bằng đường cong Bezier (Q: Quadratic) */}
           <path 
             d="M 0,300 L 160,172 Q 200,108 240,172 L 400,300 Z" 
             className="fill-envelope-body" 
             style={{ filter: "brightness(1) drop-shadow(0 -4px 4px rgba(0,0,0,0.06))" }} 
           />
         </svg>
      </div>

      {/* 5. NẮP (FLAP) - Nắp trên cùng chứa svg vuốt mũi */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "55%", /* 165px trên 300px để trùng khít bottom flap */
          transformOrigin: "top center",
          perspective: "800px",
        }}
        initial={{ zIndex: 30 }}
        animate={{ 
          rotateX: isOpened ? -180 : 0,
          zIndex: isOpened ? 0 : 30 
        }}
        transition={{ 
          duration: 0.6, 
          ease: "easeInOut",
          // Tụt z-index ngay lập tức HẬU animation mở nắp (0.6s)
          zIndex: { delay: isOpened ? 0.6 : 0, duration: 0 }
        }}
      >
        <svg 
           viewBox="0 0 400 165" 
           className="w-full h-full block" 
           preserveAspectRatio="none"
           style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))" }}
        >
           {/* Nắp trên với phần mũi vuốt cong mềm mại */}
           <path d="M 0,0 L 160,120 Q 200,180 240,120 L 400,0 Z" className="fill-envelope-flap" />
        </svg>
      </motion.div>

      {/* 6. TEM TRÁI TIM */}
      {!isOpened && (
        <motion.div
          className="absolute z-40 text-2xl sm:text-3xl pointer-events-none"
          style={{
            top: "47%",
            left: "45%",  /* Lệch qua bên trái theo code bạn muốn */
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          💌
        </motion.div>
      )}
    </motion.div>
  );
}
