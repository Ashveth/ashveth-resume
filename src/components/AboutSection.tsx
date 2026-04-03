import { Award, BookOpen, Code } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { motion } from "framer-motion";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 6, scale: 1.02 });
  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden ambient-glow">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.p variants={fadeSlide} className="text-sm tracking-[0.2em] uppercase text-primary mb-4">About</motion.p>
            <motion.h2 variants={fadeSlide} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.div variants={fadeSlide} className="section-divider mb-6" />
          </motion.div>

          <TiltCard className="glass-card p-8 md:p-12 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-6"
            >
              <motion.div variants={fadeSlide} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-semibold mb-4 tracking-tight">Ashveth Maruti Pawar</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    I'm a passionate tech enthusiast and second-year Computer Engineering student 
                    at MGM College of Engineering & Technology, Navi Mumbai. I thrive 
                    on solving real-world problems through AI, full-stack development, and creative digital tools.
                  </p>
                </div>
              </motion.div>
              <motion.p variants={fadeSlide} className="text-foreground/70 leading-relaxed pl-[60px]">
                My journey spans building 10+ AI-powered projects, winning hackathons like Grizzly Hacks (1st place) and Smart India AI Agent Hackathon, 
                and founding <a href="https://www.pdfsizefix.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">PdfSizeFix</a> — a free all-in-one online utility platform. I believe in building tools that are simple, accessible, and impactful.
              </motion.p>
            </motion.div>
          </TiltCard>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Award, title: "Hackathon Champion", desc: "1st place at Grizzly Hacks, Hack-Earth 2026 Finalist, 12+ hackathon certificates worldwide" },
              { icon: Code, title: "Builder & Innovator", desc: "10+ AI projects across EdTech, HealthTech, FinTech, Defense AI & Civic Tech with live deployments" },
              { icon: BookOpen, title: "Founder & Student", desc: "Founder of PdfSizeFix, B.Tech Computer Engineering at MGMCET" },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeSlide}>
                <TiltCard className="glass-card-hover p-6 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-display font-semibold mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
