import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(true);
      }
    };

    const handleOut = () => setIsHovering(false);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "";
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Crosshair / diamond cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.6 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ type: "spring", damping: 18, stiffness: 350 }}
        >
          {/* Diamond shape */}
          <div
            className="w-5 h-5 border-2 rounded-[4px] rotate-45"
            style={{
              borderColor: isHovering ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.6)",
              background: isHovering ? "hsl(var(--primary) / 0.1)" : "transparent",
              transition: "border-color 0.2s, background 0.2s",
            }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{
              width: isHovering ? 6 : 3,
              height: isHovering ? 6 : 3,
              backgroundColor: isHovering ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.8)",
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.div>

      {/* Trailing glow on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: cursorX, y: cursorY }}
        >
          <motion.div
            className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ background: "hsl(var(--primary))", filter: "blur(10px)" }}
          />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
