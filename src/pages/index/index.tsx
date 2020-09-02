import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Cell, Icon, } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import page_path from '@/utils/page_path'

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View>
      <View>
        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => href(page_path.form)}>
          <View className="flex align-center">
            <View className="flex-sub">form组件</View>
            <View className="flex-sub text-right">
              <Icon type="edit" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => href(page_path.searchbar)}>
          <View className="flex align-center">
            <View className="flex-sub">搜索组件</View>
            <View className="flex-sub text-right">
              <Icon type="search" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => href(page_path.slide)}>
          <View className="flex align-center">
            <View className="flex-sub">滑动组件</View>
            <View className="flex-sub text-right">
              <Icon type="round_transfer" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => href(page_path.picker)}>
          <View className="flex align-center">
            <View className="flex-sub">选择器组件</View>
            <View className="flex-sub text-right">
              <Icon type="right" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => href(page_path.qrcode)}>
          <View className="flex align-center">
            <View className="flex-sub">二维码生成组件</View>
            <View className="flex-sub text-right">
              <Icon type="qr_code_light" size="36" color="#999" />
            </View>
          </View>
        </View>
        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => href(page_path.video)}>
          <View className="flex align-center">
            <View className="flex-sub">video组件</View>
            <View className="flex-sub text-right">
              <Icon type="video" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => href(page_path.pull_down_refresh)}>
          <View className="flex align-center">
            <View className="flex-sub">下拉刷新上拉加载组件</View>
            <View className="flex-sub text-right">
              <Icon type="refresh" size="36" color="#999" />
            </View>
          </View>
        </View>
        <View className="padding-sm margin-bottom-sm bg-white" onClick={() => setActive(e => !active)}>
          <View className="flex align-center">
            <View className="flex-sub">模板</View>
            <View className="flex-sub text-right">
              <Icon type="copy" size="36" color="#999" />
            </View>
          </View>
          {active && (
            <View className="solids-top margin-top-sm">
              <Cell label="购物模板" onTap={() => href(page_path.mall)} arrow />
              <Cell label="库存模板" onTap={() => href(page_path.cims)} arrow />
              <Cell label="登录模板" onTap={() => href(page_path.login)} arrow />
            </View>
          )}
        </View>
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
