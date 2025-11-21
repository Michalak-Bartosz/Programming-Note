/**
 * Tags Directory Enhancer
 * Groups and sorts files by directory in tags page
 */
(() => {
  'use strict';

  const CONFIG = {
    tagHeadingSelector: 'h2[id^="tag:"]',
    contentSelector: '.md-content',
    tagsPathSegment: '/tags/',
    rootLabel: 'Root',
    styleElementId: 'tags-directory-enhancer-styles',
    entryContainerId: 'tag-directory-view'
  };

  const textCollator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });

  const createElement = (tag, className, textContent) => {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (typeof textContent === 'string') {
      element.textContent = textContent;
    }
    return element;
  };

  const repoSegment = (() => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length ? parts[0] : null;
  })();

  const isTagsPage = () => window.location.pathname.includes(CONFIG.tagsPathSegment);

  const getDirectoryLabel = (href) => {
    try {
      const { pathname } = new URL(href, window.location.origin);
      const segments = pathname.split('/').filter(Boolean);

      if (repoSegment && segments[0] === repoSegment) {
        segments.shift();
      }

      if (segments.length) {
        segments.pop();
      }

      return segments.length ? segments.join(' / ') : CONFIG.rootLabel;
    } catch (error) {
      console.warn('[tags-enhancer] Unable to parse URL:', href, error);
      return 'Unknown';
    }
  };

  const collectTagEntries = () => {
    const entryMap = new Map();

    document.querySelectorAll(CONFIG.tagHeadingSelector).forEach((heading) => {
      const tagName = heading.id?.replace('tag:', '') || heading.textContent.trim();
      const listElement = findNextList(heading);
      if (!tagName || !listElement) {
        return;
      }

      listElement.querySelectorAll('li a').forEach((anchor) => {
        if (!anchor.href) {
          return;
        }
        const href = anchor.href;
        if (!entryMap.has(href)) {
          entryMap.set(href, {
            href,
            title: anchor.textContent.trim(),
            directory: getDirectoryLabel(href),
            tags: new Set()
          });
        }
        entryMap.get(href).tags.add(tagName);
      });
    });

    return Array.from(entryMap.values()).map((entry) => ({
      ...entry,
      tags: Array.from(entry.tags).sort((a, b) => textCollator.compare(a, b))
    }));
  };

  const hideOriginalTagSections = () => {
    document.querySelectorAll(CONFIG.tagHeadingSelector).forEach((heading) => heading.setAttribute('hidden', 'hidden'));
    document.querySelectorAll(`${CONFIG.tagHeadingSelector} + ul`).forEach((list) => list.setAttribute('hidden', 'hidden'));
  };

  const buildEntryCard = (entry) => {
    const link = createElement('a', 'entry-link', entry.title);
    link.href = entry.href;
    return link;
  };

  const groupEntriesByTags = (entries) => {
    const groups = new Map();

    entries.forEach((entry) => {
      const key = entry.tags.join('|') || 'untagged';
      if (!groups.has(key)) {
        groups.set(key, {
          tags: entry.tags,
          entries: []
        });
      }
      groups.get(key).entries.push(entry);
    });

    return Array.from(groups.values()).sort((a, b) => textCollator.compare(a.tags.join(', '), b.tags.join(', ')));
  };

  const groupEntriesByDirectory = (entries) => {
    const directories = new Map();
    entries.forEach((entry) => {
      const key = entry.directory || CONFIG.rootLabel;
      if (!directories.has(key)) {
        directories.set(key, []);
      }
      directories.get(key).push(entry);
    });

    return Array.from(directories.entries()).sort((a, b) => textCollator.compare(a[0], b[0]));
  };

  const renderUnifiedEntries = (entries) => {
    const article = document.querySelector('.md-content__inner');
    if (!article) {
      return;
    }

    const existing = document.getElementById(CONFIG.entryContainerId);
    if (existing) {
      existing.remove();
    }

    if (!entries.length) {
      return;
    }

    const container = document.createElement('section');
    container.id = CONFIG.entryContainerId;
    container.className = 'tag-directory';

    const grouped = groupEntriesByTags(entries);

    grouped.forEach((group) => {
      const groupSection = document.createElement('section');
      groupSection.className = 'tag-group';

      const header = document.createElement('header');
      header.className = 'tag-group-header';

      const title = createElement('div', 'tag-group-title');
      if (group.tags.length) {
        const chips = createElement('div', 'tag-chip-wrap');
        group.tags.forEach((tag) => {
          chips.appendChild(createElement('span', 'tag-chip', tag));
        });
        title.appendChild(chips);
      } else {
        title.textContent = CONFIG.rootLabel;
      }
      header.appendChild(title);

      const count = document.createElement('span');
      count.className = 'tag-group-count';
      count.textContent = `${group.entries.length} file${group.entries.length === 1 ? '' : 's'}`;
      header.appendChild(count);

      groupSection.appendChild(header);

      const body = document.createElement('div');
      body.className = 'tag-group-body';

      groupEntriesByDirectory(group.entries).forEach(([directoryName, dirEntries]) => {
        const directorySection = document.createElement('section');
        directorySection.className = 'directory-cluster';

        const directoryHeader = document.createElement('header');
        directoryHeader.className = 'directory-header';

        const directoryLabel = createElement('span', 'directory-name');
        const directoryIcon = createElement('span', 'directory-icon');
        directoryIcon.innerHTML = `
          <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false">
            <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-7.17l-2-2ZM20 18H4V6h5.17l2 2H20Z" />
          </svg>
        `;
        const directoryText = createElement('span', 'directory-text', directoryName);
        directoryLabel.appendChild(directoryIcon);
        directoryLabel.appendChild(directoryText);
        directoryHeader.appendChild(directoryLabel);

        const directoryCount = createElement(
          'span',
          'directory-count',
          `${dirEntries.length} item${dirEntries.length === 1 ? '' : 's'}`
        );
        directoryHeader.appendChild(directoryCount);

        directorySection.appendChild(directoryHeader);

        const list = createElement('div', 'directory-files');

        dirEntries
          .sort((a, b) => textCollator.compare(a.title, b.title))
          .forEach((entry) => list.appendChild(buildEntryCard(entry)));

        directorySection.appendChild(list);
        body.appendChild(directorySection);
      });

      groupSection.appendChild(body);
      container.appendChild(groupSection);
    });

    article.appendChild(container);
  };

  const findNextList = (node) => {
    let cursor = node.nextElementSibling;
    while (cursor && cursor.tagName !== 'UL' && cursor.tagName !== 'H2') {
      cursor = cursor.nextElementSibling;
    }
    return cursor && cursor.tagName === 'UL' ? cursor : null;
  };

  const enhanceTagLists = () => {
    if (!isTagsPage()) {
      return;
    }

    const entries = collectTagEntries();
    renderUnifiedEntries(entries);
    hideOriginalTagSections();
  };

  const injectStyles = () => {
    if (document.getElementById(CONFIG.styleElementId)) {
      return;
    }

    const styles = document.createElement('style');
    styles.id = CONFIG.styleElementId;
    styles.textContent = `
      .tag-directory {
        margin: 1em 0;
      }

      .tag-group {
        margin-bottom: 2em;
        border-left: 4px solid var(--md-accent-fg-color, #4051b5);
        padding-left: 1em;
      }

      .tag-group:last-child {
        margin-bottom: 0;
      }

      .tag-group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75em;
      }

      .tag-group-title {
        font-weight: 600;
        color: var(--md-default-fg-color, #000);
      }

      .tag-group-count {
        font-size: 0.85em;
        color: var(--md-default-fg-color--light, #666);
      }

      .tag-group-body {
        display: grid;
        gap: 1em;
      }

      .directory-cluster {
        padding: 0.5em 0.75em;
        border: 1px solid var(--md-default-fg-color--lighter, #d0d0d0);
        border-radius: 0.5em;
        background-color: var(--md-code-bg-color, #f8f8f8);
      }

      .directory-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        color: var(--md-default-fg-color, #333);
        margin-bottom: 0.35em;
      }

      .directory-name {
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
      }

      .directory-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .directory-icon svg {
        width: 1.3em;
        height: 1.1em;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
        fill: currentColor;
      }

      .directory-icon {
        color: var(--md-accent-fg-color, #4051b5);
      }

      [data-md-color-scheme="default"] .directory-icon {
        color: var(--md-accent-fg-color, #7E8287);
      }

      [data-md-color-scheme="slate"] .directory-icon {
        color: var(--md-accent-fg-color, #000000ff);
      }

      .directory-text {
        font-family: var(--md-text-font, 'Roboto', sans-serif);
      }

      .directory-count {
        font-size: 0.85em;
        color: var(--md-default-fg-color--light, #666);
      }

      .directory-files {
        display: flex;
        flex-direction: column;
        gap: 0.3em;
        border-left: 1px dashed var(--md-default-fg-color--lighter, #cacaca);
        padding-left: 0.8em;
      }

      .entry-link {
        position: relative;
        padding-left: 1em;
        color: var(--md-typeset-a-color);
        text-decoration: none;
      }

      .entry-link::before {
        content: '\\2022';
        position: absolute;
        left: 0;
        color: var(--md-accent-fg-color, #4051b5);
      }

      .entry-link:hover {
        text-decoration: underline;
      }

      .tag-chip-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4em;
      }

      .tag-chip {
        padding: 0.2em 0.6em;
        border-radius: 999px;
        border: 1px solid var(--md-accent-fg-color, #4051b5);
        font-size: 0.85em;
        color: var(--md-default-fg-color);
        background-color: var(--md-code-bg-color, #f5f5f5);
      }

      @media screen and (max-width: 76.1875em) {
        .entry-link {
          font-size: 0.95em;
        }
      }
    `;

    document.head.appendChild(styles);
  };

  const observeContentChanges = () => {
    const contentRoot = document.querySelector(CONFIG.contentSelector);
    if (!contentRoot) {
      return null;
    }

    const observer = new MutationObserver((mutations) => {
      const hasNewNodes = mutations.some((mutation) => mutation.addedNodes.length > 0);
      if (hasNewNodes && isTagsPage()) {
        enhanceTagLists();
      }
    });

    observer.observe(contentRoot, { childList: true, subtree: true });
    return observer;
  };

  let contentObserver = null;

  const disconnectObserver = () => {
    if (contentObserver) {
      contentObserver.disconnect();
      contentObserver = null;
    }
  };

  const init = () => {
    disconnectObserver();

    if (!isTagsPage()) {
      return;
    }

    injectStyles();
    enhanceTagLists();
    contentObserver = observeContentChanges();
  };

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();