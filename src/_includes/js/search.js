(function () {
  var overlay = document.getElementById('search-overlay');
  var container = document.getElementById('search-container');
  var closeBtn = document.getElementById('search-close');
  if (!overlay || !container) return;

  var instance = null;

  function open() {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (!instance) {
      instance = new PagefindUI({
        element: container,
        showSubResults: true,
        showImages: false,
        translations: {
          placeholder: "Search the book\u2026",
          zero_results: "No results for [SEARCH_TERM]"
        }
      });
    }
    setTimeout(function () {
      var input = container.querySelector('input');
      if (input) input.focus();
    }, 100);
  }

  function close() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.search-toggle').forEach(function (btn) {
    btn.addEventListener('click', open);
  });

  if (closeBtn) closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('active') ? close() : open();
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      close();
    }
  });
})();
