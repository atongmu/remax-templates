import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Cell, Loading, } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import page_path from '@/utils/page_path'

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    setLoading(false)
  }
  return (
    <View>
      <View>
        <View className="flex align-center padding-sm bg-green light">
          <View className="flex-sub">购物车共2件商品</View>
          <View className="flex-sub text-right padding-tb-sm">
            {isEdit ? (
              <Text className="padding-tb-sm padding-lr radius-shape bg-cyan text-white">完成</Text>
            ) : (
                <Text className="padding-tb-sm padding-lr radius-shape bg-green text-white" onClick={() => setIsEdit(true)}>编辑商品</Text>
              )}
          </View>
        </View>
        <View>商品</View>
        <View>全选 合计</View>
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
