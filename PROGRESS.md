# Project Progress Documentation

## Overview

This project is a custom E-commerce storefront built with **Node.js**, **Express**, and **Nunjucks** (configured with a custom `.psp` extension). It features a modular "Sections" architecture similar to modern e-commerce platforms, allowing for flexible layout management.

## Architecture

### 1. Tech Stack

- **Server**: Express.js
- **Templating**: Nunjucks (files use `.psp` extension)
- **Styling**: Custom CSS (`theme.css`) with CSS Variables
- **Data Source**: Static JavaScript/JSON files in `data/` (simulating a database)

### 2. Directory Structure

```
├── core/               # System files
│   ├── data/           # Data layer (Products, Shop Info, Nav, Sections)
│   └── server/         # Express app configuration
├── public/             # Static assets (CSS, Images)
├── config/             # Layout configurations
├── layouts/            # Base layouts (layout.psp)
├── sections/           # Reusable UI components (header, hero, etc.)
└── templates/          # Page templates (index, product, etc.)
```

## Key Features Implemented

### A. Data Layer

- **Products (`data/products.js`)**: Rich product data including variants, options (Size, Color), and images.
- **Shop Info (`data/shop.js`)**: Centralized store metadata (Name, Logo, Contact).
- **Navigation (`data/nav.js`)**: Header and Footer menu links.
- **Section Configuration (`data/sections.json`)**: Defines groups of sections (e.g., `headerGroup`) to control layout order.

### B. Modular "Sections" System

We moved away from monolithic templates to a modular approach:

- **Header Group**: Composed of 3 distinct sections defined in `sections.json`:
  1.  `announcement-bar.psp`: Top bar for promotions.
  2.  `header.psp`: Main logo, navigation, and cart.
  3.  `category-bar.psp`: Secondary navigation for categories.
- **Homepage Sections**: Broken down into `hero.psp`, `featured-categories.psp`, and `featured-products.psp`.

### C. Templating & Routing

- **Dynamic Layout (`layout.psp`)**: Automatically loops through configured section groups to render the page structure.
- **Routes (`core/server/app.js`)**:
  - `/`: Homepage
  - `/products`: Product listing with category filtering.
  - `/product/:id`: Detailed product view with variant selection.
  - `/page/:slug`: Dynamic rendering for static pages (About, Contact).

### D. Styling

- **`theme.css`**: A comprehensive stylesheet using CSS variables for easy theming. Includes styles for:
  - Responsive Grid Layouts
  - Product Cards & Grids
  - Navigation & Mega Menus
  - Section-specific styles (Announcement Bar, Hero).

## Recent Updates

- **Image Integration**: Updated product data with real image URLs.
- **Header Refactor**: Converted the hardcoded header into a dynamic "Header Group" driven by JSON configuration.

## Next Steps

- [ ] Modularize the Footer into a "Footer Group".
- [ ] Implement Cart functionality (currently UI only).
- [ ] Add client-side interactivity for Variant selection.
