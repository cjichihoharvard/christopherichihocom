#!/bin/bash

echo "🚀 Building for GitHub Pages..."

# Create a temporary vite config that extends the main one
cat > vite.config.github.ts << 'EOF'
import { defineConfig } from "vite";
import baseConfig from "./vite.config";

export default defineConfig({
  ...baseConfig,
  base: "/christopherichihocom/"
});
EOF

# Build using the GitHub Pages config
npx vite build --config vite.config.github.ts

# Clean up
rm vite.config.github.ts

echo "📦 Copying to docs folder..."
rm -rf docs/*
cp -r dist/public/* docs/
touch docs/.nojekyll

# Copy index.html to 404.html for SPA routing
cp docs/index.html docs/404.html

echo "✅ Build complete! Files ready in docs/"
ls -la docs/

echo ""
echo "📝 Next steps:"
echo "1. git add docs client/src/App.tsx"
echo "2. git commit -m 'Deploy to GitHub Pages'"
echo "3. git push origin main"
echo "4. Wait 2-3 minutes and visit:"
echo "   https://cjichihoharvard.github.io/christopherichihocom/"
