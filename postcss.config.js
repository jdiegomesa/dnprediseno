module.exports = {
  plugins:[
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('css-mqpacker'),
    require('cssnano')
  ]
}
