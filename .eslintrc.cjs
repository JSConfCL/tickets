const sharedExtends = [
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking",
  "plugin:tailwindcss/recommended",
  "plugin:import/recommended",
  "plugin:import/typescript",
  "plugin:@next/next/recommended",
];
const sharedplugins = ["react-hooks"];
const sharedRules = {
  "react/react-in-jsx-scope": "off",
  "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
  "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
  // turn on errors for missing imports
  "import/no-unresolved": "error",
  // turn on errors for missing imports
  "no-console": "error",
  "import/no-unresolved": "error",
  curly: ["error", "all"],
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
};
module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      plugins: [...sharedplugins],
      extends: [...sharedExtends],
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...sharedRules,
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      plugins: [...sharedplugins],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: [...sharedExtends],
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...sharedRules,
      },
    },
    {
      files: ["*.graphql", "*.gql"],
      parser: "@graphql-eslint/eslint-plugin",
      plugins: ["@graphql-eslint"],
      extends: ["plugin:@graphql-eslint/schema-recommended"],
      parserOptions: {
        schema: "./**/*.graphql",
      },
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: __dirname,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/", "app/"],
        paths: ["./src", "./app"],
      },
    },
  },
};
