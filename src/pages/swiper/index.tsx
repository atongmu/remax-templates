import React, { useEffect, useState } from 'react';
import { View, Text, Video } from 'remax/wechat';
import { Card, Button, Icon, Steps } from 'anna-remax-ui';
import SwiperModel from '@/components/swiper_model/index';
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [banners, setBanners] = useState<any[]>([])

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
      <SwiperModel items={banners} autoplay={true} indicatorDots={true} indicatorColor="#ffffff" indicatorActiveColor="#28a745" />
    </View>
  );
};
