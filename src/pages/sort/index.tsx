import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Card, Selector } from 'anna-remax-ui';

import styles from './index.css';
import { href } from '@/utils/common'
import { getSorts } from '@/api/index'

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
      setSelector(sortResult.data)
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
    <View className={styles.app}>
      <Selector options={ReturnDeliveryWay} onChange={handleChange} value={selector.value} />
    </View>
  );
};
