import * as React from 'react';
import { Icon, Stepper } from 'anna-remax-ui';
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
        num: number
    };
}

const CartModel = (props: Props) => {
    const { item, detail } = props

    return (
        <View className="cart-model flex">
            <View>
                <Icon type="round" />
            </View>
            <View style={{ width: '220', height: '220' }}>
                <Image style={{ width: '100%', height: '100%' }} src={item.changeGoods.image} />
            </View>
            <View className="flex-sub flex" onClick={detail}>
                <View className="flex-sub margin-lr-sm">
                    <View className="title padding-bottom text-sm">{item.name}</View>
                    <Text className="bg-gray padding-xs text-sm">
                        {item.changeGoods.value}
                        <Icon type="unfold" />
                    </Text>
                    <View className="flex padding-top">
                        <View className="flex-sub text-red"><Text className="text-price">{item.newPrice}</Text></View>
                        <View><Text>x</Text> {item.num}</View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CartModel;