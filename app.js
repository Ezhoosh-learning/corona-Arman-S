const API = "https://covid-api.com/api/" ;

const country_selector = document.getElementById('country-select');
const date_selector = document.getElementById("date-select");
const selector_btn = document.querySelector(".selector-btn");
const total = document.getElementById("total");
const recover = document.querySelectorAll(".recover");
const death = document.getElementById("death");
const load = document.getElementById('loading')
const statistics_infect = document.getElementById("statistics-infect");
const statistics_recover = document.getElementById('statistics-recover')
const statistics_death = document.getElementById("statistics-death");
const statistics_total = document.getElementById('statistics-total')
const world_infect = document.getElementById("world-infect");
const world_recover = document.getElementById('world-recover')
const world_death = document.getElementById("world-death");
const world_total = document.getElementById('world-total');


(function() {
    isloading(true)
    fetch(API+"reports/total").then(response => response.json())
    .then(response => {
        world_total.innerText = response.data["confirmed"]
        world_recover.innerText = response.data["recovered"]
        world_infect.innerText = response.data["active"]
        world_death.innerText = response.data["deaths"]
    }).catch(error=> {
        console.log("worldWide : " , error)
    })
})()




selector_btn.addEventListener("click" , ()=>{
    if(date_selector.value == "default" || country_selector.value == "default"){
        alert("select country and date")
        return 
    }
    isloading(true)
    Promise.all([
     fetch(API+`reports?date=${date_selector.value}&iso=${country_selector.value}&per_page=1`).then(response => response.json())
    .then(response => {
        total.innerText = response.data[0]["confirmed"]
        death.innerText = response.data[0]["deaths"]
        recover.forEach(item => item.innerText = response.data[0]["recovered"])
    }).then(()=>{
    isloading(false)
    }).catch((error)=>{
        console.log("input selector : " ,error);
        isloading(false)
    }),
    fetch(API+`reports?iso=${country_selector.value}&per_page=1`).then(response => response.json())
    .then(response =>{
        statistics_total.innerText = response.data[0]["confirmed"]
        statistics_recover.innerText = response.data[0]["recovered"]
        statistics_infect.innerText = response.data[0]["active"]
        statistics_death.innerText = response.data[0]["deaths"]
    }).catch(error=> console.log("statistics : " , error))
    ])
})

 function isloading(bol){
    if(bol){
        load.style.display = "flex"
    }else if(!bol){
        load.style.display = "none"
    }
}




