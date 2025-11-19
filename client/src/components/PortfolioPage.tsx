import { motion } from "framer-motion";
import Navigation from "./Navigation";
import BlogSection from "./BlogSection";
import GallerySection from "./GallerySection";
import ContactSection from "./ContactSection";
import ResumeSection from "./ResumeSection";

interface PortfolioPageProps {
  onHomeClick?: () => void;
}

export default function PortfolioPage({ onHomeClick }: PortfolioPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative"
    >
      <Navigation onHomeClick={onHomeClick} />

      <div className="relative pt-20">
        <ContactSection />
        <BlogSection />
        <GallerySection />
        <ResumeSection />
      </div>

      <div className="py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Christopher. Built with passion and precision.</p>
      </div>

      {/* Static subtle background pattern */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Very subtle gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-background to-slate-50/30 dark:from-slate-900/50 dark:via-background dark:to-slate-900/30" />
        
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>
    </motion.div>
  );
}
