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
    axios.get(`https://www.tianqiapi.com/free/week?appid=76658471&appsecret=kku3yO9Y&cityid=${cityID}`).then((res) => {
        console.log(res.data);
        res.data.forEach((item, index) => { showDays(item, index) });
    })
}

function showDays(weather, index) {
    let div = document.createElement('div')
    let WhatDay = document.createElement('p')
    let date = document.createElement('p')
    let wea = document.createElement('p')
    let img1 = document.createElement('img')
    $.getClass('current7Days').appendChild(div)
    div.appendChild(WhatDay)
    div.appendChild(date)
    div.appendChild(wea)
    div.appendChild(img1)
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
    wea.innerHTML = weather.wea.indexOf('转') ? weather.wea.split('转')[0] : weather.wea
    putWeatherImg(weather.wea.indexOf('转') ? weather.wea.split('转')[0] : weather.wea, img1)
}
