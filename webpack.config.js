const Dotenv = require("dotenv-webpack").config({
  path: path.resolve(__dirname + "/.env"),
});
const LiveServer = require("live-server");
const path = require("path");
const dev = process.env.NODE_ENV === "development";
if (dev) {
  LiveServer.start({
    root: "./",
    file: "index.html",
  });
}

module.exports = {
  watch: dev,
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new Dotenv({ systemvars: true, path: path.resolve(__dirname + "/.env") }),
  ],
};
console.log("path resolve :", path.resolve(__dirname + "/.env"));
/* resolve marca que archivos queremos que sean ejecutados */
