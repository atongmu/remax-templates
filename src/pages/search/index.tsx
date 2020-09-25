import React, { useEffect, useState } from 'react';
import { View, navigateBack } from 'remax/wechat';
import { Icon, SearchBar, Tag } from 'anna-remax-ui';

import './index.less';
import { toast, getStorage, setStorage } from '@/utils/common'
import { TodoContext } from '@/app';
import { deepClone } from '../../utils/util';

export default () => {
  const [searchValue, setSearchValue] = useState('')
  const [storageArrty, setStorageArrty] = useState<string[]>([])
  const todo: any = React.useContext(TodoContext);
  useEffect(() => {
    const list = getStorage('searchArrty')
    if (list) {
      setStorageArrty(e => JSON.parse(list))
    }
    if (todo.bingItems.searchValue) {
      setSearchValue(todo.bingItems.searchValue)
    }
  }, [])

  const searchChange = (e: string) => {
    if (storageArrty.indexOf(e) === -1) {
      if (storageArrty.length < 7) {
        const newArrty = deepClone(storageArrty)
        newArrty.push(e)
        setStorageArrty(newArrty)
        setStorage('searchArrty', newArrty)
        setSearchValue('')
      }
    }
    todo.setBingItems({
      ...todo.bingItems,
      searchValue: e
    })
    navigateBack();
  }
  const removeHandle = () => {
    setStorageArrty([])
    setStorage('searchArrty', [])
  }
  return (
    <View className="serach">
      <View className="padding-sm bg-white">
        <SearchBar
          value={searchValue}
          onInput={(e) => setSearchValue(e)}
          onClear={() => {
            setSearchValue('')
          }}
          onActionClick={() => {
            setSearchValue('')
            todo.setBingItems({
              ...todo.bingItems,
              searchValue: ''
            })
            navigateBack();
          }}
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
              <View className="flex-sub text-right" onClick={removeHandle}>
                <Icon type="delete" color="#999" size="36rpx" />
              </View>
            </View>
            <View className="padding-top">
              {storageArrty.map(item => (
                <Tag key={item} color="green" onTap={() => searchChange(item)}>{item}</Tag>
              ))}
            </View>
          </View>
        ) : (
            <View className="padding">
              <View className="padding-bottom" onClick={() => searchChange(searchValue)}>
                搜索： “{searchValue}”
              </View>
            </View>
          )}
      </View>
    </View>
  );
};
