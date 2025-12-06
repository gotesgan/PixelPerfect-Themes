window.addEventListener("message", (event) => {
  if (event.data.type === "THEME_UPDATE") {
    const { sections } = event.data.payload;

    Object.keys(sections).forEach((sectionId) => {
      const section = sections[sectionId];
      const settings = section.settings;

      // Update text content
      Object.keys(settings).forEach((key) => {
        const value = settings[key];
        const elements = document.querySelectorAll(
          `[data-setting-id="${sectionId}.${key}"]`
        );

        elements.forEach((el) => {
          if (el.tagName === "IMG") {
            el.src = value;
          } else if (key.includes("color") || key.includes("background")) {
            el.style.backgroundColor = value;
          } else if (key.includes("opacity")) {
            el.style.opacity = value / 100; // Assuming opacity is 0-100
          } else {
            el.textContent = value;
          }
        });

        // Special handling for overlay opacity which might be on a specific child
        if (key === "image_overlay_opacity") {
          const overlay = document.querySelector(
            `[data-section-id="${sectionId}"] .hero__overlay`
          );
          if (overlay) {
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${value / 100})`;
          }
        }
      });
    });
  }
});
