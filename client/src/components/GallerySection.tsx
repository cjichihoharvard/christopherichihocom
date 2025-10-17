import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { GalleryPhoto } from "@shared/schema";

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data: photos = [], isLoading } = useQuery<GalleryPhoto[]>({
    queryKey: ["/api/gallery-photos"],
  });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="gallery"
    >
      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide mb-20 text-center"
        >
          Gallery
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading && (
            <div className="col-span-full text-center text-muted-foreground">Loading gallery...</div>
          )}
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 }
              }}
              className="relative aspect-square overflow-hidden rounded-lg group"
              style={{ transformStyle: "preserve-3d" }}
              data-testid={`gallery-photo-${photo.id}`}
            >
              <motion.img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-4"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white font-medium">{photo.caption}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
