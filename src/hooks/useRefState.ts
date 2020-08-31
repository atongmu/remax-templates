/*
 * @Author: codingfly
 * @Description: 获取state的最新值
 * @Date: 2020-08-25 08:44:54
 * @LastEditTime: 2020-08-31 13:51:30
 * @FilePath: \templates-ts\src\hooks\useRefState.ts
 */
import React, { useState, useRef } from 'react'

export default (initialState: any) => {
    const ins = useRef();
    const [state, setValue] = useState(() => {
        // 初始化
        const value = typeof initialState === 'function' ? initialState() : initialState
        ins.current = value
        return value
    });
    return [state, setValue, ins]
}