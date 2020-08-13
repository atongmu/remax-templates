import * as React from 'react';
import { Icon } from 'anna-remax-ui';
import { View, Text, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    item: {
        images: string,
        title: string,
        newPrice: string,
        originalPrice: string,
    };
}

const GoodsModel = (props: Props) => {
    const { item } = props

    return (
        <View className="goods-model">
            <View className="head">
                <Image className="image" src={item.images} mode="widthFix" />
            </View>
            <View className="content">
                <View className="title">{item.title}</View>
                <View className="price">
                    <Text className="text-red text-price">{item.newPrice}</Text>
                    <Text className="original">{item.originalPrice}</Text>
                </View>
            </View>
        </View>
    );
};

export default GoodsModel;