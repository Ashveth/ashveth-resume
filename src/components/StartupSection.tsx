import { Button } from "@/components/ui/button";
import { Rocket, ExternalLink, FileText } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { motion } from "framer-motion";

const startups = [
  {
    icon: FileText,
    name: "PdfSizeFix",
    role: "Founder · All-in-One Online Tools",
    description:
      "PdfSizeFix is a free, privacy-focused utility platform offering PDF tools, calculators, AI-powered features, and more — designed with modern UI, speed, and simplicity so anyone can compress, merge, convert, and calculate without signup.",
    link: "https://www.pdfsizefix.in/",
    linkLabel: "Visit PdfSizeFix",
    gradient: "from-blue-500 to-cyan-400",
  },
];

const StartupCard = ({ startup, index }: { startup: typeof startups[0]; index: number }) => {
  const tiltRef = use3DTilt({ maxTilt: 4, scale: 1.01 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 5, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: "1200px" }}
    >
      <div ref={tiltRef} className="glass-card-hover p-8 md:p-12 relative overflow-hidden group" style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${startup.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              <startup.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold gradient-text tracking-tight">{startup.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{startup.role}</p>
            </div>
          </div>
          <p className="text-foreground/70 leading-relaxed mb-8 max-w-3xl">{startup.description}</p>
          <Button asChild size="lg" className="rounded-full px-8 group/btn hover:scale-105 transition-transform duration-300">
            <a href={startup.link} target="_blank" rel="noopener noreferrer">
              {startup.linkLabel}
              <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:rotate-12 transition-transform duration-300" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const StartupSection = () => {
  return (
    <section id="startup" className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Ventures</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            My <span className="gradient-text">Startups</span>
          </h2>
          <div className="section-divider mb-6" />
        </motion.div>
        {startups.map((startup, i) => (
          <StartupCard key={startup.name} startup={startup} index={i} />
        ))}
      </div>
    </section>
  );
};

export default StartupSection;
