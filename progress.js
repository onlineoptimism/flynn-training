/* =============================================
   OO AI Training Course — Progress & Interaction
   Handles: mark complete, prompt submission, clipboard
   ============================================= */

// ---- Mark Complete ----

function markComplete(moduleId) {
  try {
    localStorage.setItem('oo-course-' + moduleId, 'complete');
  } catch (e) {
    // localStorage unavailable — still update UI
  }

  var btn = document.getElementById('btn-complete');
  if (btn) {
    btn.textContent = '✓ Module Complete!';
    btn.classList.add('completed');
    btn.disabled = true;
  }

  var msg = document.getElementById('complete-message');
  if (msg) msg.classList.add('visible');

  var nextLink = document.getElementById('next-module-link');
  if (nextLink) nextLink.classList.add('visible');

  // Refresh sidebar to show checkmark
  if (typeof window.buildNav === 'function') {
    window.buildNav();
  }
}

// Restore completed state on page load
document.addEventListener('DOMContentLoaded', function () {
  var moduleId = document.body.dataset.module;
  if (!moduleId) return;

  var done = false;
  try {
    done = localStorage.getItem('oo-course-' + moduleId) === 'complete';
  } catch (e) {}

  if (done) {
    var btn = document.getElementById('btn-complete');
    if (btn) {
      btn.textContent = '✓ Module Complete!';
      btn.classList.add('completed');
      btn.disabled = true;
    }

    var nextLink = document.getElementById('next-module-link');
    if (nextLink) nextLink.classList.add('visible');
  }
});

// ---- Interactive Prompt Submission ----

function submitPrompt(promptId) {
  var textarea = document.getElementById(promptId + '-input');
  var successEl = document.getElementById(promptId + '-success');

  if (!textarea) return;

  var val = textarea.value.trim();
  if (!val) {
    textarea.style.borderColor = '#e03';
    textarea.focus();
    // Reset border after brief moment
    setTimeout(function () {
      textarea.style.borderColor = '';
    }, 1500);
    return;
  }

  // Persist response
  try {
    localStorage.setItem('oo-prompt-' + promptId, val);
  } catch (e) {}

  textarea.style.borderColor = '#00bf6f';
  if (successEl) successEl.classList.add('visible');

  // Scroll success message into view
  if (successEl) {
    setTimeout(function () {
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

// Restore saved prompt responses on load
document.addEventListener('DOMContentLoaded', function () {
  var textareas = document.querySelectorAll('.prompt-textarea[id]');
  textareas.forEach(function (ta) {
    var promptId = ta.id.replace('-input', '');
    try {
      var saved = localStorage.getItem('oo-prompt-' + promptId);
      if (saved) {
        ta.value = saved;
        ta.style.borderColor = '#00bf6f';
        var successEl = document.getElementById(promptId + '-success');
        if (successEl) successEl.classList.add('visible');
      }
    } catch (e) {}
  });
});

// ---- Copy to Clipboard ----

function copyToClipboard(text, btn) {
  var originalText = btn ? btn.textContent : '';

  function onSuccess() {
    if (btn) {
      btn.textContent = '✓ Copied!';
      setTimeout(function () { btn.textContent = originalText; }, 2000);
    }
  }

  function onFail() {
    if (btn) {
      btn.textContent = 'Select text above to copy';
      setTimeout(function () { btn.textContent = originalText; }, 2500);
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(onSuccess, onFail);
  } else {
    // Fallback for non-HTTPS (shouldn't happen on Cloudflare Pages but just in case)
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      onSuccess();
    } catch (e) {
      onFail();
    }
  }
}

// ---- Department Tab Switcher (Module 2) ----

function switchDeptTab(deptId) {
  // Deactivate all buttons and panels
  var buttons = document.querySelectorAll('.dept-tab-btn');
  var panels = document.querySelectorAll('.dept-tab-panel');

  buttons.forEach(function (btn) { btn.classList.remove('active'); });
  panels.forEach(function (panel) { panel.classList.remove('active'); });

  // Activate selected
  var activeBtn = document.querySelector('[data-dept="' + deptId + '"]');
  var activePanel = document.getElementById('dept-' + deptId);

  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.classList.add('active');
}
