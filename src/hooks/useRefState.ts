/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2020-08-25 08:44:54
 * @LastEditTime: 2020-08-25 09:10:54
 * @FilePath: \templates-ts\src\hooks\useRefState.ts
 */
import React, { useState, useRef } from 'react'

export default function useRefState(initialState: any) {
    const ins = useRef();
    const [state, setValue] = useState(() => {
        // 初始化
        const value = typeof initialState === 'function' ? initialState() : initialState
        ins.current = value
        return value
    });
    return [state, setValue, ins]
}