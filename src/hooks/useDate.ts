/*
 * @Author: codingfly
 * @Description: 分页封装
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-09-04 15:11:07
 * @FilePath: \templates-ts\src\hooks\useDate.ts
 */
import React, { useState, useEffect } from 'react'
import { ajax } from '@/utils/common'
export interface Props {
    url: string,
    method: string,
    data?: any,
    isDelay?: boolean,
    isForm?: boolean,
    hideLoad?: boolean,
}

export default ({ url, method, data, isDelay, isForm, hideLoad }: Props) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pageStatus, setPageStatus] = useState<boolean>(true)
    const [params, setParams] = useState<any>()
    const [list, setList] = useState<any[]>([])
    const [isError, setError] = useState<boolean>(false)
    useEffect(() => {
        setParams((o: any) => o = data)
    }, [data])
    useEffect(() => {
        setPageStatus(o => o = false)
        const fetchData = async () => {
            try {
                let res: any = await ajax(url, method, params, isDelay, isForm, hideLoad)
                if (res.status == '200') {
                    setList(o => o = res.data)
                }
                setPageStatus(o => o = true)
                setLoading(o => o = false)
            } catch (err) {
                setError(o => o = true)
            }
        }
        return () => {
            fetchData()
        }
    }, [params])
    return { isLoading, isError, pageStatus, list, setParams }
}