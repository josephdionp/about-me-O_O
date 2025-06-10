const md = window.markdownit(); // include markdown-it via CDN or bundler

async function loadMarkdown(postFile) {
  const res = await fetch(postFile);
  const raw = await res.text();

  const html = md.render(raw);
  document.getElementById('content-area').innerHTML = html;
}






document.getElementById('yourElementId').innerHTML = '<input type="file" id="fileInput">';