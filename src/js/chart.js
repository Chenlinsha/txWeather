import { $, axios } from "./basic-tool";

var ctx = document.getElementById('myChart').getContext('2d');
let dataDay = [0, 0, 0, 0, 0, 0, 0];
let dataNight = [0, 0, 0, 0, 0, 0, 0];
export function showChart(cityID) {
    axios.get(`https://v0.yiketianqi.com/api?version=v9&appid=76658471&appsecret=kku3yO9Y&cityid=${cityID}`).then((res) => {
        let data = res.data
        for (let i = 0; i < 7; i++) {
            dataDay[i] = data[i].tem1
            dataNight[i] = data[i].tem2
        }
        console.log(dataDay);
        console.log(dataNight);
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataDay,
                datasets: [{
                    data: dataDay,
                    borderColor: '#f4ba61',
                    backgroundColor: '#f4ba61',
                    borderWidth: 1,
                    fill: false,
                }, {
                    data: dataNight,
                    borderColor: '#70c0f2',
                    backgroundColor: '#70c0f2',
                    borderWidth: 1,
                    fill: false,
                },]
            },
            options: {
                tooltips: {
                    intersect: false,
                    mode: 'index'
                },
                legend: { display: false },
                "scales": {
                    scaleSteps: 10,

                    scaleStepWidth: 5,

                    scaleStartValue: 0,
                    "yAxes": [{
                        "ticks": { "beginAtZero": true },
                        display: false,

                    }],
                    xAxes: [{
                        display: false
                    }]
                }
            }
        });
    })
}
showChart(101010110)

