import React, { useState } from 'react';
import { View } from 'remax/wechat';
import { Card, Button, Input } from 'anna-remax-ui';

import { toast } from '@/utils/common'

export default () => {
  const [name, setName] = useState('')

  return (
    <View className="padding-sm">
      <Card>
        <View className="padding-bottom-sm">
          <Input label="物料名称" placeholder="请填写物料名称" value={name} onChange={(e) => setName(name => e.target.value)} />
        </View>
        <View className="padding-bottom-sm">
          <Button look="secondary" block onTap={() => { setName(''); toast('添加成功') }}>添加物料</Button>
        </View>
      </Card>
    </View>
  );
};
