#!/bin/bash

echo "🔨 Building portfolio for GitHub Pages..."

# Build the site
npm run build

echo "🔧 Fixing asset paths for GitHub Pages subdirectory..."

# Fix asset paths to be relative
cd dist/public
sed -i 's|src="/assets/|src="./assets/|g' index.html
sed -i 's|href="/assets/|href="./assets/|g' index.html
cd ../..

echo "📦 Copying to docs folder..."

# Update docs folder
rm -rf docs/*
cp -r dist/public/* docs/
touch docs/.nojekyll

echo "✅ Build complete! Files are ready in docs/"
echo ""
echo "📝 Next steps:"
echo "1. git add docs"
echo "2. git commit -m 'Update portfolio build'"
echo "3. git push origin main"
echo "4. Wait 1-2 minutes for GitHub Pages to update"
echo ""
echo "Your site will be at: https://cjichihoharvard.github.io/christopherichihocom/"
