const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "./src/js/indexTemp.js"),
    about: path.resolve(__dirname, "./src/js/aboutTemp.js"),
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name][hash].js",
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      // title
      title: "Home || main ",
      //fileName
      filename: "index.html",
      // template
      template: "./src/indexTemp.html",
      chunks: "index",
    }),
    new HtmlWebpackPlugin({
      // title
      title: "About ",
      //fileName
      filename: "about.html",
      // template
      template: "./src/aboutTemp.html",
      chunks: "about",
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    port: 3000,
  },
};
