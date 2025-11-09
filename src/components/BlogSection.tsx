import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BlogSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Winning the Smart India AI Agent Hackathon 2025",
      excerpt: "An incredible journey of building AshnaAI and competing with brilliant minds. Here's how we solved real-world problems using agentic AI concepts and emerged victorious.",
      date: "November 2025",
      readTime: "5 min read",
      category: "Hackathon",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Building AI Agents: A Comprehensive Guide",
      excerpt: "From KrishiMitra to TripGenie, I've built 6 AI agents. Learn about the architecture, challenges, and best practices for creating intelligent conversational systems.",
      date: "October 2025",
      readTime: "8 min read",
      category: "AI Development",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "UX Design Meets AI: Lessons from VibeHack 2025",
      excerpt: "How we designed Stayhub using UXccelerate.ai, focusing on user-centric design principles and seamless API integration with FastAPI.",
      date: "October 2025",
      readTime: "6 min read",
      category: "UX Design",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "The Future of AI in Healthcare: HealthMate Journey",
      excerpt: "Exploring multilingual AI solutions for healthcare accessibility. Building HealthMate taught me the importance of inclusive design and cultural sensitivity in AI.",
      date: "September 2025",
      readTime: "7 min read",
      category: "Healthcare AI",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Insights from LocalHost AI Film Festival 2025",
      excerpt: "Three days of creativity meets technology. Key takeaways from industry experts like Tanmay Bhat and Kunal Kapoor on the intersection of AI and creative content.",
      date: "September 2025",
      readTime: "4 min read",
      category: "Events",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=400&fit=crop",
    },
    {
      id: 6,
      title: "From Idea to Startup: The Curloft Story",
      excerpt: "Co-founding a creative startup that builds websites and content for creators. Lessons learned about entrepreneurship, design, and building in public.",
      date: "August 2025",
      readTime: "6 min read",
      category: "Startup",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text">
            Blog & Insights
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            Sharing my journey in AI, hackathons, and building innovative solutions
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              onHoverStart={() => setHoveredId(post.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === post.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-foreground/50 mb-3">
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
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="glass-card border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
