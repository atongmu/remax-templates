import * as React from 'react';
import { Row, Col } from 'anna-remax-ui';
import { View, Image } from 'remax/wechat';
import { href } from '@/utils/common';

export interface Props {
    items: Array<any>
}

const TabBar = (props: Props) => {
    const { items } = props
    return (
        <View className="tab-bar solid-top bg-white" style={{paddingTop:'10rpx'}}>
            <Row>
                {items.map((item, index) => {
                    return (
                        <Col key={index} span={24 / items.length}>
                            <View className="text-center">
                                <View onClick={() => href(item.path)}>
                                    <Image style={{ width: '60rpx', height: '60rpx', margin: '0 auto' }} src={item.image} />
                                </View>
                                <View className="text-sm">{item.title}</View>
                            </View>
                        </Col>
                    )
                })}
            </Row>
        </View>
    );
};

export default TabBar;