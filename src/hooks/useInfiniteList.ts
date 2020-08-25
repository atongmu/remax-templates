/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2020-08-25 08:37:42
 * @LastEditTime: 2020-08-25 13:47:33
 * @FilePath: \templates-ts\src\hooks\useInfiniteList.ts
 */

import React, { useState, useCallback } from 'react'
import { toast } from '../utils/common';
import useRefState from '@/hooks/useRefState'
const usePromise = require("@/hooks/usePromise")
export default function useInfiniteList<T>(fn: (params: { offset: number; pageSize: number; list: T[] }) => Promise<T[]>,
    pageSize: number = 20,) {
    const [list, setList] = useState<T[]>([])
    // 列表是否全部加载完毕
    const [hasMore, setHasMore, hasMoreRef] = useRefState(true)
    // 列表是否为空
    const [empty, setEmpty] = useState(false)
    const promise = usePromise(() => fn({ list, offset: list.length, pageSize }))
    const load = useCallback(async () => {
        if (!hasMoreRef.current) {
            return
        }
        const res = await promise.call()
        if (res.length < pageSize) {
            setHasMore(false)
        }

        setList(l => {
            if (res.length === 0 && l.length === 0) {
                setEmpty(true)
            }

            return [...l, ...res]
        })
    }, [])

    // 清空列表
    const clean = useCallback(() => {
        setList([])
        setHasMore(true)
        setEmpty(false)
        promise.reset()
    }, [])

    // 刷新列表
    const refresh = useCallback(() => {
        clean()
        setTimeout(() => {
            load()
        })
    }, [])

    return {
        list,
        hasMore,
        empty,
        loading: promise.loading,
        error: promise.error,
        load,
        refresh,
    }
}