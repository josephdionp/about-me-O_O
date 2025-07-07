const words = ["Creative", "Smart", "Bold", "Curious", "Driven"];
let index = 0;
const wordElement = document.getElementById("changing-word");

setInterval(() => {
    wordElement.style.opacity = 0;
    setTimeout(() => {
        index = (index + 1) % words.length;
        wordElement.textContent = words[index];
        wordElement.style.opacity = 1;
    }, 500);
}, 2000);



// Load the CSS file Automatically to html if the function is defined
if (typeof loadCSS === 'function') {
    loadCSS("typeWriting.css");
    // loadCSS("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
}