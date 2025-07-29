module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended', // 让 ESLint 使用 Prettier 的规则
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/html-indent': ['error', 2], // Vue 模板缩进 2 空格
    'indent': ['error', 2],          // JS/TS 缩进 2 空格
    'semi': ['error', 'always'],     // 强制分号
    'prettier/prettier': 'error',    // 启用 Prettier 规则
  },
};