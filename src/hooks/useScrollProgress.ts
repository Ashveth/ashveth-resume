import { useEffect, useState, useRef, RefObject } from "react";

export const useScrollProgress = (ref: RefObject<HTMLElement | null>) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Progress: 0 when element enters viewport, 1 when it leaves
        const start = windowHeight;
        const end = -elementHeight;
        const current = rect.top;
        const p = 1 - (current - end) / (start - end);
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return progress;
};
