/*
 * @Author: codingfly
 * @Description: onChange表单双向绑定
 * @Date: 2020-08-31 09:32:19
 * @LastEditTime: 2020-08-31 10:17:06
 * @FilePath: \templates-ts\src\hooks\useChange.ts
 */
import React, { useState, useCallback } from 'react'

export default <S>(initial?: S | (() => S)) => {
    const [value, setValue] = useState<S | undefined>(initial)
    const onInput = useCallback(e => setValue(e.target.value), [])

    return {
        value,
        setValue,
        onInput,
        // 绑定到原生事件
        bindEvent: {
            onInput,
            value,
        },
    }
}