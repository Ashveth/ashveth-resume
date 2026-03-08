import { ExternalLink, Sprout, BookOpen, Home, Heart, Scale, Plane, Stethoscope } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { motion } from "framer-motion";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 8, scale: 1.03 });
  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 8, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ProjectsSection = () => {
  const projects = [
    { icon: Sprout, name: "KrishiMitra AI", tagline: "Farmer's Smart Assistant", url: "https://lnkd.in/eXxp2fNF", gradient: "from-green-500 to-emerald-600" },
    { icon: BookOpen, name: "EduMate AI", tagline: "Study Buddy for Learners", url: "https://lnkd.in/evDPegaP", gradient: "from-blue-500 to-cyan-600" },
    { icon: Home, name: "RoomieGenie AI", tagline: "Find PGs/houses + bargain like a pro", url: "https://lnkd.in/eFNADrxN", gradient: "from-orange-500 to-red-600" },
    { icon: Heart, name: "WellCare AI", tagline: "Wellness & Healthcare Guide", url: "https://lnkd.in/ei_xJJ7R", gradient: "from-pink-500 to-rose-600" },
    { icon: Scale, name: "LexiAssist AI", tagline: "Simple Legal Help", url: "https://lnkd.in/e_R2qkAv", gradient: "from-indigo-500 to-purple-600" },
    { icon: Plane, name: "TripGenie AI", tagline: "AI-powered Travel Planner", url: "https://lnkd.in/eAAUGUq2", gradient: "from-teal-500 to-green-600" },
    { icon: Stethoscope, name: "AI HealthMate", tagline: "Multilingual Health AI Assistant", url: "https://health-mate-multilingual.vercel.app/", gradient: "from-emerald-500 to-teal-600" },
  ];

  return (
    <section id="projects" className="py-32 relative overflow-hidden ambient-glow">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            AI <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Building intelligent solutions for real-world problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ perspective: "1200px" }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
            >
              <TiltCard>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass-card-hover p-8 group cursor-pointer h-full"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}>
                    <project.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">{project.tagline}</p>

                  <div className="flex items-center text-primary text-sm font-medium group-hover:text-accent transition-colors duration-300">
                    <span className="mr-2 story-link">View Project</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
