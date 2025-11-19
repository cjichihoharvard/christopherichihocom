export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    caption: "Mountain landscape - Strategy requires perspective"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    caption: "Starry night - Finding patterns in chaos"
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    caption: "Peak view - The journey to the top"
  }
];
