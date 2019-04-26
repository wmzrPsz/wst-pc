const plugins = [
  // [
  //   "component",
  //   {
  //     "libraryName": "element-ui",
  //     "styleLibraryName": "theme-chalk"
  //   }
  // ],
  // ['import', {
  //   libraryName: 'vant',
  //   libraryDirectory: 'es',
  //   style: true
  // }, 'vant']
];
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
  // 去掉 console.log
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  plugins: plugins
};