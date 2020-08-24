import * as React from 'react';
import { Loading } from 'anna-remax-ui';
import { View, Text } from 'remax/wechat';

import './index.less'

export interface Props {
    isLoading: boolean;
    type?: string;
    color?: string;
}

const LoadingModel = (props: Props) => {
    const { color, type, isLoading } = props

    return (
        <View className="loading-model padding-sm text-center">
            {isLoading ? (
                <Loading type={type} color={color} />
            ) : (
                    <View className="no-more">
                        <Text className="title">已经到最低了~！</Text>
                    </View>
                )}
        </View>
    );
};

export default LoadingModel;