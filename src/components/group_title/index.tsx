import * as React from 'react';
import { Icon } from 'anna-remax-ui';
import { View, Text } from 'remax/wechat';

export interface Props {
    text: string,
    icon: boolean,
}

const GroupTitle = ({ text, icon }: React.PropsWithChildren<Props>) => {

    return (
        <View className="group-title text-center padding-tb-sm">
            <Text className="text-lg text-bold">{text}</Text>
            {icon && (
                <Icon type="right" size="32" color="#333" />
            )}
        </View>
    );
};

export default GroupTitle;