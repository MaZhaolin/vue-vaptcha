const buble = require('rollup-plugin-buble')
const less = require('rollup-plugin-less-loader')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const bebel = require('rollup-plugin-babel')
const nodeResolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify-es')

const plugins = [
  vue({
    compileTemplate: true
  }),
  buble({
    objectAssign: 'Object.assign',
    jsx: 'h'
  }),
  bebel(),
  commonjs()
]

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-vaptcha.es.js',
      format: 'es'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-vaptcha.js',
      format: 'umd',
      name: 'VueVaptcha'
    },
    plugins: [...plugins]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-vaptcha.min.js',
      format: 'umd',
      name: 'VueVaptcha'
    },
    plugins: [...plugins, uglify()]
  }
]
