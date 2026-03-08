import { useEffect, useRef } from "react";
import { Briefcase, Code } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 4, scale: 1.01 });
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("active"); });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal-left, .reveal-fade");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const experiences = [
    { icon: Briefcase, title: "Co-founder", company: "Curloft", period: "Aug 2024 – Present", description: "Building websites, blogs, and content for creators and small businesses. Leading product design and development.", color: "text-purple-400", bgColor: "bg-purple-400/10" },
    { icon: Code, title: "Student Developer", company: "Mahatma Gandhi Mission's College of Engineering and Technology", period: "2024 – Present", description: "Pursuing B.Tech in Computer Engineering. Active in hackathons, AI projects, and technical communities.", color: "text-blue-400", bgColor: "bg-blue-400/10" },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <div className="reveal-fade text-center mb-20">
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Career</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <TiltCard key={index} className="reveal-left glass-card-hover p-6 md:p-8 group">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className={`w-14 h-14 rounded-2xl ${exp.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                  <exp.icon className={`w-7 h-7 ${exp.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-display font-semibold tracking-tight">{exp.title}</h3>
                    <span className="text-xs text-primary font-medium tracking-wide">{exp.period}</span>
                  </div>
                  <h4 className="text-sm text-muted-foreground font-medium mb-3">{exp.company}</h4>
                  <p className="text-foreground/60 leading-relaxed text-sm">{exp.description}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
