function notFound(req, res) {
  res.status(404).render("templates/404", {
    title: "404 - Page Not Found",
  });
}

function serverError(err, req, res, next) {
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
}

module.exports = {
  notFound,
  serverError,
};
