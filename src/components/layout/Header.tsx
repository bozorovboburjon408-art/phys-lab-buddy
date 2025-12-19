import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import universityLogo from "@/assets/university-logo.jpg";

const navLinks = [
  { path: "/", label: "Bosh sahifa" },
  { path: "/animations", label: "Animatsiyalar" },
  { path: "/laboratories", label: "Laboratoriyalar" },
  { path: "/formulas", label: "Formulalar" },
  { path: "/library", label: "Kutubxona" },
  { path: "/about", label: "Biz haqimizda" },
  { path: "https://grok.com", label: "AI Yordamchi", icon: Sparkles, external: true },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full overflow-hidden group-hover:scale-110 transition-all duration-300">
              <img src={universityLogo} alt="University Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-lg gradient-text group-hover:opacity-80 transition-opacity">PhysicsLab</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "nav-link relative overflow-hidden group flex items-center gap-1"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-primary" />}
                  <span className="relative z-10 group-hover:text-primary transition-colors duration-300">{link.label}</span>
                  <span className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "nav-link relative overflow-hidden group",
                    location.pathname === link.path && "active",
                    link.icon && "flex items-center gap-1"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-primary" />}
                  <span className="relative z-10 group-hover:text-primary transition-colors duration-300">{link.label}</span>
                  <span className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block py-3 px-4 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block py-3 px-4 text-muted-foreground hover:text-foreground transition-colors",
                    location.pathname === link.path && "text-primary",
                    link.icon && "flex items-center gap-2"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
