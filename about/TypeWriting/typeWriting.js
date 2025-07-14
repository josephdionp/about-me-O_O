
  // Get words from HTML
const wordElements = document.querySelectorAll('#TW-words span');
const words = Array.from(wordElements).map(el => el.textContent.trim());

// Typing logic
let i = 0;
let j = 0;
let isDeleting = false;
let currentWord = "";

const wordEl = document.getElementById("TW-typed-word");
const articleEl = document.getElementById("TW-article");

function getArticle(word) {
  const first = word.trim()[0].toLowerCase();
  return ['a', 'e', 'i', 'o', 'u'].includes(first) ? 'an' : 'a';
}

function type() {
  currentWord = words[i];

  if (!isDeleting) {
    j++;
    wordEl.textContent = currentWord.substring(0, j);
    articleEl.textContent = getArticle(currentWord);
  } else {
    j--;
    wordEl.textContent = currentWord.substring(0, j);
  }

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1000); // pause before deleting
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(type, 300); // pause before typing next word
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

type();


if (typeof loadCSS === 'function') {
  loadCSS("typeWriting.css");
}

