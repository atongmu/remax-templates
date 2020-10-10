import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from 'remax/wechat';
import { Button } from 'anna-remax-ui';
import { deepClone } from '@/utils/util'
import { usePageEvent } from 'remax/macro';
import { href } from '@/utils/common'
import LoadingModel from '@/components/loading_model';
import OrderModel from '@/components/order_model';
import NavModel from '@/components/nar_model';
import useData from '@/hooks/useData'
import { toast } from '../../utils/common';
import page_path from '@/utils/page_path';
import './index.less';

export default () => {
  const [params, setParams] = useState({
    page_no: 1,
    page_size: 20,
    active: 0,
  })
  const [navItems] = useState(['全部', '待付款', '待发货', '待收货', '待评论'])
  const { pageStatus, empty, hasMore, list, load, clean } = useData<any>({
    url: '/order_list',
    method: 'GET'
  })
  useEffect(() => {
    const new_page = deepClone(params)
    load(new_page);
  }, [params])
  usePageEvent('onReachBottom', () => {
    if (pageStatus && hasMore) {
      setParams({ ...params, page_no: params.page_no + 1 })
    }
  });
  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      const new_params = deepClone(params)
      clean()
      setParams({ ...new_params, page_no: 1 })
      toast('刷新成功')
      resolve();
    })
  });
  const filterStatus = (e: number) => {
    let text = ''
    switch (e) {
      case 1:
        text = '待付款'
        break;
      case 2:
        text = '待发货'
        break;
      case 3:
        text = '待收货'
        break;
      case 4:
        text = '待评论'
        break;
      case 5:
        text = '完成'
        break;
    }
    return text
  }
  const Loading = useMemo(() => <LoadingModel isLoading={hasMore} empty={empty} />, [hasMore]);
  return (
    <View className="order_list" style={{ paddingTop: '90rpx' }}>
      <View className="nav fixed">
        <NavModel className="text-green" active={params.active} items={navItems} detail={(o: number) => {
          clean()
          setParams({ ...params, page_no: 1, active: o })
        }} />
      </View>
      <View>
        {list.map((item, index) => (
          <View className="bg-white margin-bottom-sm" key={index}>
            <View className="flex padding-sm solids-bottom">
              <View className="flex-sub">单号：{item.id}</View>
              <View className="text-gray">{filterStatus(item.status)}</View>
            </View>
            <View className="solid-bottom padding-sm" onClick={() => href(page_path.order_detail)}>
              {item.products.map((li: any) => (
                <OrderModel key={li.id} item={li} detail={() => console.log(li)} />
              ))}
            </View>
            <View className="text-right padding-sm">
              <View>
                共计 {item.products.length} 合计：<Text className="text-price">11</Text>
              </View>
              <View className="padding-top-sm">
                <Button size="small" onTap={() => toast("按钮")}>按钮</Button>
              </View>
            </View>
          </View>
        ))}
      </View>
      {Loading}
    </View>
  );
};
