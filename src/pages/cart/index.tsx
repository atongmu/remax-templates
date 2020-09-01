import React, { useEffect, useState } from 'react';
import { View, Text, Image, getStorageSync } from 'remax/wechat';
import { Button, Checkbox, Icon } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import page_path from '@/utils/page_path'
import SlideModel from '@/components/slide_model';
import SkeletonModel from '@/components/skeleton_model';

export interface Goods {
  id: number,
  name: string,
  newPrice: string,
  content: string,
  checked: boolean,
  show: boolean,
  swiper: boolean,
  changeGoods: { key: string, value: string, image: string },
  sku: Array<{ key: string, value: string, image: string }>,
  num: number
}
const customizeSkeleton = (
  <View className="bg-white flex align-center">
    <View className="flex align-center padding-tb-xs">
      <View style={{ margin: '0 20rpx' }}>
        
      </View>
      <View style={{ width: '220', height: '220' }}>
        <View style={{ width: '100%', height: '100%' }}></View>
      </View>
      <View className="flex-sub flex">
        <View className="flex-sub margin-lr-sm">
          <View className="title margin-bottom text-sm"></View>
          <Text className="bg-gray padding-xs text-sm">
            <Icon type="unfold" />
          </Text>
          <View className="flex padding-top">
            <View className="flex-sub text-red"><Text className="text-price"></Text></View>
            <View><Text>x</Text></View>
          </View>
        </View>
      </View>
    </View>
  </View>
);
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
    setTimeout(() => {
      const cartItems = getStorageSync("cart")
      if (cartItems) {
        const cartGoods = JSON.parse(cartItems)
        cartGoods.map((item: Goods) => {
          item.checked = true
          item.show = false
          return item
        })
        setItems(items => items = cartGoods)
      }
      setLoading(false)
    }, 9500)
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
    setTotal(e => e = String(totalPrice))
  }, [items])


  // 全选反选函数
  const onCheckedAllChange = (newCheckedAll: boolean) => {
    const newCart: Goods[] = Object.assign([], items)
    newCart.forEach(cartItem => {
      cartItem.checked = !newCheckedAll
    })
    setItems(items => items = newCart)
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
    setItems(items => items = newCart)
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
    setItems(items => items = newCart)
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
    setItems(items => items = newCart)
  }
  const handleOpen = (e: any) => {
    console.log('handleOpen', e);
    setItems(s =>
      s.map(i => {
        return { ...i, show: e.id === i.id ? true : false };
      }),
    );
  };
  return (
    <View>
      {items.length > 0 ? (
        <View style={{ paddingBottom: '84rpx' }}>
          <View className="flex align-center padding-sm bg-green light text-sm">
            <View className="flex-sub">购物车共<Text className="text-red padding-lr-xs">{items.length}</Text>件商品</View>
            <View className="flex-sub text-right padding-tb-sm">
              {isEdit ? (
                <Text className="padding-tb-sm padding-lr radius-shape bg-cyan text-white" onClick={() => setIsEdit(false)}>完成</Text>
              ) : (
                  <Text className="padding-tb-sm padding-lr radius-shape bg-green text-white" onClick={() => setIsEdit(true)}>编辑</Text>
                )}
            </View>
          </View>
          <View>
            {
              items.map((item, index) => (
                <View key={index} className="bg-white margin-bottom-sm">
                  <SlideModel
                    show={item.show}
                    buttons={[{
                      name: '删除',
                      style: {
                        backgroundColor: '#ff0000',
                      },
                      onTap: () => removeGoods(item),
                    }]}
                    handleOpen={() => handleOpen(item)}
                    extra={
                      <View className="flex align-center padding-tb-xs">
                        <View style={{ margin: '0 20rpx' }}>
                          <Checkbox checked={item.checked} onChange={() => onchange(item)} />
                        </View>
                        <View style={{ width: '220', height: '220' }}>
                          <Image style={{ width: '100%', height: '100%' }} src={item.changeGoods.image} />
                        </View>
                        <View className="flex-sub flex" onClick={() => console.log(item)}>
                          <View className="flex-sub margin-lr-sm">
                            <View className="title margin-bottom text-sm">{item.name}</View>
                            <Text className="bg-gray padding-xs text-sm">
                              {item.changeGoods.value}
                              <Icon type="unfold" />
                            </Text>
                            <View className="flex padding-top">
                              <View className="flex-sub text-red"><Text className="text-price">{item.newPrice}</Text></View>
                              <View><Text>x</Text> {item.num}</View>
                            </View>
                          </View>
                        </View>
                      </View>
                    }
                  />
                </View>
              ))
            }
          </View>
          <View className="safearea-bottom"></View>
          <View className="foot">
            <View className="flex align-center bg-white padding-lr-sm padding-env">
              <View className="flex-sub">
                <View className="flex-sub flex align-center">
                  <View><Checkbox checked={checkedAll} onChange={() => onCheckedAllChange(checkedAll)} style={{ color: '#28a745' }} >全选</Checkbox></View>
                  {!isEdit && (
                    <Text className="flex-sub text-right margin-right-sm">
                      合计：<Text className="text-price text-bold text-red">{parseFloat(total).toFixed(2)}</Text>
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
          <View className="padding-tb-xl text-center">
            <View className="margin-top"><Icon type="taoxiaopu" size="120" color="#ff5555" /></View>
            <View className="margin-top-sm text-xl text-bold" onClick={() => href(page_path.home)}>去逛逛</View>
          </View>
        )}
      {isLoading && (
        <SkeletonModel loading={isLoading} customize={customizeSkeleton} repetitions={2} space={50} />
      )}
    </View>
  );
};
