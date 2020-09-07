import * as React from 'react';
import { View, Swiper, SwiperItem, Image } from 'remax/wechat';

export interface Props {
    items: Array<any>;
    indicatorDots: boolean;
    autoplay: boolean;
    indicatorColor: string;
    indicatorActiveColor: string;
}

const SwiperModel = ({ items, autoplay, indicatorDots, indicatorColor, indicatorActiveColor }: React.PropsWithChildren<Props>) => {
    
    return (
        <View className="swiper">
            <Swiper autoplay={autoplay} indicatorDots={indicatorDots} indicatorActiveColor={indicatorActiveColor} indicatorColor={indicatorColor} circular={true}>
                {items.map((item, index) => {
                    return (<SwiperItem key={index}>
                        <Image src={item.image} style={{ width: "100%", height: "100%" }} />
                    </SwiperItem>)
                })}

            </Swiper>
        </View>
    );
};

export default SwiperModel;