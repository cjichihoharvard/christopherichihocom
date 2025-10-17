import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import profileImage from "@assets/generated_images/Professional_portrait_headshot_photo_1f736993.png";
import dashboardImage from "@assets/generated_images/Web_dashboard_project_screenshot_f3bc0d09.png";
import mobileAppImage from "@assets/generated_images/Mobile_app_project_mockup_195fc667.png";
import ecommerceImage from "@assets/generated_images/E-commerce_website_project_screenshot_0e80b13f.png";

//todo: remove mock functionality
const mockPhotos = [
  { id: 1, src: profileImage, caption: "On the course" },
  { id: 2, src: dashboardImage, caption: "Workspace vibes" },
  { id: 3, src: mobileAppImage, caption: "Game day" },
  { id: 4, src: ecommerceImage, caption: "Startup life" },
  { id: 5, src: profileImage, caption: "Lakers night" },
  { id: 6, src: dashboardImage, caption: "Poker face" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedPhoto, setSelectedPhoto] = useState<typeof mockPhotos[0] | null>(null);

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
          {mockPhotos.map((photo, index) => (
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
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
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

        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
            data-testid="gallery-modal"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
              data-testid="button-close-modal"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl w-full">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-auto rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg">{selectedPhoto.caption}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
