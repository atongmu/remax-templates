/*
 * @Author: codingfly
 * @Description: 简化数组状态操作
 * @Date: 2020-08-31 09:19:17
 * @LastEditTime: 2020-08-31 09:43:34
 * @FilePath: \templates-ts\src\hooks\useArray.ts
 */
import React, { useState, useCallback } from 'react'

export default <T>(initial?: T[] | (() => T[]), idKey: string = 'id') => {
    const [value, setValue] = useState(initial || [])

    return {
        value,
        setValue,
        push: useCallback(a => setValue(v => [...v, a]), []),
        clear: useCallback(() => setValue(() => []), []),
        removeById: useCallback(id => setValue(arr => arr.filter(v => v && v[idKey] !== id)), []),
        removeIndex: useCallback(
            index =>
                setValue(v => {
                    v.splice(index, 1)
                    return v
                }),
            [],
        ),
    }
}