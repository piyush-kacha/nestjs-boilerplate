module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'prettier'],
  extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:import/typescript'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // NestJS default rules
    '@typescript-eslint/interface-name-prefix': 'off',
    // NestJS default rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    // NestJS default rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // NestJS default rules
    '@typescript-eslint/no-explicit-any': 'off',
    // to avoid line ending issues in windows & linux (LF vs CRLF)
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    // prefer template string over concat string
    'prefer-template': 'error',
    curly: ['error', 'all'],
    'no-trailing-spaces': 'error',
    'lines-between-class-members': 'error',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id', '_default'],
      },
    ],
    // For Typescript, it is better not to use default export: https://stackoverflow.com/a/33307487/11440474
    'import/prefer-default-export': 'off',
  },
};
