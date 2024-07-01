/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ["!**/.server", "!**/.client"],

  // Base config
  extends: ["eslint:recommended", "prettier"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:tailwindcss/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              "builtin", // Built-in imports (come from NodeJS native) go first
              "external", // <- External imports
              "internal", // <- Absolute imports
              ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
              "index", // <- index imports
              "unknown", // <- unknown
            ],
            "newlines-between": "always",
            alphabetize: {
              /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
              order: "asc",
              /* ignore case. Options: [true, false] */
              caseInsensitive: true,
            },
          },
        ],
        "padding-line-between-statements": [
          "error",
          { blankLine: "always", prev: "*", next: "return" },
          { blankLine: "always", prev: "*", next: "if" },
          { blankLine: "always", prev: "if", next: "*" },
          { blankLine: "always", prev: "*", next: "for" },
          { blankLine: "always", prev: "for", next: "*" },
          { blankLine: "always", prev: "*", next: "while" },
          { blankLine: "always", prev: "while", next: "*" },
          { blankLine: "always", prev: "*", next: "switch" },
          { blankLine: "always", prev: "switch", next: "*" },
          { blankLine: "always", prev: "*", next: "try" },
          { blankLine: "always", prev: "try", next: "*" },
          { blankLine: "always", prev: "*", next: "function" },
          { blankLine: "always", prev: "function", next: "*" },
          {
            blankLine: "always",
            prev: "import",
            next: ["const", "let", "var"],
          },
          {
            blankLine: "always",
            prev: ["const", "let", "var"],
            next: "expression",
          },
          { blankLine: "always", prev: "directive", next: "*" },
          { blankLine: "any", prev: "directive", next: "directive" },
        ],
      },
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
