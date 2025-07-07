

//################################################################################# THIS IFRAME NOT WORKING ON GITHUB JUST LOCAL
    // const routes = {
    //   '/about': 'about/about.html',
    //   '/blog': 'blog/blog.html',
    //   '/cv': 'cv/cv.html',
    // };

    // const iframe = document.getElementById('content-frame');
    // const links = document.querySelectorAll('#nav-menu a');

    // // Toggle nav menu visibility
    // document.getElementById('toggle-btn').addEventListener('click', () => {
    //   document.getElementById('nav-menu').classList.toggle('show');
    // });

    // // Handle link clicks
    // links.forEach(link => {
    //   link.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const path = new URL(link.href).pathname;
    //     navigate(path);
    //   });
    // });

    // function navigate(path) {
    //   const route = routes[path];
    //   if (route) {
    //     iframe.src = route;
    //     history.pushState({ path }, '', path);
    //   }
    // }

    // // Handle browser back/forward buttons
    // window.addEventListener('popstate', (event) => {
    //   const path = event.state?.path || window.location.pathname;
    //   const route = routes[path];
    //   if (route) {
    //     iframe.src = route;
    //   }
    // });

    // // Load correct route on page load
    // window.addEventListener('DOMContentLoaded', () => {
    //   const path = window.location.pathname;
    //   navigate(path in routes ? path : '/about');
    // });









//##########################################################################################THIS ON LOAD THE ENTIRE PAGE NOT IFRAMING IT
//       const defaultPage = 'about';
//   const params = new URLSearchParams(window.location.search);
//   const path = params.get('path') || window.location.pathname.replace(/^\/+/, '') || defaultPage;

//   const validPaths = ['about', 'blog', 'cv'];
//   const finalPath = validPaths.includes(path) ? path : defaultPage;

//   document.getElementById('content-frame').src = `${finalPath}/index.html`;

// // Optional: update address bar (if redirected via 404.html)
//   if (params.get('redirect')) {
//     history.replaceState(null, '', `/${finalPath}`);
//   }


    const routes = {
      'about': 'about/index.html',
      'blog': 'blog/index.html',
      'cv': 'cv/index.html'
    };

    function loadRouteFromHash() {
      const hash = window.location.hash.replace(/^#/, '') || 'about';
      const path = routes[hash] || routes['about'];
      document.getElementById('content-frame').src = path;
      // console.log('current pash:', path);
      console.log('current hash:', hash);
      // history.replaceState(null, '', `${hash}`);
      // history.pushState(null, '', '/about');

    }

    window.addEventListener('hashchange', loadRouteFromHash);
    window.addEventListener('DOMContentLoaded', loadRouteFromHash);


// console.log('current path:', window.location.pathname);


