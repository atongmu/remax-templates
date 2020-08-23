import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Card, Button, Input } from 'anna-remax-ui';

import styles from './index.css';
import { href } from '@/utils/common'

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
    <View className="padding-sm">
      <Card >
        <View>
          <Input label="手机号：" placeholder="请输入手机号" />
        </View>
        <View>
          <Input
            label="验证码："
            placeholder="请输入验证码"
            border={false}
            extra={
              <Button type="primary" size="small">
                获取验证码
            </Button>
            }
          />
        </View>
      </Card>
      <View className="margin-top">
        <Button block look="secure">登录</Button>
      </View>
    </View>
  );
};
