module.exports = {
  name: "auth",
  port: 8081,
  filename: "remoteEntry.js",
  exposes: {
    "./Login": "./src/Login",
    "./Register": "./src/Register",
    "./LogoutButton": "./src/LogoutButton",
  },
  shared: ["react", "react-dom"],
};
