import React, { useEffect, useState } from 'react';
import { View, Text, Image, getStorageSync } from 'remax/wechat';
import { Cell, Icon, Button, Input } from 'anna-remax-ui';

import './index.less';
import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import OrderModel from '@/components/order_model';
import page_path from '@/utils/page_path';
import GoodsModel from '../../components/goods_model/index';

export interface GoodsModel {
  id: number,
  name: string,
  newPrice: string,
  content: string,
  changeGoods: { key: string, value: string, image: string },
  num: number
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [orderItems, setOrderItems] = useState<GoodsModel[]>([])

  useEffect(() => {
    const setFun = setTimeout(() => {
      init()
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  const init = () => {
    const cartItems = getStorageSync("cart")
    if (cartItems) {
      setOrderItems(item => JSON.parse(cartItems))
    }
  }
  return (
    <View>
      {isLoading ? (
        <PageLoading />
      ) : (
          <View className="margin-top-sm">
            <View className="bg-white margin-bottom-sm padding" style={{ position: 'relative' }}>
              <View className="flex align-center" onClick={() => toast('地址列表')}>
                <View className="flex-sub">
                  <View><Text>小仙雨</Text><Text className="margin-left-sm">129******11</Text></View>
                  <View>广东省深圳市南山区高新科技园中区一路</View>
                </View>
                <View>
                  <Icon type="right" size="36" color="#999" />
                </View>
              </View>
              <View className="bg-img"></View>
            </View>
            <View className="bg-white">
              <View className="padding solid-bottom">
                信息
              </View>
              <View className="padding">
                {orderItems && (
                  orderItems.map((item, index) => {
                    return (
                      <OrderModel key={index} item={item} detail={() => console.log(item)} />
                    )
                  })
                )}
              </View>
              <View>
                <Cell label="总额"><Text className="text-price">111</Text></Cell>
                <Cell label="优惠券" arrow><Text className="text-red">满5减1</Text></Cell>
                <Cell label="发票" arrow><Text className="text-red">不开发票</Text></Cell>
                <Cell label="配送费"><Text className="text-price">0/00</Text></Cell>
                <Input label="备注" placeholder="选填：请先和商家协商一致" />
                <Cell border={false}><View className="text-black">合计：<Text className="text-price text-red text-xl">111</Text></View></Cell>
              </View>
              <View className="safearea-bottom"></View>
            </View>
            <View className="foot">
              <View className="flex align-center bg-white padding-env">
                <View className="flex-sub text-center">
                  实付：<Text className="text-price text-red text-xl">1111</Text>
                </View>
                <View className="padding-xs">
                  <Button look="anna" onTap={() => toast("按钮")}>按钮</Button>
                </View>
              </View>
            </View>
          </View>
        )}
    </View>
  );
};
