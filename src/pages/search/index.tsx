import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Icon, SearchBar, Cell, Tag } from 'anna-remax-ui';

import './index.less';
import { href, toast } from '@/utils/common'

export default () => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    console.log('searchValeu')
  }, [searchValue])
  return (
    <View className="serach">
      <View className="padding-sm bg-white">
        <SearchBar
          value={searchValue}
          onInput={(e) => setSearchValue(e)}
          onClear={() => setSearchValue('')}
          onActionClick={() => setSearchValue('')}
          onSubmit={() => toast("搜索")}
          placeholder="搜索"
          inputStyle={{
            backgroundColor: '#d7f0db',
          }}
        />
      </View>
      <View className="padding-top-lg bg-white">
        {searchValue === '' ? (
          <View className="padding">
            <View className="flex">
              <View>搜索历史</View>
              <View className="flex-sub text-right" onClick={() => toast("删除")}>
                <Icon type="delete" color="#999" size="36rpx" />
              </View>
            </View>
            <View className="padding-top">
              <Tag color="blue">blue</Tag>
              <Tag color="green">green</Tag>
              <Tag color="yellow">yellow</Tag>
              <Tag color="red">red</Tag>
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
