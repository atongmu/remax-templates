import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Card, Selector } from 'anna-remax-ui';

import './index.less';
import { href } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import { getSorts } from '@/api/index'
import SortModel from '@/components/sort_model';

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [selector, setSelector] = useState<{ value: Array<any>, valueStr: any }>({
    value: [],
    valueStr: null,
  })
  const [ReturnDeliveryWay, setReturnDeliveryWay] = useState<any[]>([])

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const sortResult: any = await getSorts()
    if (sortResult.status === 200) {
      setReturnDeliveryWay(sortResult.data)
    }
    setLoading(false)
  }
  const handleChange = (value: any, valueStr: any) => {
    setSelector({
      value,
      valueStr,
    });
  };
  return (
    <View className="app">
      <View className="sort">
        <SortModel options={ReturnDeliveryWay} value={selector.value} />
      </View>
      {isLoading && (
        <PageLoading />
      )}
    </View>
  );
};
