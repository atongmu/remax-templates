import React, { useEffect, useState } from 'react';
import { View } from 'remax/one';
import { Card, Button } from 'anna-remax-ui';

import InputModel from '@/components/input_model';

export default () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <View className="padding-sm">
      <Card>
        <View>
          <InputModel label="手机号" placeholder="请输入"
            value={inputValue}
            onInput={(e) => setInputValue(o => e.target.value)}
            extra={
              <Button type="primary" size="small">
                获取验证码
            </Button>
            } />
        </View>
      </Card>
      <View className="padding-sm">
        <Button type="primary" look="secure" block>添加</Button>
      </View>
    </View>
  );
};
