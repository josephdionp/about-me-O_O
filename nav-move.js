//hide or show menu
document.getElementById('menu-btn').addEventListener('click', () => {
  const menu = document.getElementById('nav-menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

const hideBtn = document.getElementById('hide-button');
const navWrapper = document.getElementById('nav-wrapper');
const toggleIcon = document.getElementById('toggle-icon');

//left or free nav-wrapper
hideBtn.addEventListener('click', () => {
  if (navWrapper.classList.contains('hidden')) {
    toggleIcon.src = 'icon/double-arrow-left.png';
    toggleIcon.alt = 'Hide navigation icon';
    navWrapper.style.left = 0;
  } else {
    toggleIcon.src = 'icon/double-arrow-right.png';
    toggleIcon.alt = 'Show navigation icon';
  }
  navWrapper.classList.toggle('hidden');
});

//init
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
  console.log("onMouseUp called, remove event listener, isDragging set to false");
}

function onMouseDown(e) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;
  console.log("onMousedown is called");
  MouseDownOnWrapper(e);
}
function MouseDownOnWrapper(e) {
  // if (e.target !== navWrapper) return;
  // if (!navWrapper.contains(e.target)) return;
  isDragging = true;
  const style = window.getComputedStyle(navWrapper);
  initialLeft = parseInt(style.left, 10);
  initialTop = parseInt(style.top, 10);
}

document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onMouseDown);

// safety measures when mouse leaves the window or when the window loses focus
document.addEventListener('mouseleave', () => {
  if (isDragging) onMouseUp();
});
window.addEventListener('blur', () => {
  if (isDragging) onMouseUp();
});

