/*
 * @Author: codingfly
 * @Description: 分页封装
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-08-24 09:16:55
 * @FilePath: \templates-ts\src\hooks\useDate.ts
 */
import React, { useState, useEffect } from 'react'
import { ajax } from '@/utils/common'


export default function useData(url: string) {
    const [isLoading, setLoading] = useState(true);
    const [query, setQuery] = useState<any>({});
    const [pageStatus, setPageStatus] = useState(true)
    const [data, setData] = useState<any>();
    const [isError, setError] = useState(false)
    useEffect(() => {
        setPageStatus(e => false)
        async function fetchData() {
            try {
                let res: any = await ajax(url, query.method, query.data, query.isDelay, query.isForm, query.hideLoad)
                console.log(res)
                if (res.status == '200') {
                    setData(res.data)
                }
                setPageStatus(e => true)
                setLoading(false)
            } catch (err) {
                setError(true)
            }
        }
        fetchData()
    }, [query])
    return { isLoading, isError, pageStatus, data, setQuery }
}