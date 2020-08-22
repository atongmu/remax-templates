import React from 'react';
import { View } from 'remax/wechat';
import { Card, Button } from 'anna-remax-ui';

import { href } from '@/utils/common'

export default () => {
  return (
    <View className="padding-sm">
      <Card>
        <View className="padding-bottom-sm">
          <Button look="secure" block onTap={() => href(``)}>物料管理</Button>
        </View>
        <View className="padding-bottom-sm">
          <Button look="secondary" block onTap={() => href(``)}>添加物料</Button>
        </View>
        <View className="padding-bottom-sm">
          <Button look="anna" block onTap={() => href(``)}>退出</Button>
        </View>
      </Card>
    </View>
  );
};
