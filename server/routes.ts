import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertGalleryPhotoSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog Posts API
  app.get("/api/blog-posts", async (req, res) => {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    const post = await storage.getBlogPost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  });

  app.post("/api/blog-posts", async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const post = await storage.createBlogPost(result.data);
    res.json(post);
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    const result = insertBlogPostSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const post = await storage.updateBlogPost(req.params.id, result.data);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    const success = await storage.deleteBlogPost(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ success: true });
  });

  // Gallery Photos API
  app.get("/api/gallery-photos", async (req, res) => {
    const photos = await storage.getAllGalleryPhotos();
    res.json(photos);
  });

  app.get("/api/gallery-photos/:id", async (req, res) => {
    const photo = await storage.getGalleryPhoto(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }
    res.json(photo);
  });

  app.post("/api/gallery-photos", async (req, res) => {
    const result = insertGalleryPhotoSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const photo = await storage.createGalleryPhoto(result.data);
    res.json(photo);
  });

  app.patch("/api/gallery-photos/:id", async (req, res) => {
    const result = insertGalleryPhotoSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const photo = await storage.updateGalleryPhoto(req.params.id, result.data);
    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }
    res.json(photo);
  });

  app.delete("/api/gallery-photos/:id", async (req, res) => {
    const success = await storage.deleteGalleryPhoto(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Photo not found" });
    }
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
