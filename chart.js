let xValuesG = ["2020-06" , "2020-07" ,"2020-08" ,"2020-09" ,"2020-10"];
let yValuesG = [];
let xValuesR = ["2020-06" , "2020-07" ,"2020-08" ,"2020-09" ,"2020-10"];;
let yValuesR = [];
const ctxG = document.getElementById('myChartGreen');
const ctxR = document.getElementById('myChartRed');

(function(){
    isloading(true)
    Promise.all([
        fetch('https://covid-api.com/api/reports/total?date=2020-06-01').then(res =>res.json()),
        fetch('https://covid-api.com/api/reports/total?date=2020-07-01').then(res =>res.json()),
        fetch('https://covid-api.com/api/reports/total?date=2020-08-05').then(res =>res.json()),
        fetch('https://covid-api.com/api/reports/total?date=2020-09-03').then(res =>res.json()),
        fetch('https://covid-api.com/api/reports/total?date=2020-10-05').then(res =>res.json()),
    ]).then(item => {
        item.forEach(i =>{
            yValuesG.push(i.data["recovered"])
            yValuesR.push(i.data["deaths"])
        })
        console.log(yValuesG , yValuesR);
    }).then(()=>{
        new Chart(ctxG, {
            type: "line",
            data: {
              labels: xValuesG,
              datasets: [{
                data: yValuesG,
                borderColor: "green",
                fill: false
              }]
            },
            options: {
              legend: {display: false}
            }
          });
          
          
          new Chart(ctxR, {
            type: "line",
            data: {
              labels: xValuesR,
              datasets: [{
                data: yValuesR,
                borderColor: "red",
                fill: false
              }]
            },
            options: {
              legend: {display: false}
            }
          });
          isloading(false)
    } ).catch(error =>{
        isloading(false)
        console.log("chart :" , error);
    })
})()
