function makeResizableDiv(div) {
    // Create resize handles for all edges and corners
    const resizeHandles = [
        { class: 'top-left', cursor: 'nw-resize', axis: 'both' },
        { class: 'top-right', cursor: 'ne-resize', axis: 'both' },
        { class: 'bottom-left', cursor: 'sw-resize', axis: 'both' },
        { class: 'bottom-right', cursor: 'se-resize', axis: 'both' },
        { class: 'top', cursor: 'n-resize', axis: 'height' },
        { class: 'bottom', cursor: 's-resize', axis: 'height' },
        { class: 'left', cursor: 'w-resize', axis: 'width' },
        { class: 'right', cursor: 'e-resize', axis: 'width' }
    ];

    // Select the input fields for width and height
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');

    // Update the width and height inputs
    function updateSizeInputs() {
        widthInput.value = div.offsetWidth + 'px';
        heightInput.value = div.offsetHeight + 'px';
    }

    // Initialize the size inputs
    updateSizeInputs();

    resizeHandles.forEach(handle => {
        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle', handle.class);
        div.appendChild(resizeHandle);

        // Variables to store mouse position and div size
        let mouseX, mouseY, divWidth, divHeight, divTop, divLeft;

        // Mouse down event to start resizing
        resizeHandle.addEventListener('mousedown', function (e) {
            e.preventDefault(); // Prevent text selection

            // Store initial mouse position and div size and position
            mouseX = e.clientX;
            mouseY = e.clientY;
            divWidth = div.offsetWidth;
            divHeight = div.offsetHeight;
            divTop = div.offsetTop;
            divLeft = div.offsetLeft;

            // Function to calculate resizing
            function onMouseMove(e) {
                const dx = e.clientX - mouseX;
                const dy = e.clientY - mouseY;

                // Resizing logic based on the handle's axis (both, width, or height)
                if (handle.axis === 'both') {
                    if (handle.class.includes('top-left')) {
                        div.style.width = divWidth - dx + 'px';
                        div.style.height = divHeight - dy + 'px';
                        div.style.top = divTop + dy + 'px';  // Adjust top position
                        div.style.left = divLeft + dx + 'px'; // Adjust left position
                    } else if (handle.class.includes('top-right')) {
                        div.style.width = divWidth + dx + 'px';
                        div.style.height = divHeight - dy + 'px';
                        div.style.top = divTop + dy + 'px';  // Adjust top position
                    } else if (handle.class.includes('bottom-left')) {
                        div.style.width = divWidth - dx + 'px';
                        div.style.height = divHeight + dy + 'px';
                        div.style.left = divLeft + dx + 'px'; // Adjust left position
                    } else if (handle.class.includes('bottom-right')) {
                        div.style.width = divWidth + dx + 'px';
                        div.style.height = divHeight + dy + 'px';
                    }
                } else if (handle.axis === 'width') {
                    if (handle.class.includes('left')) {
                        div.style.width = divWidth - dx + 'px';
                        div.style.left = divLeft + dx + 'px';  // Adjust left position
                    } else if (handle.class.includes('right')) {
                        div.style.width = divWidth + dx + 'px';
                    }
                } else if (handle.axis === 'height') {
                    if (handle.class.includes('top')) {
                        div.style.height = divHeight - dy + 'px';
                        div.style.top = divTop + dy + 'px';  // Adjust top position
                    } else if (handle.class.includes('bottom')) {
                        div.style.height = divHeight + dy + 'px';
                    }
                }

                // Update the size display inputs
                updateSizeInputs();
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
    });
}

// Make the div resizable
const resizableDiv = document.getElementById('resizable');
makeResizableDiv(resizableDiv);
