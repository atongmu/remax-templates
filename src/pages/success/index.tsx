import React, { useEffect, useState } from 'react';
import { View, reLaunch } from 'remax/wechat';
import { Card, Button, Icon } from 'anna-remax-ui';

import styles from './index.css';
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
    <View className={styles.app}>
      <Card>
        <View className="padding-bottom-sm">
          <View className="text-center">
            <Icon type="evaluate" size="120" color="#28a745" />
          </View>
          <View className="margin-top">
            <View className="text-xxl">订单已支付成功</View>
            <View className="text-gray padding-tb-xs">非常感谢您购买我们的产品</View>
          </View>
          <View className="flex margin-top">
            <View className="flex-sub padding-lr-sm">
              <Button block plain onTap={() => reLaunch({ url: page_path.mall })}>返回首页</Button>
            </View>
            <View className="flex-sub padding-lr-sm">
              <Button type="primary" danger square block onTap={() => href(page_path.order_list)}>查看订单</Button>
            </View>
          </View>
        </View>
      </Card>
      <View className="padding-xl">
        <View className="padding-tb-xs">温馨提示:</View>
        <View className="text-gray">付款成功后，请勿泄露银行卡号、手机验证码，否则会造成钱款损失！谨防电话诈骗！</View>
      </View>
    </View>
  );
};
