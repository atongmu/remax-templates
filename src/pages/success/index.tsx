import React from 'react';
import { View, reLaunch } from 'remax/wechat';
import { Card, Button, Result } from 'anna-remax-ui';

import styles from './index.css';
import { href, toast } from '@/utils/common'
import page_path from '@/utils/page_path';

export default () => {
  return (
    <View className={styles.app}>
      <Card>
        <Result
          height="600rpx"
          status="success"
          title="成功"
          subTitle="非常感谢"
          extra={
            <View>
              <Button plain onTap={() => toast("返回首页")}>返回首页</Button>
            </View>
          }
        />
      </Card>
      <View className="padding-xl">
        <View className="padding-tb-xs">温馨提示:</View>
        <View className="text-gray">请勿泄露银行卡号、手机验证码，否则会造成钱款损失！谨防电话诈骗！</View>
      </View>
    </View>
  );
};
