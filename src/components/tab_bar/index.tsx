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
        <View className="tab-bar solid-top bg-white padding-tb-sm">
            <Row>
                {items.map((item, index) => {
                    return (
                        <Col key={index} span={24 / items.length}>
                            <View className="text-center">
                                <View onClick={() => href(item.path)}>
                                    <Image style={{ width: '96rpx', height: '96rpx', margin: '0 auto' }} src={item.image} />
                                </View>
                                <View>{item.title}</View>
                            </View>
                        </Col>
                    )
                })}
            </Row>
        </View>
    );
};

export default TabBar;