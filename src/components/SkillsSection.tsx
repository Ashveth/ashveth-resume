import { useEffect, useRef, useState } from "react";
import { Code, Brain, Palette, Server, Wrench } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";

const TiltCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = use3DTilt({ maxTilt: 5, scale: 1.015 });
  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    { icon: Code, title: "Programming", skills: [{ name: "Python", level: 90 }, { name: "JavaScript", level: 85 }, { name: "React", level: 88 }, { name: "TypeScript", level: 82 }] },
    { icon: Brain, title: "AI & ML", skills: [{ name: "Agentic AI", level: 92 }, { name: "LLMs", level: 88 }, { name: "AI Agent Dev", level: 90 }, { name: "Prompt Eng.", level: 85 }] },
    { icon: Palette, title: "Design", skills: [{ name: "UX/UI Design", level: 87 }, { name: "Figma", level: 83 }, { name: "User Research", level: 85 }, { name: "Prototyping", level: 86 }] },
    { icon: Server, title: "Backend", skills: [{ name: "FastAPI", level: 88 }, { name: "API Integration", level: 90 }, { name: "Database Design", level: 82 }, { name: "PostgreSQL", level: 80 }] },
    { icon: Wrench, title: "Tools", skills: [{ name: "Git & GitHub", level: 89 }, { name: "VS Code", level: 92 }, { name: "Docker", level: 78 }, { name: "Vercel", level: 85 }] },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden ambient-glow">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight gradient-text">
            Skills & Expertise
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit for building innovative AI solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, ci) => {
            const Icon = category.icon;
            return (
              <TiltCard key={category.title} className="glass-card-hover p-6" delay={ci * 0.08}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-foreground/70">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                            transitionDelay: `${ci * 0.1 + si * 0.05}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
