import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { View, Text, Switch } from 'remax/wechat';
import { Card, Button, Input, Icon, ActionSheet, Cell, Popup, Space } from 'anna-remax-ui';
import { usePageEvent } from 'remax/macro';

import './index.less'
import { href, modal, toast } from '@/utils/common'
import NavModel from '@/components/nar_model';
import LoadingModel from '@/components/loading_model';
import useReachBottom from '@/hooks/useReachBottom'
import useRefState from '@/hooks/useRefState'
import { getMaterialsIn } from '@/api/index'
export interface MaterialsItem {
  id: number,
  time: string,
  num: number
}
export default () => {
  const { initStatus, pageLoading, pageStatus, setInitStatus, setPageLoading, setPageStatus } = useReachBottom()
  const [navActive, setNavActive] = useState(0)
  const [pageNo, setPageNo] = useState(1)
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
  const [navItems] = useState(['出库记录', '入库记录'])
  const [dataSource, setDataSource] = useState<MaterialsItem[]>([])

  const tabsActive = useRef<number>(navActive);

  useEffect(() => {
    const setFun = setTimeout(function () {
      getData();
    }, 500);
    return () => {
      clearTimeout(setFun);
    }
  }, [navActive, pageNo])

  usePageEvent('onReachBottom', () => {
    if (pageStatus && pageLoading) {
      console.log('onReachBottom')
      setPageNo(e => pageNo + 1)
    }
  });

  const setActive = useCallback((data) => {
    if (data !== tabsActive.current) {
      setPageLoading(e => true)
      setInitStatus(e => true)
      setDataSource(e => [])
      setPageNo(e => 1)
    }
    console.log(data)
    console.log(tabsActive.current)
    tabsActive.current = data
    setNavActive(tabsActive.current)
  }, [navActive])

  const getData = async () => {
    setPageStatus(e => false)
    const result: any = await getMaterialsIn({ active: tabsActive.current, page_no: pageNo })
    if (result.status === 200) {
      const data = result.data
      if (initStatus) {
        setDataSource(items => data);
      } else {
        setDataSource(items => dataSource.concat(data));
      }
      if (data.length < 15) {
        setPageLoading(e => false)
      }
      setPageStatus(e => true)
      setInitStatus(e => false)
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
  const Loading = useMemo(() => <LoadingModel isLoading={pageLoading} />, [pageLoading]);
  return (
    <View className="materials">
      <View className="nav fixed">
        <NavModel className="text-green" active={tabsActive.current} items={navItems} detail={(o) => setActive(o)} />
      </View>

      <View className="content">
        {dataSource.map(item => (
          <Cell key={item.id} label={item.num}>
            {item.time}
          </Cell>
        ))}

        {Loading}

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
            setShowActiven(false);
          }}
        />
      )}

      <Popup closeable position="center" open={shouPopup} onClose={PopupClose} style={{ width: '80%' }}>
        <View className="padding-sm">
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
      <Popup closeable position="center" open={shouCimsPopup} onClose={PopupCimsClose} style={{ width: '80%' }}>
        <View className="padding-sm">
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
    </View>
  );
};
