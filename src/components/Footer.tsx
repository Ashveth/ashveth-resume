import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 relative">
      <div className="section-divider mb-12" />
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
          Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by{" "}
          <span className="gradient-text font-medium">Ashveth Pawar</span>
        </p>
        <p className="text-xs text-muted-foreground/50 mt-3">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
