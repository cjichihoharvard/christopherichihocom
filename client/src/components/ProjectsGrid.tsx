import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dashboardImage from "@assets/generated_images/Web_dashboard_project_screenshot_f3bc0d09.png";
import mobileAppImage from "@assets/generated_images/Mobile_app_project_mockup_195fc667.png";
import ecommerceImage from "@assets/generated_images/E-commerce_website_project_screenshot_0e80b13f.png";

const projects = [
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform with interactive charts and insights.",
    image: dashboardImage,
    technologies: ["React", "TypeScript", "D3.js"],
  },
  {
    title: "Mobile Chat App",
    description: "Seamless messaging experience with real-time notifications and media sharing.",
    image: mobileAppImage,
    technologies: ["React Native", "Firebase", "WebSocket"],
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack shopping experience with payment integration and inventory management.",
    image: ecommerceImage,
    technologies: ["Next.js", "Stripe", "PostgreSQL"],
  },
];

export default function ProjectsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="projects"
    >
      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide mb-20 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              data-testid={`project-card-${index}`}
            >
              <Card className="group overflow-hidden hover-elevate h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button
                      size="sm"
                      variant="outline"
                      className="backdrop-blur-sm bg-background/20 border-white/30 text-white hover:bg-white/30"
                      data-testid={`button-view-project-${index}`}
                    >
                      View Project
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
