import { motion } from "framer-motion";

const blobs = [
  { size: 280, x: "10%", y: "15%", delay: 0, duration: 25 },
  { size: 200, x: "75%", y: "10%", delay: 2, duration: 30 },
  { size: 320, x: "60%", y: "55%", delay: 4, duration: 28 },
  { size: 160, x: "25%", y: "70%", delay: 1, duration: 22 },
  { size: 240, x: "85%", y: "75%", delay: 3, duration: 26 },
  { size: 140, x: "45%", y: "30%", delay: 5, duration: 32 },
  { size: 180, x: "15%", y: "45%", delay: 2.5, duration: 24 },
];

const LightModeBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 dark:hidden overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />

      {/* Floating glass shapes */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.05, 0.97, 1.03, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: i % 3 === 0
                ? "radial-gradient(circle at 30% 30%, rgba(147,197,253,0.15), rgba(196,181,253,0.08), transparent 70%)"
                : i % 3 === 1
                ? "radial-gradient(circle at 40% 40%, rgba(165,180,252,0.12), rgba(147,197,253,0.06), transparent 70%)"
                : "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.1), rgba(165,180,252,0.05), transparent 70%)",
              backdropFilter: "blur(1px)",
              border: "1px solid rgba(148,163,184,0.06)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 4px 24px rgba(148,163,184,0.04)",
            }}
          />
        </motion.div>
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};

export default LightModeBackground;
