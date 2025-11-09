import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import smartIndiaCert from "@/assets/smart-india-certificate.png";
import uxcelerateCert from "@/assets/uxccelerate-certificate.png";
import filmFestivalMenu from "@/assets/film-festival-menu.png";
import filmFestivalPanel from "@/assets/film-festival-panel.png";

const galleryItems = [
  {
    id: 1,
    src: smartIndiaCert,
    title: "Smart India AI Agent Hackathon 2025",
    category: "Winner Certificate",
    description: "Certificate of Participation - Smart India AI Agent Hackathon organized by AshnaAI"
  },
  {
    id: 2,
    src: uxcelerateCert,
    title: "UXccelerate VibeHack 2025",
    category: "Certificate of Excellence",
    description: "Stayhub Project - User-centric design and innovation"
  },
  {
    id: 3,
    src: filmFestivalMenu,
    title: "LocalHost AI Film Festival 2025",
    category: "Event Attendance",
    description: "3-day AI Film Festival merging creativity and technology"
  },
  {
    id: 4,
    src: filmFestivalPanel,
    title: "Panel Discussion",
    category: "Film Festival",
    description: "Industry experts panel at LocalHost AI Film Festival"
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryItems.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="section-reveal py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A visual journey through achievements, hackathons, and memorable moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer glass-card hover:scale-[1.02] transition-all duration-500"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-xs text-primary font-semibold mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-primary/20">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 z-50 p-3 rounded-full bg-background/80 hover:bg-background transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center justify-center max-h-full">
                <img
                  src={galleryItems[selectedImage].src}
                  alt={galleryItems[selectedImage].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg animate-scale-in"
                />
                <div className="mt-6 text-center animate-fade-in">
                  <p className="text-sm text-primary font-semibold mb-2">
                    {galleryItems[selectedImage].category}
                  </p>
                  <h3 className="text-2xl font-bold mb-2">
                    {galleryItems[selectedImage].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {galleryItems[selectedImage].description}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 z-50 p-3 rounded-full bg-background/80 hover:bg-background transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedImage
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
