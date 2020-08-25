/*
 * @Author: codingfly
 * @Description: 组件的任何地方获取最新的props值
 * @Date: 2020-08-25 08:56:21
 * @LastEditTime: 2020-08-25 08:56:54
 * @FilePath: \templates-ts\src\hooks\useRefProps.ts
 */

import React, { useRef } from 'react'
export default function useRefProps<T>(props: T) {
    const ref = useRef<T>(props)
    // 每次重新渲染设置值
    ref.current = props

    return ref
}