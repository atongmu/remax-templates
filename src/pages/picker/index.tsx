import React, { useState } from 'react';
import { View, Picker } from 'remax/wechat';
import { Icon } from 'anna-remax-ui';

export default () => {
  const [array, setArray] = useState(['中国', '巴西', '日本'])
  const [index, setIndex] = useState(0)
  const [multiArray, setMultiArray] = useState([['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']])
  const [multiValue, setMultiValue] = useState([0, 0, 0])
  const [timeValue, setTimeValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [packValue, setPackValue] = useState(['广东省', '广州市', '海珠区'])
  return (
    <View>
      <View className="solid-bottom">
        <Picker value={index} range={array} mode="selector">
          <View className="padding-sm flex align-center bg-white">
            <View className="flex-sub">普通选择器</View>
            <View><Icon type="right" color="#aaa" /></View>
          </View>
        </Picker>
      </View>
      <View className="solid-bottom">
        <Picker value={multiValue} range={multiArray} mode="multiSelector">
          <View className="padding-sm flex align-center bg-white">
            <View className="flex-sub">多列选择器</View>
            <View><Icon type="right" color="#aaa" /></View>
          </View>
        </Picker>
      </View>
      <View className="solid-bottom">
        <Picker value={timeValue} mode="time">
          <View className="padding-sm flex align-center bg-white">
            <View className="flex-sub">时间选择器</View>
            <View><Icon type="right" color="#aaa" /></View>
          </View>
        </Picker>
      </View>
      <View className="solid-bottom">
        <Picker value={dateValue} mode="date">
          <View className="padding-sm flex align-center bg-white">
            <View className="flex-sub">日期选择器</View>
            <View><Icon type="right" color="#aaa" /></View>
          </View>
        </Picker>
      </View>
      <View className="solid-bottom">
        <Picker value={packValue} mode="region">
          <View className="padding-sm flex align-center bg-white">
            <View className="flex-sub">省市区选择器</View>
            <View><Icon type="right" color="#aaa" /></View>
          </View>
        </Picker>
      </View>
    </View>
  );
};
