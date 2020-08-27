/*
 * @Author: codingfly
 * @Description: 入口文件
 * @Date: 2020-08-13 08:54:44
 * @LastEditTime: 2020-08-27 16:22:04
 * @FilePath: \templates-ts\src\app.tsx
 */
import React, { useState, createContext } from 'react';
import '../node_modules/weui-miniprogram/miniprogram_dist/weui-wxss/dist/style/weui.wxss'
import 'anna-remax-ui/dist/anna.css'
import './assets/css/app.css'
export const TodoContext = createContext({});
const App: React.FC = (props) => {
    const [bingItems, setBingItems] = useState({
        searchValue: '',
    });

    return (<TodoContext.Provider value= {{bingItems, setBingItems}}> { props.children } </TodoContext.Provider>)
}
export default App;
