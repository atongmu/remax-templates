import * as React from 'react';
import { Icon, Button } from 'anna-remax-ui';
import { View, Swiper, SwiperItem, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    items: Array<string>;
    indicatorDots: boolean,
    autoplay: boolean,
    indicatorColor: string,
    indicatorActiveColor: string,
}

const SwiperModel = (props: Props) => {
    const { items, autoplay, indicatorDots, indicatorColor, indicatorActiveColor } = props
    return (
        <View className="swiper" >
            <Swiper autoplay={autoplay} indicatorDots={indicatorDots} indicatorActiveColor={indicatorActiveColor} indicatorColor={indicatorColor} circular={true}>
                {items.map((item, index) => {
                    return (<SwiperItem key={index}>
                        <Image src={item}  mode="widthFix"  />
                    </SwiperItem>)
                })}

            </Swiper>
        </View>
    );
};

export default SwiperModel;