module.exports = {
    root: true,
    extends: [
        'airbnb-typescript',
        'prettier',
        'plugin:import/recommended'
        // 'prettier/@typescript-eslint',
        // 'prettier/react'
    ],
    parserOptions: {
        project: ['./tsconfig.json']
    },
    env: {
        jest: true
    },
    ignorePatterns: ['build/**/*', 'dist/**/*']
};
