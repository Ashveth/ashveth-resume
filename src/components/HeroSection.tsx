import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { motion, useScroll, useTransform } from "framer-motion";

const titles = [
  "Building the Future with AI & Innovation",
  "Full-Stack Developer & AI Enthusiast",
  "Hackathon Winner & Problem Solver",
];

const useTypewriter = (texts: string[], typingSpeed = 60, deletingSpeed = 40, pause = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pause]);

  return displayText;
};

const HeroSection = () => {
  const mouse = useMouseParallax(30);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const textReveal = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient orbs with parallax */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          top: "15%",
          left: "5%",
        }}
        animate={{
          x: mouse.x * 0.5,
          y: mouse.y * 0.5,
          scale: [1, 1.05, 1],
        }}
        transition={{ x: { duration: 1.2 }, y: { duration: 1.2 }, scale: { duration: 8, repeat: Infinity } }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)",
          bottom: "10%",
          right: "5%",
        }}
        animate={{
          x: mouse.x * -0.3,
          y: mouse.y * -0.3,
          scale: [1, 1.08, 1],
        }}
        transition={{ x: { duration: 1.5 }, y: { duration: 1.5 }, scale: { duration: 10, repeat: Infinity, delay: 2 } }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 container mx-auto px-4 lg:px-8 text-center"
      >
        <motion.div
          style={{
            transform: `translate(${mouse.x * -0.1}px, ${mouse.y * -0.1}px)`,
          }}
        >
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            Portfolio
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 tracking-tight"
          >
            <span className="gradient-text">Ashveth Pawar</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-light max-w-3xl mx-auto tracking-tight"
          >
            Building the Future with AI & Innovation
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="text-base md:text-lg text-muted-foreground/70 mb-14 max-w-2xl mx-auto"
          >
            Computer Engineering Student · Hackathon Winner · Founder of <a href="https://www.pdfsizefix.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PdfSizeFix.in</a>
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="group rounded-full px-8 h-12 text-sm font-medium hover:scale-105 transition-transform duration-300"
            >
              Explore My Work
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group rounded-full px-8 h-12 text-sm font-medium hover:scale-105 transition-transform duration-300"
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
              className="rounded-full px-8 h-12 text-sm font-medium text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase text-muted-foreground/40">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
