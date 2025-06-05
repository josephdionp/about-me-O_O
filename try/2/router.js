const routes = {
  blog: 'blog/blog.html',
  cv: 'cv/cv.html',
  about: 'about/about.html',
};

async function loadPage(path) {
  try {
    const res = await fetch(path);
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const template = temp.querySelector('template');
    if (!template) throw new Error(`No <template> found in ${path}`);

    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));
  } catch (e) {
    document.getElementById('app').innerHTML = `<h2>Error:</h2><p>${e.message}</p>`;
    console.error(e);
  }
}

function router() {
  const page = location.hash.replace('#', '') || 'blog';
  const path = routes[page];
  if (path) {
    loadPage(path);
  } else {
    document.getElementById('app').innerHTML = '<h2>Page not found</h2>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);