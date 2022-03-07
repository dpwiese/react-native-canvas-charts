module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "jest"],
  extends: [
    "@react-native-community",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/consistent-type-imports": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/no-duplicates": ["error"],
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "error",
    "react-native/no-unused-styles": 2,
    "react-native/no-inline-styles": 1,
    "react-native/no-color-literals": 1,
    "react-native/no-raw-text": 0,
    "react-native/no-single-element-style-arrays": 2,
    "import/no-unresolved": 0, // TS does this for us
    "import/namespace": 0, // does not play well with TS
    "import/first": 2,
    "import/newline-after-import": 1,
    "react/jsx-key": 2,
    "import/order": [
      "error",
      {
        // the default + types at the end
        groups: ["builtin", "external", "parent", "sibling", "index", "type"],
      },
    ],
  },
};
