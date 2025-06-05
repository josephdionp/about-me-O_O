
   async function loadTemplate(file, containerId) {
    const res = await fetch(file);
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const template = temp.querySelector('template');
    const content = template.content.cloneNode(true);
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(content);
  }

  function navigate(page) {
    loadTemplate(page, 'page-content');
  }

  // Load the page based on URL hash
  function handleRoute() {
    const page = location.hash.slice(1) || 'home';
    navigate(`${page}.html`);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('DOMContentLoaded', handleRoute);


  
    window.onload = function () {
      
      navigate('home.html'); // Explicit default load
    };




// new THIS TO LOAD HTML PROJECT      INSIDE FOLDER

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


// THIS TO LOAD SIMPlE&SINGLE HTML PAGE IN PAGES FOLDER