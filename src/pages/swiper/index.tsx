import React, { useEffect, useState } from 'react';
import { View, } from 'remax/wechat';
import SwiperModel from '@/components/swiper_model/index';
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [banners, setBanners] = useState<any[]>([])
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
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
    }, 500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View className="swiper-container">
      <View>
        <SwiperModel items={banners} autoplay={true} indicatorDots={true} indicatorColor="#ffffff" indicatorActiveColor="#28a745" />
      </View>
    </View>
  );
};
