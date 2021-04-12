// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  // support monorepos
  projects: [
    {
      root: "./client", //root of subproject
      package: "./package.json", // It is relative to root property.
      tsconfig: "./jsconfig.json", // It is relative to root property.
      globalComponents: ["./components/**/*.vue"],
    },
  ],
};
