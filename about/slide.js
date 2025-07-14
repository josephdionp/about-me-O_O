//to handle the scroll effect on the layer
// This script will move the layer horizontally based on the scroll position
(() => {
  let layer = document.querySelector(".layer");
  window.addEventListener("scroll", function () {
    let value = window.scrollY;
    layer.style.left = value + "px";
  });
})();