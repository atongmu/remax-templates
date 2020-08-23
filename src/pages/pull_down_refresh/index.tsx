import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Loading } from 'anna-remax-ui';
import { usePageEvent } from 'remax/macro';

import './index.less'
import { href, toast } from '@/utils/common'
import usePullDownRefresh from '@/hooks/usePullDownRefresh'

export default () => {
  const { pageLoading, setPageLoading } = usePullDownRefresh()
  const [isLoading, setLoading] = useState(false)
  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      setTimeout(() => {
        toast('刷新成功')
        resolve();
      }, 1000);
    })
  });
  return (
    <View className="pull_down_refresh">
      <View className="padding-sm solid-bottom">
        <Text>订单编号：</Text><Text>9136257866</Text>
      </View>
      <View className="padding-sm solid-bottom">
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
        <View className="padding-tb-xl">下拉</View>
      </View>
      <View className="padding-sm text-center">
        {isLoading ? (
          <Loading type="wave" color="#1890FF" />
        ) : (
            <View className="no-more">
              <Text className="title">没有更多了</Text>
            </View>
          )}
      </View>
    </View>
  );
};
