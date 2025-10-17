import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HelloWorld from "@/components/HelloWorld";
import PortfolioPage from "@/components/PortfolioPage";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="hello-world"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <HelloWorld onReveal={handleReveal} />
          </motion.div>
        )}
      </AnimatePresence>

      {isRevealed && <PortfolioPage />}
    </div>
  );
}
