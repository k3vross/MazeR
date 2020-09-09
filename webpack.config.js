const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", "*"],
  },
};
