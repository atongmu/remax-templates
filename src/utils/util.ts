/*
 * @Author: your name
 * @Date: 2020-08-27 20:34:19
 * @LastEditTime: 2020-09-24 21:21:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remax-templates\src\utils\util.js
 */

//去空格
export const trim = function (value: string) {
	return value.replace(/(^\s*)|(\s*$)/g, "");
}
//内容替换
export const replaceAll = function (text: string, repstr: string, newstr: string) {
	return text.replace(new RegExp(repstr, "gm"), newstr);
}
//格式化手机号码
export const formatNumber = function (num: string) {
	return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
}
//金额格式化
export const rmoney = function (money: string) {
	return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
		/\,$/, '').split('').reverse().join('');
}
//日期格式化
export const formatDate = function (formatStr: string, fdate: string) {
	if (fdate) {
		if (~fdate.indexOf('.')) {
			fdate = fdate.substring(0, fdate.indexOf('.'));
		}
		fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
		var fTime, fStr = 'ymdhis';
		if (!formatStr)
			formatStr = "y-m-d h:i:s";
		if (fdate)
			fTime = new Date(fdate);
		else
			fTime = new Date();
		let month: any = fTime.getMonth() + 1;
		let day: any = fTime.getDate();
		let hours: any = fTime.getHours();
		let minu: any = fTime.getMinutes();
		let second: any = fTime.getSeconds();
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;
		hours = hours < 10 ? ('0' + hours) : hours;
		minu = minu < 10 ? '0' + minu : minu;
		second = second < 10 ? '0' + second : second;
		let formatArr = [
			fTime.getFullYear().toString(),
			month.toString(),
			day.toString(),
			hours.toString(),
			minu.toString(),
			second.toString()
		]
		for (var i = 0; i < formatArr.length; i++) {
			formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
		}
		return formatStr;
	} else {
		return "";
	}
}
export const rgbToHex = function (r: string, g: string, b: string) {
	return "#" + toHex(r) + toHex(g) + toHex(b)
}
export const toHex = function (n: any) {
	n = parseInt(n, 10);
	if (isNaN(n)) return "00";
	n = Math.max(0, Math.min(n, 255));
	return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
		"0123456789ABCDEF".charAt(n % 16);
}
export const hexToRgb = function (hex: string) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

// 深拷贝
export const deepClone = (obj: any) => {
	let _obj = JSON.stringify(obj),
		objClone = JSON.parse(_obj)
	return objClone
}

// 浅拷贝
export const shallowClone = (obj: any) => {
	const _obj = Object.assign(typeof obj === 'object' ? {} : [], obj)
	return _obj
}