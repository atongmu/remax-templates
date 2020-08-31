import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Card, Button } from 'anna-remax-ui';

import InputModel from '@/components/input_model';
import CheckboxModel from '@/components/checkbox_model';
import SwitchModel from '@/components/switch_model';
import useTimeout from '@/hooks/useTimeout'
import useChange from '@/hooks/useChange'
import useToggle from '@/hooks/useToggle'

export default () => {
  const [inputValue, setInputValue] = useState('')
  const userName = useChange('')
  const [enable, toggleEnable] = useToggle()
  const [disabled, start] = useTimeout(5000)

  return (
    <View className="padding-sm">
      <Card>
        <View className="solid-bottom">
          <InputModel {...userName.bindEvent} placeholder="请输入" />
        </View>
        <View className="solid-bottom">
          <InputModel label="对齐：" placeholder="请输入" align="center" />
        </View>
        <View className="solid-bottom">
          <InputModel label="金额：" placeholder="请输入" extra="元" />
        </View>
        <View className="solid-bottom">
          <InputModel label="必填：" placeholder="请输入" required />
        </View>
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
            checked={Boolean(enable)}
            onChange={()=>toggleEnable()}
            extra={<Text >开关</Text>
            } />
        </View>
      </Card>
      <View className="padding-sm">
        <Button type="primary" look="secure" loading={Boolean(disabled)} block onTap={() => start()}>添加</Button>
      </View>
    </View>
  );
};
