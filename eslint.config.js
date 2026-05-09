import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
      },
    },
    plugins: {
      vue,
    },
    rules: vue.configs['flat/recommended'].rules,
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.browser,
    },
  },
]
