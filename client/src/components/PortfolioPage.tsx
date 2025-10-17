import { motion } from "framer-motion";
import Navigation from "./Navigation";
import AboutSection from "./AboutSection";
import JourneyTimeline from "./JourneyTimeline";
import ProjectsGrid from "./ProjectsGrid";
import PhilosophySection from "./PhilosophySection";
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

      <div className="relative">
        <AboutSection />
        <JourneyTimeline />
        <ProjectsGrid />
        <PhilosophySection />
        <ContactSection />
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
}
