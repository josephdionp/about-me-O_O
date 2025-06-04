
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

    window.onload = function () {
      
      navigate('home.html'); // Explicit default load
    };

    // Draggable nav
    const navWrapper = document.getElementById('nav-wrapper');
    let isDragging = false, offsetX, offsetY;

    navWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - navWrapper.offsetLeft;
      offsetY = e.clientY - navWrapper.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        navWrapper.style.left = `${e.clientX - offsetX}px`;
        navWrapper.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Toggle menu open/close manually
    document.getElementById('toggle-btn').addEventListener('click', () => {
      const menu = document.getElementById('nav-menu');
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });
