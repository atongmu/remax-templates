/*
 * @Author: codingfly
 * @Description: 入口文件
 * @Date: 2020-08-13 08:54:44
 * @LastEditTime: 2020-09-11 13:27:28
 * @FilePath: \templates-ts\src\app.tsx
 */
import React, { useState, createContext } from 'react';
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
