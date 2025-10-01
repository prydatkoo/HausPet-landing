module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js', 'jest.setup.js'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['*.config.js', 'babel.config.js', 'jest.config.js', 'jest.setup.js'],
      env: { node: true },
      parserOptions: { sourceType: 'script' },
    },
    {
      files: ['**/__tests__/**/*.js', '**/__tests__/**/*.jsx', '**/*.test.js', '**/*.test.jsx'],
      env: { jest: true },
    },
  ],
};
