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
        {/* Large dramatic greyscale gradients that move on scroll */}
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute -top-40 -left-40 w-[1200px] h-[1200px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-800/30 via-neutral-600/20 to-transparent blur-3xl" />
        </motion.div>

        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute top-1/4 -right-40 w-[1000px] h-[1000px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-700/35 via-neutral-500/25 to-transparent blur-3xl" />
        </motion.div>

        <motion.div
          style={{ y: y1, scale }}
          className="absolute bottom-0 left-1/4 w-[900px] h-[900px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-600/30 via-neutral-400/20 to-transparent blur-3xl" />
        </motion.div>

        {/* Bold geometric shapes */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -300]),
            x: mousePosition.x * 0.5,
          }}
          className="absolute top-32 left-20 w-[500px] h-[500px] border-4 border-neutral-400/40"
          animate={{
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 400]),
            x: -mousePosition.x * 0.5,
          }}
          className="absolute bottom-32 right-20 w-[400px] h-[400px] border-4 border-neutral-500/40 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dramatic diagonal sweeping lines */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-neutral-600/30 to-transparent"
              style={{
                width: "250%",
                top: `${i * 10}%`,
                left: "-75%",
                transform: "rotate(-20deg)",
              }}
              animate={{
                x: [0, 200, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 8 + i * 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Large floating particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neutral-500/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Massive rotating circles */}
        <motion.div
          style={{ 
            scale,
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border-2 border-neutral-400/30 rounded-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          style={{ 
            scale,
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-4 border-neutral-500/35 rounded-full"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Grid pattern that moves on scroll */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 300]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]),
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(115 115 115 / 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(115 115 115 / 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
