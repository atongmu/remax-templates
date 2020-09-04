import React, { useEffect, useState, useCallback } from 'react';
import { View, navigateBack } from 'remax/wechat';
import SearchbarModel from '@/components/searchbar_model';
import SearchModel from '@/components/search_model';
import useRefState from '@/hooks/useRefState'

import { toast } from '@/utils/common'
export default () => {
  const [searchValue, setSearchValue, searchRef] = useRefState('')
  const handleValue = useCallback((e) => {
    setSearchValue(searchRef.current = e)
  }, [])
  const cancel = () => {
    handleValue('')
    navigateBack()
  }
  return (
    <View className="bg-white">
      <View className="padding-lr-sm padding-tb solid-bottom">
        <SearchbarModel value={searchValue} onInput={(e) => handleValue(e)} onActionClick={cancel} onClear={() => handleValue('')} />
      </View>
      <View className="padding-tb">
        <SearchModel text='搜索' showSort={true} color="#28a745" searchFun={() => toast("搜索")} sortFun={() => toast("分类")} />
      </View>
    </View>
  );
};
