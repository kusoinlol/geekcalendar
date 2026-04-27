// almanac-render.jsx — minimal shim for backend-driven mode.
// Provides only window.AlmanacThemes registry; themes self-register.
(function() {
  'use strict';
  const themes = {};
  const order = [];
  window.AlmanacThemes = {
    register(theme) {
      if (themes[theme.id]) return;
      themes[theme.id] = theme;
      order.push(theme.id);
    },
    get(id) { return themes[id]; },
    all() { return order.map(id => themes[id]); },
    ids() { return order.slice(); },
  };
})();
