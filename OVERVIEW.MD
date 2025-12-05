# Nunjucks + Express.js Application

A simple web application built with Node.js, Express.js, and Nunjucks templating engine.

## Project Structure

```
project/
├── core/
│   └── server/
│       └── app.js            # Express server configuration and routes
├── package.json          # Project dependencies and scripts
├── public/               # Static files (CSS, JS, images)
│   └── style.css         # Main stylesheet
├── layouts/              # Base layout files
│   └── layout.psp
├── templates/            # Page templates
│   ├── index.psp
│   ├── about.psp
│   └── 404.psp
└── README.md             # This file
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. For development with auto-reload (requires nodemon):

```bash
npm run dev
```

3. For production:

```bash
npm start
```

## Usage

The application will start on `http://localhost:3000`

### Routes

- **`/`** - Home page
- **`/about`** - About page
- **`404`** - Any undefined route shows a 404 page

## Features

- **Express.js** - Fast, unopinionated web framework
- **Nunjucks** - Powerful templating engine with inheritance and includes
- **Static file serving** - CSS and other assets from `/public` directory
- **Template inheritance** - `layout.psp` is the base template extended by other pages
- **Responsive design** - Mobile-friendly CSS included

## Nunjucks Features Used

- Template inheritance (`extends`)
- Block replacement (`block`)
- Variables and expressions (`{{ }}`)
- Control structures (available for future use)

## Customization

### Adding New Pages

1. Create a new `.psp` file in `templates/`
2. Extend the layout: `{% extends "layouts/layout.psp" %}`
3. Add a route in `core/server/app.js`

### Styling

Edit `public/style.css` to customize the appearance.

### Environment Variables

Create a `.env` file (if needed) and update `core/server/app.js` to use `dotenv`:

```bash
npm install dotenv
```

## Development

To make the server reload automatically when files change, the project uses `nodemon` (already listed as a dev dependency). After running `npm install`, start the watcher with:

```bash
npm run dev
```

## Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)
