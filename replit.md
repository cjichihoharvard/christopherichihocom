# Christopher's Portfolio Website

## Overview

A transformative portfolio website that begins with a minimalist "Hello World" landing page and unveils into a sophisticated, animated personal portfolio. The site features a unique two-phase design approach: starting with a bare-bones monospace interface that dramatically transitions into a modern, gradient-rich showcase of projects, experiences, and personal philosophy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state and data fetching

**UI Component System**
- **Design System**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Typography**: Inter and Raleway fonts from Google Fonts
- **Color System**: CSS HSL variables with light/dark mode support via the "new-york" Shadcn style

**Animation & Motion**
- **Primary**: Framer Motion for page transitions, scroll animations, and component reveals
- **Scroll Effects**: Scroll-triggered animations with parallax backgrounds
- **Transition Design**: Progressive revelation from minimal to sophisticated design

### Design Pattern

**Two-Phase Experience**:
1. **Phase 1 (Hello World)**: Monospace typography, pure black/white colors, centered minimal layout
2. **Phase 2 (Portfolio)**: Gradient backgrounds (charcoal to purple/indigo), modern typography, section-based scrolling layout

**Key Sections**:
- Contact (with social links)
- Blog (expandable posts)
- Gallery (3D card effects with hover transforms)
- Resume (interactive Blackjack game for unlocking)
- Poker Section (hand history with filter functionality)
- About, Journey Timeline, Philosophy, and Projects sections

### Backend Architecture

**Server Framework**: Express.js with TypeScript
- **Development Mode**: Vite middleware for HMR and development server
- **Production Mode**: Static file serving with pre-built frontend assets
- **API Design**: RESTful API pattern with `/api` prefix routing

**Storage Layer**:
- **Current Implementation**: In-memory storage (MemStorage class)
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect configured
- **Database Config**: Prepared for Neon serverless PostgreSQL via DATABASE_URL environment variable

**Storage Interface**:
- User CRUD operations (getUser, getUserByUsername, createUser)
- Extensible IStorage interface pattern for future database implementation

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives (accordion, dialog, dropdown, tooltip, etc.)
- Embla Carousel for image galleries
- CMDK for command palette functionality

**Database & ORM**:
- Drizzle ORM v0.39.1 with Drizzle-Zod for schema validation
- Neon serverless PostgreSQL adapter (@neondatabase/serverless)
- Connect-pg-simple for PostgreSQL session storage

**Form & Validation**:
- React Hook Form with @hookform/resolvers
- Zod for schema validation
- Date-fns for date manipulation

**Development Tools**:
- Replit-specific plugins (vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner)
- TypeScript strict mode enabled
- Path aliases configured (@/ for client/src, @shared for shared, @assets for attached_assets)

**Build & Deployment**:
- esbuild for server-side bundling
- Vite for client-side bundling
- Environment-based configuration (NODE_ENV)

**Asset Management**:
- Generated images stored in attached_assets/generated_images
- Custom Vite alias for @assets path resolution