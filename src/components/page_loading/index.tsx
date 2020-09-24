import * as React from 'react';
import { Loading } from 'anna-remax-ui';
import { View } from 'remax/wechat';

import './index.less'

export interface Props {
    color?: string;
    topVal?: number;
}

const PageLoading = ({ color="#28a745", topVal=0 }: React.PropsWithChildren<Props>) => {

    return (
        <View className="loading" style={{ top: `${topVal}px` }}>
            <View className="content">
                <Loading type="anna" color={color} />
            </View>
        </View>
    );
};

export default PageLoading;