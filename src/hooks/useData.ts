/*
 * @Author: codingfly
 * @Description: 分页封装
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-09-25 09:27:55
 * @FilePath: \remax-templates\src\hooks\useData.ts
 */
import React, { useState, useCallback } from 'react'
import { ajax } from '@/utils/common'
import useRefState from '@/hooks/useRefState'
export interface Props {
    url: string;
    method?: any;
    isDelay?: boolean;
    isForm?: boolean;
    hideLoad?: boolean;
}

export default <T>({ url, method = "GET", isDelay, isForm, hideLoad = true }: Props) => {
    const [pageStatus, setPageStatus, statusRef] = useRefState(true)
    // 列表是否全部加载完毕
    const [hasMore, setHasMore, hasMoreRef] = useRefState(true)
    // 列表是否为空
    const [empty, setEmpty] = useState(false)
    const [list, setList] = useState<T[]>([])

    const getData = useCallback(async (data) => {
        try {
            let res: any = await ajax(url, method, data, isDelay, isForm, hideLoad)
            if (res.status === 200) {
                return res.data
            }
        } finally {
            setPageStatus((o: boolean) => o = statusRef.current = true)
        }
    }, [])
    const load = useCallback((data) => {
        if (!pageStatus) {
            return
        }
        setPageStatus((x: boolean) => statusRef.current = false)
        const setFun = setTimeout(async () => {
            const res: any = await getData(data)
            if (res.length < data.page_size) {
                setHasMore((x: boolean) => hasMoreRef.current = false)
            }
            setList(l => {
                if (res.length === 0 && l.length === 0) {
                    setEmpty(true)
                }
                if (data.page_no === 1) {
                    return [...res]
                } else {
                    return [...l, ...res]
                }
            })
        }, 800);
        return () => {
            clearTimeout(setFun)
        }
    }, [])

    // 清空列表
    const clean = useCallback(() => {
        setList([])
        setHasMore((x: boolean) => hasMoreRef.current = true)
        setEmpty(false)
    }, [])

    return { pageStatus, empty, hasMore, list, load, clean }
}