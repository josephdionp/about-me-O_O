// Function to toggle visibility of the movable div
function toggleDiv() {
    var div = document.querySelector(".dragHandle");
    div.style.display = div.style.display === "none" ? "block" : "none";
}

// Make the div draggable
var dragHandle = document.querySelector(".dragHandle");
var movableDiv = document.querySelector(".movableDiv");
var offsetX, offsetY;

dragHandle.addEventListener('mousedown', function(e) {
    offsetX = e.clientX - movableDiv.getBoundingClientRect().left;
    offsetY = e.clientY - movableDiv.getBoundingClientRect().top;

    // Enable dragging by listening to mousemove event
    document.addEventListener('mousemove', dragDiv);
    
    // Disable dragging when mouse is released
    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', dragDiv);
    });
});

function dragDiv(e) {
    movableDiv.style.left = e.clientX - offsetX + 'px';
    movableDiv.style.top = e.clientY - offsetY + 'px';
}
