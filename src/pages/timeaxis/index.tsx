import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Card, Button, Icon, Steps } from 'anna-remax-ui';

import { href } from '@/utils/common'
import page_path from '@/utils/page_path';

export default () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View>
      <Card>
        <View className="padding-sm solid-bottom">
          <Text>订单编号：</Text><Text>9136257866</Text>
        </View>
        <View className="padding-sm solid-bottom">
          <Text>国内承运人：</Text><Text>华南众包站</Text>
        </View>
      </Card>
      <View className="padding-xl">
        <Steps
          direction="vertical"
          steps={[
            {
              title: '报价成功',
            },
            {
              title: '询价中',
            },
            {
              title: '待处理',
            },
          ]}
        />
      </View>
    </View>
  );
};
