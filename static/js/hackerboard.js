const profiles = JSON.parse(document.getElementById('board-data').textContent);
const colors =['white','blue','green','yellow','red']
let chartData=[]
let tableData=[]
profiles.forEach(profile => {
    let XY = []
    let timetaken = new Date(profile.data[0][0])
    profile.data.forEach(xy=>{
        XY.push({x:new Date(xy[0]),y:xy[1]})
        timetaken -= new Date(xy[0])
    });
    let chat_data = {
        label: profile.username,
        borderColor: colors.pop(),
        steppedLine: true,
        data: XY
    };
    let table_data ={
        user: profile.username,
        time : timetaken,
        score: profile.data[-1][1]
    }
    chartData.push(chat_data)
    tableData.push(table_data)
});

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: chartData
    },
    options: {
        scales: {
            yAxes: [{
                type: 'linear'
            }],
            xAxes: [{
                type: 'time',
                distribution: 'series', // or linear
                time: {
                    unit: 'minute',
                    displayFormats: {
                        minute: 'mm:ss'
                    },
                    tooltipFormat: 'mm:ss'
                }
            }]
        }
    }
});

let table = document.getElementById('table')
tableData.forEach(profile => {
    table.append(`
        <tr>
            <th scope="row">1</th>
            <td>${profile.username}</td>
            <td>8</td>
            <td>${profile.time}</td>
            <td>${profile.score}</td>
        </tr>
    `)
});

