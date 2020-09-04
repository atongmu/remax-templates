import * as React from 'react';
import { Row, Col } from 'anna-remax-ui';
import { View, Image } from 'remax/wechat';
import { href, toast } from '@/utils/common';
export interface Props {
    items: Array<any>
}

const TabBar = ({ items }: React.PropsWithChildren<Props>) => {
    return (
        <View className="tab-bar solid-top bg-white" style={{ paddingTop: '10rpx' }}>
            <View className="flex align-center padding-env">
                {items.map((item, index) => {
                    return (
                        <View key={index} className="flex-sub">
                            <View className="text-center">
                                {/* <View onClick={() => href(item.path)}> */}
                                <View onClick={() => toast(item.title)}>
                                    <Image style={{ width: '60rpx', height: '60rpx', margin: '0 auto' }} src={item.image} />
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