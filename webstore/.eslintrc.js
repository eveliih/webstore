module.exports = {
    "ignorePatterns": ["dist", "node_modules"],
    "env": {
        "browser": true,
        "es2021": true,
    },
    "parserOptions": {
        "ecmaVersion": 2022,
        "sourceType": "module"
    },
    "plugins": [
        '@stylistic/js'
    ],
    "extends": 'eslint:recommended',
    "rules": {
        '@stylistic/js/indent': [
            'error',
            2
        ],
        '@stylistic/js/linebreak-style': [
            'error',
            'unix'
        ],
        '@stylistic/js/quotes': [
            'error',
            'single'
        ],
        '@stylistic/js/semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    }
}