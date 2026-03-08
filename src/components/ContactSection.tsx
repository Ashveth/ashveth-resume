import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Linkedin, Instagram, Github, MapPin, Send, Youtube, Twitter, Code, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const socials = [
    { icon: Mail, label: "Email", value: "ashveth00@gmail.com", href: "mailto:ashveth00@gmail.com?subject=Hello%20Ashveth", gradient: "from-red-500 to-orange-500" },
    { icon: Linkedin, label: "LinkedIn", value: "Ashveth Pawar", href: "https://www.linkedin.com/in/ashveth-pawar-820921327", gradient: "from-blue-600 to-blue-400" },
    { icon: Github, label: "GitHub", value: "Ashveth", href: "https://github.com/Ashveth", gradient: "from-slate-600 to-slate-400" },
    { icon: Youtube, label: "YouTube", value: "@AshvethPawar", href: "http://www.youtube.com/@AshvethPawar-gf4yy", gradient: "from-red-600 to-red-400" },
    { icon: Twitter, label: "X (Twitter)", value: "@Ashveth_pawar", href: "https://x.com/Ashveth_pawar", gradient: "from-sky-500 to-cyan-400" },
    { icon: Instagram, label: "Instagram", value: "@ashveth.pawar", href: "https://instagram.com/ashveth.pawar", gradient: "from-pink-500 to-purple-500" },
    { icon: Code, label: "Devpost", value: "ashveth_pawar", href: "https://devpost.com/ashveth_pawar?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav", gradient: "from-cyan-500 to-teal-400" },
  ];

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.p variants={fadeUp} className="text-sm tracking-[0.2em] uppercase text-primary mb-4">Connect</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            Let's Work <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider mb-6" />
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact Form — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl bg-card/40 backdrop-blur-xl border border-border/40 p-8 md:p-10 hover:border-primary/20 transition-colors duration-500">
              <div className="mb-8">
                <h3 className="text-xl font-display font-semibold tracking-tight mb-2">Send a Message</h3>
                <p className="text-sm text-muted-foreground">Fill out the form below and I'll get back to you soon.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Name</label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl h-12 transition-all duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl h-12 transition-all duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Message</label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    className="bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl resize-none transition-all duration-300 placeholder:text-muted-foreground/40"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl h-13 text-base font-medium group hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Social Links — takes 2 cols */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="lg:col-span-2 space-y-4"
          >
            {/* Location card */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-card/40 backdrop-blur-xl border border-border/40 p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Based in</p>
                  <p className="font-medium text-sm">Navi Mumbai, Maharashtra</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Available for remote collaborations, freelance projects, and hackathon partnerships worldwide.
              </p>
            </motion.div>

            {/* Social grid */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-4">Find me on</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  variants={fadeUp}
                  onClick={(e) => {
                    if (social.href.startsWith("mailto:")) {
                      e.preventDefault();
                      window.open(social.href, "_self");
                    }
                  }}
                  className={`group relative rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 p-4 
                    hover:border-primary/30 hover:bg-card/60 hover:-translate-y-0.5
                    transition-all duration-300 cursor-pointer overflow-hidden
                    ${i === 0 ? "col-span-2" : ""}`}
                >
                  {/* Hover gradient bg */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

                  <div className="relative flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60">{social.label}</p>
                      <p className="text-sm font-medium truncate">{social.value}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
