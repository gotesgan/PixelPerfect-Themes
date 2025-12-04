const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");

const app = express();
const baseDir = path.join(__dirname, "..");

// Setup Nunjucks as the view engine
nunjucks.configure(path.join(baseDir, "views"), {
  autoescape: true,
  express: app,
  watch: true,
});

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
  res.render("index", {
    title: "Welcome to Nunjucks",
    message: "This is a Nunjucks template rendered with Express.js",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    description: "This is the about page",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
