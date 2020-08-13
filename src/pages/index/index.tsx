import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Cell, Loading, } from 'anna-remax-ui';

import { href } from '@/utils/common'
import PageLoading from '@/components/page_loading';
import page_path from '@/utils/page_path'

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
  return (
    <View className="text-center">
      <View>
        <Cell label="商城" border={false} onTap={() => href(page_path.mall)} arrow />
        {/* <View className="padding-bottom-sm">
                <Button look="warning" block onTap={() => href(``)}>库存管理</Button>
              </View> */}
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
