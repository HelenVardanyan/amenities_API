module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': 'off',
    'brace-style': [1, 'stroustrup'],
    'class-methods-use-this': 0,
    'func-names': [1, 'always', { generators: 'never' }],
    'import/prefer-default-export': 0,
    'react/jsx-one-expression-per-line': 'off',
    'react/react-in-jsx-scope': 0,
    'linebreak-style': 0,
    'object-curly-newline': [
      0,
      {
        ObjectExpression: 'always',
        ObjectPattern: { minProperties: 2 },
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'no-plusplus': [1, { allowForLoopAfterthoughts: true }],
    camelcase: 'off',
    'dot-notation': 'off',
  },
  plugins: ['cypress'],
};
