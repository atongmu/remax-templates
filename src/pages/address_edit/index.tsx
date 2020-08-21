import React, { useEffect, useState } from 'react';
import { View, Text, Switch } from 'remax/wechat';
import { Card, Button, Input, Cell } from 'anna-remax-ui';

import { href } from '@/utils/common'

export default () => {
  const [isDetail, setDetail] = useState(true)

  return (
    <View className="padding-sm">
      <Card>
        <View className="padding-bottom-sm">
          <Input label="收货人" placeholder="Please enter" />
          <Input label="手机号" placeholder="Please enter" />
          <Cell label="所在城市" valueStyle={{ display: 'flex', justifyContent: 'flex-end', }} arrow>
            <Text className="text-gray">选择城市</Text>
          </Cell>
          <Input label="收货地址" placeholder="Please enter" />
          <Cell label="设为默认地址" valueStyle={{ display: 'flex', justifyContent: 'flex-end', }} >
            <Switch checked={isDetail} onChange={v => setDetail(!v)} />
          </Cell>
        </View>
      </Card>
    </View>
  );
};
