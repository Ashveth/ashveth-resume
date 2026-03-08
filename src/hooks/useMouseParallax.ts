import { useState, useEffect, useCallback, useRef } from "react";

export const useMouseParallax = (intensity = 20) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * intensity;
        const y = (e.clientY / window.innerHeight - 0.5) * intensity;
        setPosition({ x, y });
      });
    },
    [intensity]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return position;
};
