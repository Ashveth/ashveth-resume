import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CinematicSectionProps {
  children: React.ReactNode;
  className?: string;
  parallaxIntensity?: number;
  scaleRange?: [number, number];
  rotateRange?: [number, number];
}

const CinematicSection = ({
  children,
  className = "",
  parallaxIntensity = 50,
  scaleRange = [0.95, 1],
  rotateRange = [1, 0],
}: CinematicSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxIntensity, -parallaxIntensity]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [scaleRange[0], scaleRange[1], scaleRange[1], scaleRange[0]]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [rotateRange[0], rotateRange[1], rotateRange[1], -rotateRange[0]]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        rotateX,
        opacity,
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default CinematicSection;
