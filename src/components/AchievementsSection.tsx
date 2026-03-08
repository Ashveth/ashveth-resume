import { Trophy, Award, Users, Film } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { motion } from "framer-motion";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 4, scale: 1.01 });
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const AchievementsSection = () => {
  const achievements = [
    { icon: Trophy, title: "Winner – Smart India AI Agent Hackathon 2025", organization: "AshnaAI", description: "Emerged as Winner by solving real-world AI problems using agentic AI concepts.", color: "text-yellow-400", bgColor: "bg-yellow-400/10" },
    { icon: Trophy, title: "Certificate of Participation – Build-a-thon 2025", organization: "The Buildathon Foundation", description: "Successfully participated in the Build-a-thon Hackathon held from November 7–10, 2025.", links: [{ label: "Verify Certificate", url: "https://verification.givemycertificate.com/vibe012a29-328d-40ed-b9b4-0746d91c1443" }], color: "text-cyan-400", bgColor: "bg-cyan-400/10" },
    { icon: Users, title: "Participant – Smart India Hackathon 2025", organization: "Smart India Hackathon", description: "Developed HealthMate Multilingual – A comprehensive healthcare solution.", links: [{ label: "Live Demo", url: "https://health-mate-multilingual.vercel.app/" }, { label: "GitHub", url: "https://github.com/Ashveth/health-mate-multilingual" }, { label: "Demo Video", url: "https://youtu.be/r8ME_kwBRlQ?si=BtZWaLqPn2xKErs3" }], color: "text-blue-400", bgColor: "bg-blue-400/10" },
    { icon: Award, title: "Certificate of Excellence – UXccelerate VibeHack 2025", organization: "VibeHack 2025", description: "Developed Stayhub – Find your stay, your way.", links: [{ label: "Project Link", url: "https://lnkd.in/edbBPQip" }], color: "text-purple-400", bgColor: "bg-purple-400/10" },
    { icon: Film, title: "Attendee – LocalHost AI Film Festival 2025", organization: "LocalHost", description: "3-day event merging creativity and technology with insights from industry leaders.", color: "text-pink-400", bgColor: "bg-pink-400/10" },
  ];

  return (
    <section id="achievements" className="py-32 relative overflow-hidden ambient-glow">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Recognition</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            <span className="gradient-text">Achievements</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6" style={{ perspective: "1200px" }}>
          {achievements.map((a, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
            >
              <TiltCard className="glass-card-hover p-8 group">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${a.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <a.icon className={`w-7 h-7 ${a.color}`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-primary font-medium tracking-wide">{a.organization}</span>
                    <h3 className="text-xl font-display font-semibold mt-1 mb-3 tracking-tight">{a.title}</h3>
                    <p className="text-foreground/60 leading-relaxed text-sm mb-3">{a.description}</p>
                    {a.links && (
                      <div className="flex flex-wrap gap-3">
                        {a.links.map((link, li) => (
                          <a key={li} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-accent transition-colors duration-300 story-link">
                            {link.label} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
