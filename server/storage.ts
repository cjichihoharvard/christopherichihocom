import { 
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type GalleryPhoto,
  type InsertGalleryPhoto
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  // Gallery photo methods
  getAllGalleryPhotos(): Promise<GalleryPhoto[]>;
  getGalleryPhoto(id: string): Promise<GalleryPhoto | undefined>;
  createGalleryPhoto(photo: InsertGalleryPhoto): Promise<GalleryPhoto>;
  updateGalleryPhoto(id: string, photo: Partial<InsertGalleryPhoto>): Promise<GalleryPhoto | undefined>;
  deleteGalleryPhoto(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;
  private galleryPhotos: Map<string, GalleryPhoto>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.galleryPhotos = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost,
      content: insertPost.content ?? null,
      id, 
      createdAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    
    const updated: BlogPost = { ...existing, ...updates };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Gallery photo methods
  async getAllGalleryPhotos(): Promise<GalleryPhoto[]> {
    return Array.from(this.galleryPhotos.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getGalleryPhoto(id: string): Promise<GalleryPhoto | undefined> {
    return this.galleryPhotos.get(id);
  }

  async createGalleryPhoto(insertPhoto: InsertGalleryPhoto): Promise<GalleryPhoto> {
    const id = randomUUID();
    const photo: GalleryPhoto = { 
      ...insertPhoto, 
      id, 
      createdAt: new Date() 
    };
    this.galleryPhotos.set(id, photo);
    return photo;
  }

  async updateGalleryPhoto(id: string, updates: Partial<InsertGalleryPhoto>): Promise<GalleryPhoto | undefined> {
    const existing = this.galleryPhotos.get(id);
    if (!existing) return undefined;
    
    const updated: GalleryPhoto = { ...existing, ...updates };
    this.galleryPhotos.set(id, updated);
    return updated;
  }

  async deleteGalleryPhoto(id: string): Promise<boolean> {
    return this.galleryPhotos.delete(id);
  }
}

export const storage = new MemStorage();
