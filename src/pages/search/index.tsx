import React, { useEffect, useState } from 'react';
import { View } from 'remax/one';
import { Icon, SearchBar, Tag } from 'anna-remax-ui';

import './index.less';
import { toast, getStorage, setStorage } from '@/utils/common'
import { TodoContext } from '@/app';

export default () => {
  const [searchValue, setSearchValue] = useState('')
  const [storageArrty, setStorageArrty] = useState<string[]>([])
  const todo: any = React.useContext(TodoContext);
  useEffect(() => {
    const list = getStorage('searchArrty')
    if (list) {
      setStorageArrty(e => JSON.parse(list))
    }
  }, [])

  const searchChange = (e: any) => {
    if (storageArrty.indexOf(e) === -1) {
      if (storageArrty.length < 7) {
        const newArrty = Object.assign([], storageArrty)
        newArrty.push(e)
        setStorageArrty(o => newArrty)
        setStorage('searchArrty', newArrty)
        setSearchValue('')
      }
    }
    todo.setBingItems({
      ...todo.bingItems,
      searchValue: e
    })
  }
  const removeHandle = () => {
    setStorageArrty(o => [])
    setStorage('searchArrty', [])
  }
  return (
    <View className="serach">
      <View className="padding-sm bg-white">
        <SearchBar
          value={searchValue}
          onInput={(e) => setSearchValue(e)}
          onClear={() => setSearchValue('')}
          onActionClick={() => setSearchValue('')}
          onSubmit={searchChange}
          inputStyle={{
            backgroundColor: '#d7f0db',
          }}
          focus={true}
          placeholder="搜索"
        />
      </View>
      <View className="padding-top-lg bg-white">
        {searchValue === '' ? (
          <View className="padding">
            <View className="flex">
              <View>搜索历史</View>
              <View className="flex-sub text-right" onTap={removeHandle}>
                <Icon type="delete" color="#999" size="36rpx" />
              </View>
            </View>
            <View className="padding-top">
              {storageArrty.map(itme => (
                <Tag key={itme} color="green">{itme}</Tag>
              ))}
            </View>
          </View>
        ) : (
            <View className="padding">
              <View className="padding-bottom">
                搜索： “{searchValue}”
              </View>
            </View>
          )}
      </View>
    </View>
  );
};
