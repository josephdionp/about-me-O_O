
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


    // To load JS
    if (jsFile) {
  const script = document.createElement('script');
  script.src = jsFile;
  script.defer = true;
  document.body.appendChild(script);
}
