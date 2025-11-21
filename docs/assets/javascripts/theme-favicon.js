// Dynamic favicon based on theme - Optimized & Elegant
(() => {
  'use strict';

  const FAVICON_CONFIG = {
    default: 'light_logo.png',
    slate: 'dark_logo.png',
    midnight: 'dark_logo.png',
    dracula: 'dark_logo.png'
  };
  let cachedBaseHref = (() => {
    if (document.currentScript?.src) {
      return new URL('../images/', document.currentScript.src).href;
    }
    return null;
  })();

  const computeFallbackBaseHref = () => {
    const { origin, pathname } = window.location;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && segments[segments.length - 1].includes('.')) {
      segments.pop();
    }
    const isLocalDev = origin.includes('localhost') || origin.includes('127.0.0.1');
    const baseDir = !isLocalDev && segments.length > 0 ? `/${segments[0]}/` : '/';
    return `${origin}${baseDir}assets/images/`;
  };

  const getBaseHref = () => {
    if (cachedBaseHref) {
      return cachedBaseHref;
    }

    const existingIcon = document.querySelector('link[rel="icon"]');
    if (existingIcon?.href) {
      cachedBaseHref = new URL('./', existingIcon.href).href;
      return cachedBaseHref;
    }

    cachedBaseHref = computeFallbackBaseHref();
    return cachedBaseHref;
  };

  /**
   * Updates the favicon based on the current color scheme
   */
  const updateFavicon = () => {
    const palette = document.documentElement;
    const scheme = palette?.getAttribute('data-md-color-scheme') || 'default';

    const favicon = document.querySelector('link[rel="icon"]') || createFaviconElement();
    const logoFile = FAVICON_CONFIG[scheme] || FAVICON_CONFIG.default;
    const baseHref = getBaseHref();

    const newHref = new URL(logoFile, baseHref).href;

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
    cachedBaseHref = cachedBaseHref || computeFallbackBaseHref();
    return link;
  };

  /**
   * Sets up MutationObserver to watch for theme changes
   */
  const observeThemeChanges = () => {
    const targetNode = document.documentElement;

    const observer = new MutationObserver((mutations) => {
      if (mutations.some(m => m.type === 'attributes' && m.attributeName === 'data-md-color-scheme')) {
        updateFavicon();
      }
    });

    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ['data-md-color-scheme']
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
