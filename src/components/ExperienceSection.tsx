import { useState } from "react";
import { Briefcase, Code, FileText, ExternalLink, Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRef } from "react";
import pdfsizefixHero from "@/assets/pdfsizefix-hero.png";
import pdfsizefixTools from "@/assets/pdfsizefix-tools.png";
import pdfsizefixAbout from "@/assets/pdfsizefix-about.png";
import pdfsizefixHumanizer from "@/assets/pdfsizefix-humanizer.png";

interface Experience {
  icon: React.ElementType;
  title: string;
  company: string;
  period: string;
  description: string;
  color: string;
  bgColor: string;
  link?: string;
  photos?: { src: string; title: string }[];
}

const experiences: Experience[] = [
  {
    icon: FileText, title: "Founder", company: "PdfSizeFix", period: "2024 – Present",
    description: "Built a free, privacy-focused all-in-one online utility platform with PDF tools, calculators, AI-powered features, and more — serving users worldwide with no signup required.",
    color: "text-cyan-400", bgColor: "bg-cyan-400/10",
    link: "https://www.pdfsizefix.in/",
    photos: [
      { src: pdfsizefixHero, title: "PdfSizeFix — Homepage" },
      { src: pdfsizefixTools, title: "PdfSizeFix — Tools Overview" },
      { src: pdfsizefixAbout, title: "PdfSizeFix — About the Creator" },
      { src: pdfsizefixHumanizer, title: "PdfSizeFix — AI Humanizer" },
    ],
  },
  {
    icon: Code, title: "Student Developer", company: "MGM's College of Engineering and Technology", period: "2024 – Present",
    description: "Pursuing B.Tech in Computer Engineering. Active in hackathons, AI projects, and technical communities.",
    color: "text-blue-400", bgColor: "bg-blue-400/10",
  },
];

const TimelineNode = ({ exp, index, isLast }: { exp: Experience; index: number; isLast: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Timeline line & dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
          className="relative z-10"
        >
          <div className={`w-12 h-12 rounded-2xl ${exp.bgColor} flex items-center justify-center border border-border/30 shadow-lg`}>
            <exp.icon className={`w-5 h-5 ${exp.color}`} />
          </div>
          {/* Pulse ring */}
          <motion.div
            className={`absolute inset-0 rounded-2xl ${exp.bgColor} -z-10`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />
        </motion.div>
        {/* Connecting line */}
        {!isLast && (
          <div className="relative w-[2px] flex-1 min-h-[40px] bg-border/20 mt-3">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/60 to-primary/10 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-card-hover p-6 md:p-8 flex-1 mb-8 group"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <h3 className="text-xl font-display font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
            {exp.title}
          </h3>
          <span className="text-xs text-primary font-medium tracking-wide whitespace-nowrap px-3 py-1 rounded-full bg-primary/10">
            {exp.period}
          </span>
        </div>
        <h4 className="text-sm text-muted-foreground font-medium mb-3">{exp.company}</h4>
        <p className="text-foreground/60 leading-relaxed text-sm mb-4">{exp.description}</p>

        {(exp.link || exp.photos) && (
          <div className="flex flex-wrap gap-3">
            {exp.link && (
              <Button asChild size="sm" variant="outline" className="rounded-full group/btn">
                <a href={exp.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-2 group-hover/btn:rotate-12 transition-transform" />
                  Open Website
                </a>
              </Button>
            )}
            {exp.photos && exp.photos.length > 0 && (
              <PhotoViewerButton photos={exp.photos} />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const PhotoViewerButton = ({ photos }: { photos: { src: string; title: string }[] }) => {
  const [viewer, setViewer] = useState<number | null>(null);
  return (
    <>
      <Button
        size="sm" variant="outline" className="rounded-full group/btn"
        onClick={() => setViewer(0)}
      >
        <Image className="w-3.5 h-3.5 mr-2 group-hover/btn:scale-110 transition-transform" />
        See Photos ({photos.length})
      </Button>
      <AnimatePresence>
        {viewer !== null && (
          <Dialog open onOpenChange={() => setViewer(null)}>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/20 rounded-3xl">
              <button onClick={() => setViewer(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-105">
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <button
                  onClick={(e) => { e.stopPropagation(); setViewer(viewer === 0 ? photos.length - 1 : viewer - 1); }}
                  className="absolute left-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <motion.div key={viewer} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className="flex flex-col items-center justify-center max-h-full">
                  <img src={photos[viewer].src} alt={photos[viewer].title} className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-xl" />
                  <p className="mt-4 text-lg font-display font-semibold">{photos[viewer].title}</p>
                </motion.div>
                <button
                  onClick={(e) => { e.stopPropagation(); setViewer(viewer === photos.length - 1 ? 0 : viewer + 1); }}
                  className="absolute right-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {photos.map((_, i) => (
                    <button key={i} onClick={() => setViewer(i)} className={`h-1.5 rounded-full transition-all ${i === viewer ? "bg-primary w-8" : "bg-muted-foreground/30 w-1.5"}`} />
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Career</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="max-w-3xl mx-auto pl-2 md:pl-0">
          {experiences.map((exp, index) => (
            <TimelineNode key={index} exp={exp} index={index} isLast={index === experiences.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
