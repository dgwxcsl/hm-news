module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [ // vant按需导入（配置这段话则不能进行全局导入）
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
