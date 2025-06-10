// Function to add an external CSS file dynamically
function addExternalCSS() {
  // Create a <link> element
  var link1 = document.createElement("link");
  // Set the link's attributes to point to the CSS file
  link1.rel = "stylesheet";
  link1.href = "resizeable.css";
  // Append the <link> element to the <head>
  document.head.appendChild(link1);
}
addExternalCSS();


function addResizeHandle(div) {
  // Create resize handles for all edges and corners
  const resizeHandles = [
    { class: "top-left", axis: "both" },
    { class: "top-right", axis: "both" },
    { class: "bottom-left", axis: "both" },
    { class: "bottom-right", axis: "both" },
    { class: "top", axis: "height" },
    { class: "bottom", axis: "height" },
    { class: "left", axis: "width" },
    { class: "right", axis: "width" },
  ];
  // ;

  // Select the input fields for width and height
  const widthInput = document.querySelector(".width-input");
  const heightInput = document.querySelector(".height-input");

  // Function to update the input fields' placeholders with current width and height
  function updatePlaceholders() {
    widthInput.placeholder = `${div.offsetWidth}`;
    heightInput.placeholder = `${div.offsetHeight}`;
  }



  // Initialize the placeholders with current size
  updatePlaceholders();

  // Update the size of the div when the user types in the input fields
  widthInput.addEventListener("input", function () {
    const newWidth = parseInt(widthInput.value.replace("px", "")) || 0;
    div.style.width = newWidth + "px";
    updatePlaceholders();
  });

  heightInput.addEventListener("input", function () {
    const newHeight = parseInt(heightInput.value.replace("px", "")) || 0;
    div.style.height = newHeight + "px";
    updatePlaceholders();
  });

  // Add event listeners to resize handles
  resizeHandles.forEach((handle) => {
    const resizeHandle = document.createElement("div");
    resizeHandle.classList.add("resizeHandle", handle.class);
    div.appendChild(resizeHandle);

    // Variables to store mouse position and div size
    let mouseX, mouseY, divWidth, divHeight, divTop, divLeft;

    // Mouse down event to start resizing
    resizeHandle.addEventListener("mousedown", function (e) {
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
        if (handle.axis === "both") {
          if (handle.class.includes("top-left")) {
            div.style.width = divWidth - dx + "px";
            div.style.height = divHeight - dy + "px";
            div.style.top = divTop + dy + "px"; // Adjust top position
            div.style.left = divLeft + dx + "px"; // Adjust left position
          } else if (handle.class.includes("top-right")) {
            div.style.width = divWidth + dx + "px";
            div.style.height = divHeight - dy + "px";
            div.style.top = divTop + dy + "px"; // Adjust top position
          } else if (handle.class.includes("bottom-left")) {
            div.style.width = divWidth - dx + "px";
            div.style.height = divHeight + dy + "px";
            div.style.left = divLeft + dx + "px"; // Adjust left position
          } else if (handle.class.includes("bottom-right")) {
            div.style.width = divWidth + dx + "px";
            div.style.height = divHeight + dy + "px";
          }
        } else if (handle.axis === "width") {
          if (handle.class.includes("left")) {
            div.style.width = divWidth - dx + "px";
            div.style.left = divLeft + dx + "px"; // Adjust left position
          } else if (handle.class.includes("right")) {
            div.style.width = divWidth + dx + "px";
          }
        } else if (handle.axis === "height") {
          if (handle.class.includes("top")) {
            div.style.height = divHeight - dy + "px";
            div.style.top = divTop + dy + "px"; // Adjust top position
          } else if (handle.class.includes("bottom")) {
            div.style.height = divHeight + dy + "px";
          }
        }
        // else if (handle.class.includes('background')) {

        // }
        // Update the placeholders with the new size
        updatePlaceholders();
      }

      // Mouse up event to stop resizing
      function onMouseUp() {
        // Remove the mousemove and mouseup listeners when resizing ends
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      // Attach mousemove and mouseup listeners to the document
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
}

function addDragHandle(div) {
  const dragHandles = [{ class: "background", axis: "none" }];

  // Add the drag handle to the div
  dragHandles.forEach((handle) => {
      var dragHandle = document.createElement("div");
      dragHandle.classList.add("dragHandle", handle.class);
      var p = document.createElement("p");
      p.textContent = "Move and Resize!";
      dragHandle.appendChild(p);
      div.appendChild(dragHandle);
  });

  // Ensure the movable div has position: relative (or absolute) to enable left/top adjustments
  // div.style.position = "absolute"; // Make sure it's positioned
    // var dragHandle = document.querySelector(".dragHandle");
    // var movableDiv = document.querySelector(".resizable");
    // var offsetX, offsetY;


  var dragHandle = div.querySelector(".dragHandle"); // Select the drag handle within the specific div
  var movableDiv = div; // This is the div passed to the function (the one we want to move)
  var offsetX, offsetY;

  function dragDiv(e) {
      movableDiv.style.left = e.clientX - offsetX + "px"; // Adjust the position of the div
      movableDiv.style.top = e.clientY - offsetY + "px";  // Adjust the position of the div
  }

  dragHandle.addEventListener("mousedown", function (e) {
      offsetX = e.clientX - movableDiv.getBoundingClientRect().left;
      offsetY = e.clientY - movableDiv.getBoundingClientRect().top;

      // Enable dragging by listening to mousemove event
      document.addEventListener("mousemove", dragDiv);

      // Disable dragging when mouse is released
      document.addEventListener("mouseup", function () {
          document.removeEventListener("mousemove", dragDiv);
      });
  });
}

// const resizableDivs = document.querySelectorAll(".resizable"); // Selects all elements with class 'resizable'
// resizableDivs.forEach(function (div) {
//   addResizeHandle(div);
//   addDragHandle(div);
// });

var resizableButton = document.querySelector(".resizableButton");
// // // Function to toggle visibility of the movable div
// resizableButton.addEventListener("click", function toggleDiv() {
//   [...document.querySelectorAll(".dragHandle, .resizeHandle")].forEach(
//     (el) => (el.style.display = el.style.display === "none" ? "block" : "none")
//   );
// });
let allowSelect = null;
resizableButton.addEventListener("click", function toggleDiv() {
    [...document.querySelectorAll(".dragHandle, .resizeHandle")].forEach(
      (el) => (el.style.display = el.style.display === "none" ? "block" : "none")
    );
  }); 

let selectedDiv = null;  
// const divs = document.querySelectorAll('.clickable');
// // Add a click event listener to each clickable divd
// divs.forEach(function(div) {
//   div.addEventListener('click', function() {
//       // If there's already a selected div, remove the 'selected' class
//       if (selectedDiv) {
//           selectedDiv.classList.remove('selected');
//       }
//       // Add the 'selected' class to the clicked div
//       div.classList.add('selected');
//       // Update the currently selected div
//       selectedDiv = div;
//   });
// });

function removeDivByClass(ClassName){
var divs = document.querySelectorAll('.' + ClassName);
divs.forEach(function(div) {
  div.remove();
});
}



document.querySelectorAll("div").forEach((div) => {
 div.addEventListener("click", function() {
   if (selectedDiv === div) return;
   if (selectedDiv){ selectedDiv.classList.remove("selected");
   }
   selectedDiv = div;
   div.classList.add("selected");

   if (div.classList.contains("selected")&& div.classList.contains("resizable") ){
  addResizeHandle(div);
  addDragHandle(div);}
 });

});


// // Initially hide the divs
// [...document.querySelectorAll(".dragHandle, .resizeHandle")].forEach(
//   (el) => (el.style.display = "none")
// );
// // Add the click event listener to the button
// resizableButton.addEventListener("click", function toggleDiv() {
//   [...document.querySelectorAll(".dragHandle, .resizeHandle")].forEach(
//     (el) => {el.style.display = el.style.display === "none" ? "block" : "none";
//     }
//   );
// });
