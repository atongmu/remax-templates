import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'remax/wechat';
import { Cell, Loading, Card, Icon, Row, Col } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import GroupRow from '@/components/group_row';
import page_path from '@/utils/page_path'

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [orderItems] = useState([
    {
      path: 'path',
      title: '待付款',
      icon: 'pic'
    },
    {
      path: 'path',
      title: '待发货',
      icon: 'pic'
    },
    {
      path: 'path',
      title: '待收货',
      icon: 'pic'
    },
    {
      path: 'path',
      title: '待评论',
      icon: 'pic'
    },
    {
      path: 'path',
      title: '退款/售后',
      icon: 'pic'
    },
  ])

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View>
      <View className="padding-tb-xl" style={{ background: '#28a745' }}>
        <View className="flex align-center padding-lr">
          <View>
            <Image src="http://dummyimage.com/200x200" style={{ width: '140rpx', height: '140rpx', borderRadius: '100%' }} />
          </View>
          <View className="flex-sub margin-lr text-white">
            <View>haha</View>
            <View className=" text-sm">喝茶养鱼斗蛐蛐</View>
          </View>
          <View style={{ padding: '10rpx', color: '#fff', borderRadius: '100%' }}>编辑</View>
        </View>

        <View className="padding-lr">
          <View className="flex padding text-white">
            <View className="flex-sub text-center">
              <View className="text-bold">25</View>
              <View>收藏夹</View>
            </View>
            <View className="flex-sub text-center">
              <View className="text-bold">1</View>
              <View>店铺关注</View>
            </View>
            <View className="flex-sub text-center">
              <View className="text-bold">10</View>
              <View>足迹</View>
            </View>
          </View>
        </View>
      </View>

      <View className="padding-lr-sm" style={{ marginTop: '-30rpx' }}>
        <GroupRow items={orderItems} isRadius={true} type='icon' title="我的订单" isRight={true} rightText="查看全部订单" rightViod={() => toast("查看全部订单")} />
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
