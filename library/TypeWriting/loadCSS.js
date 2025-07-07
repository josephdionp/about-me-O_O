//   //add css
// rules: cannot be type: module


//   function loadCSS(url) {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = url;
//   document.head.appendChild(link);
// }


//load only if not already loaded
function loadCSS(url) {
  if (![...document.styleSheets].some(sheet => sheet.href === url)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}



// function loadCSS(url) {
//   // Check if the stylesheet is already present
//   const isAlreadyLoaded = [...document.styleSheets].some(
//     sheet => sheet.href && sheet.href.includes(url)
//   );

//   if (!isAlreadyLoaded) {
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = url;
//     document.head.appendChild(link);
//   }
// }
