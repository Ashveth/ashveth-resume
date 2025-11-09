import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Download } from "lucide-react";
import ParticleBackground3D from "./ParticleBackground3D";

const HeroSection = () => {

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground3D />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 animate-glow-pulse">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground/80">
              Award-Winning AI Innovator
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-scale-in">
            <span className="gradient-text">Ashveth Pawar</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/60 mb-4 font-light max-w-3xl mx-auto">
            Building the Future with AI & Innovation
          </p>

          <p className="text-lg md:text-xl text-foreground/50 mb-12 max-w-2xl mx-auto">
            Computer Engineering Student | Hackathon Winner | Co-founder at Curloft
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="glass-card bg-primary/90 hover:bg-primary text-primary-foreground border-primary/50 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
            >
              Explore My Work
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="glass-card border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 group"
            >
              <a href="/Ashveth_Pawar_Resume.pdf" download="Ashveth_Pawar_Resume.pdf">
                Download Resume
                <Download className="ml-2 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="glass-card border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary/60" />
      </div>
    </section>
  );
};

export default HeroSection;
