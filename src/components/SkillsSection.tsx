import { useRef } from "react";
import { Code, Brain, Palette, Server, Wrench, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const skillCategories = [
  {
    icon: Code,
    title: "Languages & Frameworks",
    gradient: "from-blue-500 to-cyan-400",
    skills: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    gradient: "from-violet-500 to-purple-400",
    skills: ["Agentic AI", "LLMs & GPT", "Prompt Engineering", "AI Agent Development", "NLP", "Computer Vision"],
  },
  {
    icon: Palette,
    title: "Design & UX",
    gradient: "from-pink-500 to-rose-400",
    skills: ["UI/UX Design", "Figma", "User Research", "Prototyping", "Design Systems", "Responsive Design"],
  },
  {
    icon: Server,
    title: "Backend & Data",
    gradient: "from-emerald-500 to-teal-400",
    skills: ["FastAPI", "Supabase", "PostgreSQL", "REST APIs", "Database Design", "Edge Functions"],
  },
  {
    icon: Wrench,
    title: "DevOps & Tools",
    gradient: "from-amber-500 to-orange-400",
    skills: ["Git & GitHub", "Vercel", "Docker", "VS Code", "Linux", "CI/CD"],
  },
  {
    icon: Smartphone,
    title: "Platforms & More",
    gradient: "from-teal-500 to-cyan-400",
    skills: ["Lovable", "Base44", "Google AI Studio", "Vite", "Framer Motion", "Three.js"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const skillPillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden ambient-glow">
      {/* Ambient bg elements */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit for building innovative solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.title} variants={cardVariants}>
                <div className="group relative h-full rounded-2xl overflow-hidden bg-card/40 backdrop-blur-xl border border-border/40 p-6 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.15)] transition-all duration-500 hover:-translate-y-1">
                  {/* Gradient accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-display font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skill Pills */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                  >
                    {category.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        custom={si}
                        variants={skillPillVariants}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg
                          bg-secondary/50 text-foreground/70 border border-border/30
                          hover:bg-primary/10 hover:text-primary hover:border-primary/30
                          transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
