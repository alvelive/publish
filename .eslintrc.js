/* eslint-disable @typescript-eslint/no-var-requires */
const paddingLineBetweenStatements = require('./.eslintrc/padding-line-between-statements');

module.exports = {
  env: { es2021: true, node: true },
  extends: ['standard-with-typescript', 'prettier'],
  plugins: ['prettier', 'import'],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' },
    },
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-invalid-void-type': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/no-duplicates': 1,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'unknown',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        pathGroups: [
          { pattern: '@**/**', group: 'external', position: 'before' },
          { pattern: '@app/**', group: 'internal', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['@**/**', '@app/**'],
      },
    ],
    'no-console': 'error',
    'no-process-env': 'error',
    'no-restricted-imports': ['error', { paths: ['lodash'] }],
    'no-sequences': 0,
    'padding-line-between-statements': paddingLineBetweenStatements('error'),
    'prettier/prettier': 'error',
    curly: 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
  },
};
