import * as React from 'react';
import { Icon } from 'anna-remax-ui';
import { View, Text } from 'remax/wechat';

import './index.less'

export interface Props {
    text: string,
    icon: boolean,
}

const GroupTitle = (props: Props) => {
    const { text, icon } = props

    return (
        <View className="group-title">
            <Text className="text-lg text-bold">{text}</Text>
            {icon && (
                <Icon type="right" size="32" color="#333" />
            )}
        </View>
    );
};

export default GroupTitle;