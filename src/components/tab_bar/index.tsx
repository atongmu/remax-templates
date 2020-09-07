import * as React from 'react';
import { View, Image } from 'remax/wechat';
import { href } from '@/utils/common';
export interface Props {
    items: Array<any>
}

const TabBar = ({ items }: React.PropsWithChildren<Props>) => {
    return (
        <View className="tab-bar solid-top bg-white">
            <View className="flex align-center padding-env">
                {items.map((item, index) => {
                    return (
                        <View key={index} className="flex-sub">
                            <View className="text-center padding-tb-xs">
                                <View onClick={() => href(item.path)}>
                                    <Image style={{ width: '58rpx', height: '58rpx', margin: '0 auto' }} src={item.image} />
                                </View>
                                <View className="text-sm">{item.title}</View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    );
};

export default TabBar;