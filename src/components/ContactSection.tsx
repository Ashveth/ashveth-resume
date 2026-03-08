import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Linkedin, Instagram, Github, MessageCircle, MapPin, Send, Youtube } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = use3DTilt({ maxTilt: 3, scale: 1.01 });
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
};

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("active"); });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal-left, .reveal-right, .reveal-fade");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { toast.error("Please fill in all fields"); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: "ashvethpawar@gmail.com", href: "mailto:ashvethpawar@gmail.com", color: "text-red-400" },
    { icon: Linkedin, label: "LinkedIn", value: "Ashveth Pawar", href: "https://www.linkedin.com/in/ashveth-pawar-820921327", color: "text-blue-400" },
    { icon: Instagram, label: "Instagram", value: "@ashveth.pawar", href: "https://instagram.com/ashveth.pawar", color: "text-pink-400" },
    { icon: Github, label: "GitHub", value: "Ashveth", href: "https://github.com/Ashveth", color: "text-gray-400" },
    { icon: Youtube, label: "YouTube", value: "@AshvethPawar", href: "http://www.youtube.com/@AshvethPawar-gf4yy", color: "text-red-500" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 93224 68982", href: "https://wa.me/919322468982", color: "text-green-400" },
    { icon: MapPin, label: "Location", value: "Navi Mumbai, Maharashtra", href: "#", color: "text-orange-400" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden ambient-glow">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="reveal-fade text-center mb-20">
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Connect</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Let's connect and build something amazing together
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <TiltCard className="reveal-left glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">Name</label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="bg-secondary/50 border-border/50 focus:border-primary/50 rounded-xl h-11 transition-colors" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="bg-secondary/50 border-border/50 focus:border-primary/50 rounded-xl h-11 transition-colors" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">Message</label>
                <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell me about your project..." rows={5} className="bg-secondary/50 border-border/50 focus:border-primary/50 rounded-xl resize-none transition-colors" />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full h-12 group">
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </form>
          </TiltCard>

          <div className="reveal-right space-y-3">
            {contactLinks.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card-hover p-4 flex items-center gap-4 group block"
                onClick={(e) => { if (contact.href === "#") e.preventDefault(); }}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <contact.icon className={`w-5 h-5 ${contact.color}`} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{contact.label}</div>
                  <div className="text-sm font-medium">{contact.value}</div>
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
