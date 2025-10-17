import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import profileImage from "@assets/generated_images/Professional_portrait_headshot_photo_1f736993.png";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center"
      >
        <div className="order-2 md:order-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide">
            About Me
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              From my earliest days at Landell Elementary to the halls of Harvard,
              my journey has been driven by an insatiable curiosity and a passion
              for creating meaningful digital experiences.
            </p>
            <p>
              I believe in the power of technology to transform lives and solve
              complex problems. My approach combines technical expertise with
              creative thinking, always striving to build solutions that are both
              elegant and impactful.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              mentoring aspiring developers, or contributing to open-source
              projects that make a difference.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-80 h-80 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                data-testid="img-profile"
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-destructive rounded-lg -z-10 opacity-30 blur-xl"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
