/*
 * @Author: codingfly
 * @Description: 配置文件
 * @Date: 2020-08-13 08:54:44
 * @LastEditTime: 2020-08-15 17:26:09
 * @FilePath: \remax-templates\src\app.config.ts
 */
import { AppConfig } from "remax/wechat";
const backgroundColor: string = '#28a745';
const title: string = 'remax小程序模板';
const pages: Array<string> = [
  'pages/index/index',
  'pages/login/index',
  'pages/mall/index',
  'pages/cart/index',
  'pages/my/index',
  'pages/search/index',
  'pages/sort/index',
  'pages/goods_info/index',
  'pages/order_list/index',
  'pages/order_info/index',
]

const config: AppConfig = {
  pages,
  window: {
    navigationBarTitleText: title,
    navigationBarBackgroundColor: backgroundColor
  }
};

export default config;
