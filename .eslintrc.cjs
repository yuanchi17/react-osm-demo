module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
  plugins: ['react', 'react-refresh', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'react-refresh/only-export-components': 'warn',
    // https://zh-hant.legacy.reactjs.org/docs/hooks-rules.html
    'react-hooks/rules-of-hooks': 'warn', // 檢查 Hook 的規則
    'react-hooks/exhaustive-deps': 'off', // 檢查 effect 的相依性
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/display-name': 'off',
  },
}
