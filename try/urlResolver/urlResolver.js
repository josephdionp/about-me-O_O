// /lib/url-resolver.js

(function (global) {
  const aliases = {
    '@assets': '/assets',
    '@modules': '/module',
    '@lib': '/library'
  };

  function add(alias, path) {
    aliases[alias] = path;
  }

  function resolve(url) {
    for (const [alias, base] of Object.entries(aliases)) {
      if (url.startsWith(alias)) {
        return url.replace(alias, base);
      }
    }
    return url;
  }

  global.URL = {
    add,
    resolve
  };
})(window);
