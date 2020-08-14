import * as React from 'react';
import { Icon, Loading } from 'anna-remax-ui';
import { View, Text } from 'remax/wechat';

import './index.less'

export interface Props {
    color: string;
    topVal: string;
}

const PageLoading = (props: Props) => {
    const { color, topVal } = props

    return (
        <View className="loading" style={{ top: topVal }}>
            <View className="content">
                <Loading type="anna" color={color} />
            </View>
        </View>
    );
};

export default PageLoading;