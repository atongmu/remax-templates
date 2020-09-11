import React, { useEffect, useState } from 'react';
import { View, Text, Video } from 'remax/wechat';
import { Card, Button, Icon, Steps } from 'anna-remax-ui';
import './index.less'
export default () => {
  const [isLoading, setLoading] = useState(false)
  const [remind, setRemind] = useState('')

  useEffect(() => {
    const setFun = setInterval(() => {
      times('2020-09-12 15:00:00')
    }, 1000)
    return () => {
      clearInterval(setFun)
    }
  }, [])
  const times = (times: string) => {
    const my_time = Number(new Date(times))
    const now_time = Date.now()
    //获取时间差
    const timediff = Math.round((my_time - now_time) / 1000);
    //获取还剩多少天
    const day = parseInt(String(timediff / 3600 / 24));
    //获取还剩多少小时
    const hour = parseInt(String(timediff / 3600 % 24));
    //获取还剩多少分钟
    const minute = parseInt(String(timediff / 60 % 60));
    //获取还剩多少秒
    const second = timediff % 60;
    console.log(day, hour, minute, second)
    setRemind(x => x = `${day} 天 ${hour} 小时 ${minute} 分 ${second} 秒`)
  }
  return (
    <View className="remind-model">
      <View className="padding text-center">倒计时{remind}</View>
    </View>
  );
};
