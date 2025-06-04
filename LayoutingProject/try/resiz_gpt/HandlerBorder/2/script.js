const resizableElement = document.getElementById('resizable');
let isResizing = false;
let lastMouseX = 0;
let lastMouseY = 0;

// Create resize handles dynamically
const createResizeHandles = () => {
  const handles = ['top', 'right', 'bottom', 'left'];
  
  handles.forEach(handle => {
    const div = document.createElement('div');
    div.classList.add('resize-handle', handle);
    resizableElement.appendChild(div);
    
    div.addEventListener('mousedown', startResize);
  });
};

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

  if (e.target.classList.contains('top')) {
    resizableElement.style.height = parseInt(style.height) - deltaY + 'px';
    resizableElement.style.top = parseInt(style.top) + deltaY + 'px';
  } else if (e.target.classList.contains('bottom')) {
    resizableElement.style.height = parseInt(style.height) + deltaY + 'px';
  } else if (e.target.classList.contains('left')) {
    resizableElement.style.width = parseInt(style.width) - deltaX + 'px';
    resizableElement.style.left = parseInt(style.left) + deltaX + 'px';
  } else if (e.target.classList.contains('right')) {
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

// Initialize resize handles when the page loads
createResizeHandles();
