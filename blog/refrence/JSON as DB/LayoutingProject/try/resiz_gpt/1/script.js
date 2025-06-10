function makeResizableDiv(div) {
    // Create a handle for resizing
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    div.appendChild(resizeHandle);

    // Variables to store mouse position and div size
    let mouseX, mouseY, divWidth, divHeight;

    // Mouse down event to start resizing
    resizeHandle.addEventListener('mousedown', function (e) {
        e.preventDefault(); // Prevent text selection

        // Store initial mouse position and div size
        mouseX = e.clientX;
        mouseY = e.clientY;
        divWidth = div.offsetWidth;
        divHeight = div.offsetHeight;

        // Mouse move event to resize div
        function onMouseMove(e) {
            const dx = e.clientX - mouseX; // Change in x (width)
            const dy = e.clientY - mouseY; // Change in y (height)

            // Update the div size
            div.style.width = divWidth + dx + 'px';
            div.style.height = divHeight + dy + 'px';
        }

        // Mouse up event to stop resizing
        function onMouseUp() {
            // Remove the mousemove and mouseup listeners when resizing ends
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        // Attach mousemove and mouseup listeners to the document
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

// Make the div resizable
const resizableDiv = document.getElementById('resizable');
makeResizableDiv(resizableDiv);
