import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "./Navigation";
import BlogSection from "./BlogSection";
import GallerySection from "./GallerySection";
import PokerSection from "./PokerSection";
import ContactSection from "./ContactSection";
import ResumeSection from "./ResumeSection";

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
        <ResumeSection />
        <PokerSection />
      </div>

      <div className="py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Christopher. Built with passion and precision.</p>
      </div>

      {/* Dynamic scroll-based colorful abstract background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Animated base layer with soft gradient */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-pink-50/20" 
        />

        {/* Soft colored gradient blobs that move with scroll */}
        <motion.div 
          style={{ y: y1, scale, rotate }}
          className="absolute -top-20 left-0 w-[1200px] h-[1200px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-blue-300/30 via-blue-200/15 to-transparent blur-3xl" />
        </motion.div>

        <motion.div 
          style={{ y: y2, scale }}
          className="absolute top-1/4 right-0 w-[1000px] h-[1000px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-purple-300/25 via-purple-200/12 to-transparent blur-3xl" />
        </motion.div>

        <motion.div 
          style={{ y: y3, rotate }}
          className="absolute top-1/2 left-1/4 w-[900px] h-[900px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-pink-300/20 via-pink-200/10 to-transparent blur-3xl" />
        </motion.div>

        <motion.div 
          style={{ y: y1, scale }}
          className="absolute top-3/4 right-1/4 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-teal-300/25 via-teal-200/12 to-transparent blur-3xl" />
        </motion.div>

        {/* Soft rotating geometric shapes */}
        <motion.div 
          style={{ y: y2, rotate }}
          className="absolute top-32 left-32 w-[600px] h-[600px] border-2 border-blue-300/20"
        />
        
        <motion.div 
          style={{ y: y3, rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
          className="absolute top-1/3 right-32 w-[500px] h-[500px] border-2 border-purple-300/20 rounded-full"
        />

        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute top-2/3 left-1/2 w-[400px] h-[400px] border-2 border-pink-300/15"
        />

        {/* Soft diagonal waves */}
        <motion.div 
          style={{ y: y2, opacity }}
          className="absolute inset-0"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent"
              style={{
                width: "250%",
                top: `${i * 8.33}%`,
                left: "-75%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </motion.div>

        {/* Animated soft grid */}
        <motion.div 
          style={{ 
            y: y3,
            backgroundImage: `
              linear-gradient(to right, rgb(147 197 253 / 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(147 197 253 / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
          className="absolute inset-0"
        />

        {/* Soft colored circles floating throughout */}
        <motion.div 
          style={{ scale, y: y1, rotate }}
          className="absolute top-0 left-1/3 w-[1100px] h-[1100px] border border-purple-300/15 rounded-full"
        />
        
        <motion.div 
          style={{ scale, y: y2 }}
          className="absolute top-1/2 right-1/3 w-[900px] h-[900px] border-2 border-pink-300/15 rounded-full"
        />

        <motion.div 
          style={{ scale, y: y3, rotate }}
          className="absolute bottom-0 left-1/4 w-[700px] h-[700px] border border-teal-300/20 rounded-full"
        />
      </div>
    </motion.div>
  );
}
