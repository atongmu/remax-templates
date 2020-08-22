/*
 * @Author: codingfly
 * @Description: remax 配置文件
 * @Date: 2020-08-13 08:54:44
 * @LastEditTime: 2020-08-22 08:19:57
 * @FilePath: \templates-ts\remax.config.js
 */
const less = require('@remax/plugin-less');
module.exports = {
  plugins: [less()],
  configWebpack: ({ config, webpack, addCSSRule }) => {
    addCSSRule({
      name: 'wxss',
      test: /\.wxss$/,
    });
  }
};