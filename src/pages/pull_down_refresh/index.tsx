import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { View, Text } from 'remax/wechat';
import { Cell } from 'anna-remax-ui';
import { usePageEvent } from 'remax/macro';

import './index.less'
import { href, toast } from '@/utils/common'
import { getMaterialsIn } from '@/api/index'
import LoadingModel from '@/components/loading_model';
import useReachBottom from '@/hooks/useReachBottom'

export interface MaterialsItem {
  id: number,
  time: string,
  num: number
}
export default () => {
  const defaultDataSource = useRef(null)
  const { initStatus, pageLoading, pageStatus, setInitStatus, setPageLoading, setPageStatus } = useReachBottom()
  const [dataSource, setDataSource] = useState<MaterialsItem[]>([])
  const [params, setParams] = useState({ method: 'GET' })
  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    setInitStatus(e => true)
    return new Promise((resolve) => {
      setTimeout(() => {
        getDate()
        toast('刷新成功')
        resolve();
      }, 1000);
    })
  });
  usePageEvent('onLoad', () => {
    getDate()
  });
  usePageEvent('onReachBottom', () => {
    if (pageStatus && pageLoading) {
      console.log('onReachBottom')
      getDate()
    }
  });
  const reault = useCallback((data) => {
    /**
     * 传入默认选项
     */
    if (initStatus) {
      console.log('data', data)
      setDataSource(items => data);
    } else {
      setDataSource(items => dataSource.concat(data));
    }
  }, [dataSource])
  const getDate = async () => {
    setPageStatus(e => false)
    const result: any = await getMaterialsIn({})
    if (result.status === 200) {
      if (result.data.length <= 20) {
        setPageLoading(e => false)
      }
      reault(result.data)
      setInitStatus(e => false)
      setPageStatus(e => true)
    }
  }
  return (
    <View className="pull_down_refresh">
      {dataSource.map((item: any, index: number) => (
        <View key={index} className="padding-tb-xl">
          <Cell key={index} label={item.num}>{item.time}</Cell>
        </View>
      ))}
      <LoadingModel isLoading={pageLoading} />
    </View>
  );
};
