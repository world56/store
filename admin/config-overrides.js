const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    }),
  ),
};
