  function addDragHandle(div) {
    
    const dragHandles = [{ class: "background", axis: "none" }];
    
    
    // var movableDiv = document.querySelector(".resizable");
    // Create the dragHandle div
  
    dragHandles.forEach((handle) => {
        var dragHandle = document.createElement("div");
        dragHandle.classList.add("dragHandle", handle.class);
        var p = document.createElement("p");
        p.textContent = "Move and Resize!";
        dragHandle.appendChild(p);
        div.appendChild(dragHandle);
    });


    
    // movableDiv.appendChild(dragHandle);
    var dragHandle = document.querySelector(".dragHandle");
    var movableDiv = document.querySelector(".resizable");
    var offsetX, offsetY;


    function dragDiv(e) {
      movableDiv.style.left = e.clientX - offsetX + "px";
      movableDiv.style.top = e.clientY - offsetY + "px";
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