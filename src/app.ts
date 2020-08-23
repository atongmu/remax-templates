/*
 * @Author: codingfly
 * @Description: 入口文件
 * @Date: 2020-08-13 08:54:44
 * @LastEditTime: 2020-08-23 16:12:45
 * @FilePath: \templates-ts\src\app.ts
 */
import * as React from 'react';
import '../node_modules/weui-miniprogram/miniprogram_dist/weui-wxss/dist/style/weui.wxss'
import 'anna-remax-ui/dist/anna.css'
import './assets/css/app.css'
const App: React.FC = props => props.children as React.ReactElement;

export default App;
