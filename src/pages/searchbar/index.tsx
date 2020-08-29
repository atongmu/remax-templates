import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import SearchbarModel from '@/components/searchbar_model';

export default () => {
  const [show, setShow] = useState(false)
  const search = (value: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  }
  const selectResult = (e: any) => {
    console.log('select result', e.detail)
  }
  return (
    <View className="padding-sm bg-white">
      <SearchbarModel />
    </View>
  );
};
