import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'remax/wechat';
import { Cell, Icon, } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import page_path from '@/utils/page_path'

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [mallStatus, setMallStatus] = useState(false)
  const [cimsStatus, setCimsStatus] = useState(false)
  const [mediaStatus, setMediaStatus] = useState(false)
  const [operationsStatus, setOperationsStatus] = useState(false)

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      setFun
    }
  }, [])

  return (
    <View className="padding-env">
      <View className="padding-lr-sm padding-tb bg-white margin-bottom-sm ">
        <View className="text-center flex align-center justify-center">
          <View className="padding-sm radius" style={{ width: '120', height: '120' }}>
            <Image style={{ width: '100%', height: '100%' }} src="/image/logo.jpg" />
          </View>
          <View className="text-xxl text-black text-bold" >CUI 模板库</View>
        </View>
        <View className="text-center text-gray text-xs">Remax 开发微信小程序<Text className="text-bold padding-left-xs text-green">代码片段</Text></View>
      </View>
      <View>
        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" onClick={() => href(page_path.form)}>
          <View className="flex align-center">
            <View className="flex-sub">form组件</View>
            <View className="flex-sub text-right">
              <Icon type="edit" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" onClick={() => href(page_path.searchbar)}>
          <View className="flex align-center">
            <View className="flex-sub">搜索组件</View>
            <View className="flex-sub text-right">
              <Icon type="search" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" onClick={() => href(page_path.slide)}>
          <View className="flex align-center">
            <View className="flex-sub">滑动组件</View>
            <View className="flex-sub text-right">
              <Icon type="round_transfer" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" onClick={() => href(page_path.picker)}>
          <View className="flex align-center">
            <View className="flex-sub">选择器组件</View>
            <View className="flex-sub text-right">
              <Icon type="right" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" onClick={() => href(page_path.qrcode)}>
          <View className="flex align-center">
            <View className="flex-sub">二维码生成组件</View>
            <View className="flex-sub text-right">
              <Icon type="qr_code_light" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" onClick={() => href(page_path.remind)}>
          <View className="flex align-center">
            <View className="flex-sub">倒计时组件</View>
            <View className="flex-sub text-right">
              <Icon type="remind" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white">
          <View className="flex align-center" onClick={() => setMediaStatus((o) => !o)}>
            <View className="flex-sub">媒体组件</View>
            <View className="flex-sub text-right">
              <Icon type="video" size="36" color="#999" />
            </View>
          </View>
          {mediaStatus && (
            <View className="solids-top margin-top-sm">
              <Cell label="轮播图" onTap={() => href(page_path.swiper)} arrow />
              <Cell label="video" onTap={() => href(page_path.video)} arrow />
            </View>
          )}
        </View>

      </View>
      {isLoading && (
        <PageLoading />
      )}
    </View>
  );
};
