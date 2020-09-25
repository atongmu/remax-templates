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

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" onClick={() => href(page_path.pull_down_refresh)}>
          <View className="flex align-center">
            <View className="flex-sub">下拉刷新上拉加载组件</View>
            <View className="flex-sub text-right">
              <Icon type="refresh" size="36" color="#999" />
            </View>
          </View>
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white">
          <View className="flex align-center" onClick={() => setOperationsStatus(e => !operationsStatus)}>
            <View className="flex-sub">操作模板</View>
            <View className="flex-sub text-right">
              <Icon type="repair" size="36" color="#999" />
            </View>
          </View>
          {operationsStatus && (
            <View className="solids-top margin-top-sm">
              <Cell label="登录模板" onTap={() => href(page_path.login)} arrow />
              <Cell label="成功模板" onTap={() => href(page_path.succeess)} arrow />
              <Cell label="失败模板" onTap={() => href(page_path.error)} arrow />
            </View>
          )}
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white">
          <View className="flex align-center" onClick={() => setMallStatus(e => !e)}>
            <View className="flex-sub">购物模板</View>
            <View className="flex-sub text-right">
              <Icon type="cart_light" size="36" color="#999" />
            </View>
          </View>
          {mallStatus && (
            <View className="solids-top margin-top-sm">
              <Cell label="首页模板" onTap={() => href(page_path.mall)} arrow />
              <Cell label="分类模板" onTap={() => href(page_path.sort)} arrow />
              <Cell label="物品分类模板" onTap={() => href(page_path.goods_sort)} arrow />
              <Cell label="购物车模板" onTap={() => href(page_path.cart)} arrow />
              <Cell label="详情模板" onTap={() => href(page_path.goods_detail)} arrow />
              <Cell label="地址模板" onTap={() => href(page_path.address_edit)} arrow />
              <Cell label="地址列表模板" onTap={() => href(page_path.address_list)} arrow />
              <Cell label="订单模板" onTap={() => href(page_path.order_detail)} arrow />
              <Cell label="订单列表模板" onTap={() => href(page_path.order_list)} arrow />
              <Cell label="我的模板" onTap={() => href(page_path.my)} arrow />
              <Cell label="物流模板" onTap={() => href(page_path.timeaxis)} arrow />
            </View>
          )}
        </View>

        <View className="padding-lr-sm padding-tb margin-bottom-sm bg-white" >
          <View className="flex align-center" onClick={() => setCimsStatus(e => !e)}>
            <View className="flex-sub">库存模板</View>
            <View className="flex-sub text-right">
              <Icon type="edit" size="36" color="#999" />
            </View>
          </View>
          {cimsStatus && (
            <View className="solids-top margin-top-sm">
              <Cell label="首页模板" onTap={() => href(page_path.cims)} arrow />
              <Cell label="库存列表模板" onTap={() => href(page_path.materials)} arrow />
              <Cell label="物料详情模板" onTap={() => href(page_path.materials_detail)} arrow />
              <Cell label="添加物料模板" onTap={() => href(page_path.materials_edit)} arrow />
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
