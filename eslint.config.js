import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /* React */
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      /* React Hooks */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* TypeScript */
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      /* Enforce `import type` */
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      /* Import hygiene */
      "import/no-duplicates": "error",

      /* General */
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
