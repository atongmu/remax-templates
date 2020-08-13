/*
 * @Author: codingfly
 * @Description: 接口
 * @Date: 2020-07-30 17:27:03
 * @LastEditTime: 2020-08-13 21:07:40
 * @FilePath: \remax-templates\src\api\index.ts
 */
import { ajax } from '@/utils/common'
const api = {
    banners: '/banner',
    categorys: '/category',
    sorts: '/sort',
    product_list: '/product_list',
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