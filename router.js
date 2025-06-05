// ini works tp gabisa diserver

//    async function loadTemplate(file, containerId) {
//     const res = await fetch(file);
//     const html = await res.text();
//     const temp = document.createElement('div');
//     temp.innerHTML = html;
//     const template = temp.querySelector('template');
//     const content = template.content.cloneNode(true);
//     const container = document.getElementById(containerId);
//     container.innerHTML = '';
//     container.appendChild(content);
//   }



//   function navigate(page) {
//     loadTemplate(page, 'page-content');
//   }



  // Load the page based on URL hash tp harus satu folder ini works

  
//   function handleRoute() {
//     const page = location.hash.slice(1) || 'home';
//     navigate(`${page}.html`);
//   }

//   window.addEventListener('hashchange', handleRoute);
//   window.addEventListener('DOMContentLoaded', handleRoute);


//     window.onload = function () {
      
//       navigate('home.html'); // Explicit default load
//     };




// new THIS TO LOAD HTML PROJECT      INSIDE FOLDER




// const routes = {
//   blog: './blog/blog.html',
//   resume: './CV/resume.html',
//   about: './about-me-O_O/about.html',
// };

// async function loadPage(path) {
//   try {
//     const res = await fetch(path);
//     if (!res.ok) throw new Error('Failed to load page');
//     const html = await res.text();
//     document.getElementById('app').innerHTML = html;
//   } catch (e) {
//     document.getElementById('app').innerHTML = '<h2>Error loading page</h2>';
//     console.error(e);
//   }
// }

// function router() {
//   const page = location.hash.replace('#', '') || 'blog'; // default page
//   const path = routes[page];
//   if (path) {
//     loadPage(path);  // <-- Use loadPage here, not navigate
//   } else {
//     document.getElementById('app').innerHTML = '<h2>Page not found</h2>';
//   }
// }

// window.addEventListener('hashchange', router);
// window.addEventListener('DOMContentLoaded', router);








// THIS TO LOAD SIMPlE&SINGLE HTML PAGE IN PAGES FOLDER


// router.js

async function loadTemplate(file, containerId) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error('Failed to load ' + file);
    const text = await res.text();

    const temp = document.createElement('div');
    temp.innerHTML = text;
    const template = temp.querySelector('template');
    if (!template) throw new Error('No <template> found in ' + file);

    const content = template.content.cloneNode(true);
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(content);

  } catch (err) {
    console.error(err);
    document.getElementById(containerId).innerHTML = `<p>Error loading page.</p>`;
  }
}

const routes = {
  blog: './blog/blog.html',
  resume: './CV/resume.html',
  about: './about-me-O_O/about.html',
};

function navigate(path) {
  loadTemplate(path, 'page-content');
}

function router() {
  const route = location.hash.replace('#', '') || 'blog';
  const path = routes[route];
  if (path) {
    navigate(path);
  } else {
    document.getElementById('page-content').innerHTML = '<h2>Page not found</h2>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
