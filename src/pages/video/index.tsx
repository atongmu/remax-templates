import React, { useEffect, useState } from 'react';
import { View, Text, Video } from 'remax/wechat';
import { Card, Button, Icon, Steps } from 'anna-remax-ui';
import './index.less'
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
  const videoErrorCallback = (e: any) => {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
  return (
    <View className="video-container">
      <Video
        id="myVideo"
        src="https://1251542705.vod2.myqcloud.com/4a8d9c67vodtransgzp1251542705/f7b5199b5285890805797463637/v.f100820.mp4"
        onError={videoErrorCallback}
        enableDanmu
        autoplay
        danmuBtn
        showCenterPlayBtn={false}
        showPlayBtn={true}
      ></Video>
      {/* <View >弹幕内容</View> */}
      {/* <input bindblur="bindInputBlur" class="weui-input" type="text" placeholder="在此处输入弹幕内容" /> */}
      {/* <Button bindtap="bindSendDanmu" class="page-body-button" type="primary" formType="submit">发送弹幕</Button> */}

    </View>
  );
};
