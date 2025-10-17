import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

//todo: remove mock functionality
const mockPosts = [
  {
    id: 1,
    title: "The Art of the Pivot",
    date: "March 15, 2025",
    excerpt: "Sometimes the best move is knowing when to change direction. Lessons from the poker table applied to startups.",
  },
  {
    id: 2,
    title: "Why I Love Bad Beats",
    date: "March 10, 2025",
    excerpt: "Every bad beat is a masterclass in probability, psychology, and resilience. Here's what they've taught me.",
  },
  {
    id: 3,
    title: "Learning in Public",
    date: "March 5, 2025",
    excerpt: "Sharing your journey—wins and losses—creates connection and accelerates growth. Here's why I believe in it.",
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="blog"
    >
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide mb-20 text-center"
        >
          Blog
        </motion.h2>

        <div className="space-y-6">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`blog-post-${post.id}`}
            >
              <Card className="p-6 hover-elevate">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    data-testid={`button-read-post-${post.id}`}
                  >
                    {expandedPost === post.id ? "Close" : "Read"}
                  </Button>
                </div>
                {expandedPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t text-muted-foreground"
                  >
                    <p className="leading-relaxed">
                      Full blog post content would go here. This is a placeholder for the actual article content.
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
