
    // Toggle menu open/close manually
document.getElementById('toggle-btn').addEventListener('click', () => {
  const menu = document.getElementById('nav-menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Move navigation wrapper with mouse drag
const navWrapper = document.getElementById('nav-wrapper');

let isDragging = false;
let startX = 0;
let startY = 0;
let initialLeft = 0;
let initialTop = 0;

function onMouseMove(e) {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  navWrapper.style.left = `${initialLeft + deltaX}px`;
  navWrapper.style.top = `${initialTop + deltaY}px`;
}

function onMouseUp() {
  isDragging = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

navWrapper.addEventListener('mousedown', (e) => {
  e.preventDefault(); // Stop text/image drag

  isDragging = true;

  // Start point
  startX = e.clientX;
  startY = e.clientY;

  // Get current left/top from computed styles
  const style = window.getComputedStyle(navWrapper);
  initialLeft = parseInt(style.left, 10);
  initialTop = parseInt(style.top, 10);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
