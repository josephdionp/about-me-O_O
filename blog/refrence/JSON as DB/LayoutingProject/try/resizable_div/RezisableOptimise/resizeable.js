
// Function to add an external CSS file dynamically
function addExternalCSS() {
    // Create a <link> element
    var link = document.createElement('link');
    // Set the link's attributes to point to the CSS file
    link.rel = "stylesheet";
    link.href = "resizeable.css";
    // Append the <link> element to the <head>
    document.head.appendChild(link);
}
addExternalCSS();


function makeResizableDiv(div) {
    // Create resize handles for all edges and corners
    const resizeHandles = [
        { class: 'top-left', axis: 'both' },
        { class: 'top-right', axis: 'both' },
        { class: 'bottom-left', axis: 'both' },
        { class: 'bottom-right', axis: 'both' },
        { class: 'top', axis: 'height' },
        { class: 'bottom', axis: 'height' },
        { class: 'left', axis: 'width' },
        { class: 'right', axis: 'width' }
    ]; 

    // Select the input fields for width and height
    const widthInput = document.querySelector('.width-input');
    const heightInput = document.querySelector('.height-input');

    // Function to update the input fields' placeholders with current width and height
    function updatePlaceholders() {
        widthInput.placeholder = `${div.offsetWidth}`;
        heightInput.placeholder = `${div.offsetHeight}`;
    }

    // Initialize the placeholders with current size
    updatePlaceholders();

    // Update the size of the div when the user types in the input fields
    widthInput.addEventListener('input', function() {
        const newWidth = parseInt(widthInput.value.replace('px', '')) || 0;
        div.style.width = newWidth + 'px';
        updatePlaceholders(); 
    });

    heightInput.addEventListener('input', function() {
        const newHeight = parseInt(heightInput.value.replace('px', '')) || 0;
        div.style.height = newHeight + 'px';
        updatePlaceholders(); 
    });

    // Add event listeners to resize handles
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

                // Update the placeholders with the new size
                updatePlaceholders();
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
// const resizableDiv = document.getElementsByClassName('resizable');

// makeResizableDiv(resizableDiv);

const resizableDivs = document.querySelectorAll('.resizable'); // Selects all elements with class 'resizable'
resizableDivs.forEach(function(div) {
  makeResizableDiv(div);
});

