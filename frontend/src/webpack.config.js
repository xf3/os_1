module.exports = {
  name: "auth",
  filename: "remoteEntry.js",
  shared: ["react", "react-dom"],
  remotes: {
    auth: "auth@http://localhost:8081/remoteEntry.js",
    photo: "photo@http://localhost:8082/remoteEntry.js",
    profile: "profile@http://localhost:8083/remoteEntry.js",
  },
};
