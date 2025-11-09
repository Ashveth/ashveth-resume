import { useEffect, useRef } from "react";
import { Award, BookOpen, Code } from "lucide-react";
import professionalPhoto from "@/assets/ashveth-professional.jpg";
import streetPhoto from "@/assets/ashveth-street.jpg";

const AboutSection = () => {
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

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal-fade text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="reveal-scale glass-card p-8 md:p-12 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div className="order-2 md:order-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold mb-4">Ashveth Maruti Pawar</h3>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      I'm Ashveth Pawar, a passionate tech enthusiast and second-year Computer Engineering student 
                      at Mahatma Gandhi Mission College of Engineering, Navi Mumbai (University of Mumbai). I thrive 
                      on solving real-world problems through AI, product design, and creative coding.
                    </p>
                  </div>
                </div>

                <p className="text-lg text-foreground/80 leading-relaxed">
                  My journey includes building AI agents, developing UX-focused platforms, and co-founding a startup 
                  that helps creators with websites and content. I aim to use technology to build human-centered, 
                  impactful solutions that make a real difference in people's lives.
                </p>
              </div>

              <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
                <div className="relative group overflow-hidden rounded-2xl">
                  <img 
                    src={professionalPhoto} 
                    alt="Ashveth Pawar - Professional" 
                    className="w-full h-full object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                  <img 
                    src={streetPhoto} 
                    alt="Ashveth Pawar - Street" 
                    className="w-full h-full object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="reveal-left glass-card p-6 hover:scale-105 transition-transform duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-xl font-display font-semibold mb-2">Hackathon Winner</h4>
              <p className="text-foreground/70">
                Winner of Smart India AI Agent Hackathon 2025 and multiple other competitions
              </p>
            </div>

            <div className="section-reveal glass-card p-6 hover:scale-105 transition-transform duration-300 group" style={{ transitionDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Code className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-xl font-display font-semibold mb-2">AI Innovator</h4>
              <p className="text-foreground/70">
                Built 6+ AI agents solving real-world problems in agriculture, education, and healthcare
              </p>
            </div>

            <div className="reveal-right glass-card p-6 hover:scale-105 transition-transform duration-300 group" style={{ transitionDelay: "0.2s" }}>
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-xl font-display font-semibold mb-2">Student & Entrepreneur</h4>
              <p className="text-foreground/70">
                B.Tech in Computer Engineering, Co-founder at Curloft
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
