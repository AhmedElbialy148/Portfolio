/**
 * React + FSD ESLint configuration.
 *
 * Drop into the repo root as `eslint.config.mjs`. Requires ESLint >= 9 (flat config).
 *
 * Enforces:
 *   - Strict TypeScript (no any, consistent type imports, …)
 *   - Named function expressions in React hooks (no anonymous arrows)
 *   - TSDoc docstrings on every exported symbol + file overview
 *   - FSD layer boundaries via eslint-plugin-import (use steiger for the
 *     full FSD-aware ruleset).
 *
 * Install:
 *   pnpm add -D \
 *     eslint @eslint/js typescript-eslint \
 *     eslint-plugin-react eslint-plugin-react-hooks \
 *     eslint-plugin-jsdoc eslint-plugin-import \
 *     eslint-plugin-react-refresh
 */

import js from "@eslint/js"
import tseslint from "typescript-eslint"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import jsdoc from "eslint-plugin-jsdoc"
import importPlugin from "eslint-plugin-import"

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  react.configs.flat.recommended,
  reactHooks.configs.recommended,
  jsdoc.configs["flat/recommended-typescript"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: "detect" },
      jsdoc: { mode: "typescript" },
    },
    rules: {
      // ---------- TypeScript ----------
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports", disallowTypeAnnotations: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      // ---------- React ----------
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/self-closing-comp": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ---------- Default exports ----------
      "import/no-default-export": "error",
      "import/no-anonymous-default-export": "error",

      // ---------- FSD boundaries (light — use steiger for the full set) ----------
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            { target: "src/shared", from: "src/entities" },
            { target: "src/shared", from: "src/features" },
            { target: "src/shared", from: "src/widgets" },
            { target: "src/shared", from: "src/views" },
            { target: "src/shared", from: "src/app" },
            { target: "src/entities", from: "src/features" },
            { target: "src/entities", from: "src/widgets" },
            { target: "src/entities", from: "src/views" },
            { target: "src/entities", from: "src/app" },
            { target: "src/features", from: "src/widgets" },
            { target: "src/features", from: "src/views" },
            { target: "src/features", from: "src/app" },
            { target: "src/widgets", from: "src/views" },
            { target: "src/widgets", from: "src/app" },
            { target: "src/views", from: "src/app" },
          ],
        },
      ],

      // ---------- Hooks — named function expressions ----------
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.name=/^use(Effect|LayoutEffect|InsertionEffect|Memo|Callback)$/] > ArrowFunctionExpression:first-child",
          message:
            "Pass a NAMED function expression, not an arrow, to this hook. e.g. useEffect(function syncFoo() { … }, deps).",
        },
        {
          selector:
            "CallExpression[callee.name=/^use(Effect|LayoutEffect|InsertionEffect|Memo|Callback)$/] > FunctionExpression[id=null]",
          message:
            "The function expression passed to this hook must be named. e.g. function syncFoo() { … }.",
        },
      ],

      // ---------- Docstrings ----------
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
          contexts: [
            "TSInterfaceDeclaration",
            "TSTypeAliasDeclaration",
          ],
          checkConstructors: false,
        },
      ],
      "jsdoc/require-description": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns-description": "error",
      "jsdoc/require-file-overview": [
        "error",
        {
          tags: {
            file: { mustExist: true, preventDuplicates: true },
          },
        },
      ],
      "jsdoc/require-param-type": "off",
      "jsdoc/require-returns-type": "off",
      "jsdoc/no-types": "error",
    },
  },

  // ---------- Config files: default exports allowed ----------
  {
    files: [
      "vite.config.ts",
      "*.config.{js,mjs,ts}",
    ],
    rules: {
      "import/no-default-export": "off",
      "import/no-anonymous-default-export": "off",
    },
  },

  // ---------- Tests ----------
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-file-overview": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },

  {
    ignores: ["dist/", "node_modules/", "coverage/"],
  },
)
