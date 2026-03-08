import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import aiHealthmateThumbnail from "@/assets/thumbnails/ai-healthmate.png";
import campusgreenThumbnail from "@/assets/thumbnails/campusgreen.png";
import civicpulseThumbnail from "@/assets/thumbnails/civicpulse.png";
import peerbridgeThumbnail from "@/assets/thumbnails/peerbridge.png";
import swipeforumThumbnail from "@/assets/thumbnails/swipeforum.png";

const videos = [
  { id: "DDlHdg0ofME", title: "VidyaSetu", description: "AI-powered personalized learning platform for students in Tier-2/3 cities", category: "EdTech" },
  { id: "mP6VhpShqgA", title: "EduGrant AI", description: "Smart scholarship and education grant matching platform", category: "EdTech" },
  { id: "M8Ub-iRXPPU", title: "Idea Navigator", description: "AI startup idea validator with market analysis and roadmap generation", category: "AI Tool" },
  { id: "N6nCmfM-6SQ", title: "CampusGreen 🌱", description: "AI-powered sustainability ecosystem for college campuses with gamification", category: "Sustainability", thumbnail: campusgreenThumbnail },
  { id: "PvH_qNbDr9o", title: "Swipe Forum", description: "TikTok-style swipeable community discussion forum", category: "Social", thumbnail: swipeforumThumbnail },
  { id: "_ArEMrikBmQ", title: "CivicPulse", description: "Community-driven platform to report, track, and resolve local civic issues", category: "Civic Tech", thumbnail: civicpulseThumbnail },
  { id: "klRBP9jMRzc", title: "PeerBridge Atlas", description: "Peer-to-peer learning and mentorship mapping platform", category: "EdTech", thumbnail: peerbridgeThumbnail },
  { id: "pBEc_qVPIQM", title: "Siliguri Border AI", description: "AI-powered predictive surveillance system for India's strategic corridor", category: "Defense AI" },
  { id: "Areq0u7pQhc", title: "AI Shield for Siliguri", description: "Predict, detect, and protect — AI defense demo video", category: "Defense AI" },
  { id: "JoAmVrQo3QQ", title: "Savoney", description: "Smart finance management app — Mumbai Hacks hackathon project", category: "FinTech" },
  { id: "MvbbQbFw0ak", title: "AI HealthMate ChatBot", description: "Multilingual AI health assistant with symptom analysis", category: "HealthTech", thumbnail: aiHealthmateThumbnail },
  { id: "jib28LbuXUM", title: "StudySphere", description: "Collaborative student workspace for hackathon productivity", category: "EdTech" },
  { id: "r8ME_kwBRlQ", title: "AI HealthMate", description: "Full-featured AI-powered health companion app demo", category: "HealthTech", thumbnail: aiHealthmateThumbnail },
  { id: "XvpBPns4evs", title: "Sentiment Shield", description: "AI agent monitoring reviews & social mentions for negative feedback", category: "AI Tool" },
];

const categoryColors: Record<string, string> = {
  "EdTech": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "AI Tool": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Sustainability": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Social": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Civic Tech": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Defense AI": "bg-red-500/20 text-red-400 border-red-500/30",
  "FinTech": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "HealthTech": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const VideoCard = ({
  video,
  index,
  onPlay,
  scrollProgress,
}: {
  video: (typeof videos)[0];
  index: number;
  onPlay: (id: string) => void;
  scrollProgress: number;
}) => {
  const tiltRef = use3DTilt({ maxTilt: 6, scale: 1.03 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInCenter, setIsInCenter] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const checkCenter = () => {
      const parentRect = parent.getBoundingClientRect();
      const cardRect = el.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const parentCenter = parentRect.left + parentRect.width / 2;
      const distance = Math.abs(cardCenter - parentCenter);
      setIsInCenter(distance < cardRect.width * 0.6);
    };

    parent.addEventListener("scroll", checkCenter, { passive: true });
    checkCenter();
    return () => parent.removeEventListener("scroll", checkCenter);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.07, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[420px] transition-all duration-500 ${
        isInCenter ? "scale-[1.04]" : "scale-100"
      }`}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={tiltRef}
        style={{ transformStyle: "preserve-3d" }}
        className={`group relative rounded-2xl overflow-hidden cursor-pointer
          bg-secondary/30 backdrop-blur-xl border transition-all duration-500
          ${isInCenter
            ? "border-primary/30 shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)]"
            : "border-border/30 shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.08)]"
          }
          hover:shadow-[0_24px_64px_-16px_hsl(var(--primary)/0.35)]`}
        onClick={() => onPlay(video.id)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-secondary/60 animate-pulse" />
          )}
          <img
            src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${categoryColors[video.category] || "bg-secondary/40 text-foreground/70 border-border/30"}`}>
              {video.category}
            </span>
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center
                shadow-[0_0_40px_hsl(var(--primary)/0.5)]
                opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0"
            >
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* Bottom title overlay on thumbnail */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-base font-bold text-white drop-shadow-lg leading-tight">{video.title}</h3>
          </div>
        </div>

        {/* Info bar */}
        <div className="p-4 bg-secondary/20 backdrop-blur-sm border-t border-border/20">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{video.description}</p>
          <div className="flex items-center gap-2 mt-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[11px] text-muted-foreground/70 font-medium">YouTube • Click to watch</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VideoShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const galleryX = useTransform(scrollYProgress, [0.1, 0.4], [80, 0]);
  const galleryOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    setScrollProgress(el.scrollLeft / (el.scrollWidth - el.clientWidth));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -440 : 440,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section ref={sectionRef} id="videos" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Watch</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
              Video <span className="gradient-text">Showcase</span>
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Explore my projects, tutorials, and creative work
            </p>
          </motion.div>

          {/* Scroll progress bar */}
          <div className="max-w-xs mx-auto mb-8 h-0.5 rounded-full bg-secondary/40 overflow-hidden">
            <motion.div
              className="h-full bg-primary/60 rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Scroll controls */}
          <motion.div style={{ x: galleryX, opacity: galleryOpacity }} className="relative">
            {/* Left arrow */}
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full
                    bg-secondary/80 backdrop-blur-md border border-border/40
                    flex items-center justify-center
                    hover:bg-secondary hover:scale-110 transition-all duration-300
                    shadow-lg hidden md:flex"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Right arrow */}
            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full
                    bg-secondary/80 backdrop-blur-md border border-border/40
                    flex items-center justify-center
                    hover:bg-secondary hover:scale-110 transition-all duration-300
                    shadow-lg hidden md:flex"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/60 to-transparent z-10 pointer-events-none" />

            {/* Horizontal scroll gallery */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 px-10 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              {videos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} onPlay={setActiveVideo} scrollProgress={scrollProgress} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.15 }}
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full
                bg-secondary/60 backdrop-blur-md border border-border/40
                flex items-center justify-center
                hover:bg-secondary hover:scale-110 transition-all duration-300"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>

            {/* Video title in modal */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="absolute top-7 left-6 z-10"
            >
              <p className="text-white/80 font-medium text-sm">
                {videos.find((v) => v.id === activeVideo)?.title}
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40, rotateX: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40, rotateX: 8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden
                shadow-[0_40px_100px_-25px_rgba(0,0,0,0.7)]
                border border-border/20"
              style={{ perspective: "1000px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoShowcase;
