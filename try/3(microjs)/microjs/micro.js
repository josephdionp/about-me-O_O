// microjs/micro.js

(function(global) {
  const aliases = {
    "[module]": "/module",
    "[assets]": "/assets"
  };

  // Allow updating or adding aliases
  function config(newAliases = {}) {
    Object.assign(aliases, newAliases);
  }

  // Resolve a custom alias-based URL to real URL
  function resolve(url) {
    for (const [alias, path] of Object.entries(aliases)) {
      if (url.startsWith(alias)) {
        return url.replace(alias, path);
      }
    }
    return url;
  }

  // Load a JS module (script tag)
  function use(modulePath, callback) {
    const script = document.createElement('script');
    script.src = resolve(modulePath);
    script.onload = () => {
      console.log(`[MicroJS] Loaded module: ${modulePath}`);
      callback?.();
    };
    script.onerror = () => {
      console.error(`[MicroJS] Failed to load module: ${modulePath}`);
    };
    document.head.appendChild(script);
  }

  // Generic loader for any file (returns a resolved URL)
  function load(resourcePath) {
    return resolve(resourcePath);
  }

  // Expose to global
  global.MicroJS = {
    config,
    use,
    load,
    resolve
  };
})(window);
