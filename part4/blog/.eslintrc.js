module.exports = {
    'env': {
        'browser': true,
        "node": true,
        'commonjs': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'rules': {
        'linebreak-style': [
            'error',
            'windows'
        ],
        'semi': [
            'error',
            'never'
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    }
}