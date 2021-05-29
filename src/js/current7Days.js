import { $, axios, theDay, getWeekDate, dataYesterday, putWeatherImg } from './basic-tool.js'
import Chart from 'chart.js';

window.addEventListener('load', function () {
    showYesterday(101010100)
    show7Days(101010100)
})

// 昨天天的展示
// 参数：cityID:城市ID
// 接口文档：天气API
function showYesterday() {
    showDays(dataYesterday)
}

// 7天的展示
// 参数：cityID:城市ID
// 接口文档：天气API
function show7Days(cityID) {
    axios.get(`https://v0.yiketianqi.com/api?version=v9&appid=76658471&appsecret=kku3yO9Y&cityid=${cityID}`).then((res) => {
        console.log(res);
        console.log(res.data);
        res.data.forEach((item, index) => { showDays(item, index) });
    })
}

function showDays(weather, index) {
    let div = document.createElement('div')
    let WhatDay = document.createElement('p')
    let date = document.createElement('p')
    let weaDay = document.createElement('p')
    let weaNight = document.createElement('p')
    let tempDay = document.createElement('p')
    let tempNight = document.createElement('p')
    let img1 = document.createElement('img')
    let img2 = document.createElement('img')
    let wind = document.createElement('p')
    $.getClass('current7Days').appendChild(div)
    div.appendChild(WhatDay)
    div.appendChild(date)
    div.appendChild(weaDay)
    div.appendChild(img1)
    div.appendChild(tempDay)
    div.appendChild(tempNight)
    div.appendChild(img2)
    div.appendChild(weaNight)
    div.appendChild(wind)
    // 获得距离今天是什么时候
    if (theDay(new Date(weather.date).getTime()) == 'today')
        WhatDay.innerHTML = '今天'
    else if (theDay(new Date(weather.date).getTime()) == 'tomorrow')
        WhatDay.innerHTML = '明天'
    else if (theDay(new Date(weather.date).getTime()) == 'aferTomorrow')
        WhatDay.innerHTML = '后天'
    else if (theDay(new Date(weather.date).getTime()) == 'yesterday')
        WhatDay.innerHTML = '昨天'
    else {
        WhatDay.innerHTML = getWeekDate(new Date(weather.date).getTime())
    }
    date.innerHTML = `${weather.date.split('-')[1]}/${weather.date.split('-')[2]}`
    weaDay.innerHTML = weather.wea_day
    putWeatherImg(weather.wea_day, img1)
    tempDay.innerHTML = weather.tem1 + '°'
    tempNight.innerHTML = weather.tem2 + '°'
    putWeatherImg(weather.wea_night, img2)
    weaNight.innerHTML = weather.wea_night
    wind.innerHTML = weather.win[0]
}