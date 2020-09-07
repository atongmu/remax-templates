import * as React from 'react';
import { View, Text, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    detail: () => void;
    item: {
        image: string,
        name: string,
        sale: string,
        factory: string,
    };
}

const GoodsModel = ({ item, detail }: React.PropsWithChildren<Props>) => {

    return (
        <View className="goods-model" onClick={detail}>
            <View className="head">
                <Image className="image" src={item.image} mode="widthFix" />
            </View>
            <View className="content">
                <View className="title">{item.name}</View>
                <View className="price margin-tb-sm">
                    <Text className="text-red text-price text-lg">{item.sale}</Text>
                    <Text className="original margin-left-sm text-gray text-price text-sm">{item.factory}</Text>
                </View>
            </View>
        </View>
    );
};

export default GoodsModel;