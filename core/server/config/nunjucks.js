const nunjucks = require("nunjucks");
const path = require("path");
const fs = require("fs");

function registerSchemaExtension(env) {
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
}

// Helper to render a single section
function renderSection(
  env,
  baseDir,
  context,
  sectionName,
  sectionOverride = null
) {
  if (!sectionName) return "";
  try {
    const templatePath = path.join(baseDir, "sections", `${sectionName}.psp`);
    const template = `sections/${sectionName}.psp`;

    // 1. Extract Defaults from Schema
    let defaults = {};
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath, "utf-8");
      const match = content.match(
        /{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/
      );
      if (match && match[1]) {
        try {
          const schema = JSON.parse(match[1]);
          if (schema.settings) {
            schema.settings.forEach((s) => {
              if (s.id && s.default !== undefined) {
                defaults[s.id] = s.default;
              }
            });
          }
        } catch (e) {
          console.error(
            `Error parsing schema JSON in ${sectionName}:`,
            e.message
          );
        }
      }
    }

    // 2. Determine current settings
    let currentSettings = {};
    let sectionId = sectionName;

    // If an override object is provided (from sections loop), use it
    if (sectionOverride) {
      currentSettings = sectionOverride.settings || {};
      sectionId = sectionOverride.id || sectionName;
    }
    // Otherwise check if 'section' variable exists in context and matches
    else if (context.ctx.section && context.ctx.section.type === sectionName) {
      currentSettings = context.ctx.section.settings || {};
      sectionId = context.ctx.section.id || sectionName;
    }

    // 3. Merge Defaults
    const mergedSettings = { ...defaults, ...currentSettings };

    // 4. Create new context
    const newContext = {
      ...context.ctx,
      section: {
        type: sectionName,
        id: sectionId,
        settings: mergedSettings,
      },
    };

    return env.render(template, newContext);
  } catch (e) {
    console.error(`[Section] Error rendering '${sectionName}':`, e);
    return "";
  }
}

function registerSectionExtension(env, baseDir) {
  // Single Section Tag: {% section "name" %}
  function SectionExtension() {
    this.tags = ["section"];

    this.parse = function (parser, nodes, lexer) {
      var tok = parser.nextToken();
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);
      return new nodes.CallExtension(this, "run", args);
    };

    this.run = function (context, sectionName) {
      return new nunjucks.runtime.SafeString(
        renderSection(env, baseDir, context, sectionName)
      );
    };
  }

  // Group Sections Tag: {% sections headerGroup %}
  function SectionsExtension() {
    this.tags = ["sections"];

    this.parse = function (parser, nodes, lexer) {
      var tok = parser.nextToken();
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);
      return new nodes.CallExtension(this, "run", args);
    };

    this.run = function (context, group) {
      if (!group || !group.order || !group.sections) return "";

      let output = "";
      group.order.forEach((sectionId) => {
        const sectionConfig = group.sections[sectionId];
        if (sectionConfig) {
          // Pass the specific config for this section
          output += renderSection(env, baseDir, context, sectionConfig.type, {
            ...sectionConfig,
            id: sectionId,
          });
        }
      });

      return new nunjucks.runtime.SafeString(output);
    };
  }

  env.addExtension("SectionExtension", new SectionExtension());
  env.addExtension("SectionsExtension", new SectionsExtension());
}

function setupNunjucks(app, baseDir) {
  // Setup Nunjucks as the view engine
  const env = nunjucks.configure(baseDir, {
    autoescape: true,
    express: app,
    watch: true,
  });

  // Register Custom Extensions
  registerSchemaExtension(env);
  registerSectionExtension(env, baseDir);

  // Register PSP extension with Express
  app.engine("psp", nunjucks.render);

  // Set Express view engine
  app.set("view engine", "psp");
  app.set("views", baseDir);
}

module.exports = setupNunjucks;
