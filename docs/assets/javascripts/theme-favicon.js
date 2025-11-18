// Dynamic favicon based on theme - Optimized & Elegant
(() => {
  'use strict';

  const FAVICON_CONFIG = {
    slate: 'dark_logo.png',    // Dark mode
    default: 'light_logo.png'  // Light mode
  };

  /**
   * Gets the correct base path for assets - works anywhere
   */
  const getBasePath = () => {
    // Try to get base href from HTML <base> tag first (most reliable)
    const baseTag = document.querySelector('base');
    if (baseTag?.href) {
      const baseUrl = new URL(baseTag.href);
      return `${baseUrl.pathname}assets/images/`.replace(/\/+/g, '/');
    }

    // Fallback: construct from current location
    const { origin, pathname } = window.location;

    // Split pathname and remove empty segments
    const segments = pathname.split('/').filter(Boolean);

    // Remove last segment if it looks like a file (has extension)
    if (segments.length > 0 && segments[segments.length - 1].includes('.')) {
      segments.pop();
    }

    // Construct base path
    let basePath = segments.length > 0 ? `/${segments[0]}/` : '/';

    // Special handling for known patterns
    if (origin.includes('github.io') && segments.length > 0) {
      // GitHub Pages - use first segment as repo name
      basePath = `/${segments[0]}/`;
    } else if (pathname === '/' || pathname === '') {
      // Root deployment
      basePath = '/';
    }

    return `${basePath}assets/images/`.replace(/\/+/g, '/');
  };

  /**
   * Updates the favicon based on the current color scheme
   */
  const updateFavicon = () => {
    const palette = document.querySelector('[data-md-color-scheme]');
    const scheme = palette?.getAttribute('data-md-color-scheme') || 'default';

    const favicon = document.querySelector('link[rel="icon"]') || createFaviconElement();
    const logoFile = FAVICON_CONFIG[scheme] || FAVICON_CONFIG.default;

    const newHref = `${getBasePath()}${logoFile}`;

    // Only update if changed to avoid unnecessary reloads
    if (favicon.href !== newHref) {
      favicon.href = newHref;
    }
  };

  /**
   * Creates and appends favicon element if it doesn't exist
   */
  const createFaviconElement = () => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    document.head.appendChild(link);
    return link;
  };

  /**
   * Sets up MutationObserver to watch for theme changes
   */
  const observeThemeChanges = () => {
    const targetNode = document.body || document.documentElement;

    const observer = new MutationObserver((mutations) => {
      const palette = document.querySelector('[data-md-color-scheme]');
      if (palette && mutations.some(m =>
        m.type === 'attributes' &&
        m.target.hasAttribute('data-md-color-scheme')
      )) {
        updateFavicon();
      }
    });

    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ['data-md-color-scheme'],
      subtree: true
    });

    return observer;
  };

  /**
   * Initialize favicon handling
   */
  const init = () => {
    // Wait a tick to ensure DOM is ready
    setTimeout(() => {
      updateFavicon();
      observeThemeChanges();
    }, 0);
  };

  // Support for Material's instant loading
  const setupListeners = () => {
    init();

    // Material for MkDocs instant loading support
    if (typeof document$ !== 'undefined') {
      document$.subscribe(() => {
        updateFavicon();
      });
    }
  };

  // Handle different loading scenarios
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupListeners);
  } else {
    setupListeners();
  }
})();
