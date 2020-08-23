import React, { useEffect, useState } from 'react';
import { View, Text, Switch } from 'remax/wechat';
import { Card, Button, Input, Icon, ActionSheet, Cell, Popup, Space } from 'anna-remax-ui';

import './index.less'
import { href, modal, toast } from '@/utils/common'
import NavModel from '@/components/nar_model';
import PageLoading from '@/components/page_loading';
import { getMaterialsIn } from '@/api/index'
export interface MaterialsItem {
  id: number,
  time: string,
  num: number
}
export default () => {
  const [isLoading, setLoading] = useState(true)
  const [showActive, setShowActiven] = useState(false)
  const [shouPopup, setShowPopup] = useState(false)
  const [shouCimsPopup, setShowCimsPopup] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [options] = useState([
    { value: 0, text: '物料入库' },
    { value: 1, text: '物料出库' },
    { value: 2, text: '修改物料' },
    { value: 3, text: '删除物料' },
  ])
  const [itemNum, setItemNum] = useState('')
  const [itemName, setItemName] = useState('')
  const [navActive, setNavActive] = useState(0)
  const [navItems] = useState(['出库记录', '入库记录'])
  const [items, setItems] = useState<MaterialsItem[]>([])
  useEffect(() => {
    setItems([])
    init()
  }, [navActive])
  const init = () => {
    const setFun = setTimeout(() => {
      getData()
      setLoading(false)
    }, 1500)
    return () => {
      setFun
    }
  }
  const getData = async () => {
    const result: any = await getMaterialsIn({})
    if (result.status === 200) {
      setItems(result.data)
    }
  }
  const cimsEdit = () => { }
  const PopupClose = () => {
    setShowPopup(e => false)
    setItemNum(e => '')
  }
  const PopupCimsClose = () => {
    setShowCimsPopup(e => false)
    setItemName(e => '')
  }
  return (
    <View className="materials">
      <View className="nav fixed">
        <NavModel className="text-green" active={navActive} items={navItems} detail={(o) => setNavActive(e => o)} />
      </View>
      {isLoading && (
        <PageLoading color="#28a745" topVal="92rpx" />
      )}
      <View className="content">
        {items.map(item => (
          <Cell key={item.id} label={item.num}>
            {item.time}
          </Cell>
        ))}
      </View>
      <View className="foot bg-green light  padding-tb-sm">
        <View className="flex align-center padding-env padding-lr-sm">
          <View className="flex-sub align-center flex">
            <View className="flex-sub">111</View>
            <View>库存：1</View>
          </View>
          <View className="margin-left-sm" onClick={() => setShowActiven(e => true)}>
            <Icon type="settings" size="36" color="#39b54a" />
          </View>
        </View>
      </View>

      {showActive && (
        <ActionSheet
          cancelText="取消"
          open={showActive}
          actions={options}
          onCancel={() => setShowActiven(false)}
          onChange={(o: any) => {
            setShowActiven(false);
            if (o.value == 0) {
              setShowPopup(e => true)
              setIsEdit(e => true)
            }
            if (o.value == 1) {
              setShowPopup(e => true)
              setIsEdit(e => false)
            }
            if (o.value == 2) {
              setShowCimsPopup(e => true)
            }
            if (o.value == 3) {
              modal("危险操作", "确定要删除吗？", (e: any) => {
                console.log(e)
              })
            }
          }}
        />
      )}

      {shouPopup && (
        <Popup closeable position="bottom" open={shouPopup} onClose={PopupClose}>
          <View className="padding-sm padding-env">
            <Card title={isEdit ? '物料入库' : '物料出库'}>
              <View className="solid"><Input label="数量：" type="number" placeholder="输入数量" value={itemNum} border={false}
                onChange={(e) => setItemNum(e.target.value)} /></View>
              <View className="margin-top text-center">
                <Space size="middle">
                  <Button look="secure" >确定</Button>
                  <Button onTap={PopupClose}>取消</Button>
                </Space>
              </View>
            </Card>
          </View>
        </Popup>
      )}
      {shouCimsPopup && (
        <Popup closeable position="bottom" open={shouCimsPopup} onClose={PopupCimsClose}>
          <View className="padding-sm padding-env">
            <Card title="物料修改">
              <View className="solid"><Input label="物料名称：" placeholder="输入名称" value={itemName} border={false}
                onChange={(e) => setItemName(e.target.value)} /></View>
              <View className="margin-top text-center">
                <Space size="middle">
                  <Button look="secure" >确定</Button>
                  <Button onTap={PopupCimsClose}>取消</Button>
                </Space>
              </View>
            </Card>
          </View>
        </Popup>
      )}
    </View>
  );
};
