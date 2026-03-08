import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-text]");
      if (interactive) {
        setIsHovering(true);
        const text = interactive.getAttribute("data-cursor-text");
        setCursorText(text || "");
      }
    };

    const handleOut = () => {
      setIsHovering(false);
      setCursorText("");
    };

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

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40 flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            scale: isClicking ? 0.8 : 1,
            borderColor: isHovering ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.4)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] font-medium text-foreground uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
          animate={{
            scale: isHovering ? 0 : isClicking ? 2 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
