const resizableElement = document.querySelector('.resizable');
let isResizing = false;
let lastMouseX = 0;
let lastMouseY = 0;

const startResize = (e) => {
  isResizing = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
};

const resize = (e) => {
  if (!isResizing) return;

  const deltaX = e.clientX - lastMouseX;
  const deltaY = e.clientY - lastMouseY;
  const style = window.getComputedStyle(resizableElement);

  if (e.target.classList.contains('resize-handle.top')) {
    resizableElement.style.height = parseInt(style.height) - deltaY + 'px';
    resizableElement.style.top = parseInt(style.top) + deltaY + 'px';
  } else if (e.target.classList.contains('resize-handle.bottom')) {
    resizableElement.style.height = parseInt(style.height) + deltaY + 'px';
  } else if (e.target.classList.contains('resize-handle.left')) {
    resizableElement.style.width = parseInt(style.width) - deltaX + 'px';
    resizableElement.style.left = parseInt(style.left) + deltaX + 'px';
  } else if (e.target.classList.contains('resize-handle.right')) {
    resizableElement.style.width = parseInt(style.width) + deltaX + 'px';
  }

  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
};

const stopResize = () => {
  isResizing = false;
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
};

// Attach the event listeners to the handles
document.querySelectorAll('.resize-handle').forEach(handle => {
  handle.addEventListener('mousedown', startResize);
});
