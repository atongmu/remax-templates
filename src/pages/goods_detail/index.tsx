import React, { useEffect, useState } from 'react';
import { View, Text, Image, Swiper, SwiperItem, getSystemInfo, getStorageSync, setStorageSync, reLaunch } from 'remax/wechat';
import { Stepper, Popup, Button, Icon, Tag } from 'anna-remax-ui';

import './index.less';
import { href } from '@/utils/common'
import page_path from '@/utils/page_path';
import GroupTitle from '@/components/group_title';
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
  const [show, setShow] = useState(false)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [scrollH, setScrollH] = useState<number>(0)
  const [changeGoods, setChangeGoods] = useState<GoodsSku>({
    key: '1',
    value: '1',
    image: '/image/mall/banner/11.jpg'
  })
  const [num, setNum] = React.useState(1);
  const [goodsInfo, setGoodsInfo] = useState<Info>({
    id: 0,
    banners: [
      { image: '/image/mall/banner/11.jpg' },
      { image: '/image/mall/banner/33.jpg' },
      { image: '/image/mall/banner/55.jpg' },
    ],
    title: '谈判官明星同款耳坠韩国气质简约显脸瘦的耳环女百搭个性长款耳钉 个性水滴耳环【A2】',
    pack: false,
    newPrice: '99.00',
    originalPrice: '199.00',
    content: '内容',
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
    setScrollH(windowWidth)
  }
  const appendCart = () => {
    const cartItems = getStorageSync("cart")
    let goodsList = []
    if (cartItems) {
      goodsList = JSON.parse(cartItems)
      let inLine = false
      for (const item of goodsList) {
        if (item.id === goodsInfo.id && item.changeGoods.key === changeGoods.key) {
          item.num += num
          inLine = true
          break;
        }
      }
      if (inLine) {
        setStorageSync("cart", JSON.stringify(goodsList))
        return
      }
    }
    const goods = [{
      id: goodsInfo.id,
      name: goodsInfo.title,
      newPrice: goodsInfo.newPrice,
      sku: goodsInfo.sku,
      changeGoods: changeGoods,
      num: num,
      checked: true,
      show: false
    }]
    const storageGoods = JSON.stringify(goodsList.concat(goods))
    setStorageSync("cart", storageGoods)
  }
  // 收藏
  const packChange = () => {
    const info = Object.assign({}, goodsInfo)
    info.pack = !goodsInfo.pack
    setGoodsInfo(e => info)
  }

  return (
    <View className="goods-info">
      {/* <View style={{ position: 'relative' }}>
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
      </View> */}
      <View>
        <View className="flex align-center padding-sm bg-white">
          <View className="flex-sub">
            <Text className="text-price text-red">
              <Text className="text-bold text-xxl">{goodsInfo.newPrice}</Text>
            </Text>
            <Text className="text-price text-through padding-left-sm">{goodsInfo.originalPrice}</Text>
          </View>
          <View className="text-center" onClick={packChange}>
            <View>
              {goodsInfo.pack ? (<Icon type="like" color="red" />) : (<Icon type="like" />)}
            </View>
            <View className={`text-sm ${goodsInfo.pack && 'text-red'}`}>收藏 </View>
          </View>
        </View>
        <View className="flex align-center padding-left-sm bg-white">
          <View className="flex-sub margin-right-sm">
            {goodsInfo.title}
          </View>
          <button open-type="share" className="contact">
            <View style={{ padding: '10rpx 6rpx 10rpx 20rpx', borderRadius: '50rpx 0 0 50rpx', backgroundColor: 'rgba(0,0,0,.1)' }}>
              <Icon type="share_light" /> 分享
          </View>
          </button>
        </View>
        <View className="text-gray  flex align-center padding-sm bg-white">
          <View className="flex-sub">快递：{goodsInfo.delivery}</View>
          <View className="flex-sub">月销:{goodsInfo.sales}</View>
          <View className="flex-sub">{goodsInfo.city}</View>
        </View>
        <View className="radius bg-white margin-tb-sm" style={{ display: 'none' }}>
          <View className="padding-sm solid-bottom">
            <View className="flex align-center">
              <View><Text className="text-bold text-black">已选</Text></View>
              <View className="flex-sub margin-lr-sm">{changeGoods.value}</View>
              <View onClick={() => setShow(true)}><Icon type="more" size="36" /></View>
            </View>
          </View>
          <View className="padding-sm solid-bottom">
            <View className="flex align-center">
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
        <View className="padding-sm bg-white" style={{ display: 'none' }}>
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
          <View className="padding-tb-sm">
            <GroupTitle text="详情" icon={false} />
          </View>
          <View className="bg-white padding-sm">
            <Text>{goodsInfo.content}</Text>
          </View>
        </View>
        <View className="safearea-bottom"></View>
      </View>

      <View className="bg-white padding-tb-xs solid-top foot">
        <View className="flex align-center padding-env">
          <View className="flex-sub flex">
            {/* <View className="flex-sub text-center" onClick={() => reLaunch({ url: page_path.home })}> */}
            <View className="flex-sub text-center" onClick={() => toast('首页')}>
              <View><Icon type="home_light" size="36" color="#8799a3" /></View>
              <View className="text-xs">首页</View>
            </View>
            <View className="flex-sub text-center" onClick={() => toast("客服")}>
              <button open-type="contact" className="contact">
                <View><Icon type="service_light" size="36" color="#8799a3" /></View>
                <View className="text-xs">客服</View>
              </button>
            </View>
            <View className="flex-sub text-center" onClick={() => toast('按钮')}>
              <View><Icon type="cart_light" size="36" color="#8799a3" /></View>
              <View className="text-xs">按钮</View>
            </View>
          </View>
          <View className="flex-sub flex margin-right-sm">
            <View className="flex-sub">
              <Button look="orange" block onTap={() => setShow(true)}>按钮</Button>
            </View>
            <View className="flex-sub margin-left-sm">
              <Button look="anna" block onTap={() => toast('按钮')}>按钮</Button>
            </View>
          </View>
        </View>
      </View>
      {
        show && (
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
                  <Button look="orange" block onTap={() => { appendCart(); setShow(false) }}>按钮</Button>
                </View>
                <View className="flex-sub margin-left-sm">
                  <Button look="anna" block onTap={() => toast("按钮")}>按钮</Button>
                </View>
              </View>
            </View>
          </Popup>
        )
      }

    </View >
  );
};
