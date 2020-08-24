import React, { useEffect } from 'react';
import { View, Canvas } from 'remax/wechat';
const qrCode = require('@/assets/js/weapp-qrcode')
export interface Props {
    text: string;
    width?: string;
    heght?: string;
    colorDark?: string;
    colorLight?: string;

}

const QrcodeModel = (props: Props) => {
    const { text, width, heght, colorDark, colorLight } = props
    useEffect(() => {
        setTimeout(() => {
            couponQrCode()
        }, 60);

    }, [])
    const couponQrCode = () => {
        new qrCode("couponQrcode", {
            text: text,
            width: width || '120',
            height: heght || '120',
            colorDark: colorDark || '#333',
            colorLight: colorLight || '#fff',
            correctLevel: qrCode.CorrectLevel.H
        });
    }
    return (
        <View className="qrcode-model padding-sm bg-white" style={{ display: "inline-block" }}>
            <Canvas canvasId="couponQrcode" style={{ width: width || '240', height: heght || '240' }}></Canvas>
        </View>
    );
};

export default QrcodeModel;