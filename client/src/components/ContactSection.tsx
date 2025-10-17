import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24 relative overflow-hidden"
      id="contact"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="max-w-3xl w-full text-center space-y-12 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          I'm always interested in hearing about new opportunities, collaborations,
          or just having a conversation about technology and innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {[
            { icon: Mail, label: "Email Me", testId: "button-email" },
            { icon: Github, label: "GitHub", testId: "button-github" },
            { icon: Linkedin, label: "LinkedIn", testId: "button-linkedin" },
          ].map((item, index) => (
            <motion.div
              key={item.testId}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                data-testid={item.testId}
                onClick={() => console.log(`${item.label} clicked`)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-12 text-sm text-muted-foreground"
        >
          <p>© 2025 Christopher. Built with passion and precision.</p>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
    </section>
  );
}
