/*
 * @Author: codingfly
 * @Description: 卸载
 * @Date: 2020-08-25 09:02:37
 * @LastEditTime: 2020-08-25 09:03:16
 * @FilePath: \templates-ts\src\hooks\useOnUnmount.ts
 */
import React, { useState, useCallback, useRef, useEffect } from 'react'

export default function useOnUnmount(fn: Function) {
    useEffect(() => {
        return () => {
            fn()
        }
    }, [])
}