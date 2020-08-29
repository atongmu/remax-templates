import * as React from 'react';
import Toptips from 'weui-miniprogram/miniprogram_dist/toptips/toptips';
export interface Props {
    extClass?: string;
    type?: 'info' | 'error' | 'success';
    show?: boolean;
    msg: string;
    delay?: number;
    bindhide?: () => void;
}

const ToptipsModel = (props: Props) => {
    const { extClass, type, show, msg, delay = 1000, bindhide } = props
    return (
        <Toptips ext-class={`text-df ${extClass}`} type={type} show={show} msg={msg} delay={delay} bindhide={bindhide}>
        </Toptips>
    );
};

export default ToptipsModel;