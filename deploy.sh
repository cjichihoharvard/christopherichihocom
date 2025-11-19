#!/bin/bash

# Portfolio Deployment Script for GitHub Pages
# This script builds your portfolio and prepares it for GitHub Pages deployment

echo "🚀 Building Christopher's Portfolio..."

# Build the static site
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed! Please fix errors and try again."
  exit 1
fi

echo "✅ Build complete!"

# Create docs directory if it doesn't exist
mkdir -p docs

echo "📦 Copying files to docs folder..."

# Remove old files
rm -rf docs/*

# Copy all built files including hidden files
cp -r dist/public/* docs/
cp dist/public/.nojekyll docs/

echo "✅ Files copied successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Review changes: git status"
echo "2. Commit: git add . && git commit -m \"Update portfolio\""
echo "3. Push: git push origin main"
echo "4. Wait 1-2 minutes for GitHub Pages to update"
echo ""
echo "Your site will be live at: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"
