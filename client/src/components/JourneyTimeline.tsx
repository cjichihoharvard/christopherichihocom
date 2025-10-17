import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const milestones = [
  {
    year: "2025",
    title: "Harvard University",
    subtitle: "Graduate Studies",
    description: "Advanced research and specialization in cutting-edge technology.",
  },
  {
    year: "2021",
    title: "Boston University",
    subtitle: "Undergraduate",
    description: "Foundation in computer science and software engineering.",
  },
  {
    year: "2017",
    title: "Huntington Beach High School",
    subtitle: "High School",
    description: "Discovered passion for programming and technology.",
  },
  {
    year: "2013",
    title: "Lexington Middle School",
    subtitle: "Middle School",
    description: "Early exposure to computational thinking.",
  },
  {
    year: "2009",
    title: "Landell Elementary",
    subtitle: "Elementary School",
    description: "Where the journey began.",
  },
];

export default function JourneyTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="journey"
    >
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide mb-20 text-center"
        >
          My Journey
        </motion.h2>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-destructive to-transparent"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                data-testid={`timeline-item-${index}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"} pl-20 md:pl-0`}>
                  <div className={`${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-sm font-mono text-primary">{milestone.year}</span>
                    <h3 className="text-2xl font-semibold text-foreground mt-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.subtitle}</p>
                    <p className="text-muted-foreground mt-3">{milestone.description}</p>
                  </div>
                </div>

                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50"></div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
