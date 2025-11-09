import { useState, useCallback } from "react";

interface TransitionState {
  isTransitioning: boolean;
  direction: "up" | "down" | null;
}

export const useSectionTransition = () => {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    direction: null,
  });

  const navigateToSection = useCallback((targetHref: string) => {
    const targetElement = document.querySelector(targetHref);
    if (!targetElement) return;

    const currentScrollY = window.scrollY;
    const targetScrollY = targetElement.getBoundingClientRect().top + currentScrollY;
    const direction = targetScrollY > currentScrollY ? "down" : "up";

    // Start transition
    setTransitionState({ isTransitioning: true, direction });

    // Add transition overlay
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, rgba(32, 40, 58, 0.95), rgba(20, 25, 38, 0.95));
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease-in-out;
    `;
    document.body.appendChild(overlay);

    // Fade in overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    // Wait for fade in, then scroll and fade out
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: "smooth" });
      
      setTimeout(() => {
        overlay.style.opacity = "0";
        
        setTimeout(() => {
          document.body.removeChild(overlay);
          setTransitionState({ isTransitioning: false, direction: null });
        }, 400);
      }, 600);
    }, 400);
  }, []);

  return {
    transitionState,
    navigateToSection,
  };
};
