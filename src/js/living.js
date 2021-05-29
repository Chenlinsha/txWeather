import { $, axios } from "./basic-tool";
import huazhuang from '../images/living/kouhong.png'
import liangshai from '../images/living/liangshai.png'
import ganmao from '../images/living/pill.png'
import yundong from '../images/living/sports.png'
import ziwaixian from '../images/living/sun.png'
import taiyangjing from '../images/living/umbrella.png'
import xiche from '../images/living/car.png'
import kongtiao from '../images/living/temp.png'
import lvyou from '../images/living/lvyou.png'
import guomin from '../images/living/cold.png'
import shushifu from '../images/living/smile.png'
import jiaotong from '../images/living/limit.png'
import kongqiwuran from '../images/living/air.png'
import chuanyi from '../images/living/cloth.png'
import diaoyu from '../images/living/diaoyu.png'

export let livingAll = function (cityID) {
    axios.get(`https://devapi.qweather.com/v7/indices/1d?type=0&location=${cityID}&key=4359373e7b464309af90e18de69be688`).then(res => {
        console.log(res);
        let daily = res.daily
        for (let i = 0; i < 8; i++) {
            showLiving(daily[i], daily[i].type, i, $.getClass('living-1').children[i]);
        }
        for (let i = 8; i < 16; i++) {
            showLiving(daily[i], daily[i].type, i, $.getClass('living-2').children[i - 8]);
        }
    })
}

window.addEventListener('load', function () {
    livingAll(101010100)
})

function showLiving(daily, type, i, box) {
    box.innerHTML = ''
    let des = document.createElement('p')
    let name = document.createElement('p')
    let img = document.createElement('img')
    box.appendChild(img)
    box.appendChild(des)
    box.appendChild(name)
    des.innerHTML = daily.category
    name.innerHTML = daily.name
    switch (parseInt(type)) {
        case 1:
            img.src = yundong
            break;
        case 2:
            img.src = xiche
            break;
        case 3:
            img.src = chuanyi
            break;
        case 4:
            img.src = diaoyu
            break;
        case 5:
            img.src = ziwaixian
            break;
        case 6:
            img.src = lvyou
            break;
        case 7:
            img.src = guomin
            break;
        case 8:
            img.src = shushifu
            break;
        case 9:
            img.src = ganmao
            break;
        case 10:
            img.src = kongqiwuran
            name.innerHTML = '空气污染条件'
            break;
        case 11:
            img.src = kongtiao
            break;
        case 12:
            img.src = taiyangjing
            break;
        case 13:
            img.src = huazhuang
            break;
        case 14:
            img.src = liangshai
            break;
        case 15:
            img.src = jiaotong
            break;
        case 16:
            img.src = ziwaixian
            break;
        default:
            break;
    }
}

let fingerX = 0;
let moveX = 0;
let box = $.getClass('living')
let width = box.offsetWidth;
let index = 0;
box.addEventListener('touchstart', function (e) {
    fingerX = e.targetTouches[0].pageX;
    e.preventDefault()
})
box.addEventListener('touchmove', function (e) {
    box.style.transition = 'none'
    moveX = e.targetTouches[0].pageX - fingerX;
    box.style.transform = `translateX(${moveX - index * (width / 2)}px)`
})
box.addEventListener('touchend', function (e) {
    if (Math.abs(moveX) > 50) {
        if (moveX < 0) {
            index++;
            if (index > 1) {
                index--;
            }
            else {
                $.getClass('living-current2').className = 'living-current1'
                $.getClass('living-current1').className = 'living-current2'
            }
            box.style.transition = 'all .2s'
            box.style.transform = `translateX(${index * (-width / 2)}px)`

        }
        else {
            index--;
            if (index < 0) {
                index++;
            }
            else {
                $.getClass('living-current1').className = 'living-current2'
                $.getClass('living-current2').className = 'living-current1'
            }
            box.style.transform = `translateX(${index * (width / 2)}px)`
            box.style.transition = 'all .2s'
        }
    }
    else {
        box.style.transform = `translateX(${index * (width / 2)}px)`
        box.style.transition = 'all .2s'
    }
})

livingAll()