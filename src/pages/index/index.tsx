import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Cell, Loading, } from 'anna-remax-ui';

import { href,toast } from '@/utils/common'
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
        <Cell label="商城类模板" border={false} onTap={() => href(page_path.mall)} arrow />
        <Cell label="库存类模板" border={false} onTap={() => toast("正在研发中")} arrow />
        <Cell label="新闻类模板" border={false} onTap={() => toast("正在研发中")} arrow />
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="0" />
      )}
    </View>
  );
};
