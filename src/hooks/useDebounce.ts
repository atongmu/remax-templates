/*
 * @Author: codingfly
 * @Description: 当某些状态变化时，它会延迟执行某些操作
 * @Date: 2020-08-25 11:01:15
 * @LastEditTime: 2020-08-31 09:42:30
 * @FilePath: \templates-ts\src\hooks\useDebounce.ts
 */
import React, { useEffect, useCallback, useRef } from 'react'
export interface TimeParams {
    fn: Function;
    timer: any
}
export default function useDebounce(fn: Function, delay: number, dep = []) {
    const { current } = useRef<TimeParams>({ fn, timer: null });
    useEffect(function () {
        current.fn = fn;
    }, [fn]);

    return useCallback(function f(...args) {

        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn.call(current.timer);
        }, delay);
    }, dep)
}