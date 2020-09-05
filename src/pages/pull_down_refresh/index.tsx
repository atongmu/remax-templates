import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { View, } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';

import { toast } from '@/utils/common'
import LoadingModel from '@/components/loading_model';
import useDate from '@/hooks/useDate'
import useRefState from '@/hooks/useRefState'

export interface MaterialsItem {
  id: number,
  time: string,
  num: number
}
export default () => {
  const [pageNo, setPageNo, pageRef] = useRefState(1)
  const [pageStatus, setPageStatus, statusRef] = useRefState(true)
  const { empty, hasMore, list, load, refresh, clean } = useDate<MaterialsItem>({
    url: '/materials_in',
    method: 'GET'
  })
  usePageEvent('onReachBottom', () => {
    console.log(pageStatus)
    if (pageStatus) {
      setPageStatus((o: boolean) => o = statusRef.current = false)
      setPageNo((o: number) => o = pageRef.current + 1)
    }
  });
  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      if (pageNo !== 1) {
        clean()
      }
      setPageNo((o: number) => o = pageRef.current = 1)
      setTimeout(() => {
        // refresh({ page_no: pageNo })
        toast('刷新成功')
        resolve();
      }, 1000);
    })
  });

  useEffect(() => {
    const getData = setTimeout(function () {
      load({ page_no: pageNo });
      setPageStatus((o: boolean) => o = statusRef.current = true)
    }, 1500);
    return () => {
      clearTimeout(getData);
    }
  }, [pageNo])
  const Loading = useMemo(() => <LoadingModel isLoading={!hasMore} />, [hasMore]);
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
