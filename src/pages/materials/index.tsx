import React, { useEffect, useState, useMemo } from 'react';
import { showLoading, hideLoading } from 'remax/wechat';
import { View } from 'remax/one';
import { usePageEvent } from 'remax/macro';
import { Cell } from 'anna-remax-ui';

import { href, toast } from '@/utils/common'
import page_path from '@/utils/page_path';
import SearchModel from '@/components/search_model/index';
import LoadingModel from '@/components/loading_model';
import { TodoContext } from '@/app';
import useData from '@/hooks/useData'
import { deepClone } from '../../utils/util';

export interface MaterialsItem {
  id: number,
  name: string,
  time: string,
  num: number
}
export default () => {
  const todo: any = React.useContext(TodoContext);
  const [params, setParams] = useState({
    page_no: 1,
    page_size: 20,
    name: todo.bingItems.searchValue
  })
  const { pageStatus, empty, hasMore, list, load, clean } = useData<MaterialsItem>({
    url: '/materials'
  })
  usePageEvent('onPullDownRefresh', () => {
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      setTimeout(() => {
        const new_params = deepClone(params)
        clean()
        setParams({ ...new_params, page_no: params.page_no + 1 })
        resolve();
      }, 100);
    })
  });
  usePageEvent('onReachBottom', () => {
    if (pageStatus && hasMore) {
      const new_params = deepClone(params)
      setParams({ ...new_params, page_no: params.page_no + 1 })
    }
  });
  useEffect(() => {
    init()
  }, [params])
  useEffect(() => {
    const setFc = setTimeout(() => {
      const new_params = deepClone(params)
      clean()
      setParams({ ...new_params, page_no: 1, name: todo.bingItems.searchValue })
    }, 500)
    return () => {
      clearTimeout(setFc)
    }
  }, [todo.bingItems.searchValue])
  const init = () => {
    const new_params = deepClone(params)
    load(new_params)
  }
  const Loading = useMemo(() => <LoadingModel isLoading={hasMore} empty={empty} />, [hasMore]);
  return (
    <View className="materials padding-env">
      <View className="nav fixed">
        <SearchModel text={`${params.name !== '' ? params.name : '搜索物料'}`} searchFun={() => href(page_path.search)} color="#28a745" />
      </View>
      <View style={{ height: '100', background: '#28a745' }}></View>
      <View>
        {list.map((item, index) => (
          <Cell key={index} label={item.name} arrow onTap={() => toast("详情")}>
            <View>库存：{item.num}</View>
          </Cell>
        ))}
      </View>
      {Loading}
    </View>
  );
};
