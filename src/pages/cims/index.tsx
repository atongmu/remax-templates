import React from 'react';
import { View } from 'remax/wechat';
import { Card, Button } from 'anna-remax-ui';

import { href } from '@/utils/common'
import page_path from '@/utils/page_path';

export default () => {
  return (
    <View className="padding-sm">
      <Card>
        <View className="padding-bottom-sm">
          <Button look="secure" block onTap={() => href(page_path.materials)} size="large">物料管理</Button>
        </View>
        <View className="padding-bottom-sm">
          <Button look="secondary" block onTap={() => href(page_path.materials_edit)} size="large">添加物料</Button>
        </View>
      </Card>
    </View>
  );
};
