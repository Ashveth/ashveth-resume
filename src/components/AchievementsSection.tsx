import { useEffect, useRef } from "react";
import { Trophy, Award, Users, Film } from "lucide-react";

const AchievementsSection = () => {
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

  const achievements = [
    {
      icon: Trophy,
      title: "Winner – Smart India AI Agent Hackathon 2025",
      organization: "AshnaAI",
      description:
        "Last week, I had the incredible honor of emerging as a Winner of the AshnaAI Smart India AI Agent Hackathon 2025! This journey gave me the chance to solve real-world AI problems using agentic AI concepts, collaborate with brilliant peers, and sharpen my innovation and problem-solving skills at the highest level.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      icon: Users,
      title: "Participant – Smart India Hackathon 2025",
      organization: "Smart India Hackathon",
      description:
        "Developed HealthMate Multilingual - A comprehensive healthcare solution enabling multilingual communication for better patient care.",
      links: [
        { label: "Live Demo", url: "https://health-mate-multilingual.vercel.app/" },
        { label: "GitHub", url: "https://github.com/Ashveth/health-mate-multilingual" },
        { label: "Demo Video", url: "https://youtu.be/r8ME_kwBRlQ?si=BtZWaLqPn2xKErs3" },
      ],
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      icon: Award,
      title: "Certificate of Excellence – UXccelerate VibeHack 2025",
      organization: "VibeHack 2025",
      description:
        "Developed Stayhub – Find your stay, your way. Focused on user-centric design, API integration (FastAPI), and business logic during VibeHack 2025 using UXccelerate.ai.",
      links: [{ label: "Project Link", url: "https://lnkd.in/edbBPQip" }],
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      icon: Film,
      title: "Attendee – LocalHost AI Film Festival 2025",
      organization: "LocalHost",
      description:
        "Visited the AI Film Festival organized by LocalHost — a 3-day event merging creativity and technology. Heard insights from renowned creators and industry experts like Tanmay Bhat, Kunal Kapoor, and Shakun Batra.",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
    },
  ];

  return (
    <section id="achievements" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="reveal-fade text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="reveal-scale glass-card p-8 hover:scale-[1.02] transition-all duration-500 group"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`w-16 h-16 rounded-2xl ${achievement.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                </div>

                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-sm text-primary font-medium">{achievement.organization}</span>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-4">{achievement.title}</h3>
                  <p className="text-foreground/80 leading-relaxed mb-4">{achievement.description}</p>

                  {achievement.links && achievement.links.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {achievement.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-accent transition-colors duration-300 underline underline-offset-4"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
