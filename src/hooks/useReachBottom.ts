/*
 * @Author: codingfly
 * @Description: 上拉加载
 * @Date: 2020-08-24 09:33:02
 * @LastEditTime: 2020-08-25 13:47:12
 * @FilePath: \templates-ts\src\hooks\useReachBottom.ts
 */

import React, { useState, useEffect } from 'react'
import { toast } from '../utils/common';

export default function useReachBottom() {
    const [pageLoading, setPageLoading] = useState(true);
    const [pageStatus, setPageStatus] = useState(true)
    const [initStatus, setInitStatus] = useState(true)
    useEffect(() => {
        if (!pageLoading && !initStatus) {
            toast("没有更多数据了")
        }
    }, [pageLoading])
    return { initStatus, pageLoading, pageStatus, setInitStatus, setPageLoading, setPageStatus }
}