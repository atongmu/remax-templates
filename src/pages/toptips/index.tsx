import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Card, Selector, Button } from 'anna-remax-ui';
import Toptips from '@/components/toptips_model';
import useTimeout from '@/hooks/useTimeout'

export default () => {
  const [show, setShow] = useState(false)
  const [ready, start] = useTimeout(5000)
  useEffect(() => {
    console.log(ready)
  }, [ready])
  return (
    <View>
      <Toptips show={show} type="error" msg={"顶部消息"} />
      <View className="margin-top-xl padding-sm">
        type:'info' | 'error' | 'success'
      </View>
      <View className="foot padding-env">
        <Button disabled={false} block onTap={() => { setShow(() => true); console.log(show); }} bindhide={() => { setShow(() => false); console.log(show) }} >显示</Button>
      </View>
    </View>
  );
};
