import React, { useEffect, useState } from 'react';
import { View, Image } from 'remax/wechat';
import { Grid } from 'anna-remax-ui';

import './index.less';
import { href, toast } from '@/utils/common'
import SearchModel from '@/components/search_model/index';
import SwiperModel from '@/components/swiper_model/index';
import PageLoading from '@/components/page_loading';
import GroupTitle from '@/components/group_title/index';
import GoodsModel from '@/components/goods_model/index';
import CategoryModel from '@/components/category_model/index';
import TabBar from '@/components/tab_bar';
import page_path from '@/utils/page_path';
import { getCategorys, getProducts } from '@/api/index'


export default () => {
  const [isLoading, setLoading] = useState(true)
  const [banners, setBanners] = useState<any[]>([])
  const [ategorys, setAtegorys] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    setBanners([
      { id: 1, image: '/image/mall/banner/1.jpg' },
      { id: 2, image: '/image/mall/banner/2.jpg' },
      { id: 3, image: '/image/mall/banner/3.jpg' },
    ])
    setAtegorys([
      {
        image: '/image/mall/category/1.jpg',
        title: '短袖T恤'
      },
      {
        image: '/image/mall/category/2.jpg',
        title: '足球'
      },
      {
        image: '/image/mall/category/3.jpg',
        title: '运动鞋'
      },
      {
        image: '/image/mall/category/4.png',
        title: '中老年'
      },
      {
        image: '/image/mall/category/5.png',
        title: '甜美风'
      },
      {
        image: '/image/mall/category/6.jpg',
        title: '鱼尾裙'
      },
      {
        image: '/image/mall/category/7.jpg',
        title: '相机配件'
      },
      {
        image: '/image/mall/category/8.jpg',
        title: '护肤套装'
      },
    ])
    setItems([
      {
        image: '/image/mall/product/1.jpg',
        name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        image: '/image/mall/product/2.jpg',
        name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        image: '/image/mall/product/3.jpg',
        name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
        sale: 299,
        factory: 699,
        payNum: 666
      },
      {
        image: '/image/mall/product/4.jpg',
        name: '百雀羚套装女补水保湿护肤品',
        sale: 1599,
        factory: 2899,
        payNum: 236
      },
      {
        image: '/image/mall/product/5.jpg',
        name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
        sale: 599,
        factory: 899,
        payNum: 2399
      },
      {
        image: '/image/mall/product/6.jpg',
        name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
        sale: 599,
        factory: 899,
        payNum: 2399
      },
      {
        image: '/image/mall/product/1.jpg',
        name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        image: '/image/mall/product/2.jpg',
        name: '德国DMK进口牛奶',
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        image: '/image/mall/product/3.jpg',
        name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
        sale: 299,
        factory: 699,
        payNum: 666
      },
      {
        image: '/image/mall/product/4.jpg',
        name: '百雀羚套装女补水保湿护肤品',
        sale: 1599,
        factory: 2899,
        payNum: 236
      }
    ])
    setLoading(false)
  }
  return (
    <View className="app padding-env">
      <View className="padding-bottom-sm">
        {/* 搜索栏 */}
        <View className="searchFixed">
          <SearchModel text='搜索' showSort={true} color="#28a745" searchFun={() => toast("搜索")} sortFun={() => toast("分类")} />
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
                    <GoodsModel key={index} item={item} detail={() => toast("详情")} />
                  )
                )
              })}
            </View>
            <View className="product-container">
              {items.map((item, index) => {
                return (
                  ((index + 1) % 2 === 0) && (
                    <GoodsModel key={index} item={item} detail={() => toast("详情")} />
                  )
                )
              })}
            </View>
          </View>
        </View>
        <View className="safearea-bottom"></View>
        {/* 热门推荐 结束 */}
        {/* 底部导航 */}
        <View className="bar">
          <TabBar items={[
            { image: '/image/share/icon_wechat.png', title: '首页', path: page_path.mall },
            { image: '/image/tabbar/extend_active.png', title: '篮子', path: page_path.cart },
            { image: '/image/mall/pay/icon_pay_weixin.png', title: '我的', path: page_path.my },
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
