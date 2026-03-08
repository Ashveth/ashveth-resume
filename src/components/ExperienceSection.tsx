import { useState } from "react";
import { Briefcase, Code, FileText, ExternalLink, Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import pdfsizefixHero from "@/assets/pdfsizefix-hero.png";
import pdfsizefixTools from "@/assets/pdfsizefix-tools.png";
import pdfsizefixAbout from "@/assets/pdfsizefix-about.png";
import pdfsizefixHumanizer from "@/assets/pdfsizefix-humanizer.png";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 4, scale: 1.01 });
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
};

const cardVariants = {
  hidden: { opacity: 0, x: -60, rotateY: 5 },
  visible: (i: number) => ({
    opacity: 1, x: 0, rotateY: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

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
    icon: Briefcase, title: "Co-founder", company: "Curloft", period: "Aug 2024 – Present",
    description: "Building websites, blogs, and content for creators and small businesses. Leading product design and development.",
    color: "text-purple-400", bgColor: "bg-purple-400/10",
    link: "https://curloft.com/",
  },
  {
    icon: Code, title: "Student Developer", company: "Mahatma Gandhi Mission's College of Engineering and Technology", period: "2024 – Present",
    description: "Pursuing B.Tech in Computer Engineering. Active in hackathons, AI projects, and technical communities.",
    color: "text-blue-400", bgColor: "bg-blue-400/10",
  },
];

const ExperienceSection = () => {
  const [photoViewer, setPhotoViewer] = useState<{ photos: { src: string; title: string }[]; index: number } | null>(null);

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

        <div className="max-w-4xl mx-auto space-y-6" style={{ perspective: "1200px" }}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
            >
              <TiltCard className="glass-card-hover p-6 md:p-8 group">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${exp.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <exp.icon className={`w-7 h-7 ${exp.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="text-xl font-display font-semibold tracking-tight">{exp.title}</h3>
                      <span className="text-xs text-primary font-medium tracking-wide">{exp.period}</span>
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
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full group/btn"
                            onClick={() => setPhotoViewer({ photos: exp.photos!, index: 0 })}
                          >
                            <Image className="w-3.5 h-3.5 mr-2 group-hover/btn:scale-110 transition-transform" />
                            See Photos ({exp.photos.length})
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Viewer Lightbox */}
      <AnimatePresence>
        {photoViewer && (
          <Dialog open onOpenChange={() => setPhotoViewer(null)}>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/20 rounded-3xl">
              <button onClick={() => setPhotoViewer(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-105">
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full flex items-center justify-center p-8">
                <button
                  onClick={(e) => { e.stopPropagation(); setPhotoViewer({ ...photoViewer, index: photoViewer.index === 0 ? photoViewer.photos.length - 1 : photoViewer.index - 1 }); }}
                  className="absolute left-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.div
                  key={photoViewer.index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center max-h-full"
                >
                  <img
                    src={photoViewer.photos[photoViewer.index].src}
                    alt={photoViewer.photos[photoViewer.index].title}
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-xl"
                  />
                  <p className="mt-4 text-lg font-display font-semibold">{photoViewer.photos[photoViewer.index].title}</p>
                </motion.div>

                <button
                  onClick={(e) => { e.stopPropagation(); setPhotoViewer({ ...photoViewer, index: photoViewer.index === photoViewer.photos.length - 1 ? 0 : photoViewer.index + 1 }); }}
                  className="absolute right-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {photoViewer.photos.map((_, i) => (
                    <button key={i} onClick={() => setPhotoViewer({ ...photoViewer, index: i })} className={`h-1.5 rounded-full transition-all ${i === photoViewer.index ? "bg-primary w-8" : "bg-muted-foreground/30 w-1.5"}`} />
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;