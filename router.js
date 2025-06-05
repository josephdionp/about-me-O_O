
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






  // Load the page based on URL hash

  



//   function handleRoute() {
//     const page = location.hash.slice(1) || 'home';
//     navigate(`${page}.html`);
//   }

//   window.addEventListener('hashchange', handleRoute);
//   window.addEventListener('DOMContentLoaded', handleRoute);



  const routes = {
  blog: 'blog/blog.html',
  cv: 'cv/resume.html',
  about: 'about-me-O_O/about.html',
};

function router() {
  const page = location.hash.replace('#', '') || 'home';
  const path = routes[page];
  if (path) {
    loadPage(path);
  } else {
    document.getElementById('app').innerHTML = '<h2>Page not found</h2>';
  }
}


  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', router);






  
    window.onload = function () {
      
      navigate('home.html'); // Explicit default load
    };




// new THIS TO LOAD HTML PROJECT      INSIDE FOLDER









// THIS TO LOAD SIMPlE&SINGLE HTML PAGE IN PAGES FOLDER