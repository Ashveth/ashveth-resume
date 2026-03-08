import { Button } from "@/components/ui/button";
import { Rocket, ExternalLink } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { motion } from "framer-motion";

const StartupSection = () => {
  const tiltRef = use3DTilt({ maxTilt: 4, scale: 1.01 });

  return (
    <section id="startup" className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ perspective: "1200px" }}
        >
          <div ref={tiltRef} className="glass-card-hover p-8 md:p-12 relative overflow-hidden group" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text tracking-tight">Curloft</h2>
                  <p className="text-muted-foreground text-sm mt-1">Co-founder · Aug 2024 – Present</p>
                </div>
              </div>

              <p className="text-foreground/70 leading-relaxed mb-8 max-w-3xl">
                Curloft is a creative startup that builds websites, blogs, and content for creators and 
                small businesses — blending design, storytelling, and technology to help people establish 
                their digital presence and grow their brand.
              </p>

              <Button asChild size="lg" className="rounded-full px-8 group/btn hover:scale-105 transition-transform duration-300">
                <a href="https://curloft.com/" target="_blank" rel="noopener noreferrer">
                  Visit Curloft
                  <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:rotate-12 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StartupSection;
