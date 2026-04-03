import { useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import CinematicSection from "@/components/CinematicSection";
import FloatingScene3D from "@/components/FloatingScene3D";
import LightModeBackground from "@/components/LightModeBackground";
import CustomCursor from "@/components/CustomCursor";
import { useLenis } from "@/hooks/useLenis";

// Lazy load heavier sections
const AboutSection = lazy(() => import("@/components/AboutSection"));

const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const AchievementsSection = lazy(() => import("@/components/AchievementsSection"));
const CertificatesSection = lazy(() => import("@/components/CertificatesSection"));
const StartupSection = lazy(() => import("@/components/StartupSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const VideoShowcase = lazy(() => import("@/components/VideoShowcase"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const StatsCounter = lazy(() => import("@/components/StatsCounter"));

const SectionFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const Index = () => {
  useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    document
      .querySelectorAll(".section-reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <CustomCursor />
      {/* Global backgrounds */}
      <div className="hidden dark:block">
        <FloatingScene3D />
      </div>
      <LightModeBackground />

      <ScrollProgress />
      <Navigation />

      <HeroSection />

      <Suspense fallback={<SectionFallback />}>
        <CinematicSection parallaxIntensity={30} scaleRange={[0.96, 1]} rotateRange={[0.8, 0]}>
          <AboutSection />
        </CinematicSection>

        <StatsCounter />


        <CinematicSection parallaxIntensity={20} scaleRange={[0.97, 1]} rotateRange={[0.6, 0]}>
          <ExperienceSection />
        </CinematicSection>

        <CinematicSection parallaxIntensity={35} scaleRange={[0.95, 1]} rotateRange={[1, 0]}>
          <ProjectsSection />
        </CinematicSection>

        <CinematicSection parallaxIntensity={25} scaleRange={[0.96, 1]} rotateRange={[0.7, 0]}>
          <AchievementsSection />
        </CinematicSection>

        <CinematicSection parallaxIntensity={20} scaleRange={[0.97, 1]} rotateRange={[0.4, 0]}>
          <CertificatesSection />
        </CinematicSection>

        <CinematicSection parallaxIntensity={30} scaleRange={[0.96, 1]} rotateRange={[0.6, 0]}>
          <StartupSection />
        </CinematicSection>


        <CinematicSection parallaxIntensity={25} scaleRange={[0.96, 1]} rotateRange={[0.6, 0]}>
          <BlogSection />
        </CinematicSection>

        <CinematicSection parallaxIntensity={30} scaleRange={[0.95, 1]} rotateRange={[0.8, 0]}>
          <VideoShowcase />
        </CinematicSection>

        <CinematicSection parallaxIntensity={15} scaleRange={[0.98, 1]} rotateRange={[0.3, 0]}>
          <ContactSection />
        </CinematicSection>

        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
