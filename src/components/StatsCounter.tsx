import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Code2, Rocket, Users } from "lucide-react";

const stats = [
  { icon: Trophy, value: 9, suffix: "+", label: "Hackathons", color: "text-amber-400" },
  { icon: Code2, value: 11, suffix: "+", label: "AI Projects", color: "text-primary" },
  { icon: Rocket, value: 2, suffix: "", label: "Startups Founded", color: "text-emerald-400" },
  { icon: Users, value: 5000, suffix: "+", label: "Users Impacted", color: "text-violet-400" },
];

const AnimatedNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card p-6 md:p-8 text-center group hover:scale-105 transition-transform duration-500"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/60 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-3xl md:text-4xl font-display font-bold mb-2 ${stat.color}`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
