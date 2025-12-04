const express = require("express");
const router = express.Router();
const { products, categories } = require("../../data/products");
const pages = require("../../data/pages");

// Routes
router.get("/", (req, res) => {
  res.render("templates/index", {
    title: "Home",
    products: products.filter((p) => p.isActive).slice(0, 4), // Show only first 4 as featured
    categories: categories.filter((c) => c.enabled),
  });
});

router.get("/products", (req, res) => {
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

router.get("/product/:id", (req, res) => {
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
router.get("/page/:slug", (req, res) => {
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
router.get("/:slug", (req, res, next) => {
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

router.get("/about", (req, res) => {
  res.render("templates/about", {
    title: "About Page",
    description: "This is the about page",
  });
});

module.exports = router;
