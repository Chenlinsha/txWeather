import { $, axios, putWeatherImg } from './basic-tool.js'

window.addEventListener('load', function () {
    showDetail(101010100)
})

// 24小时内天气的展示
// 参数：cityID:城市ID
// 接口文档：和风天气
export function showDetail(cityID) {
    axios.get(`https://v0.yiketianqi.com/api?version=v62&appid=76658471&appsecret=kku3yO9Y&cityid=${cityID}`).then((res) => {
        $.getClass('todayDetail-ul').innerHTML = ''
        res.hours.forEach(item => {
            showHourDetail(item)
        });

    })
}

function showHourDetail(item) {
    let li = document.createElement('li')
    let time = document.createElement('p')
    let img = document.createElement('img')
    let temp = document.createElement('p')
    li.appendChild(time)
    li.appendChild(img)
    li.appendChild(temp)
    time.innerHTML = item.hours.indexOf('/') == -1 ? item.hours : '00:00'
    putWeatherImg(item.wea.indexOf('转') ? item.wea.split('转')[0] : item.wea, img)
    temp.innerHTML = item.tem + '°'
    $.getClass(`todayDetail-ul`).appendChild(li)

}