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

      {/* Visible greyscale background covering entire page */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Strong base greyscale gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/80 via-neutral-100/60 to-neutral-50/40" />

        {/* Large visible gradient blobs from top to bottom */}
        <div className="absolute -top-20 left-0 w-[1000px] h-[1000px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-500/40 via-neutral-400/25 to-transparent blur-3xl" />
        </div>

        <div className="absolute top-40 right-0 w-[900px] h-[900px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-600/35 via-neutral-500/20 to-transparent blur-3xl" />
        </div>

        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-radial from-neutral-500/30 via-neutral-400/20 to-transparent blur-3xl" />
        </div>

        {/* Bold geometric shapes */}
        <div className="absolute top-20 left-20 w-[500px] h-[500px] border-3 border-neutral-500/40 rotate-12" />
        
        <div className="absolute top-1/3 right-20 w-[400px] h-[400px] border-3 border-neutral-600/40 rounded-full" />

        {/* Visible diagonal lines */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-neutral-500/35 to-transparent"
              style={{
                width: "250%",
                top: `${i * 6.66}%`,
                left: "-75%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Visible grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(115 115 115 / 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(115 115 115 / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        {/* Large visible circles */}
        <div className="absolute top-0 left-1/3 w-[1000px] h-[1000px] border-2 border-neutral-500/30 rounded-full" />
        
        <div className="absolute top-1/2 right-1/3 w-[800px] h-[800px] border-3 border-neutral-600/35 rounded-full" />
      </div>
    </motion.div>
  );
}
