module.exports = {
    extends: ['../.eslintrc.js', 'plugin:jest/recommended'],
    plugins: ['jest'],
    env: {
        'jest/globals': true
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'jest/expect-expect': 'off'
    }
};
