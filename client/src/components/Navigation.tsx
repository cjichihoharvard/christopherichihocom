import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Blog", href: "#blog" },
  { label: "Gallery", href: "#gallery" },
  { label: "Aaaargh Poker!", href: "#poker" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  onHomeClick?: () => void;
}

export default function Navigation({ onHomeClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-background/80 shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onHomeClick}
          className="text-xl font-heading font-semibold text-foreground hover:text-primary transition-colors"
          data-testid="button-home"
        >
          Christopher Ichiho
        </motion.button>

        <div className="flex gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollToSection(item.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              data-testid={`nav-link-${item.label.toLowerCase()}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
