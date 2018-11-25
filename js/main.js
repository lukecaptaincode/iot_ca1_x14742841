let data_sound = [];
let data_light = [];
let mainDweet;
sound_array = [];
light_array = [];
$(document).ready(function () {
    const dweetName = 'luke-captains-iot-dweet';
    mainChart(dweetName);
    soundChart(dweetName);
    lightChart(dweetName);
    getLocalStorage();
});

function mainChart(dweetName) {
    let name = dweetName;
    let container = $('#container');
    let title = {
        text: 'All Sensor Data'
    };
    let xAxis = {
        type: 'datetime',
        tickPixelInterval: 150
    };
    let yAxis = {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };
    let tooltip = {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    };
    let plotOptions = {
        area: {
            pointStart: 2018,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    };
    let legend = {
        enabled: true
    };
    let exporting = {
        enabled: false
    };

    let series = [];

    dweetio.get_all_dweets_for(name, function (err, dweets) {
        console.log(err);
        console.log(data_sound);
        console.log(data_light);

        series = [{
            name: 'Sound data',
            data: (function () {
                for (theDweet in dweets.reverse()) {
                    let dweet = dweets[theDweet];

                    let val = dweet.content["Sound"];
                    data_sound.push(parseInt(val));
                    sound_array.push(dweet.created)
                }
                return data_sound;
            }())
        }, {
            name: 'Light data',
            data: (function () {
                for (theDweet in dweets.reverse()) {
                    let dweet = dweets[theDweet];

                    let val = dweet.content["Light"];
                    data_light.push(parseInt(val));
                    light_array.push(dweet.created)
                }
                return data_light;
            }())
        }];

        let json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.legend = legend;
        json.exporting = exporting;
        json.series = series;
        json.plotOptions = plotOptions;

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        container.highcharts(json);
        chart = container.highcharts();
        chart.xAxis[0].update({categories: sound_array}, true);
        chart.xAxis[0].update({categories: light_array}, true);
    });

    let chart = {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in IE < IE 10.
        marginRight: 10,
        events: {
            load: function () {
                // set up the updating of the chart every 3 seconds
                let series1 = this.series[0];
                let series2 = this.series[1];
                let soundVal;
                let lightVal;
                var created;
                setInterval(function () {

                    dweetio.get_all_dweets_for(name, function (err, dweets1) {
                        mainDweet = dweets1[0];
                        let dweet1 = mainDweet;
                        console.log("dweet: " + dweet1);

                        soundVal = parseInt(dweet1.content["Sound"]);
                        console.log("soundVal: " + soundVal);
                        lightVal = parseInt(dweet1.content["Light"]);
                        console.log("lightVal: " + lightVal);

                        created = dweet1["created"];
                        console.log("created: " + created);
                        series1.addPoint([soundVal], true, true);
                        series2.addPoint([lightVal], true, true);

                    });
                    console.log("soundVal out: " + soundVal);
                    console.log("lightVal out: " + lightVal);

                }, 3000);

            }
        }
    };
}
function soundChart(dweetName) {
    let container = $('#sound_chart');
    let title = {
        text: 'Sound Data'
    };
    let xAxis = {
        type: 'datetime',
        tickPixelInterval: 150
    };
    let yAxis = {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };
    let tooltip = {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    };
    let plotOptions = {
        area: {
            pointStart: 2018,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    };
    let legend = {
        enabled: true
    };
    let exporting = {
        enabled: false
    };

    let series = [];

    dweetio.get_all_dweets_for(dweetName, function (err, dweets) {
        console.log(err);
        console.log(data_sound);

        series = [{
            name: 'Sound data',
            data: (function () {
                return data_sound;
            }())
        }];

        let json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.legend = legend;
        json.exporting = exporting;
        json.series = series;
        json.plotOptions = plotOptions;

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        container.highcharts(json);
        chart = container.highcharts();
        chart.xAxis[0].update({categories: sound_array}, true);
    });

    let chart = {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in IE < IE 10.
        marginRight: 10,
        events: {
            load: function () {
                // set up the updating of the chart every 3 seconds
                let series1 = this.series[0];
                let soundVal;
                var created;
                setInterval(function () {
                        dweet1 = mainDweet;
                        console.log("dweet: " + dweet1);

                        soundVal = parseInt(dweet1.content["Sound"]);
                        console.log("soundVal: " + soundVal);

                        created = dweet1["created"];
                        console.log("created: " + created);
                        series1.addPoint([soundVal], true, true);
                        setLocalStorager(soundVal, created);
                        console.log("soundVal out: " + soundVal);

                }, 3000);

            }
        }
    };
}
function lightChart(dweetName) {
    let container = $('#light_chart');
    let title = {
        text: 'Light Data'
    };
    let xAxis = {
        type: 'datetime',
        tickPixelInterval: 150
    };
    let yAxis = {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };
    let tooltip = {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    };
    let plotOptions = {
        area: {
            pointStart: 2018,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    };
    let legend = {
        enabled: true
    };
    let exporting = {
        enabled: false
    };

    let series = [];

    dweetio.get_all_dweets_for(dweetName, function (err, dweets) {
        console.log(err);
        console.log(data_light);

        series = [{
            name: 'Light data',
            data: (function () {
                return data_light;
            }())
        }];

        let json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.legend = legend;
        json.exporting = exporting;
        json.series = series;
        json.plotOptions = plotOptions;

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        container.highcharts(json);
        chart = container.highcharts();
        chart.xAxis[0].update({categories: light_array}, true);
    });

    let chart = {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in IE < IE 10.
        marginRight: 10,
        events: {
            load: function () {
                // set up the updating of the chart every 3 seconds
                let series = this.series[0];
                let lightVal;
                var created;
                setInterval(function () {
                    dweet1 = mainDweet;
                    console.log("dweet: " + dweet1);

                    lightVal = parseInt(dweet1.content["Light"]);
                    console.log("soundVal: " + lightVal);

                    created = dweet1["created"];
                    console.log("created: " + created);
                    series.addPoint([lightVal], true, true);

                    console.log("LightVal out: " + lightVal);

                }, 3000);

            }
        }
    };
}
function setLocalStorager(val, date){
    console.info(val+date);
    let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')): [];
    console.info("1"+data);
    data.push({"val":val, "date": date});
    console.info("2"+data);
    localStorage.setItem('data', JSON.stringify(data));

}
function getLocalStorage(){
    console.log("Start local storage pull");
    let outpanel = $("#saved_data");
    let dataArray = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
    console.log(dataArray);
    outpanel.append("<ol>");
    for(let i = 0; i < dataArray.length; i++){
        console.log(dataArray[i]["val"]+"  "+dataArray[0]["date"]);
        outpanel.append("<li>"+dataArray[i]["val"]+"  "+dataArray[0]["date"]+"</li>");
    }
    outpanel.append("</ol>");
}