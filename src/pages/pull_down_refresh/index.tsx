import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { View, } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';

import { toast } from '@/utils/common'
import LoadingModel from '@/components/loading_model';
import PageLoading from '@/components/page_loading';
import useData from '@/hooks/useData'
import useRefState from '@/hooks/useRefState'

export interface MaterialsItem {
  id: number,
  time: string,
  num: number
}
export default () => {
  const [isLoading, setIsLoading] = useRefState(true)
  const [pageNo, setPageNo] = useState(1)
  const { pageStatus, empty, hasMore, list, load, clean } = useData<MaterialsItem>({
    url: '/materials_in',
    method: 'GET'
  })
  usePageEvent('onReachBottom', () => {
    if (pageStatus && hasMore) {
      setPageNo((x: number) => x + 1)
    }
  });
  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      clean()
      if (pageNo !== 1) {
        setPageNo((o: number) => 1)
      } else {
        load({ page_no: pageNo });
      }
      setTimeout(() => {
        toast('刷新成功')
        resolve();
      }, 1000);
    })
  });
  useEffect(() => {
    load({ page_no: pageNo });
  }, [pageNo])
  useEffect(() => {
    setIsLoading((x: boolean) => false)
  }, [])
  const Loading = useMemo(() => <LoadingModel isLoading={hasMore} empty={empty} />, [hasMore]);
  if (isLoading) {
    return (
      <PageLoading color="#28a745" topVal="0" />
    )
  }
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
