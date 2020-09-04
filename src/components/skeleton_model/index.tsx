import * as React from 'react';
import { Skeleton } from 'anna-remax-ui';
import { View } from 'remax/wechat';
export interface SkeletonParagraphProps {
    rows?: number;
    width?: number | string | number[] | string[];
}
export interface Props {
    fixed?: boolean;
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

const SkeletonModel = ({ fixed = false, title, titleColor, avatar, image, paragraph, repetitions, space, style, fade = false, loading = true, customize }: React.PropsWithChildren<Props>) => {
    
    return (
        <View className={`skeleton-model padding-tb bg-white ${fixed && 'fixed'}`}>
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