import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Cell, Loading, } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import page_path from '@/utils/page_path'

export default () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {

  }, [])
  return (
    <View className="text-center">
      <View>
        购物车
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
