import { useEffect, useRef } from "react";
import { Briefcase, Code } from "lucide-react";

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".section-reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      icon: Briefcase,
      title: "Co-founder",
      company: "Curloft",
      period: "Aug 2024 – Present",
      description:
        "Building websites, blogs, and content for creators and small businesses. Leading product design and development.",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      icon: Code,
      title: "Student Developer",
      company: "Mahatma Gandhi Mission's College of Engineering and Technology",
      period: "2024 – Present",
      description:
        "Pursuing B.Tech in Computer Engineering. Active in hackathons, AI projects, and technical communities.",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="reveal-fade text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="reveal-left glass-card p-8 hover:scale-[1.02] transition-all duration-500 group"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`w-16 h-16 rounded-2xl ${exp.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <exp.icon className={`w-8 h-8 ${exp.color}`} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-2xl font-display font-semibold">{exp.title}</h3>
                    <span className="text-sm text-primary font-medium mt-1 md:mt-0">{exp.period}</span>
                  </div>
                  <h4 className="text-lg text-foreground/80 font-medium mb-3">{exp.company}</h4>
                  <p className="text-foreground/70 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
