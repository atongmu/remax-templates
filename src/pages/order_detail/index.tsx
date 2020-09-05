import React, { useEffect, useState } from 'react';
import { View, Text, Image, getStorageSync } from 'remax/wechat';
import { Cell, Icon, Button, Input, Space } from 'anna-remax-ui';

import './index.less';
import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import OrderModel from '@/components/order_model';
import page_path from '@/utils/page_path';

export interface item {
  id: number,
  name: string,
  newPrice: string,
  content: string,
  changeGoods: { key: string, value: string, image: string },
  num: number
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [orderItems, setOrderItems] = useState<item[]>([])

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
        <PageLoading color="#28a745" topVal="0" />
      ) : (
          <View>
            <View className="flex align-center padding-tb-xl padding-lr-sm bg-red">
              <View className="flex-sub">
                <View className="text-xl">等待</View>
              </View>
              <View>
                <Icon type="card_fill" size="48" color="#ffffff" />
              </View>
            </View>
            <View className="bg-white margin-bottom-sm padding">
              <View className="flex align-center">
                <View>
                  <Icon type="location" size="36" color="#999" />
                </View>
                <View className="flex-sub margin-lr-sm">
                  <View><Text>小仙雨</Text><Text className="margin-left-sm">129******11</Text></View>
                  <View>广东省深圳市南山区高新科技园中区一路</View>
                </View>
                <View>
                  <Icon type="right" size="36" color="#999" />
                </View>
              </View>
            </View>
            <View className="bg-white margin-bottom-sm padding">
              <View className="flex align-center" onClick={() => toast("地址")}>
                <View>
                  <Icon type="deliver" size="36" color="#999" />
                </View>
                <View className="flex-sub margin-lr-sm">
                  <View><Text>小仙雨</Text><Text className="margin-left-sm">129******11</Text></View>
                  <View>广东省深圳市南山区高新科技园中区一路</View>
                </View>
                <View>
                  <Icon type="right" size="36" color="#999" />
                </View>
              </View>
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
              <View className="padding-env">
                <Cell label="总额"><Text className="text-price">111</Text></Cell>
                <Cell label="优惠券" arrow><Text className="text-red">满5减1</Text></Cell>
                <Cell label="发票" arrow><Text className="text-red">不开发票</Text></Cell>
                <Cell label="配送费"><Text className="text-price">0/00</Text></Cell>
                <Input label="备注" placeholder="选填：请先和商家协商一致" />
                <Cell border={false}><View className="text-black">合计：<Text className="text-price text-red text-xl">111</Text></View></Cell>
              </View>
            </View>
            <View className="foot bg-white padding-env">
              <View className="text-right padding-sm">
                <Space align="baseline">
                  <Button look="anna" onTap={() => toast("按钮")}>按钮</Button>
                  <Button look="anna" onTap={() => toast("按钮")}>按钮</Button>
                </Space>
              </View>
            </View>
          </View>
        )}
    </View>
  );
};
