import * as React from 'react';
import { View } from 'remax/wechat';
import SlideView from 'weui-miniprogram/miniprogram_dist/slideview/slideview';
export interface SlideProps {
    buttons: Array<any>;
    extra?: React.ReactNode;
    onChange?: (e: any) => void;
}

const SlideModel = (props: SlideProps) => {
    const { buttons, extra, onChange } = props
    return (
        <View className="slide-model">
            <SlideView buttons={buttons} bindbuttontap={onChange}>
                {extra}
            </SlideView>
        </View>
    );
};

export default SlideModel;