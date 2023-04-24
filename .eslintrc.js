// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readGitignoreFiles } = require("eslint-gitignore");
const gitignore = readGitignoreFiles({ cwd: __dirname });

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/prop-types": "off",
    "prettier/prettier": ["error", { printWidth: 150 }],
  },
  globals: {
    React: "writable",
  },
  ignorePatterns: gitignore,
  overrides: [
    {
      files: ["**/*.tsx", "**/*.ts", "**/*.js", "**/*.json"],
    },
  ],
};
