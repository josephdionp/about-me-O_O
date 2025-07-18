
    // let layer = document.querySelector(".layer");
    // window.addEventListener("scroll", function () {
    //   let value = window.scrollY;
    //   layer.style.left = value + "px"; //70px
    // });
(() => {
  let layer = document.querySelector(".layer");
  window.addEventListener("scroll", function () {
    let value = window.scrollY;
    layer.style.left = value + "px";
  });
})();