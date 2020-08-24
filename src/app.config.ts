/*
 * @Author: codingfly
 * @Description: 配置文件
 * @Date: 2020-08-13 08:54:44
 * @LastEditTime: 2020-08-24 15:03:25
 * @FilePath: \templates-ts\src\app.config.ts
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
  'pages/order_submit/index',
  'pages/order_detail/index',
  'pages/address/index',
  'pages/address_edit/index',
  'pages/success/index',
  'pages/timeaxis/index',
  'pages/error/index',
  'pages/cims/index',
  'pages/materials/index',
  'pages/materials_edit/index',
  'pages/materials_detail/index',
  'pages/pull_down_refresh/index',
  'pages/qrcode/index',
]

const config: AppConfig = {
  pages,
  window: {
    navigationBarTitleText: title,
    navigationBarBackgroundColor: backgroundColor
  }
};

export default config;
