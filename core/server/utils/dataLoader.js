const path = require("path");
const fs = require("fs");

// Import Data
const shop = require("../../data/shop");
const nav = require("../../data/nav");

function loadData(app, baseDir) {
  // Make global data available to all views
  app.locals.shop = shop;
  app.locals.nav = nav;

  // Dynamic Configuration Loading
  const configDir = path.join(baseDir, "config");
  if (fs.existsSync(configDir)) {
    fs.readdirSync(configDir).forEach((file) => {
      if (path.extname(file) === ".json") {
        const name = path.basename(file, ".json");
        // Load config and expose as {name}Group (e.g., headerGroup)
        app.locals[name + "Group"] = require(path.join(configDir, file));
      }
    });
  }
}

module.exports = loadData;
