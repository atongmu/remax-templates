/*
 * @Author: codingfly
 * @Description: 超时修改状态
 * @Date: 2020-08-25 08:59:16
 * @LastEditTime: 2020-08-25 09:03:53
 * @FilePath: \templates-ts\src\hooks\useTimeout.ts
 */
import React, { useState, useCallback, useRef } from 'react'
import useOnUnmount from '@/hooks/useOnUnmount'

export default function useTimeout(ms: number) {
    const [ready, setReady] = useState(false)
    const timerRef = useRef<any>()

    const start = useCallback(() => {
        clearTimeout(timerRef.current)
        setReady(true)
        timerRef.current = setTimeout(() => {
            setReady(false)
        }, ms)
    }, [ms])

    const stop = useCallback(() => {
        clearTimeout(timerRef.current)
    }, [])

    useOnUnmount(stop)

    return [ready, start, stop]
}