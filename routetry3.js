async function reloadScripts(container) {
    const scripts = container.querySelectorAll('script');
    const promises = [];

    scripts.forEach(script => {
        const src = script.getAttribute('src');

        // --- ✅ Skip if script already exists ---
        if (src && document.querySelector(`script[src="${src}"]`)) {
            console.log(`Skipping already loaded script: ${src}`);
            return;
        }

        const newScript = document.createElement('script');
        [...script.attributes].forEach(attr => newScript.setAttribute(attr.name, attr.value));

        if (src) {
            newScript.src = src;
            promises.push(new Promise((resolve, reject) => {
                newScript.onload = resolve;
                newScript.onerror = () => reject(`Failed to load script: ${src}`);
            }));
        } else {
            newScript.textContent = script.textContent;
        }

        script.remove();
        container.appendChild(newScript);
    });

    if (promises.length) {
        try {
            await Promise.all(promises);
            console.log('All external scripts loaded.');
        } catch (e) {
            console.warn(e);
        }
    }
}
