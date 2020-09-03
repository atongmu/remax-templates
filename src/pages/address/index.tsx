import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Icon, Button } from 'anna-remax-ui';

import './index'
import PageLoading from '@/components/page_loading';
import { href, toast } from '@/utils/common'
import page_path from '@/utils/page_path'

export default () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      setFun
    }
  }, [])
  return (
    <View className="address">
      {isLoading ? (
        <PageLoading color="#28a745" topVal="0" />
      ) : (
          <View className="margin-top-sm">
            <View className="flex bg-white align-center solid-bottom padding-sm">
              <View className="flex-sub">
                <View>名字 139*******1</View>
                <View className="padding-top-sm">山东省青岛市</View>
              </View>
              <Text onClick={() => toast("编辑地址")}><Icon type="edit" size="36" color="#8799a3" /></Text>
            </View>

            <View className="foot padding-sm bg-white">
              <View className="padding-env">
                <Button block look="anna" onTap={() => toast("新增收货地址")}>新增收货地址</Button>
              </View>
            </View>
          </View>
        )}
    </View>
  );
};
