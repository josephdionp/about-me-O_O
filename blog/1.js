  const nav = document.getElementById('nav');
  const content = document.getElementById('content');

  fetch('posts/manifest.json')
    .then(res => res.json())
    .then(posts => {
      posts.forEach(filename => {
        const link = document.createElement('a');
        link.href = "#";
        // link.textContent = filename.replace('.md', '');
       link.textContent = filename.split(/[/\\]/).pop().replace(/\.[^/.]+$/, ""); //remove link and file extension

        link.onclick = (e) => {
          e.preventDefault();
          loadMarkdown('posts/' + filename);
        };
        nav.appendChild(link);
      });
    });

  function loadMarkdown(file) {
    fetch(file)
      .then(res => res.text())
      .then(md => {
        content.innerHTML = marked.parse(md);
      })
      .catch(err => {
        content.innerHTML = `<p>Error loading post: ${err.message}</p>`;
      });
  }


  // window.location.replace("http:www.example.com");
  function changeurl(url, title) {
    var new_url = '/' + bloguii;
    window.history.pushState('data', title, new_url);
    
}