/**
 * Tags Directory Enhancer
 * Groups and sorts files by directory in tags page
 */
(() => {
  'use strict';

  /**
   * Extract directory path from a URL
   * @param {string} url - The URL to parse
   * @returns {string} - The directory path
   */
  const getDirectoryFromUrl = (url) => {
    try {
      const urlObj = new URL(url, window.location.origin);
      const path = urlObj.pathname;

      // Remove base path and file name, keep directory structure
      const parts = path.split('/').filter(Boolean);

      // Remove the first part if it's the repo name (for GitHub Pages)
      if (parts[0] === 'Programming-Note') {
        parts.shift();
      }

      // Remove the last part (usually index.html or similar)
      if (parts.length > 0) {
        parts.pop();
      }

      return parts.length > 0 ? parts.join(' / ') : 'Root';
    } catch (e) {
      return 'Unknown';
    }
  };

  /**
   * Natural sort comparison for strings with numbers
   * @param {string} a - First string
   * @param {string} b - Second string
   * @returns {number} - Comparison result
   */
  const naturalSort = (() => {
    const re = /(\d+)|(\D+)/g;
    const numRe = /^\d+$/;

    return (a, b) => {
      const aParts = a.match(re);
      const bParts = b.match(re);

      if (!aParts || !bParts) {
        return a.localeCompare(b);
      }

      const len = Math.min(aParts.length, bParts.length);

      for (let i = 0; i < len; i++) {
        const aPart = aParts[i];
        const bPart = bParts[i];

        // If both are numbers, compare numerically
        if (numRe.test(aPart) && numRe.test(bPart)) {
          const diff = parseInt(aPart, 10) - parseInt(bPart, 10);
          if (diff !== 0) return diff;
        } else {
          // Otherwise compare as strings
          const cmp = aPart.localeCompare(bPart);
          if (cmp !== 0) return cmp;
        }
      }

      return aParts.length - bParts.length;
    };
  })();

  /**
   * Group files by directory
   * @param {Array} listItems - Array of list item elements
   * @returns {Map} - Map of directory to array of {link, title}
   */
  const groupFilesByDirectory = (listItems) => {
    return listItems.reduce((dirMap, listItem) => {
      const link = listItem.querySelector('a');
      if (!link) return dirMap;

      const directory = getDirectoryFromUrl(link.href);
      const title = link.textContent.trim();

      if (!dirMap.has(directory)) {
        dirMap.set(directory, []);
      }

      dirMap.get(directory).push({
        link: link.cloneNode(true),
        title
      });

      return dirMap;
    }, new Map());
  };

  /**
   * Create grouped and sorted HTML
   * @param {Map} dirMap - Map of directory to files
   * @returns {string} - HTML string
   */
  const createGroupedHTML = (() => {
    const DIR_ICON = `<svg class="dir-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"/>
    </svg>`;

    return (dirMap) => {
      // Sort directories alphabetically
      const sortedDirs = Array.from(dirMap.keys()).sort();

      const dirSections = sortedDirs.map(directory => {
        const files = dirMap.get(directory);

        // Sort files naturally within directory
        files.sort((a, b) => naturalSort(a.title, b.title));

        const fileItems = files
          .map(({ link }) => `<li>${link.outerHTML}</li>`)
          .join('');

        const dirClass = directory === 'Root' ? 'dir-root' : 'dir-path';

        return `
          <div class="directory-group">
            <div class="directory-header ${dirClass}">
              ${DIR_ICON}
              <span class="directory-name">${directory}</span>
              <span class="file-count">(${files.length})</span>
            </div>
            <ul class="directory-files">${fileItems}</ul>
          </div>
        `;
      }).join('');

      return `<div class="grouped-files">${dirSections}</div>`;
    };
  })();

  /**
   * Process all tag sections on the page
   */
  const enhanceTagsSections = () => {
    // Find all tag sections (h2 elements with tag in their id)
    const tagSections = document.querySelectorAll('h2[id^="tag:"]');

    tagSections.forEach(tagHeader => {
      // Find the ul element after the h2
      let ulElement = tagHeader.nextElementSibling;

      // Skip non-UL siblings until we find UL or another H2
      while (ulElement && ulElement.tagName !== 'UL' && ulElement.tagName !== 'H2') {
        ulElement = ulElement.nextElementSibling;
      }

      // Validate we found a UL element that hasn't been processed
      if (!ulElement ||
          ulElement.tagName !== 'UL' ||
          ulElement.classList.contains('files-processed') ||
          ulElement.classList.contains('directory-files')) {
        return;
      }

      // Get all list items
      const listItems = Array.from(ulElement.querySelectorAll('li'));
      if (listItems.length === 0) return;

      // Group files by directory
      const dirMap = groupFilesByDirectory(listItems);
      if (dirMap.size === 0) return;

      // Create new grouped HTML and replace
      const groupedHTML = createGroupedHTML(dirMap);
      ulElement.outerHTML = groupedHTML;
    });
  };

  /**
   * Add CSS styles for grouped directories
   */
  const addStyles = () => {
    const styleId = 'tags-directory-enhancer-styles';

    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return;
    }

    const styles = `
      /* Container for grouped files */
      .grouped-files {
        margin: 1em 0;
      }

      /* Directory group */
      .directory-group {
        margin-bottom: 1.5em;
        border-left: 3px solid var(--md-accent-fg-color, #4051b5);
        padding-left: 0;
      }

      .directory-group:last-child {
        margin-bottom: 0;
      }

      /* Directory header */
      .directory-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.5em 0.75em;
        background-color: var(--md-code-bg-color, #f5f5f5);
        font-weight: 600;
        font-size: 0.9em;
        color: var(--md-default-fg-color, #000);
        margin-bottom: 0.5em;
        border-radius: 0 0.2em 0.2em 0;
      }

      [data-md-color-scheme="slate"] .directory-header {
        background-color: var(--md-code-bg-color, #2d2d2d);
        color: var(--md-default-fg-color, #fff);
      }

      /* Directory icon */
      .dir-icon {
        width: 1.1em;
        height: 1.1em;
        fill: var(--md-accent-fg-color, #4051b5);
        flex-shrink: 0;
      }

      /* Directory name */
      .directory-name {
        font-family: var(--md-code-font, monospace);
        font-size: 0.95em;
        flex-grow: 1;
      }

      /* File count badge */
      .file-count {
        font-size: 0.85em;
        color: var(--md-default-fg-color--light, #666);
        font-weight: 400;
      }

      /* Root directory special styling */
      .directory-header.dir-root {
        background-color: var(--md-accent-fg-color--transparent, rgba(64, 81, 181, 0.08));
      }

      [data-md-color-scheme="slate"] .directory-header.dir-root {
        background-color: var(--md-accent-fg-color--transparent, rgba(96, 125, 255, 0.12));
      }

      /* Files list */
      .directory-files {
        margin: 0;
        padding-left: 0;
        list-style: none;
      }

      .directory-files li {
        padding: 0.3em 0.75em;
        margin: 0;
        transition: background-color 0.15s ease;
      }

      .directory-files li:hover {
        background-color: var(--md-accent-fg-color--transparent, rgba(64, 81, 181, 0.05));
      }

      [data-md-color-scheme="slate"] .directory-files li:hover {
        background-color: var(--md-accent-fg-color--transparent, rgba(96, 125, 255, 0.08));
      }

      .directory-files a {
        text-decoration: none;
        color: var(--md-typeset-a-color, #4051b5);
      }

      .directory-files a:hover {
        text-decoration: underline;
      }

      /* Responsive adjustments */
      @media screen and (max-width: 76.1875em) {
        .directory-header {
          font-size: 0.85em;
        }

        .directory-name {
          font-size: 0.9em;
        }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  };

  /**
   * Debounce function to limit execution rate
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  /**
   * Check if current page is tags page
   * @returns {boolean}
   */
  const isTagsPage = () => window.location.pathname.includes('/tags/');

  /**
   * Process content if tags exist
   */
  const processContent = () => {
    if (!isTagsPage()) return;

    const hasTags = document.querySelector('h2[id^="tag:"]');
    if (hasTags) {
      enhanceTagsSections();
    }
  };

  /**
   * Setup MutationObserver for instant navigation
   */
  const setupObserver = () => {
    const content = document.querySelector('.md-content');
    if (!content) return null;

    const debouncedProcess = debounce(() => {
      if (isTagsPage()) {
        processContent();
      }
    }, 100);

    const observer = new MutationObserver((mutations) => {
      const hasRelevantChanges = mutations.some(
        mutation => mutation.type === 'childList' && mutation.addedNodes.length > 0
      );

      if (hasRelevantChanges) {
        debouncedProcess();
      }
    });

    observer.observe(content, {
      childList: true,
      subtree: true
    });

    return observer;
  };

  /**
   * Initialize the enhancer
   */
  const init = () => {
    // Add styles once
    addStyles();

    // Process content when DOM is ready
    const onReady = () => {
      processContent();
      setupObserver();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady, { once: true });
    } else {
      onReady();
    }
  };

  // Run initialization
  init();
})();

