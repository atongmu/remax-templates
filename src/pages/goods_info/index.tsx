import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';
import { Card, Loading, Button } from 'anna-remax-ui';

import styles from './index.css';
import { href } from '@/utils/common'

export default () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const setFun = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }, [])
  return (
    <View className={styles.app}>
      <View className="padding-sm">
        {isLoading ? (
          <Loading />
        ) : (
            <Card>
              <View className="padding-bottom-sm">
                <Button look="anna" block onTap={() => href(``)}>商城</Button>
              </View>
              {/* <View className="padding-bottom-sm">
                <Button look="warning" block onTap={() => href(``)}>库存管理</Button>
              </View> */}
            </Card>
          )}
      </View>
    </View>
  );
};
