const express = require("express");
const path = require("path");

// Modules
const setupNunjucks = require("./config/nunjucks");
const loadData = require("./utils/dataLoader");
const mainRoutes = require("./routes/main");
const { notFound, serverError } = require("./middleware/errorHandler");

const app = express();
const baseDir = path.join(__dirname, "../..");

// 1. Load Data (Global & Config)
loadData(app, baseDir);

// 2. Setup View Engine
setupNunjucks(app, baseDir);

// 3. Middleware
app.use(express.static(path.join(baseDir, "public")));
app.use(express.urlencoded({ extended: false }));

// 4. Routes
app.use("/", mainRoutes);

// 5. Error Handling
app.use(notFound);
app.use(serverError);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
