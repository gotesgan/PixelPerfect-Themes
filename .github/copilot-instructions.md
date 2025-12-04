# Nunjucks + Express.js Project - Copilot Instructions

This is a Node.js application using Express.js and Nunjucks templating engine.

## Project Overview

- **Framework**: Express.js
- **Template Engine**: Nunjucks
- **Language**: JavaScript (Node.js)
- **Port**: 3000 (default)

## Quick Start

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open browser: `http://localhost:3000`

## Project Structure

- `server/app.js` - Express server configuration and routes
- `views/` - Nunjucks template files ( `.psp` )
- `public/` - Static assets (CSS, images, client-side JS)
- `package.json` - Dependencies and scripts

## Key Files

- `views/layout.psp` - Base template with navbar and footer
- `views/index.psp` - Home page
- `views/about.psp` - About page
- `public/style.css` - Responsive stylesheet

## Common Tasks

### Add a New Page

1. Create a new `.psp` file in `views/`
2. Extend layout: `{% extends "layout.psp" %}`
3. Add route in `server/app.js`

### Update Styles

Edit `public/style.css`

### View in Browser

Start the server and navigate to `http://localhost:3000`
