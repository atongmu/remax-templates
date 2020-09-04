/*
 * @Author: codingfly
 * @Description: 分页封装
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-09-04 15:59:32
 * @FilePath: \templates-ts\src\hooks\useDate.ts
 */
import React, { useState, useEffect, useCallback } from 'react'
import { ajax } from '@/utils/common'
import useRefState from '@/hooks/useRefState'
export interface Props {
    pageSize: number,
    url: string,
    method: string,
    data?: any,
    isDelay?: boolean,
    isForm?: boolean,
    hideLoad?: boolean,
}

export default ({ url, method, data, isDelay, isForm, hideLoad, pageSize = 20 }: Props) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pageStatus, setPageStatus] = useState<boolean>(true)
    const [params, setParams] = useState<any>()
    const [hasMore, setHasMore, hasMoreRef] = useRefState(true)
    const [list, setList] = useState<any[]>([])
    const [isError, setError] = useState<boolean>(false)

    const getData = useCallback(() => {
        const fetchData = async () => {
            try {
                let res: any = await ajax(url, method, data, isDelay, isForm, hideLoad)
                if (res.status === 200) {
                    return res.data
                }
            } catch (err) {
                setError(o => o = true)
            }
        }
        return () => {
            fetchData()
        }
    }, [])
    const load = useCallback(async () => {
        if (!hasMoreRef.current) {
            return
        }
        const res: any = await getData()
        if (res.length < pageSize) {
            setHasMore(false)
        }
        setList(l => {
            if (res.length === 0 && l.length === 0) {
                setError(true)
            }

            return [...l, ...res]
        })
    }, [])
    return { isLoading, isError, pageStatus, list, setParams, load }
}