module.exports = {
  apps: [
    {
      name: "RMC-Utilities",
      interpreter_args: "--env-file=.env",
      script: "./dist/index.js",
    },
  ],
};
