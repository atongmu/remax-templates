import * as React from 'react';
import { View } from 'remax/wechat';
import { SwipeAction } from 'anna-remax-ui';
export interface SlideProps {
    show?: boolean;
    buttons:
    [{
        name: React.ReactNode,
        style: React.CSSProperties,
        onTap: () => void
    }];
    extra?: React.ReactNode;
    handleOpen?: (e: any) => void;
    handleClose?: (e: any) => void;
}

const SlideModel = (props: SlideProps) => {
    const { show, buttons, extra, handleOpen, handleClose } = props
    return (
        <View className="slide-model">
            <SwipeAction open={show}
                onOpened={handleOpen}
                onClosed={handleClose}
                options={buttons}
            >
                {extra}
            </SwipeAction>
        </View>
    );
};

export default SlideModel;