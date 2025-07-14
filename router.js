
const routes = {
  'about': 'about/index.html',
  'cv': 'cv/index.html'
};

function loadRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, '') || 'about';
  const path = routes[hash] || routes['about'];

  const iframe = document.getElementById('content-frame');
  iframe.src = path;

  // Correctly update history
  history.replaceState(null, null, `${hash}`);

  // Attach iframe onload once
  iframe.onload = function () {
    updateTitle();
  };
}

function updateTitle() {
  const iframe = document.getElementById("content-frame");
  try {
    document.title = iframe.contentDocument.title;
  } catch (e) {
    console.error('Unable to access iframe content due to cross-origin restrictions.', e);
  }
}

window.addEventListener('hashchange', loadRouteFromHash);
window.addEventListener('DOMContentLoaded', loadRouteFromHash);