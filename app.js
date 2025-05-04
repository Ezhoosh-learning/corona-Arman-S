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
                <a href=${res[0].url}>${res[0].title}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[0].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[0].author}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part2" style="background-image: url(${res[1].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[1].url}>${res[1].title}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[1].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[1].author}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part3" style="background-image: url(${res[2].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[2].url}>${res[2].title}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[2].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[2].author}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part4" style="background-image: url(${res[3].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[3].url}>${res[3].title}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[3].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[3].author}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>
          <div class="blog-part5" style="background-image: url(${res[4].urlToImage})">
            <div class="blog-info">
              <div class="blog-part-topic">
                <div></div>
                <a href=${res[4].url}>${res[4].title}</a>
              </div>
              <div class="blog-part-data">
                <div>
                  <img src="assets/icons/datewhite.png" />
                  <p>${res[4].publishedAt}</p>
                </div>
                <div>
                  <img src="assets/icons/person.png" />
                  <p>${res[4].author}</p>
                </div>
              </div>
            </div>
            <div class="blog-part-shadow"></div>
          </div>`
          return HTML_BLOG
    }).then(html =>{
        blog_grid.insertAdjacentHTML("beforeend" , html)
    })
    ])
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




