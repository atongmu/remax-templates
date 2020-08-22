/*
 * @Author: codingfly
 * @Description: 接口
 * @Date: 2020-07-30 17:27:03
 * @LastEditTime: 2020-08-22 16:58:11
 * @FilePath: \templates-ts\src\api\index.ts
 */
import { ajax } from '@/utils/common'
const api = {
    banners: '/banner',
    categorys: '/category',
    sorts: '/sort',
    product_list: '/product_list',
    product_info: '/product_info',
    order_list: '/order_list',
    materials: '/materials',
    materials_in: '/materials_in',
    materials_out: '/materials_out',
    materials_detail: '/materials_detail',
}
export default api

//  获取轮播图
export function getBanners() {
    return ajax(api.banners, 'GET', null, false, true, true)
}
//  获取分类导航
export function getCategorys() {
    return ajax(api.categorys, 'GET', null, false, true, true)
}
//  获取分类
export function getSorts() {
    return ajax(api.sorts, 'GET', null, false, true, true)
}
//  获取分页商品
export function getProducts(data: any) {
    return ajax(api.product_list, 'GET', data, false, true, true)
}
//  获取商品
export function getProduct(data: any) {
    return ajax(api.product_info, 'GET', data, false, true, true)
}
//  获取分页订单
export function getOrders(data: any) {
    return ajax(api.order_list, 'GET', data, false, true, true)
}
//  获取分页物料
export function getMaterials(data: any) {
    return ajax(api.materials, 'GET', data, false, true, true)
}
//  获取分页物料入库
export function getMaterialsIn(data: any) {
    return ajax(api.materials_in, 'GET', data, false, true, true)
}
//  获取分页物料出库
export function getMaterialsOut(data: any) {
    return ajax(api.materials_out, 'GET', data, false, true, true)
}
//  获取物料详情
export function getMaterialsDetail(data: any) {
    return ajax(api.materials_detail, 'GET', data, false, true, true)
}