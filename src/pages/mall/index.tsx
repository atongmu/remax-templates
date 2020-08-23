import React, { useEffect, useState } from 'react';
import { View, Image } from 'remax/wechat';
import { Grid } from 'anna-remax-ui';

import './index.less';
import { href } from '@/utils/common'
import SearchModel from '@/components/search_model/index';
import SwiperModel from '@/components/swiper_model/index';
import PageLoading from '@/components/page_loading';
import GroupTitle from '@/components/group_title/index';
import GoodsModel from '@/components/goods_model/index';
import CategoryModel from '@/components/category_model/index';
import TabBar from '@/components/tab_bar';
import page_path from '@/utils/page_path';

import { getBanners, getCategorys, getProducts } from '@/api/index'


export default () => {
  const [isLoading, setLoading] = useState(true)
  const [banners, setBanners] = useState([])
  const [ategorys, setAtegorys] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const bannerResult: any = await getBanners()
    const categoryResult: any = await getCategorys()
    const productResult: any = await getProducts({})
    if (bannerResult.status === 200) {
      setBanners(bannerResult.data)
    }
    if (categoryResult.status === 200) {
      setAtegorys(categoryResult.data)
    }
    if (productResult.status === 200) {
      setItems(productResult.data)
    }
    setLoading(false)
  }
  return (
    <View className="app">
      <View className="padding-bottom-sm">
        {/* 搜索栏 */}
        <View className="searchFixed">
          <SearchModel text='搜索' showSort={true} color="#28a745" searchFun={() => href(page_path.search)} sortFun={() => href(page_path.sort)} />
        </View>
        {/* 搜索栏 结束 */}

        {/* 轮播图 */}
        <View>
          <SwiperModel items={banners} autoplay={true} indicatorDots={true} indicatorColor="#ffffff" indicatorActiveColor="#28a745" />
        </View>
        {/* 轮播图 结束 */}

        {/* 分类导航 */}
        <View >
          <CategoryModel items={ategorys} detail={() => console.log(ategorys)} />
        </View>
        {/* 分类导航 结束 */}

        {/* 热门推荐 */}
        <View>
          <View className=" padding-tb">
            <GroupTitle text="热门推荐" icon={false} />
          </View>
          <View className="product-list">
            <View className="product-container">
              {items.map((item, index) => {
                return (
                  ((index + 1) % 2 != 0) && (
                    <GoodsModel key={index} item={item} detail={() => href(page_path.goods_info)} />
                  )
                )
              })}
            </View>
            <View className="product-container">
              {items.map((item, index) => {
                return (
                  ((index + 1) % 2 === 0) && (
                    <GoodsModel key={index} item={item} detail={() => href(page_path.goods_info)} />
                  )
                )
              })}
            </View>
          </View>
        </View>
        {/* 热门推荐 结束 */}
        {/* 底部导航 */}
        <View className="bar">
          <TabBar items={[
            { image: 'http://dummyimage.com/200x200', title: '首页', path: `/pages/mall/index` },
            { image: 'http://dummyimage.com/200x200', title: '购物车', path: `/pages/cart/index` },
            { image: 'http://dummyimage.com/200x200', title: '我的', path: `/pages/my/index` },
          ]} />
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
