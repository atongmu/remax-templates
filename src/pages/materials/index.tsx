import React, { useEffect, useState } from 'react';
import { showLoading, hideLoading } from 'remax/wechat';
import { View } from 'remax/one';
import { usePageEvent } from 'remax/macro';
import { Cell } from 'anna-remax-ui';

import { href } from '@/utils/common'
import page_path from '@/utils/page_path';
import SearchModel from '@/components/search_model/index';
import PageLoading from '@/components/page_loading';
import { getMaterials } from '@/api/index'

export interface MaterialsItem {
  id: number,
  name: string,
  time: string,
  num: number
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [materials, setMaterials] = useState<MaterialsItem[]>([])
  usePageEvent('onPullDownRefresh', () => {
    showLoading({ title: "努力加载中", mask: true })
    refresh()
    // 可以返回一个 promise，控制何时停止下来刷新行为
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      });
    })
  });
  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const setFun = setTimeout(() => {
      getData()
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }
  const refresh = () => {
    const setFun = setTimeout(() => {
      hideLoading()
    }, 1500)
  }
  const getData = async () => {
    const materialsResult: any = await getMaterials({})
    if (materialsResult.status === 200) {
      setMaterials(materialsResult.data)
    }
  }
  return (
    <View className="materials padding-env">
      <View className="nav fixed">
        <SearchModel text="搜索物料" searchFun={() => href(page_path.search)} color="#28a745" />
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="90rpx" />
      )}
      <View style={{ height: '100', background: '#28a745' }}></View>
      <View>
        {materials.map((item, index) => (
          <Cell key={index} label={item.name} arrow onTap={() => href(page_path.materials_detail)}>
            <View>库存：{item.num}</View>
          </Cell>
        ))}
      </View>
    </View>
  );
};
