const path = require("path");
const paths = require("react-scripts/config/paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const { override, addWebpackAlias, fixBabelImports } = require("customize-cra");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const addStylusLoaders = () => (config) => {
  const isEnvDevelopment = config.mode === "development";
  const isEnvProduction = config.mode === "production";
  config.module.rules[1].oneOf.unshift({
    test: /\.styl$/,
    use: [
      isEnvDevelopment && require.resolve("style-loader"),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: paths.publicUrlOrPath.startsWith(".")
          ? { publicPath: "../../" }
          : {},
      },
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 3,
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
          modules: { mode: "local", getLocalIdent: getCSSModuleLocalIdent },
        },
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          postcssOptions: {
            ident: "postcss",
            config: false,
            plugins: [
              "postcss-flexbugs-fixes",
              [
                "postcss-preset-env",
                { autoprefixer: { flexbox: "no-2009" }, stage: 3 },
              ],
              "postcss-normalize",
            ],
          },
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      },
      {
        loader: require.resolve("resolve-url-loader"),
        options: {
          root: paths.appSrc,
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      },
      {
        loader: require.resolve("stylus-loader"),
        options: { sourceMap: true },
      },
    ].filter(Boolean),
  });
  return config;
};

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
    addStylusLoaders(),
  ),
};
