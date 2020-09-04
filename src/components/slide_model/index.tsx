import * as React from 'react';
import { View } from 'remax/wechat';
import { SwipeAction } from 'anna-remax-ui';
export interface Props {
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

const SlideModel = ({ show, buttons, extra, handleOpen, handleClose }: React.PropsWithChildren<Props>) => {
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