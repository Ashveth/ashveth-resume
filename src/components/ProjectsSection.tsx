import { useEffect, useRef } from "react";
import { ExternalLink, Sprout, BookOpen, Home, Heart, Scale, Plane } from "lucide-react";

const ProjectsSection = () => {
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

    const elements = sectionRef.current?.querySelectorAll(".section-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      icon: Sprout,
      name: "KrishiMitra AI",
      tagline: "Farmer's Smart Assistant",
      url: "https://lnkd.in/eXxp2fNF",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: BookOpen,
      name: "EduMate AI",
      tagline: "Study Buddy for Learners",
      url: "https://lnkd.in/evDPegaP",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Home,
      name: "RoomieGenie AI",
      tagline: "Find PGs/houses + bargain like a pro",
      url: "https://lnkd.in/eFNADrxN",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Heart,
      name: "WellCare AI",
      tagline: "Wellness & Healthcare Guide",
      url: "https://lnkd.in/ei_xJJ7R",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: Scale,
      name: "LexiAssist AI",
      tagline: "Simple Legal Help",
      url: "https://lnkd.in/e_R2qkAv",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: Plane,
      name: "TripGenie AI",
      tagline: "AI-powered Travel Planner",
      url: "https://lnkd.in/eAAUGUq2",
      gradient: "from-teal-500 to-green-600",
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="section-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            AI <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Building intelligent solutions for real-world problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="section-reveal glass-card p-8 group hover:scale-105 transition-all duration-500 cursor-pointer"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <project.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-foreground/70 mb-6">{project.tagline}</p>

              <div className="flex items-center text-primary group-hover:text-accent transition-colors">
                <span className="text-sm font-medium mr-2">View Project</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
