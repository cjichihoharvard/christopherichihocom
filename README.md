# Christopher's Portfolio Website

A static portfolio website ready for GitHub Pages deployment.

## 📝 How to Edit Your Content

### Edit Blog Posts

Open: **`client/src/data/blogPosts.ts`**

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "1",  // Keep unique
    title: "Your Blog Title Here",
    date: "2024-01-15",  // Format: YYYY-MM-DD
    excerpt: "A short preview text",
    content: "The full blog post content goes here..."
  },
  // Add more posts by copying the structure above
];
```

### Edit Gallery Photos

Open: **`client/src/data/galleryPhotos.ts`**

```typescript
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "1",  // Keep unique
    src: "https://your-image-url.com/photo.jpg",  // Image URL
    caption: "Photo description"
  },
  // Add more photos here
];
```

## 🚀 Deploy to GitHub Pages

### Step 1: Build Your Site
```bash
npm run build
```

This creates static files in **`dist/public/`**

### Step 2: Push to GitHub

**First time setup:**
```bash
# Copy build files to docs folder
mkdir -p docs
cp -r dist/public/* docs/
cp dist/public/.nojekyll docs/

# Commit and push
git add .
git commit -m "Add portfolio build"
git push origin main
```

**After making changes:**
```bash
# Rebuild
npm run build

# Update docs folder
rm -rf docs/*
cp -r dist/public/* docs/
cp dist/public/.nojekyll docs/

# Push to GitHub
git add docs
git commit -m "Update portfolio"
git push
```

### Step 3: Configure GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source":
   - Branch: **main**
   - Folder: **/docs**
4. Click **Save**
5. Your site will be live at: `https://your-username.github.io/your-repo-name/`

## 🔄 Making Updates

1. **Edit content** in `client/src/data/` files
2. **Test locally**: `npm run dev`
3. **Build**: `npm run build`
4. **Copy to docs**: `cp -r dist/public/* docs/`
5. **Push to GitHub**: `git add . && git commit -m "Update" && git push`
6. **Wait 1-2 minutes** for GitHub Pages to update

## 📁 Important Files

- `client/src/data/blogPosts.ts` - Your blog content
- `client/src/data/galleryPhotos.ts` - Your gallery images
- `docs/` - Deployed files for GitHub Pages
- `DEPLOY.md` - Detailed deployment guide

## 💡 Tips

- Always rebuild after changing content
- Use high-quality image URLs for gallery photos
- Keep blog post IDs unique (1, 2, 3, etc.)
- GitHub Pages updates may take a few minutes to appear

## 🛠️ Development

Run locally:
```bash
npm run dev
```

Visit: `http://localhost:5000`
