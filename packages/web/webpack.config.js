const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

const MODE = process.env.NODE_ENV || "development";
const PRODUCTION = MODE === "production";

module.exports = {
  mode: MODE,
  devtool: PRODUCTION ? "hidden-source-map" : "source-map",
  entry: {
    bundle: "./src/App.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].js",
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: "/dist/",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(MODE),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer:
      MODE === "production"
        ? [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                output: {
                  comments: false,
                },
              },
            }),
          ]
        : [],
    splitChunks: {
      cacheGroups: {
        react: {
          test: /react|react-dom/,
          name: "react",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};
