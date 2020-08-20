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
            <View style={{ width: '180', height: '180' }}>
                <Image style={{ width: '100%', height: '100%' }} src={item.changeGoods.image} />
            </View>
            <View className="flex-sub flex padding-tb-xs" onClick={detail}>
                <View className="content flex-sub margin-lr-xs">
                    <View className="title">{item.name}</View>
                    <View className="bgt-gray padding-top-sm text-sm">
                        {item.changeGoods.value}
                        <Icon type="unfold" />
                    </View>
                </View>
                <View className="text-right text-gray">
                    <View><Text className="text-price">{item.newPrice}</Text></View>
                    <View>x {item.num}</View>
                </View>
            </View>
        </View>
    );
};

export default CartModel;