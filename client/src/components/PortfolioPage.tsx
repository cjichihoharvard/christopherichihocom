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
        {/* Static greyscale gradient background */}
        <div className="absolute -top-40 -left-40 w-[1200px] h-[1200px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-700/25 via-neutral-500/15 to-transparent blur-3xl" />
        </div>

        <div className="absolute top-1/4 -right-40 w-[1000px] h-[1000px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-600/20 via-neutral-400/15 to-transparent blur-3xl" />
        </div>

        <div className="absolute bottom-0 left-1/4 w-[900px] h-[900px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-500/20 via-neutral-300/10 to-transparent blur-3xl" />
        </div>

        {/* Static geometric shapes */}
        <div className="absolute top-32 left-20 w-[500px] h-[500px] border-2 border-neutral-400/20 rotate-12" />
        
        <div className="absolute bottom-32 right-20 w-[400px] h-[400px] border-2 border-neutral-500/25 rounded-full" />

        {/* Diagonal lines pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent"
              style={{
                width: "200%",
                top: `${i * 15}%`,
                left: "-50%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Static grid pattern */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(115 115 115 / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(115 115 115 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        {/* Large static circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-neutral-400/15 rounded-full" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-neutral-500/20 rounded-full" />
      </div>
    </motion.div>
  );
}
