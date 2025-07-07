const URL_ALIASES = {
  "[module]": "/module",
  "[assets]": "/assets",
  "[lib]": "/libraries"
};



function resolveURL(inputUrl) {
  for (const [alias, realPath] of Object.entries(URL_ALIASES)) {
    if (inputUrl.startsWith(alias)) {
      return inputUrl.replace(alias, realPath);
    }
  }
  return inputUrl; // fallback to raw URL if no alias matches
}
