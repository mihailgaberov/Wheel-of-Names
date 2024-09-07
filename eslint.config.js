import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import { ESLint } from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default {
  ignores: ['dist'], // Handle ignored folders
  extends: [
    js.configs.recommended,
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // Add TypeScript ESLint rules
    'prettier', // Ensure Prettier overrides other configs
  ],
  files: ['**/*.{js,jsx,ts,tsx}'], // Combine JS and TS files
  parser: tsParser, // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    react: reactPlugin,
    prettier: prettierPlugin,
    '@typescript-eslint': ESLint, // Add TypeScript ESLint plugin
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error', // Enforce Prettier rules as ESLint errors
    'no-multiple-empty-lines': ['error', { max: 1 }],
    '@typescript-eslint/no-unused-vars': 'warn', // Example TypeScript-specific rule
  },
};
