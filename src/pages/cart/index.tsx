import React, { useEffect, useState } from 'react';
import { View, Text, getStorageSync } from 'remax/wechat';
import { Button, Checkbox } from 'anna-remax-ui';

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
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [checkedAll, setCheckedAll] = useState<boolean>(true)
  const [items, setItems] = useState<Goods[]>([])
  const [total, setTotal] = useState<string>('0.00')

  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const cartItems = getStorageSync("cart")
    if (cartItems) {
      const cartGoods = JSON.parse(cartItems)
      cartGoods.map((item: Goods) => (item.checked = true))
      setItems(e => cartGoods)
    }
    setLoading(false)
  }

  // 数据更新的时候操作
  useEffect(() => {
    const changeItem = filterChecked()
    const totalPrice = sumPrice(changeItem)
    if (changeItem.length === items.length) {
      setCheckedAll(true)
    } else {
      setCheckedAll(false)
    }
    setTotal(e => String(totalPrice))
  }, [items])


  // 全选反选函数
  const onCheckedAllChange = (newCheckedAll: boolean) => {
    const newCart: Goods[] = Object.assign([], items)
    newCart.forEach(cartItem => {
      cartItem.checked = !newCheckedAll
    })
    setItems(items => newCart)
    setCheckedAll(!newCheckedAll)
  }

  // 返回已选中的所有cartItems
  const filterChecked = () => (items.filter((entries: any) => entries.checked))

  // 计算总价
  const sumPrice = (cartItems: Goods[]) => {
    return cartItems.reduce((sum, cur) => sum + (cur.num * parseFloat(cur.newPrice)), 0)
  }
  // 删除商品
  const removeGoods = (e: Goods) => {
    const newCart: Goods[] = Object.assign([], items)
    for (let i = newCart.length - 1; i >= 0; i--) {
      const item = newCart[i]
      if (item.id === e.id) {
        newCart.splice(i, 1)
        break
      }
    }
    setItems(items => newCart)
  }
  // 删除所选商品
  const removeChangeGoods = () => {
    const newCart: Goods[] = Object.assign([], items)
    for (let i = newCart.length - 1; i >= 0; i--) {
      const item = newCart[i]
      if (item.checked) {
        newCart.splice(i, 1)
      }
    }
    setItems(items => newCart)
  }
  // 选择商品
  const onchange = (e: Goods) => {
    const newCart: Goods[] = Object.assign([], items)
    for (let i = newCart.length - 1; i >= 0; i--) {
      const item = newCart[i]
      if (item.id === e.id) {
        item.checked = !item.checked
        break
      }
    }
    setItems(items => newCart)
  }
  return (
    <View>
      {items.length > 0 ? (
        <View>
          <View className="flex align-center padding-sm bg-green light text-sm">
            <View className="flex-sub">购物车共<Text className="text-red padding-lr-xs">{items.length}</Text>件商品</View>
            <View className="flex-sub text-right padding-tb-sm">
              {isEdit ? (
                <Text className="padding-tb-sm padding-lr radius-shape bg-cyan text-white" onClick={() => setIsEdit(false)}>完成</Text>
              ) : (
                  <Text className="padding-tb-sm padding-lr radius-shape bg-green text-white" onClick={() => setIsEdit(true)}>编辑商品</Text>
                )}
            </View>
          </View>
          <View>
            {
              items.map((item, index) => (
                <View key={index} className="bg-white margin-bottom-sm">
                  <CartModel item={item} buttonTap={() => removeGoods(item)} onChange={() => onchange(item)} detail={() => console.log(item)} />
                </View>
              ))
            }
          </View>
          <View style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', paddingBottom: "env(safe-area-inset-bottom)" }}>
            <View className="flex align-center bg-white padding-lr-sm">
              <View className="flex-sub">
                <View className="flex-sub flex align-center">
                  <View><Checkbox checked={checkedAll} onChange={() => onCheckedAllChange(checkedAll)} style={{ color: '#28a745' }} >全选</Checkbox></View>
                  {!isEdit && (
                    <Text className="flex-sub text-right margin-right-sm">
                      合计：<Text className="text-price text-bold text-red">{total}</Text>
                    </Text>
                  )}
                </View>
              </View>
              <View className="padding-tb-xs">
                {isEdit ? (
                  <Button look="anna" onTap={removeChangeGoods}>删除</Button>
                ) : (
                    <Button look="anna" onTap={() => href(page_path.order_submit)}>下单</Button>
                  )}
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
