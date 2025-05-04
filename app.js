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


selector_btn.addEventListener("click" , ()=>{
    if(date_selector.value == "default"){
        return 
    }
    loading(true)
    Promise.all([
     fetch(API+`reports?date=${date_selector.value}&iso=${country_selector.value}&per_page=1`).then(response => response.json())
    .then(response => {
        total.innerText = response.data[0]["confirmed"]
        death.innerText = response.data[0]["deaths"]
        recover.forEach(item => item.innerText = response.data[0]["recovered"])
    }).then(()=>{
    loading(false)
    }).catch((error)=>{
        console.log(error);
        loading(false)
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

function loading(bol){
    if(bol){
        load.style.display = "flex"
    }else if(!bol){
        load.style.display = "none"
    }
}
