import * as React from 'react';
import { Skeleton } from 'anna-remax-ui';
import { View } from 'remax/wechat';
export interface SkeletonParagraphProps {
    rows?: number;
    width?: number | string | number[] | string[];
}
export interface Props {
    title?: boolean;
    titleColor?: string;
    avatar?: boolean;
    image?: boolean;
    paragraph?: SkeletonParagraphProps;
    style?: React.CSSProperties;
    repetitions: number;
    space?: number;
    fade?: boolean;
    loading?: boolean;
    customize?: React.ReactNode;
}

const SkeletonModel = (props: Props) => {
    const { title, titleColor, avatar, image, paragraph, repetitions, space, style, fade = false, loading = true,customize } = props
    return (
        <View className="skeleton-model padding-tb bg-white" style={{ position: 'fixed', top: 0, left: 0, width: '100vw' }}>
            <Skeleton
                title={title}
                titleColor={titleColor}
                avatar={avatar}
                image={image}
                paragraph={paragraph}
                fade={fade}
                loading={loading}
                repetitions={repetitions}
                space={space}
                style={style}
                customize={customize}
            />
        </View>
    );
};

export default SkeletonModel;