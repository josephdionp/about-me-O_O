
    const routes = {
      '/about': 'about/about.html',
      '/blog': 'blog/blog.html',
      '/cv': 'cv/cv.html',
    };

    const iframe = document.getElementById('content-frame');
    const links = document.querySelectorAll('#nav-menu a');

    // Toggle nav menu visibility
    document.getElementById('toggle-btn').addEventListener('click', () => {
      document.getElementById('nav-menu').classList.toggle('show');
    });

    // Handle link clicks
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = new URL(link.href).pathname;
        navigate(path);
      });
    });

    function navigate(path) {
      const route = routes[path];
      if (route) {
        iframe.src = route;
        history.pushState({ path }, '', path);
      }
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      const path = event.state?.path || window.location.pathname;
      const route = routes[path];
      if (route) {
        iframe.src = route;
      }
    });

    // Load correct route on page load
    window.addEventListener('DOMContentLoaded', () => {
      const path = window.location.pathname;
      navigate(path in routes ? path : '/about');
    });
