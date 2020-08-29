import * as React from 'react';
import { View } from 'remax/wechat';
import SlideView from 'weui-miniprogram/miniprogram_dist/slideview/slideview';
export interface SlideProps {
    show?: boolean;
    buttons: Array<any>;
    extra?: React.ReactNode;
    onChange?: (e: any) => void;
    onShow?: () => void;
}

const SlideModel = (props: SlideProps) => {
    const { show,buttons, extra, onChange,onShow } = props
    return (
        <View className="slide-model">
            <SlideView show={show} buttons={buttons} bindbuttontap={onChange} bindshow={onShow}>
                {extra}
            </SlideView>
        </View>
    );
};

export default SlideModel;