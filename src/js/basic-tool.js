import { mock } from 'mockjs';
const Mock = require('mockjs')
import dayQing from '../images/todayAndTomorrow/day/qing.png'
import dayYu from '../images/todayAndTomorrow/day/yu.png'
import dayYun from '../images/todayAndTomorrow/day/yun.png'
import dayYin from '../images/todayAndTomorrow/day/yin.png'
import nightQing from '../images/todayAndTomorrow/night/qing.png'
import nightYu from '../images/todayAndTomorrow/night/yu.png'
import nightYun from '../images/todayAndTomorrow/night/yun.png'
import nightYin from '../images/todayAndTomorrow/night/yin.png'


export const $ = {
    getClass: name => document.querySelector(`.${name}`),
    getAllClass: name => document.querySelectorAll(`.${name}`),
    getId: name => document.querySelector(`#${name}`),
};

export const axios = {
    __internal(method, url, data = null) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.send(data);
            xhr.onload = () => {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { // 分析响应的 HTTP 状态
                    resolve(JSON.parse(xhr.response))
                } else {
                    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
                }
            };
            xhr.onerror = (err) => {
                reject(new Error({
                    Text: "error!!!",
                    error: err
                }))
            }
        })
    },
    get(url) {
        return this.__internal('GET', url)
    },
    post(url, data) {
        return this.__internal('POST', url, data)
    }
}

export const isDay = () => {
    var currdate = new Date();
    if (currdate.getHours() >= 7 && currdate.getHours() < 18) {
        return true;
    } else {
        return false;
    }
}

export const isYesterday = (time) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${year}/${month}/${day}`;
    const todayTime = new Date(today).getTime(); // 当天凌晨的时间
    const yesterdayTime = new Date(todayTime - 24 * 60 * 60 * 1000).getTime(); // 昨天凌晨的时间
    return time < todayTime && yesterdayTime <= time;
}

export const theDay = (day) => {
    let d = new Date(day).setHours(0, 0, 0, 0);
    let today = new Date().setHours(0, 0, 0, 0);
    let obj = {
        '-86400000': 'yesterday',
        0: 'today',
        86400000: 'tomorrow',
        172800000: 'aferTomorrow'
    };
    return obj[d - today] || 'wrong';
};

export const getWeekDate = (date) => {
    var now = new Date(date);
    var day = now.getDay();
    var weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    var week = weeks[day];
    return week;
}

// 使用 Mock
let day1 = new Date();
day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
let s1 = day1.getFullYear() + "-" + (day1.getMonth() > 8 ? day1.getMonth() + 1 : `0${day1.getMonth() + 1}`) + "-" + (day1.getDate() > 9 ? day1.getDate() : `0${day1.getDate()}`);
export const dataYesterday = Mock.mock({
    date: s1,
    tem_day: Mock.Random.natural(10, 30),
    tem_night: Mock.Random.natural(10, 20),
    wea: "晴转小雨",
    wea_img: "yu",
    win: "东北风",
    win_speed: "3-4级转<3级",
})

export const putWeatherImg = (weather, where) => {
    if (weather == '晴') {
        if (isDay())
            where.src = dayQing;
        else
            where.src = nightQing;
    }
    else if (weather == '阴') {
        if (isDay())
            where.src = dayYin;
        else
            where.src = nightYin;
    }
    else if (weather == '多云') {
        if (isDay())
            where.src = dayYun;
        else
            where.src = nightYun;
    }
    else if (weather == '阵雨' || weather == '小雨' || weather == '雷阵雨') {
        if (isDay())
            where.src = dayYu;
        else
            where.src = nightYu;
    }
}