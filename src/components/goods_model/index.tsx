import * as React from 'react';
import { Icon } from 'anna-remax-ui';
import { View, Text, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    detail: () => void;
    item: {
        image: string,
        title: string,
        newPrice: string,
        originalPrice: string,
    };
}

const GoodsModel = (props: Props) => {
    const { item, detail } = props

    return (
        <View className="goods-model" onClick={detail}>
            <View className="head">
                <Image className="image" src={item.image} mode="widthFix" />
            </View>
            <View className="content">
                <View className="title">{item.title}</View>
                <View className="price margin-tb-sm">
                    <Text className="text-red text-price text-lg">{item.newPrice}</Text>
                    <Text className="original text-sm text-gray">{item.originalPrice}</Text>
                </View>
            </View>
        </View>
    );
};

export default GoodsModel;