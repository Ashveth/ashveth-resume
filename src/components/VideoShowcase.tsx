import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";

const videos = [
  { id: "DDlHdg0ofME", title: "Project Showcase 1" },
  { id: "mP6VhpShqgA", title: "Project Showcase 2" },
  { id: "M8Ub-iRXPPU", title: "Project Showcase 3" },
  { id: "N6nCmfM-6SQ", title: "Project Showcase 4" },
  { id: "PvH_qNbDr9o", title: "Project Showcase 5" },
  { id: "_ArEMrikBmQ", title: "Project Showcase 6" },
  { id: "klRBP9jMRzc", title: "Project Showcase 7" },
  { id: "pBEc_qVPIQM", title: "Project Showcase 8" },
  { id: "Areq0u7pQhc", title: "Project Showcase 9" },
  { id: "JoAmVrQo3QQ", title: "Project Showcase 10" },
  { id: "MvbbQbFw0ak", title: "Project Showcase 11" },
  { id: "jib28LbuXUM", title: "Project Showcase 12" },
  { id: "r8ME_kwBRlQ", title: "Project Showcase 13" },
  { id: "XvpBPns4evs", title: "Project Showcase 14" },
];

const VideoCard = ({
  video,
  index,
  onPlay,
}: {
  video: (typeof videos)[0];
  index: number;
  onPlay: (id: string) => void;
}) => {
  const tiltRef = use3DTilt({ maxTilt: 5, scale: 1.02 });
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[420px]"
    >
      <div
        ref={tiltRef}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative rounded-2xl overflow-hidden cursor-pointer
          bg-secondary/30 backdrop-blur-xl border border-border/30
          shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.12)]
          hover:shadow-[0_16px_48px_-12px_hsl(var(--primary)/0.25)]
          transition-shadow duration-500"
        onClick={() => onPlay(video.id)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-secondary/60 animate-pulse" />
          )}
          <img
            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center
                shadow-[0_0_30px_hsl(var(--primary)/0.4)]
                opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
            >
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            </motion.div>
          </div>
        </div>

        {/* Glass info bar */}
        <div className="p-4 bg-secondary/20 backdrop-blur-sm border-t border-border/20">
          <p className="text-sm font-medium text-foreground/90 truncate">{video.title}</p>
          <p className="text-xs text-muted-foreground mt-1">YouTube • Click to play</p>
        </div>
      </div>
    </motion.div>
  );
};

const VideoShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
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
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="videos" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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

          {/* Scroll controls */}
          <div className="relative">
            {/* Left arrow */}
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Horizontal scroll gallery */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 px-8 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} onPlay={setActiveVideo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideo(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full
                bg-secondary/60 backdrop-blur-md border border-border/40
                flex items-center justify-center
                hover:bg-secondary hover:scale-110 transition-all duration-300"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>

            {/* Player */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden
                shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)]
                border border-border/20"
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
