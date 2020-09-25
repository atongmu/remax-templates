import React, { useState } from 'react';
import { View } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';
import './index.less'
export interface Props {
    upText?: string;
    downText?: string;
    times?: number;
    detail: () => void;
}

const PullDownModel = ({ downText = "松开刷新", upText = '刷新中···', times = 1000, detail }: React.PropsWithChildren<Props>) => {
    const [status, setStatus] = useState(true)
    const [startText] = useState(downText)
    const [endText] = useState(upText)
    usePageEvent('onPullDownRefresh', () => {
        // 可以返回一个 promise，控制何时停止下来刷新行为
        setStatus(x => !x)
        return new Promise((resolve) => {
            setTimeout(() => {
                detail()
                setStatus(x => !x)
                resolve();
            }, times);
        })
    });
    return (
        <View className="pull-down-model" >
            {status ? startText : endText}
        </View>
    );
};

export default PullDownModel;