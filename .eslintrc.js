module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "semi": "error",
    "no-console": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true}],
    "react-hooks/exhaustive-deps": "off",
    "object-curly-spacing": ["error", "always"],
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "linebreak-style": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
      { "usePrettierrc": true }
    ],
    "react/display-name": "off",
    "sort-imports": [
      "warn",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
      }
    ]
  },
  overrides: [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      },
      "plugins": ["@typescript-eslint"],
      "rules": {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
      },
      "settings": {
        "react": {
          "version": "detect"
        },
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
          "typescript": {}
        }
      }
    }
  ]
};
