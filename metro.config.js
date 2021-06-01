const path = require("path");
//  const blacklist = require('./blocklist');

const watchFolders = [
  path.resolve(__dirname, "./packages/modules"),
  path.resolve(__dirname, "node_modules"),
];
const blockList = [/packages\web/, /node_modules\/@monorepo\/web/];

module.exports = {
  projectRoot: path.join(__dirname, "packages/mobile"),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    resolverMainFields: ["react-native", "browser", "module", "main"],
    blockList,
  },
  watchFolders,
};
