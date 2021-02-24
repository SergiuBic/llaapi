/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 0,
    'no-nested-ternary': 0,
    'arrow-body-style': 0,
    'import/prefer-default-export':0,
    'no-empty':0,
  }
};
