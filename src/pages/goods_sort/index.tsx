import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'remax/wechat';
import { Icon } from 'anna-remax-ui';

import './index.less';
import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import SearchModel from '@/components/search_model/index';
import { getSorts } from '@/api/index'


export interface OptionProps {
  key: string;
  value: string;
  image: string;
  children?: OptionProps[];
}
let currentParent: any = null;
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [ReturnDeliveryWay, setReturnDeliveryWay] = useState<any[]>([])
  const [activeParent, setActiveParent] = useState('');
  const [childrenData, setChildrenData] = useState<OptionProps[]>([]);

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const sortResult: any = await getSorts()
    if (sortResult.status === 200) {
      setReturnDeliveryWay(sortResult.data)
      const data = sortResult.data[0].children || [];
      currentParent = sortResult.data[0];
      setActiveParent(currentParent.key);
      setChildrenData(data);
    }
    setLoading(false)
  }

  const handleClickParentOption = (option: OptionProps) => {
    const data = option.children || [];
    currentParent = option;
    setChildrenData(data);
    setActiveParent(option.key);
  };

  return (
    <View className="app">
      <View className="nav fixed">
        <SearchModel text='搜索' showSort={false} color="#28a745" searchFun={() => toast("搜索")} sortFun={() => toast("分类")} />
      </View>
      <View className="goods-sort">
        <View className="sort-left">
          <ScrollView scrollY={true} style={{ height: '100%' }}>
            {ReturnDeliveryWay.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`sort-item ${activeParent === item.key && 'active'}`}
                  onClick={() => handleClickParentOption(item)}
                >
                  {item.value}
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View className="sort-right">
          <ScrollView scrollY={true} style={{ height: '100%' }} enableBackToTop>
            {childrenData.map((item, index) => {
              return (
                <View
                  key={index}
                  className="solid-bottom"
                  onClick={() => console.log(item)}
                >
                  <View className="flex align-center padding-tb-xs">
                    <View style={{ width: '160', height: '160' }} onClick={()=>toast("详情")}>
                      <Image className="image" src={item.image} mode="widthFix" />
                    </View>
                    <View className="flex-sub margin-left-xs">
                      <View className="title">{item.value}</View>
                      <View className="margin-tb-sm flex align-center justify-end">
                        <View className="flex-sub">
                          <Text className="text-red text-price text-lg">100</Text>
                        </View>
                        <View className="round bg-green light padding-xs" style={{ lineHeight: 1 }}>
                          <Icon type="cart" size="36" color="#39b54a" />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
