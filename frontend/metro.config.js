const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);
  defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
  defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== "svg");
  defaultConfig.resolver.sourceExts.push('svg');
  defaultConfig.server.rewriteRequestUrl = (url) => {
    if (!url.endsWith('.bundle')) {
      return url;
    }
    // https://github.com/facebook/react-native/issues/36794
    // JavaScriptCore strips query strings, so try to re-add them with a best guess.
    return url + '?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true';
  };
  return defaultConfig;
})();