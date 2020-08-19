import React, { useEffect, useState } from 'react';
import { View, Text, Image, Swiper, SwiperItem, getSystemInfo, getStorageSync, setStorageSync } from 'remax/wechat';
import { Stepper, Popup, Button, Icon, Tag } from 'anna-remax-ui';

import './index.less';
import { href } from '@/utils/common'
import page_path from '@/utils/page_path';
import { getProduct } from '@/api/index'
import GroupTitle from '@/components/group_title/index';
import PageLoading from '@/components/page_loading';
import { toast } from '../../utils/common';

export interface Info {
  id: number,
  banners: Array<{ image: string }>,
  title: string,
  pack: boolean,
  newPrice: string,
  originalPrice: string,
  content: string,
  sku: Array<{ key: string, value: string, image: string }>,
  commont: Array<{ id: number, name: string, head_image: string, text: string }>,
  sales: number,
  delivery: number,
  city: string,
}
export interface GoodsSku {
  key: string,
  value: string,
  image: string
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [scrollH, setScrollH] = useState<number>(0)
  const [changeGoods, setChangeGoods] = useState<GoodsSku>({
    key: '',
    value: '',
    image: ''
  })
  const [num, setNum] = React.useState(1);
  const [goodsInfo, setGoodsInfo] = useState<Info>({
    id: 0,
    banners: [],
    title: '',
    pack: false,
    newPrice: '',
    originalPrice: '',
    content: '',
    sku: [],
    commont: [],
    sales: 0,
    delivery: 0,
    city: '',
  })

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const { windowWidth } = await getSystemInfo()
    const result: any = await getProduct({})
    setScrollH(windowWidth)
    if (result.status === 200) {
      const data = {
        id: result.data.id,
        banners: result.data.banners,
        title: result.data.title,
        pack: result.data.pack,
        newPrice: result.data.newPrice,
        originalPrice: result.data.originalPrice,
        content: result.data.content,
        sku: result.data.sku,
        commont: result.data.commont,
        sales: result.data.sales,
        delivery: result.data.delivery,
        city: result.data.city,
      }
      setChangeGoods({ key: result.data.sku[0].key, value: result.data.sku[0].value, image: result.data.sku[0].image })
      setGoodsInfo(data)
    }
    setLoading(false)
  }
  const appendCart = () => {
    const cartItems = getStorageSync("cart")
    if (cartItems) {
      console.log(1)
    } else {
      const goods = [{
        id: goodsInfo.id,
        name: goodsInfo.title,
        newPrice: goodsInfo.newPrice,
        sku: goodsInfo.sku,
        changeGoods: changeGoods,
        num: num

      }]
      const storageGoods = JSON.stringify(goods)
      setStorageSync("cart", storageGoods)
    }
  }
  return (
    <View className="goods-info">
      <View style={{ position: 'relative' }}>
        <View>
          <Swiper autoplay={true} circular={true} onChange={(e) => setBannerIndex(e.detail.current)} style={{ height: `${scrollH * 2}` }}>
            {goodsInfo.banners.map((item, index) => {
              return (<SwiperItem key={index}>
                <Image src={item.image} style={{ width: "100%", height: "100%" }} />
              </SwiperItem>)
            })}
          </Swiper>
          <View style={{ position: 'absolute', bottom: '30', right: '0' }}>
            <Text style={{ padding: '10rpx 6rpx 10rpx 20rpx', borderRadius: '50rpx 0 0 50rpx', backgroundColor: 'rgba(0,0,0,.7)', color: '#ffffff' }}>{bannerIndex + 1}/{goodsInfo.banners.length}</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: '30', left: 'calc(50% - 20rpx)' }}>
          <Icon type="video" color="#fe4f4f" size="42" />
        </View>
      </View>
      <View>
        <View className="flex align-center padding-sm bg-white">
          <View className="flex-sub">
            <View className="text-red">
              ￥<Text className="text-xxl">{goodsInfo.newPrice}</Text>
            </View>
          </View>
          <View className="text-center">
            <View>
              <Icon type="like" />
            </View>
            <View className="text-sm">收藏 </View>
          </View>
        </View>
        <View className="text-gray padding-sm bg-white">
          <Text className="text-price">{goodsInfo.originalPrice}</Text>
        </View>
        <View className="flex align-center padding-left-sm bg-white">
          <View className="flex-sub margin-right-sm">
            {goodsInfo.title}
          </View>
          <View style={{ padding: '10rpx 6rpx 10rpx 20rpx', borderRadius: '50rpx 0 0 50rpx', backgroundColor: 'rgba(0,0,0,.1)' }}>
            <Icon type="share_light" /> 分享
          </View>
        </View>
        <View className="text-gray  flex align-center padding-sm bg-white">
          <View className="flex-sub">快递：{goodsInfo.delivery}</View>
          <View className="flex-sub">月销:{goodsInfo.sales}</View>
          <View className="flex-sub">{goodsInfo.city}</View>
        </View>
        <View className="radius bg-white margin-tb-sm">
          <View className="padding-sm">
            <View className="flex align-center solid-bottom">
              <View><Text className="text-bold text-black">已选</Text></View>
              <View className="flex-sub margin-lr-sm">{changeGoods.value}</View>
              <View onClick={() => setShow(true)}><Icon type="more" size="36" /></View>
            </View>
          </View>
          <View className="padding-sm">
            <View className="flex align-center solid-bottom">
              <View><Text className="text-bold text-black">送至</Text></View>
              <View className="flex-sub margin-lr-sm">今日23:59前完成下单，预计6月28日23:30前发货，7月1日24:00前送达</View>
              <View><Icon type="more" size="36" /></View>
            </View>
          </View>
          <View className="padding-sm">
            <View className="flex align-center">
              <View><Text className="text-bold text-black">运费</Text></View>
              <View className="flex-sub margin-lr-sm">在线支付免运费</View>
              <View><Icon type="more" size="36" /></View>
            </View>
          </View>
        </View>
        <View className="padding-sm bg-white">
          <View className="flex">
            <View className="flex-sub">
              <Text className="text-bold text-black">评论</Text>
            </View>
            <View className="text-red">
              查看全部 <Icon type="more" size="36" color="red" />
            </View>
          </View>
          <View className="padding-tb-xs">
            {goodsInfo.commont.map((item, index) => {
              return (
                <View key={index}>
                  <View className="flex align-center">
                    <View className="round" style={{ width: '64', height: '64', overflow: 'hidden' }}>
                      <Image style={{ width: '100%', height: "100%" }} src={item.head_image} />
                    </View>
                    <View className="flex-sub margin-left-sm">{item.name}</View>
                  </View>
                  <View className="padding-tb-sm">{item.text}</View>
                  <View className="text-gray"></View>
                </View>
              )
            })}
          </View>
          <View className="text-center">
            <View style={{ width: '60%', margin: '0 auto' }}>
              <Button look="light" block>查看全部评论</Button>
            </View>
          </View>
        </View>

        <View>
          <View className="padding">
            <GroupTitle text="宝贝详情" icon={false} />
          </View>
          <View className="bg-white padding-sm">
            <Text>{goodsInfo.content}</Text>
          </View>
        </View>
      </View>

      <View className="bg-white padding-tb-xs solid-top" style={{ position: 'fixed', width: '100%', bottom: '0', left: '0' }}>
        <View className="flex align-center">
          <View className="flex-sub flex">
            <View className="flex-sub text-center" onClick={() => toast("客服")}>
              <View><Icon type="service" size="36" /></View>
              <View className="text-xs">客服</View>
            </View>
            <View className="flex-sub text-center" onClick={() => toast("店铺")}>
              <View><Icon type="shop" size="36" /></View>
              <View className="text-xs">店铺</View>
            </View>
            <View className="flex-sub text-center" onClick={() => href(page_path.cart)}>
              <View><Icon type="cart_fill_light" size="36" /></View>
              <View className="text-xs">购物车</View>
            </View>
          </View>
          <View className="flex-sub flex margin-right-sm">
            <View className="flex-sub">
              <Button look="orange" block onTap={() => setShow(true)}>加入购物车</Button>
            </View>
            <View className="flex-sub margin-left-sm">
              <Button look="anna" block onTap={() => href(page_path.order_submit)}>立即购买</Button>
            </View>
          </View>
        </View>
      </View>
      {show && (
        <Popup
          position="bottom"
          closeable
          open={show}
          onClose={() => {
            setShow(false);
          }}
        >
          <View style={{ padding: '48rpx', }} >
            <View className="flex align-center padding-sm">
              <View className="radius" style={{ width: '200rpx', height: '200rpx', overflow: 'hidden' }}>
                <Image style={{ width: '100%', height: '100%' }} src={changeGoods.image} />
              </View>
              <View className="flex-sub margin-left-sm">
                <View className="text-red">
                  <Text className="text-price text-xl">{goodsInfo.newPrice}</Text>
                </View>
              </View>
            </View>

            <View className="flex align-center padding-sm">
              <View className="flex-sub">数量</View>
              <View>
                <Stepper min={1} value={num} onChange={(val: any) => setNum(val)} />
              </View>
            </View>
            {/* sku */}
            <View className="margin-tb-sm">
              {goodsInfo.sku.map((item, index) => {
                return (
                  <View key={index} className="margin-bottom-sm">
                    <View>
                      <Text className="text-bold text-black">{item.key}</Text>
                    </View>
                    <View className="margin-top-sm">
                      <Tag size="large" plain> {item.value}</Tag>
                    </View>
                  </View>
                )
              })}
            </View>
            {/* sku 结束 */}

            <View className="flex">
              <View className="flex-sub">
                <Button look="orange" block onTap={() => { appendCart(); setShow(false) }}>加入购物车</Button>
              </View>
              <View className="flex-sub margin-left-sm">
                <Button look="anna" block onTap={() => toast("立即购买")}>立即购买</Button>
              </View>
            </View>
          </View>
        </Popup>
      )}

      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
