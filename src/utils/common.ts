/*
 * @Author: codingfly
 * @Description: api工具类
 * @Date: 2020-07-22 16:37:08
 * @LastEditTime: 2020-09-05 16:12:37
 * @FilePath: \templates-ts\src\utils\common.ts
 */
import { request, showToast, showModal, showLoading, hideLoading, setStorageSync, getStorageSync, clearStorageSync, redirectTo, navigateTo } from 'remax/wechat';
export function interfaceUrl() {
    return process.env.REMAX_APP_BASE_UR
}
export function toast(content: string, success?: any, duration?: any) {
    showToast({
        title: content || "出错啦~",
        mask: true,
        icon: success ? 'success' : 'none',
        duration: duration || 2000
    })
}
export function modal(title: string, content: string, callback?: (reault: boolean) => void, confirmText?: string, cancelText?: string) {
    showModal({
        title: title || '提示',
        content: content,
        confirmButtonText: confirmText || "确定",
        cancelButtonText: cancelText || "取消",
        success(res) {
            if (res.confirm) {
                callback && callback(true)
            } else {
                callback && callback(false)
            }
        }
    })
}
export function setUserInfo(mobile: string, token: any) {
    const storageMobile = JSON.stringify(token)
    setStorageSync("token", token)
    setStorageSync("mobile", storageMobile)
}
export function getStorage(name: string) {
    return getStorageSync(name)
}
export function setStorage(name: string, data: any) {
    const storage = JSON.stringify(data)
    return setStorageSync(name, storage)
}
export function getToken() {
    return getStorageSync("token")
}
export function isLogin() {
    return getStorageSync("mobile") ? true : false
}
export function href(url: string, isVerify?: boolean) {
    if (isVerify && !isLogin()) {
        navigateTo({
            url: '/pages/login/index'
        })
    } else {
        navigateTo({
            url: url
        });
    }
}
export function ajax(url: string = "GET", method: any, postData: any, isDelay: boolean = false, isForm: boolean = true, hideLoad: boolean = false) {
    //接口请求
    let loadding: boolean = false;
    let carfun: any = null;
    clearTimeout(carfun)
    if (!hideLoad) {
        carfun = setTimeout(() => {
            showLoading({
                title: '请稍候...',
                success: (() => {
                    loadding = true
                })
            })
        }, isDelay ? 1000 : 0)
    }

    return new Promise((resolve, reject) => {
        const token: any = getToken()
        request({
            url: interfaceUrl() + url,
            data: postData,
            header: {
                'content-type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
                'refreshtoken': token
            },
            method: method, //'GET','POST'
            dataType: 'json',
            success: (res) => {
                clearTimeout(carfun)
                carfun = null
                if (loadding && !hideLoad) {
                    hideLoading()
                }
                if (res.data && res.data.code == 233) {
                    clearStorageSync()
                    modal("系统错误", "登录信息已失效，请重新登录", () => {
                        redirectTo({
                            url: '/pages/login/index'
                        })
                    })
                    return
                }
                if (res.data && res.data.code == 500) {
                    modal("系统错误", "登录信息已失效，请重新登录")
                    return
                }
                resolve(res.data)
            },
            fail: (res) => {
                clearTimeout(carfun)
                carfun = null
                toast("网络不给力，请稍后再试~", "none")
                reject(res)
            }
        })
    })
}