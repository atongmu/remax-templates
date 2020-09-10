import React, { useEffect, useState } from 'react';
import { View, Text, Image, getStorageSync } from 'remax/wechat';
import { Button, Icon, Stepper } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import page_path from '@/utils/page_path'
import SlideModel from '@/components/slide_model';
import SkeletonModel from '@/components/skeleton_model';
import CheckboxModel from '@/components/checkbox_model';

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
      <View className="bg-gray" style={{ margin: '0 20rpx', width: '58', height: '58', lineHeight: '58rpx', borderRadius: '10000' }}></View>
      <View className="bg-gray" style={{ width: '220', height: '220', lineHeight: '220' }}></View>
      <View className="flex-sub flex">
        <View className="flex-sub margin-lr-sm">
          <View className="margin-bottom-sm bg-gray" style={{ width: '380', height: '28', lineHeight: '1' }}></View>
          <View className="bg-gray padding-xs text-sm" style={{ width: '100', height: '28', lineHeight: '1' }}></View>
          <View className="flex justify-between padding-top">
            <View className="bg-gray" style={{ width: '80', height: '28', lineHeight: '1' }}></View>
            <View className="bg-gray" style={{ width: '120', height: '28', lineHeight: '1' }}></View>
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
        setItems(items => items = cartGoods)
      }
      setLoading(false)
    }, 1500)
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
    setItems(s =>
      s.map(i => {
        return { ...i, checked: e.id === i.id ? !i.checked : i.checked };
      }),
    );
  }
  const handleOpen = (e: any) => {
    setItems(s =>
      s.map(i => {
        return { ...i, show: e.id === i.id ? true : false };
      }),
    );
  };

  const handleHide = () => {
    setItems(s =>
      s.map(i => {
        return { ...i, show: false };
      }),
    );
  };
  // 商品数量操作
  const handleNum = (n: any, e: any) => {
    setItems(s =>
      s.map(i => {
        return { ...i, num: e.id === i.id ? n : i.num };
      }),
    );
  }
  return (
    <View onClick={handleHide}>
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
                        <View>
                          <CheckboxModel checked={item.checked} onChange={() => onchange(item)} />
                        </View>
                        <View style={{ width: '220', height: '220' }} onClick={() => console.log(item)}>
                          <Image style={{ width: '100%', height: '100%' }} src={item.changeGoods.image} />
                        </View>
                        <View className="flex-sub flex">
                          <View className="flex-sub margin-lr-sm">
                            <View className="title margin-bottom-xs text-sm">{item.name}</View>
                            <View>
                              <Text className="padding-tb-xs padding-lr-sm bg-gray text-sm">
                                <Text className="margin-right-sm text-gray">{item.changeGoods.value}</Text>
                                <Icon type="unfold" />
                              </Text>
                            </View>
                            <View className="flex margin-top-xs">
                              <View className="flex-sub text-red"><Text className="text-price">{item.newPrice}</Text></View>
                              <View>
                                <Stepper size="small" min={1} value={item.num} onChange={(val: any) => handleNum(val, item)} />
                              </View>
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
                  <View><CheckboxModel checked={checkedAll} onChange={() => onCheckedAllChange(checkedAll)} color='#28a745' extra={'全选'} /></View>
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
        <SkeletonModel fixed={true} loading={isLoading} customize={customizeSkeleton} repetitions={5} space={50} />
      )}
    </View>
  );
};
