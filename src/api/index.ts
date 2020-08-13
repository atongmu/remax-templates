/*
 * @Author: codingfly
 * @Description: 接口
 * @Date: 2020-07-30 17:27:03
 * @LastEditTime: 2020-08-11 10:50:18
 * @FilePath: \erp-ts\src\api\index.ts
 */
import {ajax} from '@/utils/common'
const api = {
    phoneCode: '/home/phoneCode',
    userLogin: '/home/swagger-userLogin',
    zfbCode: '/home/swagger-zfbCode',
    addCashierOrder: '/order/swagger-addCashierOrder',
    orderPage: '/order/swagger-OrderPage',
    goodsPage: '/goods/swagger-goodsPage',
    addSelectionlist: '/selecation/swagger-addSelectionlist',
    delseleSelection: '/selecation/swagger-delsele',
    delSelectionlist: '/selecation/swagger-delSelectionlist',
    editSelectionlist: '/selecation/swagger-editSelectionlist',
    selectionlist: '/selecation/swagger-Selectionlist',
    seleData: '/selecation/swagger-seleData',
    selectionNum: '/selecation/swagger-selectionNum',
    getGoods: '/goods/swagger-getGoods',
    addSeleMuch: '/order/swagger-addSeleMuch',
    addSeleOne: '/order/swagger-addSeleOne',
    addOrder: '/order/swagger-addOrder',
    getOrder: '/order/swagger-getOrder',
    getState: '/order/swagger-getState',
    getQr: '/order/swagger-getQRcode',
}
export default api

//  获取短信验证码
export function phoneCode(data:any) {
    return ajax(api.phoneCode, 'GET', data)
}
//  登录
export function loginUser(data:any) {
    return ajax(api.userLogin, 'POST', data, true, true, false)
}
// 支付宝授权
export function zfbCode(data:any) {
    return ajax(api.zfbCode, 'GET', data)
}

// 创建收银台订单
export function addCashierOrder(data:any) {
    return ajax(api.addCashierOrder, 'POST', data, true, true, false)
}
// 订单列表
export function orderPage(data:any) {
    return ajax(api.orderPage, 'POST', data, true, true, false)
}
// 货物列表
export function goodsPage(data:any) {
    return ajax(api.goodsPage, 'GET', data, true, true, false)
}

// 添加选货单
export function addSelectionlist(data:any) {
    return ajax(api.addSelectionlist, 'POST', data, true, true, false)
}

// 删除选货单产品
export function delseleSelection(data:any) {
    return ajax(api.delseleSelection, 'GET', data, true, true, false)
}
// 删除选货单
export function delSelectionlist(data:any) {
    return ajax(api.delSelectionlist, 'GET', data, true, true, false)
}
// 修改选货单
export function editSelectionlist(data:any) {
    return ajax(api.editSelectionlist, 'POST', data, true, true, false)
}
// 选货单列表
export function selectionlist() {
    return ajax(api.selectionlist, 'POST', null, true, true, false)
}
// 查询选货单产品
export function seleData(data:any) {
    return ajax(api.seleData, 'GET', data, true, true, false)
}
// 选货单数量&价格
export function selectionNum(data:any) {
    return ajax(api.selectionNum, 'GET', data, true, true, false)
}

// 产品列表
export function getGoods(data:any) {
    return ajax(api.getGoods, 'GET', data, true, true, false)
}
// 多规格商品加入选货单
export function addSeleMuch(data:any) {
    return ajax(api.addSeleMuch, 'POST', data, true, true, false)
}
// 单规格商品加入选货单
export function addSeleOne(data:any) {
    return ajax(api.addSeleOne, 'POST', data, true, true, false)
}
// 创建订单
export function addOrder(data:any) {
    return ajax(api.addOrder, 'POST', data, true, true, false)
}
// 订单详情
export function getOrder(data:any) {
    return ajax(api.getOrder, 'POST', data, true, true, false)
}
// 订单状态
export function getState(data:any) {
    return ajax(api.getState, 'GET', data, true, true, false)
  }
// 获取二维码
export function getQr(data:any) {
    return ajax(api.getQr, 'GET', data, true, true, false)
}
