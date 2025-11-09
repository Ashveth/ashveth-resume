import { useEffect, useRef, useState } from "react";
import { Code, Brain, Palette, Server, Wrench } from "lucide-react";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      icon: Code,
      title: "Programming",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 88 },
        { name: "TypeScript", level: 82 },
      ],
    },
    {
      icon: Brain,
      title: "AI & ML",
      skills: [
        { name: "Agentic AI", level: 92 },
        { name: "LLMs", level: 88 },
        { name: "AI Agent Development", level: 90 },
        { name: "Prompt Engineering", level: 85 },
      ],
    },
    {
      icon: Palette,
      title: "Design",
      skills: [
        { name: "UX/UI Design", level: 87 },
        { name: "Figma", level: 83 },
        { name: "User Research", level: 85 },
        { name: "Prototyping", level: 86 },
      ],
    },
    {
      icon: Server,
      title: "Backend",
      skills: [
        { name: "FastAPI", level: 88 },
        { name: "API Integration", level: 90 },
        { name: "Database Design", level: 82 },
        { name: "PostgreSQL", level: 80 },
      ],
    },
    {
      icon: Wrench,
      title: "Tools",
      skills: [
        { name: "Git & GitHub", level: 89 },
        { name: "VS Code", level: 92 },
        { name: "Docker", level: 78 },
        { name: "Vercel", level: 85 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            A comprehensive toolkit for building innovative AI solutions and beautiful user experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="glass-card p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                style={{
                  animationDelay: `${categoryIndex * 0.1}s`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-foreground/50">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${(categoryIndex * 0.1 + skillIndex * 0.05)}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
