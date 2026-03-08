import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { use3DTilt } from "@/hooks/use3DTilt";
import smartIndiaCert from "@/assets/smart-india-certificate.png";
import uxcelerateCert from "@/assets/uxccelerate-certificate.png";
import filmFestivalMenu from "@/assets/film-festival-menu.png";
import filmFestivalPanel from "@/assets/film-festival-panel.png";
import buildathonCert from "@/assets/buildathon-certificate.png";
import pdfsizefixHero from "@/assets/pdfsizefix-hero.png";
import pdfsizefixTools from "@/assets/pdfsizefix-tools.png";
import pdfsizefixAbout from "@/assets/pdfsizefix-about.png";
import pdfsizefixHumanizer from "@/assets/pdfsizefix-humanizer.png";

const galleryItems = [
  { id: 1, src: smartIndiaCert, title: "Smart India AI Agent Hackathon 2025", category: "Winner Certificate", description: "Certificate of Participation - Smart India AI Agent Hackathon organized by AshnaAI" },
  { id: 2, src: uxcelerateCert, title: "UXccelerate VibeHack 2025", category: "Certificate of Excellence", description: "Stayhub Project - User-centric design and innovation" },
  { id: 3, src: filmFestivalMenu, title: "LocalHost AI Film Festival 2025", category: "Event Attendance", description: "3-day AI Film Festival merging creativity and technology" },
  { id: 4, src: filmFestivalPanel, title: "Panel Discussion", category: "Film Festival", description: "Industry experts panel at LocalHost AI Film Festival" },
  { id: 5, src: buildathonCert, title: "Build-a-thon Hackathon 2025", category: "Certificate of Participation", description: "Successfully participated in the annual Build-a-thon Hackathon held from November 7 to 10, 2025" },
  { id: 6, src: pdfsizefixHero, title: "PdfSizeFix — Homepage", category: "Startup", description: "All-in-One Online Tools platform with PDF tools, calculators, AI features & more" },
  { id: 7, src: pdfsizefixTools, title: "PdfSizeFix — Tools Overview", category: "Startup", description: "Comprehensive suite of PDF tools, calculators, utilities, AI tools & games" },
  { id: 8, src: pdfsizefixAbout, title: "PdfSizeFix — About the Creator", category: "Startup", description: "About section showcasing the founder and mission behind PdfSizeFix" },
  { id: 9, src: pdfsizefixHumanizer, title: "PdfSizeFix — AI Humanizer", category: "Startup", description: "AI Text to Human Converter — convert AI-generated text into natural writing" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null) setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1);
  };
  const handleNext = () => {
    if (selectedImage !== null) setSelectedImage(selectedImage === galleryItems.length - 1 ? 0 : selectedImage + 1);
  };

  return (
    <section id="gallery" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Moments</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text">Gallery</h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A visual journey through achievements, hackathons, and memorable moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1200px" }}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
            >
              <TiltImage>
                <div
                  className="group relative overflow-hidden rounded-3xl cursor-pointer glass-card"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">{item.category}</p>
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              </TiltImage>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <Dialog open onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/20 rounded-3xl">
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-105">
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full flex items-center justify-center p-8">
                <button onClick={(e) => { e.stopPropagation(); handlePrevious(); }} className="absolute left-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110">
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col items-center justify-center max-h-full"
                >
                  <img src={galleryItems[selectedImage].src} alt={galleryItems[selectedImage].title} className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-xl" />
                  <div className="mt-6 text-center">
                    <p className="text-sm text-primary font-semibold mb-2">{galleryItems[selectedImage].category}</p>
                    <h3 className="text-2xl font-bold mb-2">{galleryItems[selectedImage].title}</h3>
                    <p className="text-muted-foreground">{galleryItems[selectedImage].description}</p>
                  </div>
                </motion.div>

                <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110">
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {galleryItems.map((_, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)} className={`h-1.5 rounded-full transition-all ${index === selectedImage ? "bg-primary w-8" : "bg-muted-foreground/30 w-1.5"}`} />
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

export default GallerySection;
