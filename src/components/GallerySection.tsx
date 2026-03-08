import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, ArrowLeft, FolderOpen, Image } from "lucide-react";
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
import pdfsizefixScholarships from "@/assets/pdfsizefix-scholarships.png";
import pdfsizefixDeadlines from "@/assets/pdfsizefix-deadlines.png";
import pdfsizefixBlog from "@/assets/pdfsizefix-blog.png";
import pdfsizefixFooter from "@/assets/pdfsizefix-footer.png";

const TiltImage = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 6, scale: 1.02 });
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
};

interface GalleryPhoto {
  src: string;
  title: string;
  description: string;
}

interface Album {
  id: string;
  name: string;
  cover: string;
  description: string;
  color: string;
  photos: GalleryPhoto[];
}

const albums: Album[] = [
  {
    id: "pdfsizefix",
    name: "PdfSizeFix",
    cover: pdfsizefixHero,
    description: "Screenshots from the PdfSizeFix platform",
    color: "text-cyan-400",
    photos: [
      { src: pdfsizefixHero, title: "Homepage", description: "All-in-One Online Tools — hero section with tool categories" },
      { src: pdfsizefixTools, title: "Tools Overview", description: "Full suite of PDF tools, calculators, utilities, AI tools & games" },
      { src: pdfsizefixAbout, title: "About the Creator", description: "About section showcasing the founder and mission" },
      { src: pdfsizefixHumanizer, title: "AI Humanizer", description: "AI Text to Human Converter — paste and convert AI text" },
      { src: pdfsizefixScholarships, title: "Featured Scholarships", description: "Scholarship finder with featured & fully funded scholarships" },
      { src: pdfsizefixDeadlines, title: "Latest Deadlines", description: "Upcoming scholarship deadlines from around the world" },
      { src: pdfsizefixBlog, title: "Blog", description: "Guides, tips, and tutorials for working with PDFs" },
      { src: pdfsizefixFooter, title: "Footer & Links", description: "Site footer with tool categories and quick links" },
    ],
  },
  {
    id: "achievements",
    name: "Achievements & Events",
    cover: smartIndiaCert,
    description: "Hackathons, certificates, and memorable moments",
    color: "text-purple-400",
    photos: [
      { src: smartIndiaCert, title: "Smart India AI Agent Hackathon 2025", description: "Certificate of Participation - organized by AshnaAI" },
      { src: uxcelerateCert, title: "UXccelerate VibeHack 2025", description: "Stayhub Project - User-centric design and innovation" },
      { src: filmFestivalMenu, title: "LocalHost AI Film Festival 2025", description: "3-day AI Film Festival merging creativity and technology" },
      { src: filmFestivalPanel, title: "Panel Discussion", description: "Industry experts panel at LocalHost AI Film Festival" },
      { src: buildathonCert, title: "Build-a-thon Hackathon 2025", description: "Annual Build-a-thon Hackathon, November 7–10, 2025" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const GallerySection = () => {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const currentPhotos = openAlbum?.photos ?? [];

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
            A visual journey through achievements, startups, and memorable moments
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!openAlbum ? (
            /* Album Grid */
            <motion.div
              key="albums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              style={{ perspective: "1200px" }}
            >
              {albums.map((album, index) => (
                <motion.div
                  key={album.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={cardVariants}
                >
                  <TiltImage>
                    <div
                      className="group relative overflow-hidden rounded-3xl cursor-pointer glass-card"
                      onClick={() => setOpenAlbum(album)}
                    >
                      {/* Cover with 2x2 photo grid preview */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                          {album.photos.slice(0, 4).map((photo, i) => (
                            <img
                              key={i}
                              src={photo.src}
                              alt={photo.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <FolderOpen className={`w-5 h-5 ${album.color}`} />
                          <h3 className="text-xl font-display font-bold text-foreground">{album.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Image className="w-3.5 h-3.5" />
                          <span>{album.photos.length} photos</span>
                          <span className="mx-1">·</span>
                          <span>{album.description}</span>
                        </div>
                      </div>
                    </div>
                  </TiltImage>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Album Photos View */
            <motion.div
              key={`album-${openAlbum.id}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setOpenAlbum(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 group/back transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover/back:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Albums</span>
              </button>

              <div className="flex items-center gap-3 mb-8">
                <FolderOpen className={`w-6 h-6 ${openAlbum.color}`} />
                <h3 className="text-2xl font-display font-bold">{openAlbum.name}</h3>
                <span className="text-sm text-muted-foreground">({openAlbum.photos.length} photos)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
                {openAlbum.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <TiltImage>
                      <div
                        className="group relative overflow-hidden rounded-2xl cursor-pointer glass-card"
                        onClick={() => setSelectedImage(index)}
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={photo.src}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                          <div>
                            <h4 className="text-sm font-bold text-foreground mb-1">{photo.title}</h4>
                            <p className="text-xs text-muted-foreground">{photo.description}</p>
                          </div>
                        </div>
                      </div>
                    </TiltImage>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && openAlbum && (
          <Dialog open onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/20 rounded-3xl">
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-105">
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full flex items-center justify-center p-8">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage === 0 ? currentPhotos.length - 1 : selectedImage - 1); }}
                  className="absolute left-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center max-h-full"
                >
                  <img src={currentPhotos[selectedImage].src} alt={currentPhotos[selectedImage].title} className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-xl" />
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">{currentPhotos[selectedImage].title}</h3>
                    <p className="text-muted-foreground">{currentPhotos[selectedImage].description}</p>
                  </div>
                </motion.div>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage === currentPhotos.length - 1 ? 0 : selectedImage + 1); }}
                  className="absolute right-4 z-50 p-3 rounded-full bg-muted/60 backdrop-blur-sm hover:bg-muted transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {currentPhotos.map((_, index) => (
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