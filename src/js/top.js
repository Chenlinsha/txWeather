import { $, axios, isDay } from "./basic-tool.js"

// top的展示
window.addEventListener('load', function () {
    showTopMiddle(101010100)
    showTopAir(101010100)
})

$.getId('top-top-share').onclick = () => {
    alert('此功能未开放！！')
}
$.getId('top-top-turnBack').onclick = () => {
    alert('此功能未开放！！')
}
// 展示顶部左边的空气质量指数
// 参数：城市ID
// 接口文档：天气API
export function showTopAir(cityID) {
    axios.get(`https://v0.yiketianqi.com/api?version=v62&appid=76658471&appsecret=kku3yO9Y&cityid=${cityID}`).then((res) => {
        let box = $.getId('top-air')
        box.children[0].innerHTML = res.air
        box.children[1].innerHTML = res.air > 50 ? '良' : '优'
        box.style.backgroundColor = res.air > 50 ? 'rgb(234,205,85)' : '#add574'

    })
}


// 展示顶部中间的温度、温度概述、风向、风力等级、相对湿度、背景色的切换、顶部的城市
// 参数：城市ID
// 接口文档：和风天气
export function showTopMiddle(cityID) {
    axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${cityID}&key=4359373e7b464309af90e18de69be688`).then(res => {
        $.getId('top-top-position-city').innerHTML = res.location[0].adm2
    })
    axios.get(`https://devapi.qweather.com/v7/weather/now?location=${cityID}&key=4359373e7b464309af90e18de69be688`).then((res) => {
        console.log(res);
        $.getId('top-temperature').innerHTML = res.now.temp
        $.getId('top-wea').innerHTML = res.now.text
        $.getId('top-winAndSpeed').innerHTML = `${res.now.windDir} ${res.now.windScale}级`
        $.getId('top-humidity').innerHTML = res.now.humidity
        console.log(isDay(res.now.obsTime));
        if (res.now.text == '晴') {
            if (isDay(res.now.obsTime))
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(59,189,255),rgb(70,228,255))`
            else
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(49,57,120),rgb(89,154,194))`
        }
        else if (res.now.text == '阴') {
            if (isDay(res.now.obsTime))
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(134,195,202),rgb(171,225,225))`;
            else
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(134,195,202),rgb(173,227,227))`;
        }
        else if (res.now.text == '多云') {
            if (isDay(res.now.obsTime))
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(80,173,232),rgb(113,213,246))`;
            else
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(49,57,120),rgb(90,154,193))`;
        }
        else if (res.now.text == '阵雨' || res.now.text == '小雨' || res.now.text == '雷阵雨' || res.now.text == '中雨' || res.now.text == '大雨' || res.now.text == '暴雨') {
            if (isDay(res.now.obsTime))
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(68,106,128),rgb(146,185,194))`;
            else
                $.getClass('top').style.backgroundImage = `linear-gradient(rgb(68,106,128),rgb(146,185,194))`;
        }
    })
}