/*
 * @Author: codingfly
 * @Description: 分页封装
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-08-23 14:52:34
 * @FilePath: \templates-ts\src\hooks\PullDownRefresh.ts
 */
import React, { useState } from 'react'
import { ajax } from '@/utils/common'


export default function useData() {
    const [isLoading, setLoading] = useState(true);
    const [pageStatus, setPageStatus] = useState(true)
    const [isError, setError] = useState(false)
    const func = async (api: string, options: any = {}) => {
        let result: any = null
        setPageStatus(pageStatus => pageStatus = false)
        try {
            let res: any = await ajax(api, options.method, options.data, options.isDelay, options.isForm, options.hideLoad)
            console.log('data', res.data)
            if (res.code == 200) {
                result = res.data
            }
            setPageStatus(pageStatus => pageStatus = true)
        } catch (err) {
            setPageStatus(pageStatus => pageStatus = true)
            setError(true)
        }
        return result
    }
    return { isLoading, isError, pageStatus, setLoading, func }
}