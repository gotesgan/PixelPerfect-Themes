# PixelPerfect Themes Documentation

Welcome to the **PixelPerfect Themes** system documentation. This is a custom, modular e-commerce storefront architecture built on **Node.js**, **Express**, and **Nunjucks**. It mimics modern SaaS theme architectures (like Shopify) but runs on a lightweight, self-hosted stack.

## 1. Core Architecture

The system is designed around **Sections** and **JSON Configuration**.

- **Framework**: Express.js
- **Templating**: Nunjucks (custom `.psp` extension)
- **Data Source**: Static JS files (`core/data/`) + JSON Config (`config/`)
- **Styling**: CSS Variables & Scoped Styles

### Directory Structure

```
├── config/            # Layout configurations (JSON)
├── layouts/           # Base HTML wrappers
├── sections/          # Reusable UI components (.psp)
├── templates/         # Page templates (index, product, etc.)
├── public/            # Static assets (CSS, Images)
└── core/              # System files
    ├── data/          # Business data (Products, Nav, Shop Info)
    └── server/        # Backend logic
        ├── config/    # Nunjucks & Extension setup
        ├── routes/    # Express routes
        ├── utils/     # Data loaders
        └── app.js     # Entry point
```

## 2. The Section System

Sections are the building blocks of the theme. Each section is a self-contained file in `sections/` containing:

1.  **HTML/Nunjucks**: The markup.
2.  **CSS**: `<style>` blocks (scoped by class naming conventions).
3.  **Schema**: A `{% schema %}` JSON block defining settings and defaults.

### Creating a Section

Create a file `sections/my-section.psp`:

```njk
<style>
  .my-section { padding: 20px; background: {{ section.settings.bg_color }}; }
</style>

<section class="my-section">
  <h2>{{ section.settings.heading }}</h2>
</section>

{% schema %}
{
  "name": "My Custom Section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading Text",
      "default": "Hello World"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#ffffff"
    }
  ]
}
{% endschema %}
```

### The `{% schema %}` Tag

The schema is the **Single Source of Truth** for default values.

- You do **not** need to use `| default('value')` in your HTML.
- The server automatically parses this block and injects defaults if no config is present.

### Rendering a Section

Use the custom tag in your templates:

```njk
{% section "my-section" %}
```

### Rendering a Group of Sections

To render an entire group defined in a JSON config file (like `header.json` or `hero.json`), use the plural `{% sections %}` tag:

```njk
{# Renders all sections defined in config/header.json #}
{% sections headerGroup %}
```

This automatically handles the looping and ordering logic defined in the JSON file.

## 3. Configuration System

Layouts are driven by JSON files in `config/`. These files define which sections appear and their specific settings.

**Example: `config/hero.json`**

```json
{
  "type": "hero",
  "name": "Hero Group",
  "sections": {
    "main-hero": {
      "type": "hero-banner",
      "settings": {
        "heading": "Summer Sale",
        "button_text": "Shop Now"
      }
    }
  },
  "order": ["main-hero"]
}
```

- **Dynamic Loading**: The server loads these files into `app.locals[filename + 'Group']`.
- **Usage in Templates**:
  ```njk
  {% for id in heroGroup.order %}
      {% set section = heroGroup.sections[id] %}
      {% section section.type %}
  {% endfor %}
  ```

## 4. Data Layer

Global data is stored in `core/data/` and injected into every view.

- `shop`: Global store settings (name, logo, currency).
- `nav`: Navigation menus.
- `products`: Product catalog array.

Access them globally: `{{ shop.name }}`, `{{ nav.header }}`.

## 5. Server Internals

The server logic is modularized in `core/server/`:

- **`core/server/config/nunjucks.js`**:
  - Registers the `{% schema %}` tag (swallows content so it doesn't render).
  - Registers the `{% section %}` tag (handles file reading, schema parsing, default merging, and rendering).
- **`core/server/utils/dataLoader.js`**: Loads static data and JSON configs.
- **`core/server/routes/main.js`**: Handles standard routing (`/`, `/products`, `/page/:slug`).

## 6. Development Workflow

1.  **Add a Section**: Create `.psp` file in `sections/`. Define Schema.
2.  **Use Section**: Add `{% section "name" %}` to a template OR add it to a JSON config file for dynamic rendering.
3.  **Style**: Add styles directly in the section or in `public/theme.css`.
4.  **Run**: `npm run dev` (starts server on port 3000).
