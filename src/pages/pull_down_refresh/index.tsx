import React, { useEffect, useState, useMemo } from 'react';
import { View, } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';

import { toast } from '@/utils/common'
import { deepClone } from '@/utils/util'
import LoadingModel from '@/components/loading_model';
import useData from '@/hooks/useData'

export interface MaterialsItem {
  id: number,
  time: string,
  num: number
}
export default () => {
  const [params, setParams] = useState({
    page_no: 1,
    page_size: 20
  })
  const { pageStatus, empty, hasMore, list, load, clean } = useData<MaterialsItem>({
    url: '/materials_in',
    method: 'GET'
  })

  useEffect(() => {
    const new_page = deepClone(params)
    load(new_page);
  }, [params])
  usePageEvent('onReachBottom', () => {
    if (pageStatus && hasMore) {
      setParams({ ...params, page_no: params.page_no + 1 })
    }
  });
  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      const new_params = deepClone(params)
      clean()
      setParams(new_params)
      toast('刷新成功')
      resolve();
    })
  });

  const Loading = useMemo(() => <LoadingModel isLoading={hasMore} empty={empty} />, [hasMore]);
  return (
    <View>
      {list.map((item: MaterialsItem, index: number) => (
        <View key={index} className="padding-tb-xl bg-white margin-bottom-xs">
          <View className="flex padding-lr-sm">
            <View className="flex-sub text-bold">{item.time}</View>
            <View className="flex-sub text-gray text-right">数量：{item.num}</View>
          </View>
        </View>
      ))}
      {Loading}
    </View>
  );
};
