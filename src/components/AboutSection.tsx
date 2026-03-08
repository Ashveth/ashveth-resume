import { useRef } from "react";
import { Award, BookOpen, Code } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { motion, useScroll, useTransform } from "framer-motion";
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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const AboutSection = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

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
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="order-2 md:order-1 space-y-6"
              >
                <motion.div variants={fadeSlide} className="flex items-start gap-4">
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
                </motion.div>
                <motion.p variants={fadeSlide} className="text-foreground/70 leading-relaxed pl-[60px]">
                  My journey includes building AI agents, developing UX-focused platforms, and co-founding a startup 
                  that helps creators with websites and content. I aim to use technology to build human-centered, 
                  impactful solutions.
                </motion.p>
              </motion.div>

              <motion.div ref={imgRef} style={{ y: imgY, scale: imgScale }} className="order-1 md:order-2 grid grid-cols-2 gap-4">
                <div className="relative group overflow-hidden rounded-3xl">
                  <img 
                    src={professionalPhoto} 
                    alt="Ashveth Pawar - Professional" 
                    className="w-full h-full object-cover aspect-[3/4] transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative group overflow-hidden rounded-3xl mt-6">
                  <img 
                    src={streetPhoto} 
                    alt="Ashveth Pawar - Street" 
                    className="w-full h-full object-cover aspect-[3/4] transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            </div>
          </TiltCard>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Award, title: "Hackathon Winner", desc: "Winner of Smart India AI Agent Hackathon 2025 and multiple competitions" },
              { icon: Code, title: "AI Innovator", desc: "Built 6+ AI agents solving real-world problems in agriculture, education, and healthcare" },
              { icon: BookOpen, title: "Student & Entrepreneur", desc: "B.Tech in Computer Engineering, Co-founder at Curloft" },
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
