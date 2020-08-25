/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2020-08-25 08:37:42
 * @LastEditTime: 2020-08-25 09:33:00
 * @FilePath: \templates-ts\src\hooks\usePromise.ts
 */

import React, { useState, useCallback,useRef } from 'react'
import { getSystemInfo } from 'remax/wechat';
import { toast } from '../utils/common';
import useRefProps from '@/hooks/useRefProps';
import useRefState from '@/hooks/useRefState';

export interface Res<T, S> {
    loading: boolean
    error?: Error
    value?: S
    setValue: (v: S) => void
    call: T
    callIgnoreError: T
    reset: () => void
    retry: () => void
}

export interface UsePromiseOptions {
    // 如果promise正在加载中则跳过，默认为true
    skipOnLoading?: boolean
}
// 👆 上面是一堆Typescript函数重载声明，可以跳过
function usePromise<T>(action: () => Promise<T>, option?: UsePromiseOptions): Res<() => Promise<T>, T>
/**
 * 接受一个action，用于执行异步操作
 */
function usePromise(action: (...args: any[]) => Promise<any>,
option: UsePromiseOptions = { skipOnLoading: true }): Res<(...args: any) => Promise<any>, any> {
    const actionRef = useRefProps(action)
  const optionRef = useRefProps(option)
  const [loading, setLoading, loadingRef] = useRefState(false)
  const taskIdRef = useRef<string>()
  const argsRef = useRef<any[]>()
  const [value, setValue] = useState()
  const [error, setError, errorRef] = useRefState(false)
  const caller = useCallback(async (...args: any[]) => {
    argsRef.current = args
    if (loadingRef.current && optionRef.current.skipOnLoading) {
      return
    }

    const model = (await getSystemInfo()).model
    taskIdRef.current = model

    // 已经有新的任务在执行了，什么都不做
    const shouldContinue = () => {
      if (model !== taskIdRef.current) {
        return false
      }
      return true
    }

    try {
      setLoading(true)
      setError(undefined)
      const res = await actionRef.current(...args)

      if (!shouldContinue()) return
      setValue(res)
      return res
    } catch (err) {
      if (shouldContinue()) {
        setError(err)
      }
      throw err
    } finally {
      if (shouldContinue()) {
        setLoading(false)
      }
    }
  }, [])

  // 不抛出异常
  const callIgnoreError = useCallback(
    async (...args: any[]) => {
      try {
        return await caller(...args)
      } catch {
        // ignore
      }
    },
    [caller],
  )

  const reset = useCallback(() => {
    setLoading(false)
    setValue(undefined)
    setError(undefined)
  }, [])

  // 失败后重试
  const retry = useCallback(() => {
    if (argsRef.current && errorRef.current) {
      return callIgnoreError(...argsRef.current)
    }
    throw new Error(`not call yet`)
  }, [])

    return {
        loading,
        error,
        call: caller,
        callIgnoreError,
        value,
        setValue,
        reset,
        retry,
      }
}