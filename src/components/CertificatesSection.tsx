import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, ExternalLink, Eye } from "lucide-react";
import smartIndiaCert from "@/assets/smart-india-certificate.png";
import uxcelerateCert from "@/assets/uxccelerate-certificate.png";
import buildathonCert from "@/assets/buildathon-certificate.png";

const certificates = [
  {
    id: 1,
    title: "Smart India AI Agent Hackathon 2025",
    organization: "AshnaAI",
    date: "2025",
    image: smartIndiaCert,
    description: "Winner – Solved real-world AI problems using agentic AI concepts.",
  },
  {
    id: 2,
    title: "UXccelerate VibeHack 2025",
    organization: "VibeHack 2025",
    date: "2025",
    image: uxcelerateCert,
    description: "Certificate of Excellence — Stayhub, user-centric design & innovation.",
    verifyUrl: "https://lnkd.in/edbBPQip",
  },
  {
    id: 3,
    title: "Build-a-thon Hackathon 2025",
    organization: "The Buildathon Foundation",
    date: "November 2025",
    image: buildathonCert,
    description: "Certificate of Participation — Nov 7–10, 2025.",
    verifyUrl: "https://verification.givemycertificate.com/vibe012a29-328d-40ed-b9b4-0746d91c1443",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const navigate = (dir: 1 | -1) => {
    if (selectedCert === null) return;
    setSelectedCert((selectedCert + dir + certificates.length) % certificates.length);
  };

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
            Recognition
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 gradient-text">
            Certificates
          </h2>
          <div className="w-16 h-[2px] bg-primary/40 mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Credentials earned through hackathons and continuous learning.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              custom={i}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative rounded-3xl overflow-hidden bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/[0.08] transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedCert(i)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <Eye className="w-4 h-4" />
                    View
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-primary tracking-wide uppercase">
                    {cert.organization}
                  </span>
                  <span className="text-muted-foreground">{cert.date}</span>
                </div>

                <h3 className="text-base font-semibold text-foreground leading-snug tracking-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {cert.description}
                </p>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-300 pt-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Verify
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert !== null && (
          <Dialog open onOpenChange={() => setSelectedCert(null)}>
            <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0 bg-background/80 backdrop-blur-2xl border-border/30 rounded-3xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 z-50 p-2 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative flex flex-col items-center justify-center p-6 md:p-12 min-h-[60vh]">
                {/* Nav buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all duration-200 hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <motion.div
                  key={selectedCert}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col items-center gap-6 max-w-full"
                >
                  <img
                    src={certificates[selectedCert].image}
                    alt={certificates[selectedCert].title}
                    className="max-w-full max-h-[55vh] object-contain rounded-2xl shadow-xl"
                  />
                  <div className="text-center space-y-2">
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary">
                      {certificates[selectedCert].organization} · {certificates[selectedCert].date}
                    </p>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                      {certificates[selectedCert].title}
                    </h3>
                    {certificates[selectedCert].verifyUrl && (
                      <a
                        href={certificates[selectedCert].verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors duration-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Verify Certificate
                      </a>
                    )}
                  </div>
                </motion.div>

                <button
                  onClick={(e) => { e.stopPropagation(); navigate(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all duration-200 hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  {certificates.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCert(i)}
                      className={`h-1.5 rounded-full transition-all duration-400 ${
                        i === selectedCert
                          ? "bg-primary w-6"
                          : "bg-muted-foreground/25 w-1.5 hover:bg-muted-foreground/40"
                      }`}
                    />
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

export default CertificatesSection;
