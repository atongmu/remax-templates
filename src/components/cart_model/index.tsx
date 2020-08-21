import * as React from 'react';
import { Icon, SwipeAction, Checkbox } from 'anna-remax-ui';
import { View, Text, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    detail: () => void;
    onChange?: () => void;
    item: {
        id: number,
        name: string,
        newPrice: string,
        content: string,
        checked: boolean,
        swiper: boolean,
        changeGoods: { key: string, value: string, image: string },
        num: number
    };
}

const CartModel = (props: Props) => {
    const { item, onChange, detail } = props
    return (
        <View className="cart-model">
            <SwipeAction open={item.swiper} options={[{ name: '删除', style: { backgroundColor: '#ff0000' }, onTap: () => console.log(1) }]}>
                <View className="flex align-center">
                    <View style={{ margin: '0 20rpx' }}>
                        <Checkbox checked={item.checked} onChange={onChange} />
                    </View>
                    <View style={{ width: '220', height: '220' }}>
                        <Image style={{ width: '100%', height: '100%' }} src={item.changeGoods.image} />
                    </View>
                    <View className="flex-sub flex" onClick={detail}>
                        <View className="flex-sub margin-lr-sm">
                            <View className="title margin-bottom text-sm">{item.name}</View>
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
            </SwipeAction>
        </View>
    );
};

export default CartModel;