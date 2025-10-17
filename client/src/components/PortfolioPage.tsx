import { motion } from "framer-motion";
import Navigation from "./Navigation";
import BlogSection from "./BlogSection";
import GallerySection from "./GallerySection";
import PokerSection from "./PokerSection";
import ContactSection from "./ContactSection";

interface PortfolioPageProps {
  onHomeClick?: () => void;
}

export default function PortfolioPage({ onHomeClick }: PortfolioPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative bg-gradient-to-b from-background via-background to-accent/5"
    >
      <Navigation onHomeClick={onHomeClick} />

      <div className="relative pt-20">
        <ContactSection />
        <BlogSection />
        <GallerySection />
        <PokerSection />
      </div>

      <div className="py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Christopher. Built with passion and precision.</p>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
}
