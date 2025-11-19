# Deploying to GitHub Pages

This portfolio is now configured as a **static website** that can be deployed to GitHub Pages.

## How to Edit Content

### Edit Blog Posts
Edit the file: `client/src/data/blogPosts.ts`

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Your Blog Title",
    date: "2024-01-15",
    excerpt: "A short preview of your post",
    content: "The full content of your blog post goes here."
  },
  // Add more posts here
];
```

### Edit Gallery Photos
Edit the file: `client/src/data/galleryPhotos.ts`

```typescript
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "1",
    src: "https://your-image-url.com/photo.jpg",
    caption: "Photo description"
  },
  // Add more photos here
];
```

## Building for Deployment

1. **Build the static files:**
   ```bash
   npm run build
   ```

2. **The built files will be in:** `dist/public/`

## Deploying to GitHub Pages

### Method 1: Using GitHub Pages (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```

2. **Copy built files to a `docs` folder or `gh-pages` branch:**

   **Option A - Using `docs` folder:**
   ```bash
   # Create docs folder in root
   mkdir -p docs
   # Copy built files
   cp -r dist/public/* docs/
   # Commit and push
   git add docs
   git commit -m "Deploy to GitHub Pages"
   git push
   ```

   **Option B - Using `gh-pages` branch:**
   ```bash
   # Install gh-pages package
   npm install --save-dev gh-pages
   
   # Deploy (add this to package.json scripts: "deploy": "gh-pages -d dist/public")
   npm run deploy
   ```

3. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select:
     - **Branch:** `main` (or `gh-pages` if using Option B)
     - **Folder:** `/docs` (if using Option A) or `/ (root)` (if using Option B)
   - Click **Save**

4. **Your site will be live at:**
   ```
   https://your-username.github.io/your-repo-name/
   ```

### Method 2: Manual Upload

1. Build the project: `npm run build`
2. Copy everything from `dist/public/` to your GitHub Pages repository
3. Push to GitHub

## Workflow

1. **Make changes** to blog posts or gallery in `client/src/data/` files
2. **Test locally** with `npm run dev`
3. **Build** with `npm run build`
4. **Deploy** by copying `dist/public/` contents to GitHub Pages

## Important Files

- `dist/public/.nojekyll` - Tells GitHub Pages not to use Jekyll
- `dist/public/404.html` - Handles client-side routing
- `dist/public/index.html` - Main entry point
- `dist/public/assets/` - All bundled CSS and JS

## Notes

- The website is now **100% static** - no backend server needed
- All content is stored in `client/src/data/` files
- After making content changes, you need to rebuild and redeploy
- GitHub Pages may take a few minutes to update after pushing changes
