import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useSectionTransition } from "@/hooks/useSectionTransition";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateToSection } = useSectionTransition();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Startup", href: "#startup" },
    { label: "Gallery", href: "#gallery" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    navigateToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-card shadow-lg shadow-primary/5"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="text-2xl font-display font-bold gradient-text hover:scale-105 transition-transform duration-300"
            >
              Ashveth's Portfolio
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                >
                  {item.label}
                </Button>
              ))}
              {user ? (
                <Button
                  variant="ghost"
                  onClick={signOut}
                  className="text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative glass-card m-4 mt-24 p-8 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="text-lg justify-start text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                >
                  {item.label}
                </Button>
              ))}
              {user ? (
                <Button
                  variant="ghost"
                  onClick={signOut}
                  className="text-lg justify-start text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="text-lg justify-start text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
