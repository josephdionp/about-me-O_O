


async function loadTemplate(file, containerId) {
    const res = await fetch(file + '?_=' + Date.now());
    if (!res.ok) {
        console.error('Failed to load:', file);
        return;
    }

    const html = await res.text();
    const basePath = file.substring(0, file.lastIndexOf('/') + 1); // Dynamic path
    console.log('🔗 Dynamic base path:', basePath);

    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Fix relative asset paths before anything else
    temp.querySelectorAll('[src]').forEach(el => {
        const src = el.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
            el.setAttribute('src', basePath + src);
        }
    });

    temp.querySelectorAll('[href]').forEach(el => {
        const href = el.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('/')) {
            el.setAttribute('href', basePath + href);
        }
    });

    const template = temp.querySelector('template');
    const contentToInject = template ? template.content.cloneNode(true) : temp;

    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(contentToInject);

    // Process scripts
    const scripts = container.querySelectorAll('script');
    let hasExternalScripts = false;
    const scriptPromises = [];

    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        if (oldScript.src) {
            newScript.src = oldScript.src;
            if (oldScript.async) newScript.async = true;
            if (oldScript.defer) newScript.defer = true;
            hasExternalScripts = true;

            scriptPromises.push(new Promise((resolve, reject) => {
                newScript.onload = () => {
                    console.log(`External script loaded: ${newScript.src}`);
                    resolve();
                };
                newScript.onerror = () => {
                    console.error(`Error loading script: ${newScript.src}`);
                    reject();
                };
            }));
        } else {
            newScript.textContent = oldScript.textContent;
            console.log('Inline script re-inserted.');
        }

        oldScript.remove();
        container.appendChild(newScript);
    });

    if (hasExternalScripts) {
        await Promise.all(scriptPromises)
            .then(() => console.log('All external scripts loaded.'))
            .catch(() => console.warn('Some external scripts failed.'));
    }
}


window.navigate = navigate;