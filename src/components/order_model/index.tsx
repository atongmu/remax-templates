import * as React from 'react';
import { Icon } from 'anna-remax-ui';
import { View, Text, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    detail: () => void;
    item: {
        id: number,
        name: string,
        newPrice: string,
        content: string,
        changeGoods: { key: string, value: string, image: string },
        sku: Array<{ key: string, value: string, image: string }>,
        num: number
    };
}

const OrderModel = (props: Props) => {
    const { item, detail } = props

    return (
        <View className="goods-model" onClick={detail}>
            <View style={{ width: '180', height: '180' }}>
                <Image style={{ width: '100%', height: '100%' }} src={item.changeGoods.image} />
            </View>
            <View className="flex-sub margin-left-xs flex padding-tb-xs">
                <View className="flex-sub">
                    <View className="margin-bottom-sm">{item.name}</View>
                    <View className="text-gray">sku</View>
                </View>
                <View className="text-right text-gray">
                    <View><Text className="text-price">{item.newPrice}</Text></View>
                    <View>x {item.num}</View>
                </View>
            </View>
        </View>
    );
};

export default OrderModel;