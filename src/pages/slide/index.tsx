import React, { useEffect, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Card, Button, Icon, Steps } from 'anna-remax-ui';

import { href } from '@/utils/common'
import page_path from '@/utils/page_path';
import SlideModel from '@/components/slide_model';

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [buttons] = useState([{ name: 'Delete', type: 'warn' }])
  const [list, setItems] = useState([
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
  const handleOpen = (e: any) => {
    console.log('handleOpen', e);
    setItems(s =>
      s.map(i => {
        return { ...i, show: e.id === i.id ? true : false };
      }),
    );
  };

  const handleClose = (e: any) => {
    console.log('handleClose', e);
  };
  const handleDelete = (e: any) => {
    const newList: any[] = Object.assign([], list);
    for (let i = newList.length - 1; i >= 0; i--) {
      const item = newList[i];
      if (item.id === e.id) {
        item.show = false;
        break;
      }
    }
    console.log('newList', newList);

    setItems(items => items = newList);
  };
  return (
    <View>
      <Card>
        {list.map((item: any) => (
          <View key={item.id} className="solid-bottom">
            <SlideModel
              show={item.show}
              buttons={[{
                name: 'Delete',
                style: {
                  backgroundColor: '#ff0000',
                }, onTap: () => handleDelete(item),
              }]}
              extra={
                <View className="padding-sm ">{item.name}</View>
              }
              handleOpen={() => handleOpen(item)}
              handleClose={() => handleClose(item)}
            />
          </View>
        ))}
      </Card>
    </View>
  );
};
