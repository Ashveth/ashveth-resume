import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          <Link to="/#blog">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown-to-JSX renderer
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} className="space-y-2 my-4 pl-1">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const inlineFormat = (text: string) => {
      const raw = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, (_match, label, url) => {
          const sanitizedUrl = /^https?:\/\//i.test(url) ? url : '#';
          return `<a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${label}</a>`;
        });
      return DOMPurify.sanitize(raw);
    };

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("- ")) {
        listItems.push(trimmed.slice(2));
        continue;
      }

      flushList();

      if (trimmed === "") continue;
      if (trimmed === "---") {
        elements.push(<hr key={key++} className="my-8 border-border/40" />);
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="text-xl font-display font-semibold mt-8 mb-3 text-foreground">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="text-2xl md:text-3xl font-display font-bold mt-10 mb-4 text-foreground">
            {trimmed.slice(3)}
          </h2>
        );
      } else {
        elements.push(
          <p
            key={key++}
            className="text-foreground/75 leading-relaxed my-3"
            dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }}
          />
        );
      }
    }
    flushList();
    return elements;
  };

  // Get related posts
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-6 z-10"
        >
          <Link to="/#blog">
            <Button
              variant="ghost"
              className="bg-background/30 backdrop-blur-md border border-border/30 hover:bg-background/50 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </Link>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl mx-auto px-6 py-12 md:py-16"
      >
        {renderContent(post.content)}
      </motion.article>

      {/* Related Posts */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-display font-bold mb-8 text-center">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((rp) => (
            <Link key={rp.id} to={`/blog/${rp.slug}`}>
              <div className="group rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-36 overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary font-medium">{rp.category}</span>
                  <h3 className="text-sm font-semibold mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {rp.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
