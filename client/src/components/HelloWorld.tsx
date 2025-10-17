import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HelloWorldProps {
  onReveal: () => void;
}

export default function HelloWorld({ onReveal }: HelloWorldProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8"
    >
      <div className="text-center space-y-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-mono text-white mb-4"
        >
          Christopher James Ichiho
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-mono text-white"
        >
          Hello World.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-base text-white leading-relaxed space-y-1"
        >
          <p>I studied at:</p>
          <p>Landell Elementary,</p>
          <p>Lexington Middle School,</p>
          <p>Huntington Beach High School,</p>
          <p>Boston University (Undergrad),</p>
          <p>Harvard University (Grad).</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onReveal}
          className="mt-12 px-8 py-3 border border-white font-mono text-sm text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 mx-auto"
          data-testid="button-reveal-more"
        >
          More
          <div className="flex gap-0.5 animate-bounce-slow">
            <ChevronDown className="w-3 h-3" />
            <ChevronDown className="w-3 h-3" />
            <ChevronDown className="w-3 h-3" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
