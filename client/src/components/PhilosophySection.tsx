import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

const values = [
  {
    title: "Continuous Learning",
    quote: "Every challenge is an opportunity to grow and evolve.",
  },
  {
    title: "User-Centric Design",
    quote: "Technology should serve people, not the other way around.",
  },
  {
    title: "Clean Code",
    quote: "Simplicity is the ultimate sophistication.",
  },
  {
    title: "Collaboration",
    quote: "Great things are never built in isolation.",
  },
];

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="philosophy"
    >
      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide mb-20 text-center"
        >
          Philosophy & Values
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`value-card-${index}`}
            >
              <Card className="p-8 hover-elevate h-full">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-lg text-muted-foreground italic leading-relaxed">
                  "{value.quote}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
