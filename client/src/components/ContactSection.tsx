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
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="contact"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center space-y-12"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide">
          Let's Connect
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I'm always interested in hearing about new opportunities, collaborations,
          or just having a conversation about technology and innovation.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            data-testid="button-email"
            onClick={() => console.log('Email clicked')}
          >
            <Mail className="w-5 h-5" />
            Email Me
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            data-testid="button-github"
            onClick={() => console.log('GitHub clicked')}
          >
            <Github className="w-5 h-5" />
            GitHub
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            data-testid="button-linkedin"
            onClick={() => console.log('LinkedIn clicked')}
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </Button>
        </div>

        <div className="pt-12 text-sm text-muted-foreground">
          <p>© 2025 Christopher. Built with passion and precision.</p>
        </div>
      </motion.div>
    </section>
  );
}
