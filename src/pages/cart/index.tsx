import React, { useEffect, useState } from 'react';
import { View, Text, getStorageSync } from 'remax/wechat';
import { Cell, Checkbox, } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import page_path from '@/utils/page_path'
import CartModel from '../../components/cart_model/index';
export interface Goods {
  id: number,
  name: string,
  newPrice: string,
  content: string,
  changeGoods: { key: string, value: string, image: string },
  sku: Array<{ key: string, value: string, image: string }>,
  num: number
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [items, setItems] = useState<Goods[]>([])

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const cartItems = getStorageSync("cart")
    if (cartItems) {
      setItems(items => JSON.parse(cartItems))
    }
    setLoading(false)
  }
  return (
    <View>
      <View>
        {items.length > 0 ? (
          <View>
            <View className="flex align-center padding-sm bg-green light">
              <View className="flex-sub">购物车共{items.length}件商品</View>
              <View className="flex-sub text-right padding-tb-sm">
                {isEdit ? (
                  <Text className="padding-tb-sm padding-lr radius-shape bg-cyan text-white">完成</Text>
                ) : (
                    <Text className="padding-tb-sm padding-lr radius-shape bg-green text-white" onClick={() => setIsEdit(true)}>编辑商品</Text>
                  )}
              </View>
            </View>
            <View>
              {
                items.map((item, index) => (
                  <View key={index}>
                    <CartModel item={item} detail={() => console.log(item)} />
                  </View>
                ))
              }
            </View>
            <View>全选 合计</View>
          </View>
        ) : (
            <View>
              去购买
            </View>
          )}
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
