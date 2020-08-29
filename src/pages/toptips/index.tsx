import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Card, Selector, Button } from 'anna-remax-ui';
import Toptips from '@/components/toptips_model';

export default () => {
  const [show, setShow] = useState(false)
  return (
    <View>
      <Toptips show={show} type="error" msg={"顶部消息"} />
      <View className="margin-top-xl padding-sm">
        type:'info' | 'error' | 'success'
      </View>
      <View className="foot padding-env">
        <Button block onTap={() => setShow(!show)} >显示</Button>
      </View>
    </View>
  );
};
