import * as React from 'react';
import { Icon, Button } from 'anna-remax-ui';
import { View, Text } from 'remax/wechat';

import './index.less'

export interface Props {
    text: string;
    color: string;
    sortFun: () => void;
    searchFun: () => void;
}

const SearchModel = (props: Props) => {
    const { text, color, sortFun, searchFun } = props

    return (
        <View className="search flex align-center" style={{ background: color }}>
            <View className="sort" onClick={sortFun}>
                <View><Icon type="cascades" size="36" color="#ffffff" /></View>
                <View className="text-white"><Text>分类</Text></View>
            </View>
            <View className="content flex-sub" onClick={searchFun}>
                <Text><Icon type="search_light" size="36" color="#aaaaaa" /></Text>
                <Text className="text-gray padding-left-sm">{text}</Text>
            </View>
        </View>
    );
};

export default SearchModel;