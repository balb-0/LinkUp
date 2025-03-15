// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
];
