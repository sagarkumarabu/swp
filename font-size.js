(function () {
  const STORAGE_KEY = 'hplFontScale';
  const STEP = 0.1;
  const MIN = 0.8;
  const MAX = 1.5;

  function clamp(value) {
    return Math.min(MAX, Math.max(MIN, value));
  }

  function applyFontScale(value) {
    const scale = clamp(value);
    document.documentElement.style.setProperty('--font-scale', scale.toFixed(2));
    localStorage.setItem(STORAGE_KEY, scale.toFixed(2));
  }

  function getCurrentScale() {
    const stored = parseFloat(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(stored) ? clamp(stored) : 1;
  }

  function changeFontSize(direction) {
    applyFontScale(getCurrentScale() + direction * STEP);
  }

  window.changeFontSize = changeFontSize;
  applyFontScale(getCurrentScale());
})();
