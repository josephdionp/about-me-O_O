
//load only if not already loaded
function loadCSS(url) {
  if (![...document.styleSheets].some(sheet => sheet.href === url)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}


