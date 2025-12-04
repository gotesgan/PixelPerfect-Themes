const express = require("express");
const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");

const app = express();
const baseDir = path.join(__dirname, "..");

// Import Data
const shop = require("../data/shop");
const nav = require("../data/nav");
const { products, categories } = require("../data/products");
const pages = require("../data/pages");

// Make global data available to all views
app.locals.shop = shop;
app.locals.nav = nav;

// Dynamic Configuration Loading
const configDir = path.join(baseDir, "views/config");
if (fs.existsSync(configDir)) {
  fs.readdirSync(configDir).forEach((file) => {
    if (path.extname(file) === ".json") {
      const name = path.basename(file, ".json");
      // Load config and expose as {name}Group (e.g., headerGroup)
      app.locals[name + "Group"] = require(path.join(configDir, file));
    }
  });
}

// Setup Nunjucks as the view engine
const env = nunjucks.configure(path.join(baseDir, "views"), {
  autoescape: true,
  express: app,
  watch: true,
});

// Custom Schema Extension (swallows content)
function SchemaExtension() {
  this.tags = ["schema"];

  this.parse = function (parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    var body = parser.parseUntilBlocks("endschema");
    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, "run", args, [body]);
  };

  this.run = function (context, body) {
    return "";
  };
}

env.addExtension("SchemaExtension", new SchemaExtension());

// Register PSP extension with Express
app.engine("psp", nunjucks.render);

// Set Express view engine
app.set("view engine", "psp");
app.set("views", path.join(baseDir, "views"));

// Middleware
app.use(express.static(path.join(baseDir, "public")));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.render("templates/index", {
    title: "Home",
    products: products.filter((p) => p.isActive).slice(0, 4), // Show only first 4 as featured
    categories: categories.filter((c) => c.enabled),
  });
});

app.get("/products", (req, res) => {
  let filteredProducts = products.filter((p) => p.isActive);
  const categoryId = req.query.category;

  if (categoryId) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category_id === categoryId
    );
  }

  res.render("templates/products", {
    title: "Products",
    products: filteredProducts,
    categories: categories.filter((c) => c.enabled),
    currentCategory: categoryId,
  });
});

app.get("/product/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).render("templates/404", {
      title: "Product Not Found",
    });
  }

  res.render("templates/product", {
    title: product.name,
    product: product,
    categories: categories,
  });
});

// Dynamic Page Route
app.get("/page/:slug", (req, res) => {
  const page = pages.find((p) => p.slug === req.params.slug && p.isActive);

  if (!page) {
    return res.status(404).render("templates/404", {
      title: "Page Not Found",
    });
  }

  res.render("templates/page", {
    title: page.title,
    page: page,
  });
});

// Also handle root level pages if they match a slug (optional, but good for existing links)
app.get("/:slug", (req, res, next) => {
  const page = pages.find(
    (p) => p.link === "/" + req.params.slug && p.isActive
  );

  if (page) {
    return res.render("templates/page", {
      title: page.title,
      page: page,
    });
  }
  next();
});

app.get("/about", (req, res) => {
  res.render("templates/about", {
    title: "About Page",
    description: "This is the about page",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("templates/404", {
    title: "404 - Page Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Server Error</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 2rem; background: #fff1f2; color: #881337; }
            .container { max-width: 800px; margin: 0 auto; }
            h1 { border-bottom: 2px solid #f43f5e; padding-bottom: 0.5rem; }
            .error-box { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow-x: auto; }
            pre { margin: 0; font-family: "Menlo", "Monaco", "Courier New", monospace; font-size: 0.9rem; line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>⚠️ Server Error</h1>
            <p><strong>${err.message}</strong></p>
            <div class="error-box">
                <pre>${err.stack}</pre>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
