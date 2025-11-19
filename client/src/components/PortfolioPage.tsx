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
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Soft gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/25 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20" />
        
        {/* Static soft geometric shapes */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-blue-200/20 via-blue-100/10 to-transparent dark:from-blue-800/15 dark:via-blue-900/8 dark:to-transparent blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-radial from-purple-200/15 via-purple-100/8 to-transparent dark:from-purple-800/12 dark:via-purple-900/6 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-radial from-pink-200/15 via-pink-100/8 to-transparent dark:from-pink-800/12 dark:via-pink-900/6 dark:to-transparent blur-3xl" />
        
        {/* Very subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </motion.div>
  );
}
