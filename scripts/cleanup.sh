#!/bin/bash

# ============================================================
# Project Cleanup Script
# ============================================================
# This script cleans up all documentation, examples, and 
# resets the main page content for a fresh start.
# 
# Usage: bash scripts/cleanup.sh
# 
# This will:
# 1. Delete all documentation files in docs/
# 2. Delete all example files in examples/
# 3. Delete the example route in app/example/
# 4. Clear the main page (app/page.tsx) content
# 5. Reset the README.md to minimal template
# ============================================================

set -e  # Exit on error

echo "🧹 Starting cleanup process..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Confirm before proceeding
read -p "⚠️  This will delete documentation, examples, and reset the main page. Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cleanup cancelled."
    exit 1
fi

echo ""
echo -e "${YELLOW}Cleaning up...${NC}"
echo ""

# Delete docs directory
if [ -d "docs" ]; then
    echo "🗑️  Deleting docs directory..."
    rm -rf docs
    echo -e "${GREEN}✓ Deleted docs/${NC}"
fi

# Delete examples directory
if [ -d "examples" ]; then
    echo "🗑️  Deleting examples directory..."
    rm -rf examples
    echo -e "${GREEN}✓ Deleted examples/${NC}"
fi

# Delete app/example directory
if [ -d "app/example" ]; then
    echo "🗑️  Deleting app/example directory..."
    rm -rf app/example
    echo -e "${GREEN}✓ Deleted app/example/${NC}"
fi

# Reset app/page.tsx to minimal content
if [ -f "app/page.tsx" ]; then
    echo "🗑️  Resetting app/page.tsx..."
    cat > app/page.tsx << 'EOF'
"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your Next.js starter is ready. Start building!
        </p>
      </div>
    </div>
  );
}
EOF
    echo -e "${GREEN}✓ Reset app/page.tsx${NC}"
fi

# Reset README.md to minimal content
if [ -f "README.md" ]; then
    echo "🗑️  Resetting README.md..."
    cat > README.md << 'EOF'
# Project Name

A Next.js 16 application built with TypeScript and Tailwind CSS.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
EOF
    echo -e "${GREEN}✓ Reset README.md${NC}"
fi

echo ""
echo -e "${GREEN}✅ Cleanup complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "   1. Review app/page.tsx - customize the home page"
echo "   2. Update README.md - add your project information"
echo "   3. Create new components and features"
echo ""
echo "💡 Tip: Git will track these deletions. You can undo with: git checkout ."
echo ""
