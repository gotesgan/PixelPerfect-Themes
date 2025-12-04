# Project Documentation

## Overview

This is a Node.js web application built with **Express.js** and **Nunjucks** templating engine. It simulates an e-commerce storefront with product listings, categories, and content pages. The project uses a file-based data structure to mimic a CMS or database.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **View Engine**: Nunjucks (configured with `.psp` extension)
- **Styling**: CSS (served statically)

## Project Structure

```
├── data/               # Mock database/content files
│   ├── nav.js          # Navigation menu links
│   ├── pages.js        # Static content pages (About, Contact, etc.)
│   ├── products.js     # Products and Categories data
│   ├── sections.json   # Configuration for section groups
│   └── shop.js         # General shop settings (Name, Address, etc.)
├── public/             # Static assets
│   ├── style.css       # Base styles
│   └── theme.css       # Theme-specific styles
├── server/             # Server-side code
│   └── app.js          # Main application entry point
├── views/              # Nunjucks templates
│   ├── layouts/        # Base layouts
│   ├── sections/       # Reusable UI components
│   └── templates/      # Page-specific templates
└── package.json        # Dependencies and scripts
```

## Key Features

### 1. Templating System

The project uses Nunjucks with a custom `.psp` extension.

- **Layouts**: `views/layouts/layout.psp` is the master template. It includes the HTML skeleton, metadata, and dynamic header sections.
- **Sections**: Reusable components located in `views/sections/`. These are included in templates or dynamically rendered based on configuration.
- **Dynamic Headers**: The `layout.psp` reads `sections.headerGroup` from `data/sections.json` to determine which sections to render in the header (e.g., Announcement Bar, Header, Category Bar).

### 2. Data Management

Data is stored in JavaScript/JSON files in the `data/` directory, acting as a lightweight CMS.

- **Global Data**: `shop`, `nav`, and `sections` are made available to all views via `app.locals`.
- **Product Data**: Products and categories are imported from `data/products.js` and passed to specific routes.

### 3. Routing (`server/app.js`)

- **Home (`/`)**: Renders `templates/index.psp` with featured products.
- **Products (`/products`)**: Lists all products with optional category filtering via query parameter (`?category=ID`).
- **Product Detail (`/product/:id`)**: Renders individual product details.
- **Dynamic Pages (`/page/:slug`)**: Renders content pages defined in `data/pages.js`.
- **Fallback (`/:slug`)**: Attempts to match root-level slugs to pages (e.g., `/about`).

## Development

### Prerequisites

- Node.js installed

### Installation

```bash
npm install
```

### Running the Server

Start the development server with hot-reloading (using nodemon):

```bash
npm run dev
```

The server runs on port **3000** by default (http://localhost:3000).

### Adding Content

1. **New Page**: Add an entry to `data/pages.js` and create a link in `data/nav.js`.
2. **New Product**: Add an object to the `products` array in `data/products.js`.
3. **New Section**: Create a `.psp` file in `views/sections/` and include it in a template or `data/sections.json`.

## Styling

Styles are located in `public/theme.css`. The application uses CSS variables for theming (colors, spacing).
