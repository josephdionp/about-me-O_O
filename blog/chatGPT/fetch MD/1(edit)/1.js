
    // Define your markdown files here
    const posts = ['post1.md', 'post2.md', 'post3.md'];

    const nav = document.getElementById('nav');
    const content = document.getElementById('content');

    // Populate the navigation
    posts.forEach(filename => {
      const link = document.createElement('a');
      link.href = "#";
      link.textContent = filename.replace('.md', '');
      link.onclick = (e) => {
        e.preventDefault();
        loadMarkdown('posts/' + filename);
      };
      nav.appendChild(link);
    });

    // Load and render the markdown file
    function loadMarkdown(file) {
      fetch(file)
        .then(res => {
          if (!res.ok) throw new Error('Post not found');
          return res.text();
        })
        .then(md => {
          content.innerHTML = marked.parse(md);
        })
        .catch(err => {
          content.innerHTML = `<p>Error loading post: ${err.message}</p>`;
        });
    }
  