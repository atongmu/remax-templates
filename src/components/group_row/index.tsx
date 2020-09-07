import * as React from 'react';
import { Icon } from 'anna-remax-ui';
import { View, Image, Text } from 'remax/wechat';
import { href } from '@/utils/common';

export interface Props {
    items: Array<any>;
    type: String;
    title: String;
    isRadius?: Boolean;
    isRight?: Boolean;
    rightPath?: String;
    rightText?: String;
    rightViod?: () => void;
}
const GroupRow = ({ items, title, type, isRight, rightText, rightViod, isRadius }: React.PropsWithChildren<Props>) => {
    return (
        <View className="group-row">
            <View className={`bg-white ${isRadius && 'radius'}`}>
                <View className="flex solid-bottom padding-sm">
                    <View className="flex-sub text-bold text-black">{title}</View>
                    {isRight && (
                        <View className="text-right" onClick={rightViod}><Text className="text-gray">{rightText}</Text> <Icon type="right" color="#999" /></View>
                    )}
                </View>
                <View className="padding-sm flex">
                    {items.map((item, index) => {
                        return (
                            <View key={index} className="text-center flex-sub">
                                <View onClick={() => href(item.path)} style={{ position: 'relative' }}>
                                    {type === 'image' ? (
                                        <Image style={{ width: '96rpx', height: '96rpx', margin: '0 auto' }} src={item.icon} />
                                    ) : (
                                            <Icon type={item.icon} />
                                        )}
                                    <View>{item.title}</View>
                                    {item.isRate && (
                                        <View style={{ position: 'absolute', right: '20rpx', top: '6rpx', width: '10rpx', height: '10rpx', borderRadius: '100%', background: 'red' }}></View>
                                    )}
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    );
};

export default GroupRow;