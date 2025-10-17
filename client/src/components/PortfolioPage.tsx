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

      {/* Greyscale background that covers entire page */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Base greyscale gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-white" />

        {/* Static greyscale gradient blobs throughout page */}
        <div className="absolute top-20 left-10 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-400/30 via-neutral-300/15 to-transparent blur-3xl" />
        </div>

        <div className="absolute top-1/3 right-10 w-[700px] h-[700px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-500/25 via-neutral-400/15 to-transparent blur-3xl" />
        </div>

        <div className="absolute top-2/3 left-1/3 w-[600px] h-[600px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-400/20 via-neutral-300/10 to-transparent blur-3xl" />
        </div>

        {/* Geometric shapes at top and middle */}
        <div className="absolute top-40 left-32 w-[400px] h-[400px] border-2 border-neutral-400/30 rotate-12" />
        
        <div className="absolute top-1/2 right-32 w-[350px] h-[350px] border-2 border-neutral-500/30 rounded-full" />

        {/* Diagonal lines across entire page */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-neutral-400/25 to-transparent"
              style={{
                width: "200%",
                top: `${i * 8.33}%`,
                left: "-50%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Subtle grid pattern across entire page */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(115 115 115 / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(115 115 115 / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        {/* Large circles throughout */}
        <div className="absolute top-20 left-1/4 w-[900px] h-[900px] border border-neutral-400/20 rounded-full" />
        
        <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] border-2 border-neutral-500/25 rounded-full" />
      </div>
    </motion.div>
  );
}
