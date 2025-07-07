// async function loadTemplate(file, containerId) {
//     const res = await fetch(file + '?_=' + Date.now()); // cache buster
//     if (!res.ok) {
//         console.error('Failed to load:', file);
//         return;
//     }

//     const html = await res.text();

//     const temp = document.createElement('div');
//     temp.innerHTML = html;

//     const template = temp.querySelector('template');
//     const contentToInject = template ? template.content.cloneNode(true) : temp;

//     const container = document.getElementById(containerId);

//     // --- IMPORTANT: Clear ALL old content, including scripts ---
//     // If you truly want to re-run everything, clear the container fully.
//     // If you want to keep *some* scripts, you need a more sophisticated
//     // tracking mechanism (e.g., data attributes on persistent scripts,
//     // and then re-append them before the new content).
//     container.innerHTML = '';

//     // Append the new template content
//     container.appendChild(contentToInject);

//     // --- Process Scripts from the newly injected content ---
//     // We query for scripts *after* contentToInject is appended to the DOM
//     // to ensure we get the actual live script elements.
//     const scripts = container.querySelectorAll('script');
//     let hasExternalScripts = false; // Flag to track if we need to wait for external scripts

//     const scriptPromises = []; // To hold promises for external script loading

//     scripts.forEach(oldScript => {
//         const newScript = document.createElement('script');

//         // Copy attributes like type, nonce, etc.
//         Array.from(oldScript.attributes).forEach(attr => {
//             newScript.setAttribute(attr.name, attr.value);
//         });

//         if (oldScript.src) {
//             newScript.src = oldScript.src;
//             if (oldScript.async) newScript.async = true; // Maintain async if originally set
//             if (oldScript.defer) newScript.defer = true; // Maintain defer if originally set
//             hasExternalScripts = true;

//             // Create a promise that resolves when the script loads or errors
//             scriptPromises.push(new Promise((resolve, reject) => {
//                 newScript.onload = () => {
//                     console.log(`External script loaded: ${newScript.src}`);
//                     resolve();
//                 };
//                 newScript.onerror = () => {
//                     console.error(`Error loading external script: ${newScript.src}`);
//                     reject(); // Or resolve() if you want to proceed even with script errors
//                 };
//             }));
//         } else {
//             // Inline script
//             newScript.textContent = oldScript.textContent;
//             console.log('Inline script re-inserted.');
//         }

//         // Replace the old script element with the new one
//         oldScript.remove(); // Remove the "old" (just parsed) script element
//         container.appendChild(newScript); // Append the "new" script element to trigger execution
//     });

//     // Wait for all external scripts to load if any were present
//     if (hasExternalScripts) {
//         await Promise.all(scriptPromises)
//             .then(() => console.log('All external scripts loaded.'))
//             .catch(() => console.warn('Some external scripts failed to load.')); // Handle errors gracefully
//     }
// }


// // Compute base path dynamically (e.g., '/repo-name/')
// // const basePath = window.location.pathname.split('/').slice(0, -1).join('/') + '/';

// let basePath = window.location.pathname.split('/').slice(0, -1).join('/') + '/';
// async function navigate(page) {
// //     let base;
// //     if (base === null || base === undefined) {
// //         base = basePath;
// //     }
// //     basePath = base;


//     const fullPath = basePath + page;
//     console.log(`Navigating to: ${fullPath}`);
//     await loadTemplate(fullPath, 'page-content');
//     console.log(`Finished loading ${fullPath}`);
// }






// // async function navigate(page) {
// //     console.log(`Navigating to: ${page}`);
// //     await loadTemplate(page, 'page-content');
// //     console.log(`Finished loading ${page}`);
// // }



















































async function loadRoutesFromJSON(file = 'routes.json') {
    const res = await fetch(file);
    if (!res.ok) throw new Error('Failed to load route config');
    return await res.json();
}

let Routes = {};
loadRoutesFromJSON().then(data => {
    Routes = data;
    navigate('home.html'); // or another default route
});





// Base path for loading templates (can be changed later)
let basePath = window.location.pathname.replace(/\/[^\/]*$/, '/') || '/';

// Loads a template and injects it into the container
async function loadTemplate(file, containerId) {
    try {
        const res = await fetch(`${file}?_=${Date.now()}`); // Cache-busting
        if (!res.ok) throw new Error(`Failed to load: ${file}`);

        const html = await res.text();

        // Parse the HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Get either <template> content or the whole thing
        const template = temp.querySelector('template');
        const content = template ? template.content.cloneNode(true) : temp;

        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear existing content
        container.appendChild(content); // Inject new content

        // Reload scripts
        await reloadScripts(container);

    } catch (err) {
        console.error(err);
    }
}

// Handles reloading of scripts from newly inserted content
async function reloadScripts(container) {
    const scripts = container.querySelectorAll('script');
    const promises = [];

    scripts.forEach(script => {
        const newScript = document.createElement('script');

        // Copy all attributes
        [...script.attributes].forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        if (script.src) {
            // External script
            newScript.src = script.src;
            if (script.async) newScript.async = true;
            if (script.defer) newScript.defer = true;

            promises.push(new Promise((resolve, reject) => {
                newScript.onload = () => resolve();
                newScript.onerror = () => reject(`Failed to load: ${script.src}`);
            }));
        } else {
            // Inline script
            newScript.textContent = script.textContent;
        }

        script.remove();
        container.appendChild(newScript); // Trigger execution
    });

    if (promises.length > 0) {
        try {
            await Promise.all(promises);
            console.log('All external scripts loaded.');
        } catch (e) {
            console.warn(e);
        }
    }
}

// Navigate to a new page (load template into container)
async function navigate(page) {
    const fullPath = basePath + page;
    console.log(`Navigating to: ${fullPath}`);
    await loadTemplate(fullPath, 'page-content');
    console.log(`Finished loading: ${fullPath}`);
}



