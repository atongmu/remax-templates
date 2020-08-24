import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';

import QrcodeModel from '@/components/qrcode_model';
import PageLoading from '@/components/page_loading';

export default () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      setFun
    }
  }, [])
  return (
    <View className="pull_down_refresh">
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
      <View className="text-center">
        <QrcodeModel text="1111" />
      </View>
    </View>
  );
};
