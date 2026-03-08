import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import ParticleBackground3D from "./ParticleBackground3D";

const HeroSection = () => {
  const mouse = useMouseParallax(30);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground3D />

      {/* Ambient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(210 100% 60% / 0.15) 0%, transparent 70%)",
          top: "20%",
          left: "10%",
          transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)`,
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(210 80% 65% / 0.12) 0%, transparent 70%)",
          bottom: "10%",
          right: "5%",
          transform: `translate(${mouse.x * -0.3}px, ${mouse.y * -0.3}px)`,
          transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          animationDelay: "2s",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div
          style={{
            transform: `translate(${mouse.x * -0.15}px, ${mouse.y * -0.15}px)`,
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* Eyebrow */}
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 animate-fade-in">
            Portfolio
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 tracking-tight animate-fade-in">
            <span className="gradient-text">Ashveth Pawar</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-light max-w-3xl mx-auto tracking-tight animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Building the Future with AI & Innovation
          </p>

          <p className="text-base md:text-lg text-muted-foreground/70 mb-14 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Computer Engineering Student · Hackathon Winner · Co-founder at Curloft
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.45s" }}>
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="group rounded-full px-8 h-12 text-sm font-medium"
            >
              Explore My Work
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group rounded-full px-8 h-12 text-sm font-medium"
            >
              <a href="/Ashveth_Pawar_Resume.pdf" download="Ashveth_Pawar_Resume.pdf">
                Download Resume
                <Download className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full px-8 h-12 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase text-muted-foreground/40">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
