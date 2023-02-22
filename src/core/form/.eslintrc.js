const reactRules = {
    'react/jsx-indent': ['error', 4],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-indent-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
};

const config = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
    settings: { 'import/resolver': { typescript: {} } },
    rules: {
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'no-console': ['warn', { allow: ['warn', 'error', 'table', 'clear'] }],
        'react/function-component-definition': ['off'],
        'object-curly-newline': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'implicit-arrow-linebreak': 'off',
        quotes: ['error', 'single'],
        'comma-dangle': 'off',
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            { allowExpressions: true },
        ],
        // 'no-param-reassign': [
        //     'warn',
        //     {
        //         props: true,
        //         ignorePropertyModificationsFor: ['state'],
        //     },
        // ],
    },
};

Object.assign(config.rules, { ...reactRules });

module.exports = config;
