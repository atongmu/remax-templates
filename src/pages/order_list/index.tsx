import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Card,  Button } from 'anna-remax-ui';

import './index.less';
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
  const init = () => {
    
  }
  return (
    <View>
      
    </View>
  );
};
