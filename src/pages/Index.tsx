import { useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import ProjectsSection from "@/components/ProjectsSection";
import StartupSection from "@/components/StartupSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import CertificatesSection from "@/components/CertificatesSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const sectionAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    document.querySelectorAll(".section-reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      <HeroSection />

      <motion.div {...sectionAnimation}>
        <AboutSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <SkillsSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <ExperienceSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <ProjectsSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <AchievementsSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <CertificatesSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <StartupSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <GallerySection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <BlogSection />
      </motion.div>

      <motion.div {...sectionAnimation}>
        <ContactSection />
      </motion.div>

      <Footer />
    </main>
  );
};

export default Index;
