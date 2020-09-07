import * as React from 'react';
import { Loading } from 'anna-remax-ui';
import { View, Text } from 'remax/wechat';

import './index.less'

export interface Props {
    isLoading: boolean;
    empty?: boolean;
    type?: 'wave' | 'anna';
    color?: string;
}

const LoadingModel = ({ color, type, isLoading = true,  empty = false }: React.PropsWithChildren<Props>) => {

    return (
        <View className="loading-model padding-sm text-center">
            {isLoading ? (
                type ? (
                    <Loading type={type} color={color} />
                ) : (
                        <View className="flex align-center justify-center">
                            <Loading type={type} color={color} />
                            <Text className="padding-left-sm text-xs text-gray">努力加载中···</Text>
                        </View>
                    )
            ) : (
                    <View className="no-more">
                        {empty ?
                            (<Text className="title">暂无数据~！</Text>)
                            :
                            (
                                !isLoading && (<Text className="title">已经到最低了~！</Text>)
                            )}
                    </View>
                )}
            <View className="safearea-bottom"></View>
        </View>
    );
};

export default LoadingModel;