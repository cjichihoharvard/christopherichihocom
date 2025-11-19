import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "../lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BlogPost, GalleryPhoto, InsertBlogPost, InsertGalleryPhoto } from "@shared/schema";
import { insertBlogPostSchema, insertGalleryPhotoSchema } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, Plus, Save, X, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "harvard2025";

export default function AdminPage() {
  const { toast } = useToast();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  
  // Blog post editing state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  // Gallery photo editing state
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);

  // Blog post form with validation
  const postForm = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: { title: "", date: "", excerpt: "", content: "" },
  });

  // Gallery photo form with validation
  const photoForm = useForm<InsertGalleryPhoto>({
    resolver: zodResolver(insertGalleryPhotoSchema),
    defaultValues: { src: "", caption: "" },
  });

  // Fetch data
  const { data: posts = [] } = useQuery<BlogPost[]>({ queryKey: ["/api/blog-posts"] });
  const { data: photos = [] } = useQuery<GalleryPhoto[]>({ queryKey: ["/api/gallery-photos"] });

  // Blog post mutations
  const createPostMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => apiRequest("POST", "/api/blog-posts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      postForm.reset();
      toast({ title: "Blog post created successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to create post", 
        description: error?.message || "Please try again",
        variant: "destructive" 
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) =>
      apiRequest("PATCH", `/api/blog-posts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setEditingPostId(null);
      postForm.reset();
      toast({ title: "Blog post updated successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to update post", 
        description: error?.message || "Please try again",
        variant: "destructive" 
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/blog-posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({ title: "Blog post deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to delete post", 
        description: error?.message || "Please try again",
        variant: "destructive" 
      });
    },
  });

  // Gallery photo mutations
  const createPhotoMutation = useMutation({
    mutationFn: (data: InsertGalleryPhoto) => apiRequest("POST", "/api/gallery-photos", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery-photos"] });
      photoForm.reset();
      toast({ title: "Photo added successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to add photo", 
        description: error?.message || "Please try again",
        variant: "destructive" 
      });
    },
  });

  const updatePhotoMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertGalleryPhoto> }) =>
      apiRequest("PATCH", `/api/gallery-photos/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery-photos"] });
      setEditingPhotoId(null);
      photoForm.reset();
      toast({ title: "Photo updated successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to update photo", 
        description: error?.message || "Please try again",
        variant: "destructive" 
      });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/gallery-photos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery-photos"] });
      toast({ title: "Photo deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to delete photo", 
        description: error?.message || "Please try again",
        variant: "destructive" 
      });
    },
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuthenticated", "true");
      setShowError(false);
    } else {
      setShowError(true);
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lock className="w-6 h-6" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShowError(false);
                  }}
                  placeholder="Enter admin password"
                  className={showError ? "border-destructive" : ""}
                  data-testid="input-admin-password"
                  autoFocus
                />
                {showError && (
                  <p className="text-sm text-destructive" data-testid="text-login-error">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" data-testid="button-admin-login">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handlers
  const handleEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    postForm.reset({ 
      title: post.title, 
      date: post.date, 
      excerpt: post.excerpt, 
      content: post.content || "" 
    });
  };

  const handleSavePost = postForm.handleSubmit((data) => {
    if (editingPostId) {
      updatePostMutation.mutate({ id: editingPostId, data });
    } else {
      createPostMutation.mutate(data);
    }
  });

  const handleCancelPost = () => {
    setEditingPostId(null);
    postForm.reset({ title: "", date: "", excerpt: "", content: "" });
  };

  const handleEditPhoto = (photo: GalleryPhoto) => {
    setEditingPhotoId(photo.id);
    photoForm.reset({ src: photo.src, caption: photo.caption });
  };

  const handleSavePhoto = photoForm.handleSubmit((data) => {
    if (editingPhotoId) {
      updatePhotoMutation.mutate({ id: editingPhotoId, data });
    } else {
      createPhotoMutation.mutate(data);
    }
  });

  const handleCancelPhoto = () => {
    setEditingPhotoId(null);
    photoForm.reset({ src: "", caption: "" });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Content Management Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            Logout
          </Button>
        </div>

        {/* Blog Posts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Blog Posts</span>
              <Button
                onClick={() => {
                  setEditingPostId(null);
                  postForm.reset({ title: "", date: "", excerpt: "", content: "" });
                }}
                data-testid="button-new-post"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Post Form */}
            <Form {...postForm}>
              <form onSubmit={handleSavePost} className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <FormField
                  control={postForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter post title" data-testid="input-post-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={postForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. March 15, 2025" data-testid="input-post-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={postForm.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Short description" data-testid="input-post-excerpt" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={postForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Content (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          value={field.value || ""}
                          placeholder="Full blog post content" 
                          rows={6} 
                          data-testid="input-post-content" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createPostMutation.isPending || updatePostMutation.isPending}
                    data-testid="button-save-post"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingPostId ? "Update Post" : "Create Post"}
                  </Button>
                  {editingPostId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelPost}
                      data-testid="button-cancel-post"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            {/* Posts List */}
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-card border rounded-lg"
                  data-testid={`post-item-${post.id}`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditPost(post)}
                      data-testid={`button-edit-post-${post.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deletePostMutation.mutate(post.id)}
                      data-testid={`button-delete-post-${post.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gallery Photos Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Gallery Photos</span>
              <Button
                onClick={() => {
                  setEditingPhotoId(null);
                  photoForm.reset({ src: "", caption: "" });
                }}
                data-testid="button-new-photo"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Photo
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photo Form */}
            <Form {...photoForm}>
              <form onSubmit={handleSavePhoto} className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <FormField
                  control={photoForm.control}
                  name="src"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter image URL or path" data-testid="input-photo-src" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={photoForm.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caption</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter photo caption" data-testid="input-photo-caption" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button 
                    type="submit"
                    disabled={createPhotoMutation.isPending || updatePhotoMutation.isPending}
                    data-testid="button-save-photo"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingPhotoId ? "Update Photo" : "Add Photo"}
                  </Button>
                  {editingPhotoId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelPhoto}
                      data-testid="button-cancel-photo"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            {/* Photos List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-card border rounded-lg overflow-hidden"
                  data-testid={`photo-item-${photo.id}`}
                >
                  <img src={photo.src} alt={photo.caption} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <p className="text-sm mb-3">{photo.caption}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPhoto(photo)}
                        data-testid={`button-edit-photo-${photo.id}`}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePhotoMutation.mutate(photo.id)}
                        data-testid={`button-delete-photo-${photo.id}`}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
