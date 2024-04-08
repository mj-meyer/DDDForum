module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 8,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    'prettier/prettier': ['warn'],
  },
}
