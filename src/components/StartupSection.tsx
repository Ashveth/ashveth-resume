import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, ExternalLink } from "lucide-react";

const StartupSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".section-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="startup" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="section-reveal glass-card p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text">
                    Curloft
                  </h2>
                  <p className="text-foreground/60 text-lg mt-1">Co-founder | Aug 2024 – Present</p>
                </div>
              </div>

              <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                Curloft is a creative startup that builds websites, blogs, and content for creators and 
                small businesses — blending design, storytelling, and technology to help people establish 
                their digital presence and grow their brand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white group/btn"
                >
                  <a href="https://curloft.com/" target="_blank" rel="noopener noreferrer">
                    Visit Curloft
                    <ExternalLink className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupSection;
