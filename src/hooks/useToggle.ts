/*
 * @Author: codingfly
 * @Description: boolean值切换
 * @Date: 2020-08-31 08:38:54
 * @LastEditTime: 2020-08-31 11:13:37
 * @FilePath: \templates-ts\src\hooks\useToggle.ts
 */
import React, { useState, useCallback } from 'react'

export default (initialValue?: boolean) => {
    const [value, setValue] = useState(!!initialValue)
    const toggler = useCallback(() => setValue(value => !value), [])

    return [value, toggler]
}