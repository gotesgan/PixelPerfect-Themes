# Nunjucks + Express.js E-commerce Project - Copilot Instructions

This is a custom E-commerce storefront built with Node.js, Express.js, and Nunjucks (configured with `.psp` extension). It uses a modular "Sections" architecture similar to Shopify.

## Project Overview

- **Framework**: Express.js
- **Template Engine**: Nunjucks (files use `.psp` extension)
- **Language**: JavaScript (Node.js)
- **Data Source**: Static JS/JSON files in `data/`
- **Configuration**: JSON files in `config/`
- **Styling**: Custom CSS variables in `public/theme.css`

## Project Structure

- `core/data/` - Data layer (Products, Shop Info, Nav)
- `core/server/app.js` - Express server, routes, dynamic config loading, and custom tags
- `config/` - Layout configuration files (e.g., `header.json`)
- `layouts/` - Base layouts (e.g., `layout.psp`)
- `sections/` - Reusable UI components with `{% schema %}` tags
- `templates/` - Page templates (index, product, page)
- `public/` - Static assets (`theme.css`, images)

## Key Concepts

### 1. Section Architecture

Sections are self-contained components in `sections/`.

- **Schema**: Sections can define settings using the `{% schema %}` tag (JSON content).
- **Rendering**: The server parses these files. Settings are accessed via `{{ section.settings.key }}`.

### 2. Layout Configuration

Layouts are driven by JSON files in `config/`.

- **Dynamic Loading**: `core/server/app.js` loads all JSON files in `config/` and exposes them globally as `[filename]Group` (e.g., `header.json` -> `headerGroup`).
- **Structure**:
  ```json
  {
    "type": "header",
    "name": "Header Group",
    "sections": { ... },
    "order": ["section-id-1", "section-id-2"]
  }
  ```

### 3. Data Layer

Global data is injected via `app.locals`:

- `shop`: Store metadata
- `nav`: Navigation menus
- `products`: Product catalog
- `[name]Group`: Dynamic config groups (e.g., `headerGroup`)

## Common Tasks

### Add a New Section

1. Create a file in `sections/` (e.g., `my-section.psp`).
2. Define settings in `{% schema %} ... {% endschema %}`.
3. Use settings in HTML: `{{ section.settings.my_setting }}`.
4. Add styles to `public/theme.css`.

### Add to Header Group

1. Open `config/header.json`.
2. Add the section definition to `"sections"`.
3. Add the section ID to the `"order"` array.

### Add a New Page

1. Create a `.psp` file in `templates/`.
2. Extend layout: `{% extends "layouts/layout.psp" %}`.
3. Add a route in `core/server/app.js`.

### Update Styles

Edit `public/theme.css`. Use the defined CSS variables (e.g., `var(--primary)`, `var(--dark)`) for consistency.
