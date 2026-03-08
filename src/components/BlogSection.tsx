import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { use3DTilt } from "@/hooks/use3DTilt";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 5, scale: 1.02 });
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const BlogSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    { id: 1, title: "Why I Built PDF Size Fix — A Free All-in-One Utility Platform", excerpt: "Solving everyday PDF and utility problems in a simple, fast, and privacy-focused way — without ads overload or complicated steps.", date: "March 2026", readTime: "6 min read", category: "Startup", image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&h=400&fit=crop" },
    { id: 2, title: "Winning the Smart India AI Agent Hackathon 2025", excerpt: "An incredible journey of building AshnaAI and competing with brilliant minds.", date: "November 2025", readTime: "5 min read", category: "Hackathon", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop" },
    { id: 3, title: "Building AI Agents: A Comprehensive Guide", excerpt: "From KrishiMitra to TripGenie, I've built 6 AI agents. Learn about the architecture and best practices.", date: "October 2025", readTime: "8 min read", category: "AI Development", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop" },
    { id: 4, title: "UX Design Meets AI: Lessons from VibeHack 2025", excerpt: "How we designed Stayhub using UXccelerate.ai, focusing on user-centric design.", date: "October 2025", readTime: "6 min read", category: "UX Design", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop" },
    { id: 5, title: "The Future of AI in Healthcare: HealthMate Journey", excerpt: "Exploring multilingual AI solutions for healthcare accessibility.", date: "September 2025", readTime: "7 min read", category: "Healthcare AI", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop" },
    { id: 6, title: "Insights from LocalHost AI Film Festival 2025", excerpt: "Key takeaways from industry experts on the intersection of AI and creative content.", date: "September 2025", readTime: "4 min read", category: "Events", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=400&fit=crop" },
    { id: 7, title: "From Idea to Startup: The Curloft Story", excerpt: "Lessons learned about entrepreneurship, design, and building in public.", date: "August 2025", readTime: "6 min read", category: "Startup", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop" },
  ];

  return (
    <section id="blog" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Insights</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text">
            Blog & Insights
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing my journey in AI, hackathons, and building innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
            >
              <TiltCard>
                <article
                  onMouseEnter={() => setHoveredId(post.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="glass-card overflow-hidden group cursor-pointer h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${hoveredId === post.id ? "scale-110" : "scale-100"}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="whitespace-nowrap">{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="whitespace-nowrap">{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm md:text-base text-foreground/60 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Button
                      variant="ghost"
                      className="group/btn p-0 h-auto font-medium text-sm md:text-base text-primary hover:text-primary hover:bg-transparent"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 mb-16"
        >
          <Button size="lg" variant="outline" className="glass-card border-primary/30 hover:border-primary/60 hover:bg-primary/10 hover:scale-105 transition-all duration-300 rounded-full">
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
