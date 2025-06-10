
// load template
//    async function loadTemplate(file, containerId) {
//     const res = await fetch(file);
//     const html = await res.text();
//     const temp = document.createElement('div');
//     temp.innerHTML = html;
 

//   // Extract content inside <template> if you use it, otherwise full content
//   const template = temp.querySelector('template');
//   const content = template ? template.content.cloneNode(true) : temp;
// // Insert content into container
//   const container = document.getElementById(containerId);
//   container.innerHTML = '';
//   container.appendChild(content);

//   // Now handle scripts inside that content
//   const scripts = container.querySelectorAll('script');
//   scripts.forEach(oldScript => {
//     const newScript = document.createElement('script');

//     if (oldScript.src) {
//       newScript.src = oldScript.src;
//       // Copy other attributes if needed (async, defer)
//       if (oldScript.async) newScript.async = true;
//       if (oldScript.defer) newScript.defer = true;
//     } else {
//       newScript.textContent = oldScript.textContent;
//     }

//     // Remove old script and append new one to trigger execution
//     // oldScript.parentNode.removeChild(oldScript);
//     oldScript.remove();
//     container.appendChild(newScript);
//   });
 
// //   newScript.onload = () => {
// //     if (typeof window.init === 'function') {
// //       window.init();
// //     }
// //   };

// }



//   function navigate(page) {
//     loadTemplate(page, 'page-content');
//   }


//   async function navigate(page) {
//   await loadTemplate(page, 'page-content');
  

  // Call a generic init function after loading any page
//   if (typeof window.init === 'function') {
//     windows.init();
//   }
// }


  

    async function loadTemplate(file, containerId) {
      // Fetch fresh content every time
      const res = await fetch(file + '?_=' + Date.now()); // cache buster
      if (!res.ok) {
        console.error('Failed to load:', file);
        return;
      }

      const html = await res.text();

      // Create temporary container to parse HTML
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // Extract content from <template> or fallback to full content
      const template = temp.querySelector('template');
      const content = template ? template.content.cloneNode(true) : temp;

      // Inject content into target container
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      container.appendChild(content);

      // Remove old scripts and re-insert scripts to run them
      const scripts = container.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
          if (oldScript.async) newScript.async = true;
          if (oldScript.defer) newScript.defer = true;

          // Optionally, wait for external scripts to load before init
          newScript.onload = () => {
            if (typeof window.init === 'function') {
              window.init();
            }
          };
        } else {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.remove();
        container.appendChild(newScript);
      });

      // Call init immediately if inline scripts present
      if (typeof window.init === 'function') {
        window.init();
      }
    }

    async function navigate(page) {
      await loadTemplate(page, 'page-content');
    }



  

// //   Load the page based on URL hash tp harus satu folder ini works

  
//   function handleRoute() {
//     const page = location.hash.slice(1);
//     navigate(`${page}.html`);
//   }

//   window.addEventListener('hashchange', handleRoute);
//   window.addEventListener('DOMContentLoaded', handleRoute);


    window.onload = function () {
      
      navigate('home.html'); // Explicit default load
    };



    // To load JS






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





// seems to worked but still error and  stuff

// router.js

// async function loadTemplate(file, containerId) {
//   try {
//     const res = await fetch(file);
//     if (!res.ok) throw new Error('Failed to load ' + file);
//     const text = await res.text();

//     const temp = document.createElement('div');
//     temp.innerHTML = text;
//     const template = temp.querySelector('template');
//     if (!template) throw new Error('No <template> found in ' + file);

//     const content = template.content.cloneNode(true);
//     const container = document.getElementById(containerId);
//     container.innerHTML = '';
//     container.appendChild(content);

//   } catch (err) {
//     console.error(err);
//     document.getElementById(containerId).innerHTML = `<p>Error loading page.</p>`;
//   }
// }

// const routes = {
//   blog: './blog/blog.html',
//   resume: './CV/resume.html',
//   about: './about-me-O_O/about.html',
// };

// function navigate(path) {
//   loadTemplate(path, 'page-content');
// }

// function router() {
//   const route = location.hash.replace('#', '') || 'blog';
//   const path = routes[route];
//   if (path) {
//     navigate(path);
//   } else {
//     document.getElementById('page-content').innerHTML = '<h2>Page not found</h2>';
//   }
// }

// window.addEventListener('hashchange', router);
// window.addEventListener('DOMContentLoaded', router);
