import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Card, Button, Tabs } from 'anna-remax-ui';

import './index.less';
import { href } from '@/utils/common'
import { getOrders } from '@/api/index'
import PageLoading from '@/components/page_loading';
import OrderModel from '@/components/order_model';
import { toast } from '../../utils/common';
import page_path from '@/utils/page_path';
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [stateKey, setStateKey] = React.useState(0);
  const [items, setItems] = useState<any[]>([])
  const [tabs] = useState([
    {
      key: 0,
      title: '全部'
    },
    {
      key: 1,
      title: '待付款'
    },
    {
      key: 2,
      title: '待发货'
    },
    {
      key: 3,
      title: '待收货'
    },
    {
      key: 4,
      title: '待评论'
    }
  ])

  useEffect(() => {
    const setFun = setTimeout(() => {
      getData()
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  const getData = async () => {
    const result: any = await getOrders({})
    setItems(items => items.concat(result.data))
  }
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
  return (
    <View className="order_list" style={{ paddingTop: '90rpx' }}>
      {isLoading ? (
        <PageLoading color="#28a745" topVal="0" />
      ) : (
          <Tabs type="plain" fixed={true} onTabClick={({ key }) => setStateKey(key)} activeKey={stateKey}>
            {tabs.map(tab => (
              <Tabs.TabContent key={tab.key} tab={tab.title}>
                <View>
                  {items.map((item, index) => (
                    <View className="bg-white margin-bottom-sm" key={index}>
                      <View className="flex padding-sm solids-bottom">
                        <View className="flex-sub">订单号：{item.id}</View>
                        <View className="text-gray">{filterStatus(item.status)}</View>
                      </View>
                      <View className="solid-bottom padding-sm" onClick={() => href(page_path.order_detail)}>
                        {item.products.map((li: any) => (
                          <OrderModel key={li.id} item={li} detail={() => console.log(li)} />
                        ))}
                      </View>
                      <View className="text-right padding-sm">
                        <View>
                          共计商品 {item.products.length} 合计：<Text className="text-price">11</Text>
                        </View>
                        <View className="padding-top-sm">
                          <Button size="small" onTap={() => toast("再次购买")}>再次购买</Button>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </Tabs.TabContent>
            ))}
          </Tabs>
        )}
    </View>
  );
};
