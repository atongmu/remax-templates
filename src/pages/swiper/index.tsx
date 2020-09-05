import React, { useEffect, useState } from 'react';
import { View, Text, Image, Swiper, SwiperItem, getSystemInfo } from 'remax/wechat';
import { Card, Button, Icon } from 'anna-remax-ui';
import SwiperModel from '@/components/swiper_model/index';
export default () => {
  const [scrollH, setScrollH] = useState<number>(0)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [banners, setBanners] = useState<any[]>([])
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const { windowWidth } = await getSystemInfo()
    setScrollH(windowWidth)
    setLoading(false)
  }
  useEffect(() => {
    const setFun = setTimeout(() => {
      setBanners([
        { id: 1, image: '/image/mall/banner/1.jpg' },
        { id: 2, image: '/image/mall/banner/2.jpg' },
        { id: 3, image: '/image/mall/banner/3.jpg' },
      ])
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View className="swiper-container">
      <View>
        <SwiperModel items={banners} autoplay={true} indicatorDots={true} indicatorColor="#ffffff" indicatorActiveColor="#28a745" />
      </View>

      <View className="margin-top">
        <Swiper autoplay={true} circular={true} onChange={(e) => setBannerIndex(e.detail.current)} style={{ height: `${scrollH * 2}` }}>
          {banners.map((item, index) => (<SwiperItem key={index}>
            <Image src={item.image} style={{ width: "100%", height: "100%" }} />
          </SwiperItem>)
          )}
        </Swiper>
      </View>
    </View>
  );
};
