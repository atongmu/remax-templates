import React, { useEffect, useState } from 'react';
import { View, Text, getStorageSync, Label } from 'remax/wechat';
import { Cell, Button, Checkbox } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import page_path from '@/utils/page_path'
import CartModel from '../../components/cart_model/index';
export interface Goods {
  id: number,
  name: string,
  newPrice: string,
  content: string,
  checked: boolean,
  swiper: boolean,
  changeGoods: { key: string, value: string, image: string },
  sku: Array<{ key: string, value: string, image: string }>,
  num: number
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [checkedAll, setCheckedAll] = useState(true)
  const [items, setItems] = useState<Goods[]>([])

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const cartItems = getStorageSync("cart")
    if (cartItems) {
      const cartGoods = JSON.parse(cartItems)
      cartGoods.map((item: any) => {
        item.checked = true
        item.swiper = true
        return item
      })
      setItems(items => cartGoods)
    }
    setLoading(false)
  }

  /** 全选反选函数 */
  const onCheckedAllChange = (newCheckedAll: boolean) => {
    console.log(newCheckedAll)
    items.forEach(cartItem => {
      cartItem.checked = !newCheckedAll
    })
    // 取消全选的话 直接把map赋值为空对象
    setItems(item => items)
    setCheckedAll(!newCheckedAll)
  }
  // 数据更新的时候 如果勾选中的数据已经不在数据内了 就删除掉
  useEffect(() => {
    console.log(items)
  }, [items])

  return (
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
                <View key={index} className="padding-tb-xs solid-bottom bg-white margin-bottom-sm">
                  <CartModel item={item} onChange={() => { item.checked = !item.checked; }} detail={() => console.log(item)} />
                </View>
              ))
            }
          </View>
          <View style={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
            <View className="flex align-center bg-white padding-lr-sm">
              <View className="flex-sub">
                <View className="flex-sub flex align-center">
                  <View><Checkbox checked={checkedAll} onChange={() => onCheckedAllChange(checkedAll)} style={{ color: '#28a745' }} >全选</Checkbox></View>
                  <Text className="flex-sub text-right margin-right-sm">
                    合计：<Text className="text-price text-bold text-red">111</Text>
                  </Text>
                </View>
              </View>
              <View className="padding-tb-xs">
                <Button look="anna" onTap={() => href(page_path.order_submit)}>下单</Button>
              </View>
            </View>
          </View>
        </View>
      ) : (
          <View>
            去购买
          </View>
        )}
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
