import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Grid } from 'anna-remax-ui';

import './index.less';
import { href } from '@/utils/common'
import SearchModel from '@/components/search_model/index';
import SwiperModel from '@/components/swiper_model/index';
import PageLoading from '@/components/page_loading';
import GroupTitle from '@/components/group_title/index';
import GoodsModel from '@/components/goods_model/index';
import page_path from '@/utils/page_path';
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [banners] = useState([
    'https://www.thorui.cn/h5/static/images/mall/banner/1.jpg',
    'https://www.thorui.cn/h5/static/images/mall/banner/2.jpg',
    'https://www.thorui.cn/h5/static/images/mall/banner/3.jpg',
    'https://www.thorui.cn/h5/static/images/mall/banner/4.jpg',
  ])
  const [grid] = useState(['#FFDDDD', '#FFFFCC', '#FFDDDD', '#FFFFCC', '#FFDDDD', '#FFFFCC'])
  const [items] = useState([
    {
      images: 'https://www.thorui.cn/h5/static/images/mall/product/2.jpg',
      title: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
      newPrice: '11',
      originalPrice: '79',
    },
    {
      images: 'https://www.thorui.cn/h5/static/images/mall/product/2.jpg',
      title: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
      newPrice: '22',
      originalPrice: '79',
    },
    {
      images: 'https://www.thorui.cn/h5/static/images/mall/product/2.jpg',
      title: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
      newPrice: '33',
      originalPrice: '79',
    },
    {
      images: 'https://www.thorui.cn/h5/static/images/mall/product/2.jpg',
      title: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
      newPrice: '44',
      originalPrice: '79',
    },
    {
      images: 'https://www.thorui.cn/h5/static/images/mall/product/2.jpg',
      title: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
      newPrice: '55',
      originalPrice: '79',
    }
  ])
  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  const renderGridItem = (col: any, index?: number) => (
    <View className="text-center" style={{ backgroundColor: col }}>
      {index}
    </View>
  );
  return (
    <View className="app">
      <View className="padding-bottom-sm">
        {/* 搜索栏 */}
        <View className="searchFixed">
          <SearchModel text='搜索' color="#28a745" searchFun={() => href(page_path.home)} sortFun={() => href(page_path.home)} />
        </View>
        {/* 搜索栏 结束 */}

        {/* 轮播图 */}
        <View>
          <SwiperModel items={banners} autoplay={true} indicatorDots={true} indicatorColor="#ffffff" indicatorActiveColor="#28a745" />
        </View>
        {/* 轮播图 结束 */}

        {/* 分类导航 */}
        <View className="bg-white">
          <Grid data={grid} columns={4}>
            {renderGridItem}
          </Grid>
        </View>
        {/* 分类导航 结束 */}

        {/* 热门推荐 */}
        <View className="bg-white">
          <GroupTitle text="热门推荐" icon={true} />
          <View className="product-list">
            <View className="product-container">
              {items.map((item, index) => {
                return (
                  ((index + 1) % 2 != 0) && (
                    <GoodsModel key={index} item={item} />
                  )
                )
              })}
            </View>
            <View className="product-container">
              {items.map((item, index) => {
                return (
                  ((index + 1) % 2 === 0) && (
                    <GoodsModel key={index} item={item} />
                  )
                )
              })}
            </View>
          </View>
        </View>
        {/* 热门推荐 结束 */}
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="90rpx" />
      )
      }
    </View >
  );
};
