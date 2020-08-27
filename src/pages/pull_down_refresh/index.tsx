import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { View, } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';

import { toast } from '@/utils/common'
import { getMaterialsIn } from '@/api/index'
import LoadingModel from '@/components/loading_model';
import useRefState from '@/hooks/useRefState'

export interface MaterialsItem {
  id: number,
  time: string,
  num: number
}
const returnEmptyArray = () => []
export default () => {
  const [list, setList] = useState<MaterialsItem[]>(returnEmptyArray)
  // 列表是否全部加载完毕
  const [hasMore, setHasMore, hasMoreRef] = useRefState(true)
  // 列表是否为空
  const [empty, setEmpty] = useState(false)
  const [pageStatus, setPageStatus] = useState(true)
  const [pageNo, setPageNo] = useState<number>(1)

  const load = useCallback(async () => {
    if (!hasMoreRef.current) {
      return
    }
    const res = await getDate()
    if (res.lenght < 15) {
      setHasMore(false)
    }

    setList(l => {
      if (res === 0 && l.length === 0) {
        setEmpty(true)
      }

      return [...l, ...res]
    })
    setPageStatus(e => true)
  }, [pageNo])

  // 清空列表
  const clean = useCallback(() => {
    setList([])
    setHasMore(true)
    setEmpty(false)
  }, [])

  // 刷新列表
  const refresh = useCallback(() => {
    clean()
    setTimeout(() => {
      load()
    })
  }, [])

  useEffect(() => {
    const getData = setTimeout(function () {
      load();
    }, 500);
    return () => {
      clearTimeout(getData);
    }
  }, [pageNo])

  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      setTimeout(() => {
        refresh()
        toast('刷新成功')
        resolve();
      }, 1000);
    })
  });
  usePageEvent('onReachBottom', () => {
    console.log(hasMore)
    if (hasMore && pageStatus) {
      console.log('onReachBottom')
      setPageNo(pageNo => pageNo + 1)
    }
  });
  const Loading = useMemo(() => <LoadingModel isLoading={hasMore} />, [hasMore]);

  const getDate = async () => {
    setPageStatus(e => false)
    const result: any = await getMaterialsIn({ page_no: pageNo })
    if (result.status === 200) {
      return result.data
    } else {
      return []
    }
  }
  return (
    <View>
      {list.map((item, index: number) => (
        <View key={index} className="padding-tb-xl bg-white margin-bottom-xs">
          <View className="flex padding-lr-sm">
            <View>【{index + 1}】</View>
            <View className="flex-sub text-bold">{item.time}</View>
            <View className="flex-sub text-gray text-right">{item.num}</View>
          </View>
        </View>
      ))}
      {Loading}
    </View>
  );
};
