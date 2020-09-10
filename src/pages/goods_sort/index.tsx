import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView } from 'remax/wechat';
import { Grid } from 'anna-remax-ui';

import './index.less';
import { href } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import { getSorts } from '@/api/index'


export interface OptionProps {
  key: string;
  value: string;
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
      <View className="goods-sort">
        <View className="sort-left">
          <ScrollView scrollY={true} style={{ height: '100%' }} onScrollToLower={() => console.log('onScrollToLower')} >
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
          <ScrollView scrollY={true} style={{ height: '100%' }}>
            {childrenData.map((item, index) => {
              return (
                <View
                  key={index}
                  className="sort-item"
                  onClick={() => console.log(item)}
                >
                  {item.value}
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
