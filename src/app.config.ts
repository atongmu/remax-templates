/*
 * @Author: codingfly
 * @Description: 配置文件
 * @Date: 2020-08-13 08:54:44
 * @LastEditTime: 2020-09-25 15:00:02
 * @FilePath: \remax-templates\src\app.config.ts
 */
import { AppConfig } from "remax/wechat";
const backgroundColor: string = '#28a745';
const title: string = '微信小程序模板';
const pages: Array<string> = [
  'pages/index/index',
  'pages/templates/index',
  'pages/login/index',
  'pages/mall/index',
  'pages/cart/index',
  'pages/my/index',
  'pages/search/index',
  'pages/sort/index',
  'pages/goods_sort/index',
  'pages/goods_detail/index',
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
  'pages/form/index',
  'pages/slide/index',
  'pages/searchbar/index',
  'pages/picker/index',
  'pages/video/index',
  'pages/swiper/index',
  'pages/remind/index',
]

const config: AppConfig = {
  pages,
  tabBar: {
    color: '#8a8a8a',
    selectedColor: "#39b54a",
    backgroundColor: "#fff",
    list: [
      {
        text: '组件',
        iconPath:'image/tabbar/code.png',
        selectedIconPath:'image/tabbar/code_active.png',
        pagePath: 'pages/index/index',
      },
      {
        text: '模板',
        iconPath:'image/tabbar/templates.png',
        selectedIconPath:'image/tabbar/templates_active.png',
        pagePath: 'pages/templates/index',
      },
      {
        text: '我的',
        iconPath:'image/tabbar/my.png',
        selectedIconPath:'image/tabbar/my_active.png',
        pagePath: 'pages/my/index',
      },
    ]
  },
  window: {
    navigationBarTitleText: title,
    navigationBarBackgroundColor: backgroundColor
  }
};

export default config;
