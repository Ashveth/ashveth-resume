import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 relative border-t border-primary/10">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="text-foreground/60 flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by{" "}
          <span className="gradient-text font-semibold">Ashveth Pawar</span>
        </p>
        <p className="text-sm text-foreground/40 mt-2">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
