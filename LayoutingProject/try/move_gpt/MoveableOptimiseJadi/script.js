// Function to add an external CSS file dynamically
function addExternalCSS() {
    // Create a <link> element
    var link = document.createElement('link');
    // Set the link's attributes to point to the CSS file
    link.rel = "stylesheet";
    link.href = "movable.css";
    // Append the <link> element to the <head>
    document.head.appendChild(link);
}
addExternalCSS();


var movableButton = document.querySelector(".movableButton");
function addDragHandle(){
    var movableDiv = document.querySelector(".movableDiv");
    // Create the dragHandle div
    var dragHandle = document.createElement('div');
    dragHandle.classList.add('dragHandle');
    
    // Create the paragraph inside the dragHandle
    var p = document.createElement('p');
    p.textContent = 'Move me around and toggle visibility!';
    // Append the paragraph to the dragHandle div
    dragHandle.appendChild(p);
    // Append the dragHandle to the movableDiv
    movableDiv.appendChild(dragHandle);
    }
    addDragHandle();
    
// Function to toggle visibility of the movable div
movableButton.addEventListener("click", function toggleDiv() {
    var div = document.querySelector(".dragHandle");
    div.style.display = div.style.display === "none" ? "block" : "none";
});

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
