import React, { useEffect, useState } from 'react';
import { View } from 'remax/wechat';

import QrcodeModel from '@/components/qrcode_model';

export default () => {
  return (
    <View className="pull_down_refresh">
      <View className="text-center margin-top">
        <QrcodeModel text="1111" />
      </View>
    </View>
  );
};
