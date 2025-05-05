import * as coun from "./country_icon.json" with { type : 'json'}

const API = "https://covid-api.com/api/" ;

const API_HEALTH = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

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
const blog_grid = document.querySelector(".blog-grid");
const btn_loader = document.getElementById('btn-loader');
const btn_loader_text = document.getElementById('btn-loader-text');


(function() {
    isloading(true)
    Promise.all([
    fetch(API+"reports/total").then(response => response.json())
    .then(response => {
        world_total.innerText = response.data["confirmed"]
        world_recover.innerText = response.data["recovered"]
        world_infect.innerText = response.data["active"]
        world_death.innerText = response.data["deaths"]
    }).catch(error=> {
        console.log("worldWide : " , error)
    }),
    fetch(API_HEALTH).then(response => response.json())
    .then(res => {
        return res.articles.slice(45,50)
    }).then(res => {
        const HTML_BLOG = `<div class="blog-part1" style="background-image: url(${res[0].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[0].url}>${res[0].title.slice(0,50) + "..."}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[0].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[0].author || "unknown"}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part2" style="background-image: url(${res[1].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[1].url}>${res[1].title.slice(0,50) + "..."}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[1].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[1].author || "unknown"}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part3" style="background-image: url(${res[2].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[2].url}>${res[2].title.slice(0,50) + "..."}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[2].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[2].author || "unknown"}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part4" style="background-image: url(${res[3].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[3].url}>${res[3].title.slice(0,50) + "..."}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[3].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[3].author || "unknown"}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part5" style="background-image: url(${res[4].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[4].url}>${res[4].title.slice(0,50) + " ..."}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[4].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[4].author || "unknown"}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>`
          return HTML_BLOG
    }).then(html =>{
        blog_grid.insertAdjacentHTML("beforeend" , html)
    }),
    fetch(API + "regions?per_page=50&").then(res => res.json())
    .then(res => {
      res.data.map(item =>{
        let flag = coun.default.filter(elm =>{
          const regex = new RegExp(`${item.iso.slice(0,1)}(${item.iso.slice(1,2)}|${item.iso.slice(2,3)})`);
          return (elm.code.match(regex) && elm.name == item.name)
        })
        if(flag[0] != undefined){
          const option_html= `<option value="${item.iso}">${flag[0].flag} &nbsp ${item.name}</option>`
          country_selector.insertAdjacentHTML("beforeend" , option_html) 
        }
      })
    })
    ])
})()



selector_btn.addEventListener("click" , ()=>{
    if(date_selector.value == "default" || country_selector.value == "default"){
        alert("select country and date")
        return 
    }
    isloadingbtn(true)
    Promise.all([
     fetch(API+`reports?date=${date_selector.value}&iso=${country_selector.value}&per_page=1`).then(response => response.json())
    .then(response => {
        total.innerText = response.data[0]["confirmed"]
        death.innerText = response.data[0]["deaths"]
        recover.forEach(item => item.innerText = response.data[0]["recovered"])
    }).then(()=>{
    isloadingbtn(false)
    }).catch((error)=>{
        console.log("input selector : " ,error);
        isloadingbtn(false)
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

    

function isloadingbtn(bol){
  if(bol){
      selector_btn.style.backgroundColor = "gray"
      btn_loader_text.style.display = "none"
      btn_loader.style.display = "block"
  }else if(!bol){
      selector_btn.style.backgroundColor = "#00E6B5"
      btn_loader.style.display = "none"
      btn_loader_text.style.display = "unset"
  }
}

 function isloading(bol){
    if(bol){
        load.style.display = "flex"
    }else if(!bol){
        load.style.display = "none"
    }
}




