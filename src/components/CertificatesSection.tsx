import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ExternalLink, ChevronLeft, ChevronRight, X, Download, Eye } from "lucide-react";
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
    description: "Winner – Smart India AI Agent Hackathon organized by AshnaAI. Solved real-world AI problems using agentic AI concepts.",
  },
  {
    id: 2,
    title: "UXccelerate VibeHack 2025",
    organization: "VibeHack 2025",
    date: "2025",
    image: uxcelerateCert,
    description: "Certificate of Excellence for developing Stayhub – focused on user-centric design and innovation.",
    verifyUrl: "https://lnkd.in/edbBPQip",
  },
  {
    id: 3,
    title: "Build-a-thon Hackathon 2025",
    organization: "The Buildathon Foundation",
    date: "November 2025",
    image: buildathonCert,
    description: "Successfully participated in the annual Build-a-thon Hackathon held from November 7 to 10, 2025.",
    verifyUrl: "https://verification.givemycertificate.com/vibe012a29-328d-40ed-b9b4-0746d91c1443",
  },
];

const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedCert !== null) {
      setSelectedCert(selectedCert === 0 ? certificates.length - 1 : selectedCert - 1);
    }
  };

  const handleNext = () => {
    if (selectedCert !== null) {
      setSelectedCert(selectedCert === certificates.length - 1 ? 0 : selectedCert + 1);
    }
  };

  return (
    <section id="certificates" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text">
            Certificates
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognitions and credentials earned through hackathons, competitions, and continuous learning
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="group glass-card rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Image */}
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => setSelectedCert(index)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-primary/90 text-primary-foreground scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                    {cert.organization}
                  </span>
                  <span className="text-xs text-muted-foreground">{cert.date}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {cert.description}
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setSelectedCert(index)}
                    className="flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors duration-300 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedCert !== null} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-5xl w-full h-[85vh] p-0 bg-background/95 backdrop-blur-xl border-primary/20 rounded-2xl overflow-hidden">
          <button
            onClick={() => setSelectedCert(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {selectedCert !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-10">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-3 z-50 p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center justify-center max-h-full gap-5">
                <img
                  src={certificates[selectedCert].image}
                  alt={certificates[selectedCert].title}
                  className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl animate-scale-in"
                />
                <div className="text-center space-y-2 animate-fade-in">
                  <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                    {certificates[selectedCert].organization} • {certificates[selectedCert].date}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {certificates[selectedCert].title}
                  </h3>
                  {certificates[selectedCert].verifyUrl && (
                    <a
                      href={certificates[selectedCert].verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-3 z-50 p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {certificates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCert(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === selectedCert ? "bg-primary w-7" : "bg-muted-foreground/30 w-2"
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

export default CertificatesSection;
