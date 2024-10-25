module.exports = {
  name: "profile",
  port: 8083,
  filename: "remoteEntry.js",
  exposes: {
    "./ViewProfile": "./src/ViewProfile",
    "./EditProfile": "./src/EditProfile",
    "./EditAvatar": "./src/EditAvatar",
  },
  shared: ["react", "react-dom"],
};
