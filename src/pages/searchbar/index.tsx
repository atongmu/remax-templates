import React, { useEffect, useState, useCallback } from 'react';
import { View,navigateBack } from 'remax/wechat';
import SearchbarModel from '@/components/searchbar_model';
import useRefState from '@/hooks/useRefState'

export default () => {
  const [searchValue, setSearchValue, searchRef] = useRefState('')
  const handleValue = useCallback((e) => {
    setSearchValue(searchRef.current = e)
  }, [])
  const cancel=()=>{
    handleValue('')
    navigateBack()
  }
  return (
    <View className="padding-sm bg-white">
      <SearchbarModel value={searchValue} onInput={(e) => handleValue(e)} onActionClick={cancel} onClear={() => handleValue('')} />
    </View>
  );
};
