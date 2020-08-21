import React from 'react';
import { View, reLaunch } from 'remax/wechat';
import { Card, Button, Result } from 'anna-remax-ui';

import styles from './index.css';
import { href } from '@/utils/common'
import page_path from '@/utils/page_path';

export default () => {
  return (
    <View className={styles.app}>
      <Card>
        <Result
          height="600rpx"
          status="success"
          title="订单已支付成功"
          subTitle="非常感谢您购买我们的产品"
          extra={
            <View>
              <Button danger square bloc style={{ marginRight: '24px' }} onTap={() => href(page_path.order_list)}>
                查看订单
              </Button>
              <Button plain onTap={() => reLaunch({ url: page_path.mall })}>返回首页</Button>
            </View>
          }
        />
      </Card>
      <View className="padding-xl">
        <View className="padding-tb-xs">温馨提示:</View>
        <View className="text-gray">付款成功后，请勿泄露银行卡号、手机验证码，否则会造成钱款损失！谨防电话诈骗！</View>
      </View>
    </View>
  );
};
