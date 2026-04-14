/* =============================================
   OO AI Training Course — Navigation
   Builds the sidebar nav and tracks progress
   ============================================= */

(function () {
  var modules = [
    {
      id: 'index',
      href: 'index.html',
      number: 'Start',
      title: 'Course Overview',
      completable: true
    },
    {
      id: 'module-0',
      href: 'module-0.html',
      number: 'Mod 0',
      title: 'Welcome to the AI Tools Family',
      completable: true
    },
    {
      id: 'module-1',
      href: 'module-1.html',
      number: 'Mod 1',
      title: 'Claude Chat',
      completable: true
    },
    {
      id: 'module-2',
      href: 'module-2.html',
      number: 'Mod 2',
      title: 'Meet Claude Cowork',
      completable: true
    },
    {
      id: 'module-3',
      href: 'module-3.html',
      number: 'Mod 3',
      title: 'Meet Claude Code',
      completable: true
    },
    {
      id: 'module-3-1',
      href: 'module-3-1.html',
      number: 'Mod 3.1',
      title: 'GitHub + Cloudflare Deploy',
      completable: true
    },
    {
      id: 'module-4',
      href: 'module-4.html',
      number: 'Mod 4',
      title: 'Final Project',
      completable: true
    }
  ];

  function getStorageKey(id) {
    return 'oo-course-' + id;
  }

  function isComplete(id) {
    try {
      return localStorage.getItem(getStorageKey(id)) === 'complete';
    } catch (e) {
      return false;
    }
  }

  function getCurrentPage() {
    var path = window.location.pathname.split('/').pop();
    if (!path || path === '' || path === 'index.html') return 'index';
    return path.replace('.html', '');
  }

  function buildNav() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;

    var currentPage = getCurrentPage();
    var completable = modules.filter(function (m) { return m.completable; });
    var completed = completable.filter(function (m) { return isComplete(m.id); }).length;
    var pct = completable.length > 0 ? Math.round((completed / completable.length) * 100) : 0;

    var moduleItems = modules.map(function (m) {
      var done = isComplete(m.id);
      var active = currentPage === m.id;
      return (
        '<li>' +
          '<a href="' + m.href + '" class="' + (active ? 'active' : '') + '">' +
            '<span class="nav-module-number">' + m.number + '</span>' +
            '<span class="nav-module-title">' + m.title + '</span>' +
            (done ? '<span class="nav-check" aria-label="Complete">✓</span>' : '') +
          '</a>' +
        '</li>'
      );
    }).join('');

    nav.innerHTML =
      '<div class="nav-logo">' +
        '<a href="index.html">' +
          '<span class="nav-logo-title">OO AI Training</span>' +
          '<span class="nav-logo-sub">Claude Tools Course</span>' +
        '</a>' +
      '</div>' +
      '<div class="nav-progress">' +
        '<div class="nav-progress-label">Your Progress</div>' +
        '<div class="progress-bar-outer">' +
          '<div class="progress-bar-inner" style="width:' + pct + '%"></div>' +
        '</div>' +
        '<div class="progress-text">' + completed + ' of ' + completable.length + ' modules complete</div>' +
      '</div>' +
      '<ul class="nav-modules">' + moduleItems + '</ul>' +
      '<div class="nav-footer">Online Optimism &copy; 2026</div>';

    // Wire up mobile toggle (may already be done, safe to re-attach via once)
    var toggle = document.getElementById('nav-toggle');
    var overlay = document.getElementById('nav-overlay');
    if (toggle && overlay) {
      toggle.onclick = function () {
        nav.classList.toggle('open');
        overlay.classList.toggle('visible');
      };
      overlay.onclick = function () {
        nav.classList.remove('open');
        overlay.classList.remove('visible');
      };
    }
  }

  // Expose globally so progress.js can refresh after marking complete
  window.buildNav = buildNav;

  // Run immediately (scripts are at bottom of body, DOM is ready)
  buildNav();
})();
