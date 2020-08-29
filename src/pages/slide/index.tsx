import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Card, Button, Icon, Steps } from 'anna-remax-ui';

import { href } from '@/utils/common'
import page_path from '@/utils/page_path';
import SlideModel from '@/components/slide_model';

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [buttons] = useState([{ text: '删除', type: 'warn' }])
  const [list] = useState([
    { id: 1, name: '11', show: false },
    { id: 2, name: '22', show: false },
  ])

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View>
      <Card>
        {list.map((item: any) => (
          <View key={item.id} className="solid-bottom">
            <SlideModel 
            show={item.show} 
            buttons={buttons} 
            extra={
              <View className="padding-sm ">{item.name}</View>
            }
            onShow={()=>console.log(item)}
             />
          </View>
        ))}
      </Card>
    </View>
  );
};
