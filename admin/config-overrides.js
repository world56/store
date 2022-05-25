const path = require("path");
const { override, addWebpackAlias, fixBabelImports } = require("customize-cra");

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: "css",
    }),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    }),
  ),
};
