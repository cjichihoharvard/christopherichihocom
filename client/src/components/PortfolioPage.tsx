import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "./Navigation";
import BlogSection from "./BlogSection";
import GallerySection from "./GallerySection";
import PokerSection from "./PokerSection";
import ContactSection from "./ContactSection";

interface PortfolioPageProps {
  onHomeClick?: () => void;
}

export default function PortfolioPage({ onHomeClick }: PortfolioPageProps) {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.5, 0.8]);

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
        <PokerSection />
      </div>

      <div className="py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Christopher. Built with passion and precision.</p>
      </div>

      {/* Dynamic scroll-based greyscale background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Animated base layer */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-br from-neutral-200/70 via-neutral-100/50 to-neutral-50/30" 
        />

        {/* Moving gradient blobs that respond to scroll */}
        <motion.div 
          style={{ y: y1, scale }}
          className="absolute -top-20 left-0 w-[1000px] h-[1000px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-600/50 via-neutral-500/30 to-transparent blur-3xl" />
        </motion.div>

        <motion.div 
          style={{ y: y2, rotate }}
          className="absolute top-40 right-0 w-[900px] h-[900px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-700/45 via-neutral-600/25 to-transparent blur-3xl" />
        </motion.div>

        <motion.div 
          style={{ y: y3, scale }}
          className="absolute top-2/3 left-1/3 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-600/40 via-neutral-500/25 to-transparent blur-3xl" />
        </motion.div>

        {/* Rotating geometric shapes */}
        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute top-20 left-20 w-[500px] h-[500px] border-4 border-neutral-600/50"
        />
        
        <motion.div 
          style={{ y: y2, rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
          className="absolute top-1/3 right-20 w-[400px] h-[400px] border-4 border-neutral-700/50 rounded-full"
        />

        {/* Moving diagonal lines */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0"
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-gradient-to-r from-transparent via-neutral-600/40 to-transparent"
              style={{
                width: "250%",
                top: `${i * 6.66}%`,
                left: "-75%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </motion.div>

        {/* Animated grid pattern */}
        <motion.div 
          style={{ 
            y: y2,
            backgroundImage: `
              linear-gradient(to right, rgb(115 115 115 / 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(115 115 115 / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          className="absolute inset-0"
        />

        {/* Scroll-responsive circles */}
        <motion.div 
          style={{ scale, y: y1 }}
          className="absolute top-0 left-1/3 w-[1000px] h-[1000px] border-3 border-neutral-600/40 rounded-full"
        />
        
        <motion.div 
          style={{ scale, y: y3 }}
          className="absolute top-1/2 right-1/3 w-[800px] h-[800px] border-4 border-neutral-700/45 rounded-full"
        />
      </div>
    </motion.div>
  );
}
