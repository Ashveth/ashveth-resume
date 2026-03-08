import { useEffect, useRef } from "react";
import { Award, BookOpen, Code } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import professionalPhoto from "@/assets/ashveth-professional.jpg";
import streetPhoto from "@/assets/ashveth-street.jpg";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 6, scale: 1.02 });
  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".section-reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden ambient-glow">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal-fade text-center mb-20">
            <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">About</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="section-divider mb-6" />
          </div>

          <TiltCard className="reveal-scale glass-card p-8 md:p-12 mb-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold mb-4 tracking-tight">Ashveth Maruti Pawar</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      I'm a passionate tech enthusiast and second-year Computer Engineering student 
                      at Mahatma Gandhi Mission College of Engineering, Navi Mumbai. I thrive 
                      on solving real-world problems through AI, product design, and creative coding.
                    </p>
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed pl-[60px]">
                  My journey includes building AI agents, developing UX-focused platforms, and co-founding a startup 
                  that helps creators with websites and content. I aim to use technology to build human-centered, 
                  impactful solutions.
                </p>
              </div>

              <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
                <div className="relative group overflow-hidden rounded-3xl">
                  <img 
                    src={professionalPhoto} 
                    alt="Ashveth Pawar - Professional" 
                    className="w-full h-full object-cover aspect-[3/4] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative group overflow-hidden rounded-3xl mt-6">
                  <img 
                    src={streetPhoto} 
                    alt="Ashveth Pawar - Street" 
                    className="w-full h-full object-cover aspect-[3/4] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </TiltCard>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Hackathon Winner", desc: "Winner of Smart India AI Agent Hackathon 2025 and multiple competitions", cls: "reveal-left" },
              { icon: Code, title: "AI Innovator", desc: "Built 6+ AI agents solving real-world problems in agriculture, education, and healthcare", cls: "section-reveal" },
              { icon: BookOpen, title: "Student & Entrepreneur", desc: "B.Tech in Computer Engineering, Co-founder at Curloft", cls: "reveal-right" },
            ].map((item, i) => (
              <TiltCard key={item.title} className={`${item.cls} glass-card-hover p-6`} >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-display font-semibold mb-2 tracking-tight">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
