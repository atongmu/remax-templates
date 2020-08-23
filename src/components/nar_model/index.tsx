import * as React from 'react';
import { View, ScrollView } from 'remax/wechat';

import './index.less'

export interface Props {
    items: Array<string>;
    active: number;
    className?: string,
    style?: object;
    detail: (e: number) => void;
}

const NavModel = (props: Props) => {
    const { items, active, detail, style, className } = props
    return (
        <ScrollView scroll-x className="nav-model solid-top bg-white text-center" style={style}>
            <View className="flex align-center">
                {items.map((item, index) => {
                    return (
                        <View key={index} className={`nav-item flex-sub ${active == index && `${className} active`}`} onClick={() => detail(index)}>
                            <View className="text-sm">{item}</View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    );
};

export default NavModel;