/*
 * @Author: codingfly
 * @Description: 分页封装
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-09-05 17:02:20
 * @FilePath: \templates-ts\src\hooks\useDate.ts
 */
import React, { useState, useCallback } from 'react'
import { ajax } from '@/utils/common'
import useRefState from '@/hooks/useRefState'
export interface Props {
    url: string;
    method: any;
    isDelay?: boolean;
    isForm?: boolean;
    hideLoad?: boolean;
    pageSize?: number;
}

export default <T>({ url, method,  isDelay, isForm, hideLoad, pageSize = 20 }: Props) => {
    const [pageStatus, setPageStatus, statusRef] = useRefState(true)
    // 列表是否全部加载完毕
    const [hasMore, setHasMore, hasMoreRef] = useRefState(true)
    // 列表是否为空
    const [empty, setEmpty] = useState(false)
    const [list, setList] = useState<T[]>([])
    // const [pageNo, setPageNo, pageRef] = useRefState(1)

    const getData = useCallback(async (data) => {
        try {
            setPageStatus((o: boolean) => o = statusRef.current = false)
            let res: any = await ajax(url, method, {...data}, isDelay, isForm, hideLoad)
            if (res.status === 200) {
                return res.data
            }
        } finally {
            setPageStatus((o: boolean) => o = statusRef.current = true)
        }
    }, [])
    const load = useCallback(async (data) => {
        if (!pageStatus) {
            return
        }
        const res: any = await getData(data)
        if (res.length < pageSize) {
            setHasMore((o: boolean) => o = hasMoreRef.current = false)
        }
        setList(l => {
            if (res.length === 0 && l.length === 0) {
                setEmpty(o => o = true)
            }
            return [...l, ...res]
        })
    }, [])

    // 清空列表
    const clean = useCallback(() => {
        setList(o => o = [])
        setHasMore((o: boolean) => o = hasMoreRef.current = true)
        setEmpty(o => o = false)
    }, [])

    // 刷新列表
    const refresh = useCallback((o) => {
        clean()
        setTimeout(() => {
            load(o)
        })
    }, [])
    return { empty, hasMore, list, load, refresh, clean }
}