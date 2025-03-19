// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
// const upstreamTransfor	mer = require("metro-react-native-babel-transformer");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const workspaceRoot = path.resolve(__dirname, "../");
const projectRoot = __dirname;

// thirdweb config
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  "react-native",
  "browser",
  "require",
];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// fix for thirdweb, replace react_1.default.forwardRef with react_1.forwardRef
// config.transformer = {
//   ...config.transformer,
//   babelTransformerPath: {
//     transform({ filename, src, options }) {
//       // Only apply the transformation to files from the thirdweb package
//       if (filename.includes("node_modules/thirdweb")) {
//         // Replace react_1.default.forwardRef with react_1.forwardRef
//         const modifiedSrc = src.replace(
//           /react_1\.default\.forwardRef/g,
//           "react_1.forwardRef"
//         );
//         // Pass the modified source to the upstream transformer
//         return upstreamTransformer.transform({
//           filename,
//           src: modifiedSrc,
//           options,
//         });
//       }
//       // For all other files, use the default transformer
//       return upstreamTransformer.transform({ filename, src, options });
//     },
//   },
// };

module.exports = config;
