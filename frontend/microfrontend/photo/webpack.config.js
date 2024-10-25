module.exports = {
  name: "photo",
  port: 8082,
  filename: "remoteEntry.js",
  exposes: {
    "./Card": "./src/Card",
    "./AddPhoto": "./src/AddPhoto",
  },
  shared: ["react", "react-dom"],
};
