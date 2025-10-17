import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 100,
        y: (e.clientY / window.innerHeight - 0.5) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative bg-gradient-to-b from-background via-background to-accent/5 overflow-hidden"
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
        {/* Animated greyscale gradient mesh */}
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-white/20 via-neutral-500/15 to-transparent blur-3xl animate-pulse" />
        </motion.div>

        <motion.div
          style={{ y: y2, rotate: rotate2, scale }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-400/25 via-neutral-600/15 to-transparent blur-3xl" />
        </motion.div>

        {/* Geometric shapes that follow scroll */}
        <motion.div
          style={{ 
            y: y1,
            x: mousePosition.x,
          }}
          className="absolute top-20 left-10 w-96 h-96 border-2 border-neutral-300/20 rotate-45"
          animate={{
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          style={{ 
            y: y2,
            x: -mousePosition.x,
          }}
          className="absolute bottom-40 right-20 w-64 h-64 border-2 border-neutral-400/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Diagonal lines */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-neutral-400/10 to-transparent"
              style={{
                width: "200%",
                top: `${i * 15}%`,
                left: "-50%",
                transform: "rotate(-15deg)",
              }}
              animate={{
                x: [0, 100, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Particle dots */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neutral-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Large animated circles */}
        <motion.div
          style={{ scale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-neutral-300/10 rounded-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          style={{ scale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border-2 border-neutral-400/15 rounded-full"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Mouse-following gradient orb */}
        <motion.div
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-radial from-neutral-300/20 to-transparent blur-3xl"
        />
      </div>
    </motion.div>
  );
}
