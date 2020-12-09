$(window).resize(function() {
    $("meta[name=viewport]").attr('content', "width=1024, initial-scale=-1.0");
}).resize(); 

const profiles = JSON.parse(document.getElementById('board-data').textContent);
const colors =['white','blue','green','yellow','red']
let chartData=[]
let tableData=[]
console.log(profiles)
profiles.forEach(profile => {
    if(profile.data.length !== 0){
        let XY = []
        let starttime = new Date(profile.data[0][0]);
        profile.data.forEach(xy=>{
            XY.push({x:new Date(xy[0]),y:xy[1]})
            endtime = new Date(xy[0])
        });
        let chat_data = {
            label: profile.username,
            borderColor: colors.pop(),
            steppedLine: true,
            data: XY
        };
        let table_data ={
            user: profile.username,
            solved: profile.correct,
            time : timeDiffCalc(endtime, starttime),
            score: profile.finalScore,
            millisec: Math.abs(endtime - starttime) / 1000
        }
        chartData.push(chat_data)
        tableData.push(table_data)
    }
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
                    unit: 'month',
                    displayFormats: {
                        month: 'MMM D h:mm a'
                    },
                    tooltipFormat: 'MMM D h:mm a'
                }
            }]
        }
    }
});
function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
        difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }
    if(hours > 0){
        difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
    }

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

    return difference;
}
for(let i=0;i<tableData.length-1;i++){
    if(tableData[i].score === tableData[i+1].score){
        if(tableData[i].millisec > tableData[i+1].millisec){
            [tableData[i],tableData[i+1]] = [tableData[i+1],tableData[i]]
        }
    }
}
let table = document.getElementById('table')
let table_html=''
tableData.forEach((profile,idx) => {
    table_html+=`
    <tr>
        <th scope="row">${idx+1}</th>
            <td>${profile.user}</td>
            <td>${profile.solved}</td>
            <td>${profile.time}</td>
            <td>${profile.score}</td>
    </tr>
    `
});
table.innerHTML = table_html