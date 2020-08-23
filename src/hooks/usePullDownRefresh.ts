/*
 * @Author: codingfly
 * @Description: 下拉刷新状态控制
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-08-23 15:05:37
 * @FilePath: \templates-ts\src\hooks\PullDownRefresh.ts
 */
import React, { useState, useEffect } from 'react'
import { toast } from '../utils/common';


export default function usePullDownRefresh() {
    const [pageLoading, setPageLoading] = useState(true);
    const func = () => {
        toast("刷新成功")
    }
    useEffect(() => {
        if (!pageLoading) {
            func()
        }
    }, [pageLoading])
    return { pageLoading, setPageLoading }
}