module.exports = {
    env: {
        node: true,
        commonjs: true
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        // for windows computer
        "linebreak-style": 0,
        "indent": ["error", 4],
        'no-console': 'off',
    },
};
