(() => {
  const STORAGE_KEY = 'mb-theme';
  const DEFAULT_SCHEME = 'default';

  const THEME_MAP = {
    default: { label: 'Light', icon: '☀️', colors: { primary: '#3d5a80', accent: '#ee6c4d', surface: '#f8f9fb', text: '#101828' } },
    slate: { label: 'Slate', icon: '🌗', colors: { primary: '#5f7485', accent: '#8fbdd3', surface: '#1c1f24', text: '#f5f7fa' } },
    midnight: { label: 'Midnight', icon: '🌌', colors: { primary: '#0f4c75', accent: '#ffd166', surface: '#0b132b', text: '#f1f5ff' } },
    dracula: { label: 'Dracula', icon: '🧛', colors: { primary: '#bd93f9', accent: '#ff79c6', surface: '#1e1f29', text: '#f8f8f2' } },
    forest: { label: 'Forest', icon: '🌲', colors: { primary: '#2f855a', accent: '#7bd389', surface: '#f0fff4', text: '#1b2a21' } },
    sunset: { label: 'Sunset', icon: '🌅', colors: { primary: '#f97316', accent: '#facc15', surface: '#fff7ed', text: '#3a1d0b' } }
  };

  const SCHEMES = Object.entries(THEME_MAP).map(([id, def]) => ({ id, ...def }));

  const LOGO_FILES = {
    default: 'light_logo.png',
    slate: 'dark_logo.png',
    midnight: 'dark_logo.png',
    dracula: 'dark_logo.png'
  };
  const assetsImageBase = (() => {
    const scriptUrl = document.currentScript?.src;
    if (scriptUrl) {
      return new URL('../images/', scriptUrl);
    }
    if (window.MkDocsPage?.root_url) {
      return new URL(`${window.location.origin}${window.MkDocsPage.root_url}assets/images/`);
    }
    return new URL(`${window.location.origin}/assets/images/`);
  })();

  const buildLogoHref = (fileName) => new URL(fileName, assetsImageBase).href;

  const createToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'mb-theme-picker__toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-haspopup', 'listbox');
    toggle.setAttribute('aria-expanded', 'false');

    const icon = document.createElement('span');
    icon.className = 'mb-theme-picker__current-icon';
    icon.textContent = SCHEMES[0].icon;

    const label = document.createElement('span');
    label.className = 'mb-theme-picker__current-label';
    label.textContent = SCHEMES[0].label;

    const chevron = document.createElement('span');
    chevron.className = 'mb-theme-picker__chevron';
    chevron.textContent = '▾';

    toggle.append(icon, label, chevron);
    return toggle;
  };

  const createOptionsList = () => {
    const list = document.createElement('ul');
    list.className = 'mb-theme-picker__list';
    list.setAttribute('role', 'listbox');

    SCHEMES.forEach(({ id, label, icon }) => {
      const item = document.createElement('li');
      item.className = 'mb-theme-picker__item';

      const button = document.createElement('button');
      button.className = 'mb-theme-picker__option';
      button.dataset.theme = id;
      button.setAttribute('role', 'option');
      button.type = 'button';

      const iconElement = document.createElement('span');
      iconElement.className = 'mb-theme-picker__option-icon';
      iconElement.textContent = icon;

      const labelSpan = document.createElement('span');
      labelSpan.className = 'mb-theme-picker__option-label';
      labelSpan.textContent = label;

      button.append(iconElement, labelSpan);
      item.appendChild(button);
      list.appendChild(item);
    });

    return list;
  };

  const ensurePicker = () => {
    const headerInner = document.querySelector('.md-header__inner');
    if (!headerInner) {
      return null;
    }

    let picker = headerInner.querySelector('[data-mb-theme-picker]');
    if (picker) {
      return picker;
    }

    picker = document.createElement('div');
    picker.className = 'mb-theme-picker';
    picker.setAttribute('data-mb-theme-picker', '');

    const toggle = createToggle();
    const list = createOptionsList();

    picker.append(toggle, list);
    headerInner.appendChild(picker);
    return picker;
  };

  const setToggleState = (scheme) => {
    const picker = document.querySelector('[data-mb-theme-picker]');
    if (!picker) {
      return;
    }

    const toggle = picker.querySelector('.mb-theme-picker__toggle');
    const toggleIcon = toggle?.querySelector('.mb-theme-picker__current-icon');
    const toggleLabel = toggle?.querySelector('.mb-theme-picker__current-label');
    const activeScheme = SCHEMES.find(({ id }) => id === scheme) || SCHEMES[0];
    if (toggleIcon) {
      toggleIcon.textContent = activeScheme.icon;
    }
    if (toggleLabel) {
      toggleLabel.textContent = activeScheme.label;
    }
  };

  const closeDropdown = () => {
    const picker = document.querySelector('[data-mb-theme-picker]');
    if (!picker) {
      return;
    }
    picker.classList.remove('is-open');
    const toggle = picker.querySelector('.mb-theme-picker__toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  const toggleDropdown = () => {
    const picker = document.querySelector('[data-mb-theme-picker]');
    if (!picker) {
      return;
    }
    picker.classList.toggle('is-open');
    const toggle = picker.querySelector('.mb-theme-picker__toggle');
    if (toggle) {
      const expanded = picker.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', String(expanded));
    }
  };

  const updateActiveButtons = (scheme) => {
    document.querySelectorAll('[data-mb-theme-picker] .mb-theme-picker__option').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.theme === scheme);
    });
  };

  const bindPickerEvents = (picker) => {
    if (picker.dataset.bound === 'true') {
      return;
    }

    const toggle = picker.querySelector('.mb-theme-picker__toggle');
    toggle?.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleDropdown();
    });

    picker.addEventListener('click', (event) => {
      const button = event.target.closest('.mb-theme-picker__option');
      if (button) {
        applyScheme(button.dataset.theme);
        closeDropdown();
      }
    });

    document.addEventListener('click', (event) => {
      if (!picker.contains(event.target)) {
        closeDropdown();
      }
    });

    picker.dataset.bound = 'true';
  };

  const ensureHeaderLogo = () => {
    const logo = document.querySelector('.md-header__button.md-logo img, .md-logo img');
    if (logo) {
      return Promise.resolve(logo);
    }
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const found = document.querySelector('.md-header__button.md-logo img, .md-logo img');
        if (found) {
          observer.disconnect();
          resolve(found);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  };

  const updateLogo = async (scheme) => {
    await ensureHeaderLogo();
    const file = LOGO_FILES[scheme] || LOGO_FILES.default;
    const href = buildLogoHref(file);
    document.querySelectorAll('.md-header__button.md-logo img, .md-logo img').forEach((logo) => {
      if (logo.getAttribute('src') !== href) {
        logo.setAttribute('src', href);
      }
    });
  };

  const applyCssVariables = ({ primary, accent, surface, text }) => {
    const root = document.documentElement;
    root.style.setProperty('--mb-primary', primary);
    root.style.setProperty('--mb-accent', accent);
    root.style.setProperty('--mb-surface', surface);
    root.style.setProperty('--mb-text', text);
    root.style.setProperty('--mb-surface-alt', colorMix(surface, text, 0.1));
    root.style.setProperty('--mb-border', colorMix(text, surface, 0.85, true));
    root.style.setProperty('--mb-header-text', text);
    root.style.setProperty('--mb-code-bg', colorMix(surface, '#111111', 0.15));
    root.style.setProperty('--mb-theme-id', `'${getCurrentTheme()}'`);
  };

  const colorMix = (base, mix, amount, transparent = false) => {
    if (CSS && CSS.supports('color', `color-mix(in srgb, ${base}, ${mix})`)) {
      return `color-mix(in srgb, ${base} calc(${100 - amount * 100}% ), ${mix} calc(${amount * 100}% ))`;
    }
    return transparent ? `rgba(0,0,0,0.15)` : base;
  };

  const getCurrentTheme = () => localStorage.getItem(STORAGE_KEY) || DEFAULT_SCHEME;

  const applyScheme = async (scheme) => {
    if (!SCHEMES.some(({ id }) => id === scheme)) {
      scheme = DEFAULT_SCHEME;
    }

    if (typeof window.__md_set_color_scheme === 'function') {
      window.__md_set_color_scheme(scheme);
    } else {
      document.documentElement.setAttribute('data-md-color-scheme', scheme);
    }

    localStorage.setItem(STORAGE_KEY, scheme);
    updateActiveButtons(scheme);
    setToggleState(scheme);
    applyCssVariables(THEME_MAP[scheme].colors);
    await updateLogo(scheme);
  };

  const initPicker = async () => {
    const picker = ensurePicker();
    if (!picker) {
      return;
    }

    bindPickerEvents(picker);
    const storedScheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_SCHEME;
    await applyScheme(storedScheme);
  };

  const bootstrap = () => {
    requestAnimationFrame(() => {
      initPicker().catch(console.error);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  if (typeof window.document$ !== 'undefined') {
    window.document$.subscribe(bootstrap);
  }
})();
