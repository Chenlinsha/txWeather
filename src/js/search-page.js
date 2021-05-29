import { $, axios } from "./basic-tool"
import { livingAll } from "./living";
let len = 3; //最大搜索历史记录长度
$.getId('top-top-position').addEventListener('touchstart', function () {
    $.getClass('search-page').style.transition = 'all .3s'
    $.getClass('search-page').style.transform = `translateY(0vh)`
})

$.getId('search-page-search-cancel').addEventListener('touchstart', function () {
    $.getClass('search-page').style.transition = 'all .3s'
    $.getClass('search-page').style.transform = `translateY(-100vh)`
    $.getClass('search-result').innerHTML = ''
    $.getId('search-page-search-input').value = ''
    $.getClass('search-page-hotCity').style.display = 'block'
    $.getClass('search-page-history').style.display = 'block'
})

// 搜索功能
$.getId('search-page-search-input').addEventListener('keyup', function searchCity() {
    $.getClass('search-page-hotCity').style.display = 'none'
    $.getClass('search-page-history').style.display = 'none'
    axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${$.getId('search-page-search-input').value}&range=cn&key=e456561a17a04bdaa286c9ce87cf177c`).then(res => {
        showSearchCity(res.location)
    })
})

// 显示搜索结果
// 参数： location：搜索结果的数组
function showSearchCity(location) {
    console.log(location);
    $.getClass('search-result').innerHTML = ''
    location.forEach(item => {
        let li = document.createElement('li')
        let p = document.createElement('p')
        li.appendChild(p)
        li.classList.add('search-result-li')
        p.innerHTML = item.adm1 + ',' + item.adm2 + ',' + item.name
        $.getClass('search-result').appendChild(li)
        li.addEventListener('click', function () {
            livingAll()
            searchHistory(item.adm2)
            showHistory()
        });
    });
}

// 历史搜索记录的储存
// 参数：搜索框内输入的内容
function searchHistory(searchValue) {
    if (searchValue == '') {
        return;
    }
    for (let key in localStorage) {
        if (searchValue == localStorage.getItem(key)) {
            return;
        }
    }
    localStorage.setItem(localStorage.length, searchValue);
    if (localStorage.length > len) {
        localStorage.removeItem(0);
        for (let i = 1; i <= len; i++) {
            let temp = localStorage.getItem(i)
            localStorage.removeItem(i)
            localStorage.setItem(i - 1, temp);
        }
    }
}

function showHistory() {
    let ul = $.getClass('search-page-history-ul').children
    for (let i = 0; i < 3; i++) {
        if (localStorage.getItem(i) != null) {
            for (let j = 2; j >= 0; j--) {
                if (ul[j].innerHTML == '') {
                    ul[j].innerHTML = localStorage.getItem(i)
                    break;
                }
            }
        }
    }
}

