module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 'padding-line-between-statements': [{ blankLine: 'always', prev: '*', next: 'return' }],
    // 'padding-line-between-statements': [
    //   'error',
    //   { blankLine: 'always', prev: '*', next: ['block-like', 'class'] },
    // ],
    'padded-blocks': ['error', 'always'],
    'space-before-blocks': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    semi: ['error', 'never'],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
    'linebreak-style': 0,
  },
}
