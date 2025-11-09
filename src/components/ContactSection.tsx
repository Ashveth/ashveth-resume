import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Linkedin, Instagram, Github, MessageCircle, MapPin, Send, Youtube } from "lucide-react";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const elements = sectionRef.current?.querySelectorAll(".section-reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "ashvethpawar@gmail.com",
      href: "mailto:ashvethpawar@gmail.com",
      color: "text-red-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Ashveth Pawar",
      href: "https://www.linkedin.com/in/ashveth-pawar-820921327",
      color: "text-blue-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@ashveth.pawar",
      href: "https://instagram.com/ashveth.pawar",
      color: "text-pink-400",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Ashveth",
      href: "https://github.com/Ashveth",
      color: "text-gray-400",
    },
    {
      icon: Youtube,
      label: "YouTube",
      value: "@AshvethPawar",
      href: "http://www.youtube.com/@AshvethPawar-gf4yy",
      color: "text-red-500",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+91 93224 68982",
      href: "https://wa.me/919322468982",
      color: "text-green-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Navi Mumbai, Maharashtra",
      href: "#",
      color: "text-orange-400",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="reveal-fade text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            Let's connect and build something amazing together
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="reveal-left">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-background/50 border-primary/20 focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white group"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="reveal-right space-y-4">
            {contactLinks.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card p-6 flex items-center gap-4 hover:scale-105 transition-all duration-300 group"
                onClick={(e) => {
                  if (contact.href === "#") {
                    e.preventDefault();
                  }
                }}
              >
                <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <contact.icon className={`w-6 h-6 ${contact.color}`} />
                </div>
                <div>
                  <div className="text-sm text-foreground/60 mb-1">{contact.label}</div>
                  <div className="font-medium text-foreground/90">{contact.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
