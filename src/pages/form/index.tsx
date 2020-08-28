import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Card, Button } from 'anna-remax-ui';

import InputModel from '@/components/input_model';
import CheckboxModel from '@/components/checkbox_model';
import SwitchModel from '@/components/switch_model';

export default () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <View className="padding-sm">
      <Card>
        <View className="solid-bottom">
          <InputModel label="手机号：" placeholder="请输入"
            border={false}
            value={inputValue}
            onInput={(e) => setInputValue(o => e.target.value)}
            extra={
              <Button type="primary" size="small">
                获取验证码
            </Button>
            } />
        </View>
        <View className="solid-bottom">
          <CheckboxModel
            value={inputValue}
            extra={<Text >选中</Text>
            } />
        </View>
        <View className="solid-bottom">
          <SwitchModel
            extra={<Text >开关</Text>
            } />
        </View>
      </Card>
      <View className="padding-sm">
        <Button type="primary" look="secure" block>添加</Button>
      </View>
    </View>
  );
};
