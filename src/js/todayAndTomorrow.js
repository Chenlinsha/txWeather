import { $, axios, isDay } from "./basic-tool.js"
import dayQing from '../images/todayAndTomorrow/day/qing.png'
import dayYu from '../images/todayAndTomorrow/day/yu.png'
import dayYun from '../images/todayAndTomorrow/day/yun.png'
import dayYin from '../images/todayAndTomorrow/day/yin.png'
import nightQing from '../images/todayAndTomorrow/night/qing.png'
import nightYu from '../images/todayAndTomorrow/night/yu.png'
import nightYun from '../images/todayAndTomorrow/night/yun.png'
import nightYin from '../images/todayAndTomorrow/night/yin.png'

// 今明两天天气的展示
window.addEventListener('load', function () {
    showdtodayAndTomorrow(101010100)
})

// 展示今明两天的展示
// 参数：cityID:城市ID
// 接口文档：和风天气
export function showdtodayAndTomorrow(cityID) {
    axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${cityID}&key=4359373e7b464309af90e18de69be688`).then((res) => {
        let today = $.getClass('todayAndTomorrow-today')
        let tomorrow = $.getClass('todayAndTomorrow-tomorrow')
        Showday(res.daily[0], today)
        Showday(res.daily[1], tomorrow)
    })
}

function Showday(weather, box) {
    // 白天夜晚的天气概述
    box.children[2].innerHTML = weather.textDay == weather.textNight ? weather.textDay : `${weather.textDay}转${weather.textNight}`
    // 最高温/最低温
    box.children[1].innerHTML = `${weather.tempMax}/${weather.tempMin}`
    // 天气图标
    if (weather.textDay == '晴') {
        if (isDay())
            box.children[3].src = dayQing;
        else
            box.children[3].src = nightQing;
    }
    else if (weather.textDay == '阴') {
        if (isDay())
            box.children[3].src = dayYin;
        else
            box.children[3].src = nightYin;
    }
    else if (weather.textDay == '多云') {
        if (isDay())
            box.children[3].src = dayYun;
        else
            box.children[3].src = nightYun;
    }
    else if (weather.textDay == '阵雨') {
        if (isDay())
            box.children[3].src = dayYu;
        else
            box.children[3].src = nightYu;
    }
}