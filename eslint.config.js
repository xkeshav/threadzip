import js from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // 1. Base JS & TS Config
  {
    ignores: ["dist/", ".astro/", "node_modules/", "src/env.d.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 2. React Config
  {
    files: ["**/*.{jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      // Fixes 'React must be in scope' for React 17+ / Astro
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-no-target-blank": "warn",
      quotes: ["error", "double", { avoidEscape: true }],
    },
  },

  // 3. Astro Config (The critical part for your error)
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    rules: {
      quotes: ["error", "double"],
    },
  },

  // 4. Global Settings (Fixes @astrojs/react resolution)
  {
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      quotes: ["error", "double", { avoidEscape: true }],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // 5. Ignore built files
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
];
