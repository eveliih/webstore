import globals from "globals";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  {ignores: ["./webstore/*", "dist/*", "tuntikirjanpito/*", "node_modules/*", "vite.config.js"]}
];