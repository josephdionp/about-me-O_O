

// Holds base path and allows dynamic updates
window.AppConfig ??= {
    basePath: window.location.pathname.replace(/\/[^\/]*$/, '/') || '/',

    setBasePath(newPath) {
        if (!newPath.endsWith('/')) {
            newPath += '/';
        }
        this.basePath = newPath;
        console.log(`Base path updated to: ${this.basePath}`);
    },

    getBasePath() {
        return this.basePath;
    }
};

let Routes = {}; // Will be populated from routes.json

// Load routes.json and store in Routes object
async function loadRoutesFromJSON(file = 'routes.json') {
    try {
        const res = await fetch(`${file}?_=${Date.now()}`); // cache bust
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        Routes = await res.json();
        console.log('Routes loaded:', Routes);
    } catch (err) {
        console.error('Error loading routes:', err);
    }
}

// Load HTML template into container and re-run scripts
async function loadTemplate(file, containerId) {
    try {
        const res = await fetch(`${file}?_=${Date.now()}`);
        if (!res.ok) throw new Error(`Failed to load: ${file}`);

        const html = await res.text();
        const temp = document.createElement('div');
        temp.innerHTML = html;

        const template = temp.querySelector('template');
        const content = template ? template.content.cloneNode(true) : temp;

        const container = document.getElementById(containerId);
        container.innerHTML = '';
        container.appendChild(content);

        await reloadScripts(container);
    } catch (err) {
        console.error(err);
    }
}

// Extract and re-execute script tags from newly inserted content
async function reloadScripts(container) {
    const scripts = container.querySelectorAll('script');
    const promises = [];

    scripts.forEach(script => {
        const newScript = document.createElement('script');
        [...script.attributes].forEach(attr => newScript.setAttribute(attr.name, attr.value));

        if (script.src) {
            newScript.src = script.src;
            if (script.async) newScript.async = true;
            if (script.defer) newScript.defer = true;

            promises.push(new Promise((resolve, reject) => {
                newScript.onload = resolve;
                newScript.onerror = () => reject(`Failed to load script: ${script.src}`);
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

// Navigate to a route by name, updating basePath if needed
async function navigate(routeName) {
    const route = Routes[routeName];

    if (!route) {
        console.error(`Route "${routeName}" not found.`);
        return;
    }

    const fullPath = route.path.startsWith('/')
        ? route.path // Absolute path, don't prefix with base
        : AppConfig.getBasePath() + route.path;

    console.log(`Navigating to: ${fullPath}`);
    await loadTemplate(fullPath, 'page-content');
    console.log(`Finished loading: ${fullPath}`);
}

// 🚀 Initialize: load routes and go to default route
(async function initApp() {
    await loadRoutesFromJSON('routes.json');
    navigate('home'); // or any default route like 'about', 'cv', etc.
})();
