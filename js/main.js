const elSiteHeaderSettings = document.querySelector(".site-header__settings");
const elSiteHeaderLogin = document.querySelector(".site-header__login");
const settings = document.querySelector(".settings");
const settingsButton = document.querySelector(".settings-button");
const login = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const loginTitle = login.querySelector(".login-title");
const registerBtn = login.querySelector(".register-btn");
const loginClose = login.querySelector(".login-close");
const themeSwitcher = document.querySelector(".theme-switcher");

// Daily plan
const timePlan = document.querySelector(".time-format-list");
const timeDaily = timePlan.querySelector(".time-format-daily");
const timeWeekly = timePlan.querySelector(".time-format-weekly");
const timeMonthly = timePlan.querySelector(".time-format-monthly");

// Weekly plan
const timeTable = document.querySelector(".time-table");

// Monthly plan
const timeTableMonthly = document.querySelector(".time-table-monthly")

// Form
const hero = document.querySelector(".hero")
const timeForm = document.querySelector(".hero__form");
const timeRegionShow = document.querySelector(".hero__subtitle")
const timeInput = timeForm.querySelector(".hero__input");
const timeList = document.querySelector(".time-list");
const timeItem = document.querySelectorAll(".time-item");
const timeBomdod = document.querySelector(".time-bomdod");
const timePeshin = document.querySelector(".time-peshin");
const timeAsr = document.querySelector(".time-asr");
const timeShom = document.querySelector(".time-shom");
const timeXufton = document.querySelector(".time-xufton");
const timeName = document.querySelector(".time-name");
const heroSubtitle = document.querySelector(".hero__subtitle");
const timeFormatList = document.querySelector(".time-format-list")
const heroTitle = document.querySelector(".hero__title");

// Font size
const elFontSize = document.querySelector(".font-size");
let size = 16;

// Header option
const twoOptionWrapper = document.querySelector(".site-header__left-wrapper");

// Surah 
const elTemplate = document.querySelector(".template").content;
const elAudioList = document.querySelector(".audio__list");
const newFragment = new DocumentFragment();

// Nasheed 
const nasheedList = document.querySelector(".nasheed__list");

// Entrance Modal
// const elEntrance = document.querySelector(".entrance");
// const elEntranceBtn = elEntrance.querySelector(".entrance__btn");
// const record = new webkitSpeechRecognition()
// record.lang = "en-EN"
// console.log(record);

function modalEvents(){
    // Settings Modal
    elSiteHeaderSettings.addEventListener("click", function(){
        settings.classList.add("settings--active")
    });
    
    settingsButton.addEventListener("click", () => {
        settings.classList.remove("settings--active");
    });
    
    // Login Modal
    elSiteHeaderLogin.addEventListener("click", ()=>{
        login.classList.add("login--active");
    });
    
    loginClose.addEventListener("click", () =>{
        login.classList.remove("login--active");
    });
    
    registerBtn.addEventListener("click", () =>{
        loginTitle.textContent = "Register";
        loginForm.classList.add("login-form--active");
        registerForm.classList.add("register-form--active");
    });
    
    themeSwitcher.addEventListener("click", (evt) =>{
        if(evt.target.matches(".theme-moon")){
            body.classList.add("theme-button");
            body.classList.remove("theme-button-dark");
            window.localStorage.setItem("mode", "theme-button");
        }
        else if(evt.target.matches(".theme-star")){
            body.classList.add("theme-button-dark");
            body.classList.remove("theme-button");
            window.localStorage.setItem("mode", "theme-button-dark");
        }
        else if(evt.target.matches(".theme-default")){
            body.classList.remove("theme-button");
            body.classList.remove("theme-button-dark");
            window.localStorage.setItem("mode", "theme-default");
        }
    })
}
modalEvents()

const userMode = localStorage.getItem("mode")
body.classList.add(userMode) 



timeForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    const timeInputValue = timeInput.value.trim();
    fetchTime(timeInputValue);
    fetchWeek(timeInputValue);
    fetchMonth(timeInputValue);
})

function fetchTime(region){
    fetch(`https://islomapi.uz/api/present/day?region=${region}`)
    .then(res => res.json())
    .then(data => {
        timeRegionShow.textContent = data.region;
        const dataTime = data.times;
        timeBomdod.textContent = dataTime.quyosh;
        timePeshin.textContent = dataTime.peshin;
        timeAsr.textContent = dataTime.asr;
        timeShom.textContent = dataTime.shom_iftor;
        timeXufton.textContent = dataTime.hufton;
    })
    .catch(error => console.log(error))
}

function fetchDefault(){
    fetch("https://islomapi.uz/api/present/day?region=Toshkent")
    .then(res => res.json())
    .then(data => {
        timeRegionShow.textContent = data.region;
        const dataTime = data.times;
        timeBomdod.textContent = dataTime.quyosh;
        timePeshin.textContent = dataTime.peshin;
        timeAsr.textContent = dataTime.asr;
        timeShom.textContent = dataTime.shom_iftor;
        timeXufton.textContent = dataTime.hufton;
    })
    .catch(error => console.log(error))
}
fetchDefault()

timePlan.addEventListener("click", (evt)=>{
    evt.preventDefault();
    if(evt.target.matches(".time-format-daily")){
        timeItem.forEach(item =>{
            item.style.display = "block"
            timeTable.style.display = "none"
            timeTableMonthly.style.display = "none"
        })
        
        timeDaily.classList.add("time-format-item--active")
        timeWeekly.classList.remove("time-format-item--active")
        timeMonthly.classList.remove("time-format-item--active")
    }else if(evt.target.matches(".time-format-weekly")){
        timeItem.forEach(item =>{
            item.style.display = "none"
            timeTable.style.display = "block"
            timeTableMonthly.style.display = "none"
        })
        timeDaily.classList.remove("time-format-item--active")
        timeMonthly.classList.remove("time-format-item--active")
        timeWeekly.classList.add("time-format-item--active")
    }else if(evt.target.matches(".time-format-monthly")){
        timeItem.forEach(item =>{
            item.style.display = "none"
            timeTable.style.display = "none"
            timeTableMonthly.style.display = "block"
        })  
        timeDaily.classList.remove("time-format-item--active")
        timeMonthly.classList.add("time-format-item--active")
        timeWeekly.classList.remove("time-format-item--active")
    }
})


// Weekly Plan func
function fetchWeek(region){
    fetch(`https://islomapi.uz/api/present/week?region=${region}`)
    .then(res => res.json())
    .then(data => {
        timeTable.innerHTML = ""
        let liHead = document.createElement("li")
        liHead.classList.add("time-table-item")
        
        let headWeek = document.createElement("p")
        headWeek.classList.add("time-default")
        headWeek.textContent = "Hafta:"
        
        let headDate = document.createElement("p")
        headDate.classList.add("time-default")
        headDate.textContent = "Sana:"
        
        let headMorning = document.createElement("p")
        headMorning.classList.add("time-default")
        headMorning.textContent = "Saharlik:"
        
        let headSun = document.createElement("p")
        headSun.classList.add("time-default")
        headSun.textContent = "Quyosh:"
        
        let headPeshin = document.createElement("p")
        headPeshin.classList.add("time-default")
        headPeshin.textContent = "Asr:"
        
        let headAsr = document.createElement("p")
        headAsr.classList.add("time-default")
        headAsr.textContent = "Asr:"
        
        let headShom = document.createElement("p")
        headShom.classList.add("time-default")
        headShom.textContent = "Shom:"
        
        let headXufton = document.createElement("p")
        headXufton.classList.add("time-default")
        headXufton.textContent = "Xufton:"
        
        liHead.appendChild(headWeek);
        liHead.appendChild(headDate);
        liHead.appendChild(headMorning);
        liHead.appendChild(headSun);
        liHead.appendChild(headPeshin);
        liHead.appendChild(headAsr);
        liHead.appendChild(headShom);
        liHead.appendChild(headXufton);
        timeTable.appendChild(liHead);
        data.forEach(item => {
            const itemTimes = item.times;
            
            let liElement = document.createElement("li");
            liElement.classList.add("time-table-item");
            let day = document.createElement("p");
            day.textContent = item.weekday;
            day.classList.add("time-default");
            
            let date = document.createElement("p");
            date.textContent = item.date.split(",", 1).join("");
            date.classList.add("time-default");
            
            let saharlik = document.createElement("p");
            saharlik.textContent = itemTimes.tong_saharlik;
            saharlik.classList.add("time-default");
            
            let sun = document.createElement("p");
            sun.textContent = itemTimes.quyosh;
            sun.classList.add("time-default");
            
            let peshin = document.createElement("p");
            peshin.textContent = itemTimes.peshin;
            peshin.classList.add("time-default");
            
            let asr = document.createElement("p");
            asr.textContent = itemTimes.asr;
            asr.classList.add("time-default");
            
            let shom = document.createElement("p");
            shom.textContent = itemTimes.shom_iftor;
            shom.classList.add("time-default");
            
            let xufton = document.createElement("p");
            xufton.textContent = itemTimes.hufton;
            xufton.classList.add("time-default");
            
            liElement.appendChild(day);
            liElement.appendChild(date);
            liElement.appendChild(saharlik);
            liElement.appendChild(sun);
            liElement.appendChild(peshin);
            liElement.appendChild(asr);
            liElement.appendChild(shom);
            liElement.appendChild(xufton);
            timeTable.appendChild(liElement);    
        });
    })
    .catch(error => console.log(error))
}

function fetchWeeklyDefault(){
    fetch("https://islomapi.uz/api/present/week?region=Toshkent")
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const itemTimes = item.times;
            let liElement = document.createElement("li");
            liElement.classList.add("time-table-item")
            let day = document.createElement("p")
            day.textContent = item.weekday
            day.classList.add("time-default")
            
            let date = document.createElement("p")
            date.textContent = item.date.split(",", 1).join("")
            date.classList.add("time-default")
            
            let saharlik = document.createElement("p")
            saharlik.textContent = itemTimes.tong_saharlik
            saharlik.classList.add("time-default")
            
            let sun = document.createElement("p")
            sun.textContent = itemTimes.quyosh
            sun.classList.add("time-default")
            
            let peshin = document.createElement("p")
            peshin.textContent = itemTimes.peshin
            peshin.classList.add("time-default")
            
            let asr = document.createElement("p")
            asr.textContent = itemTimes.asr;
            asr.classList.add("time-default")
            
            let shom = document.createElement("p")
            shom.textContent = itemTimes.shom_iftor;
            shom.classList.add("time-default")
            
            let xufton = document.createElement("p")
            xufton.textContent = itemTimes.hufton;
            xufton.classList.add("time-default")
            
            liElement.appendChild(day)
            liElement.appendChild(date)
            liElement.appendChild(saharlik)
            liElement.appendChild(sun)
            liElement.appendChild(peshin)
            liElement.appendChild(asr)
            liElement.appendChild(shom)
            liElement.appendChild(xufton)
            timeTable.appendChild(liElement)    
        });
        
    })
    .catch(error => console.log(error))
}
fetchWeeklyDefault()


elFontSize.addEventListener("click", (evt) =>{
    evt.preventDefault();
    if(evt.target.matches(".font-increase")){
        size = size + 1
        body.style.fontSize = size + "px"
        if(size == 20){
            size = size - 1
        }
    }else if(evt.target.matches(".font-decrease")){
        size = size - 1
        body.style.fontSize = size + "px"
        if(size == 10){
            size = size + 1
        }
    }
})

twoOptionWrapper.addEventListener("click", (evt) => {
    if(evt.target.matches(".site-header__surah")){
        heroSubtitle.style.display = "none"
        timeList.style.display = "none"
        timeFormatList.style.display = "none"
        heroTitle.textContent = "Suralar"
        timeForm.style.display = "none"
        elAudioList.style.display = "flex"
        nasheedList.style.display = "none"
    }else if(evt.target.matches(".site-header__time")){
        heroSubtitle.style.display = "block"
        timeList.style.display = "flex"
        timeFormatList.style.display = "flex"
        elAudioList.style.display = "none"
        heroTitle.textContent = "Namoz vaqti"
        timeForm.style.display = "block"
        timeInput.placeholder = "Viloyatni tanlash"
        nasheedList.style.display = "none"
    }else if(evt.target.matches(".site-header__nasheed")){
        timeForm.style.display = "none"
        heroTitle.textContent = "Nasheedlar"
        elAudioList.style.display = "none"
        timeList.style.display = "none"
        timeFormatList.style.display = "none"
        heroSubtitle.style.display = "none"
        nasheedList.style.display = "flex"
    }
})

fetch("http://api.alquran.cloud/v1/quran/en.asad")
.then(res => res.json())
.then(data => {
    const myData = data.data.surahs;
    myData.forEach(item =>{
        const clonedTemplate = elTemplate.cloneNode(true);
        clonedTemplate.querySelector(".audio__number__desc").textContent = item.number;
        clonedTemplate.querySelector(".audio__name").textContent = item.englishName;
        clonedTemplate.querySelector(".audio__eng__name").textContent = item.englishNameTranslation;
        clonedTemplate.querySelector(".audio__ar-name").textContent = item.name;
        clonedTemplate.querySelector(".audio__ayahs").textContent = item.ayahs.length;
        clonedTemplate.querySelector(".audio__icon").dataset.id = item.number;
        clonedTemplate.querySelector(".audio__icon-wrap").href = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${item.number}.mp3`;
        clonedTemplate.querySelector(".audio__icon-wrap").target = "blank";
        newFragment.appendChild(clonedTemplate)
    })
    elAudioList.appendChild(newFragment)
})


function fetchMonthlyDefault(){
    fetch("https://islomapi.uz/api/monthly?region=Samarqand&month=11")
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const itemTimes = item.times;
            let liElement = document.createElement("li");
            liElement.classList.add("time-table-item")
            let day = document.createElement("p")
            day.textContent = item.weekday
            day.classList.add("time-default")
            
            let date = document.createElement("p");
            date.textContent = item.date.split("T", 1).join("");
            date.classList.add("time-default");
            
            let saharlik = document.createElement("p");
            saharlik.textContent = itemTimes.tong_saharlik;
            saharlik.classList.add("time-default");
            
            let sun = document.createElement("p")
            sun.textContent = itemTimes.quyosh
            sun.classList.add("time-default")
            
            let peshin = document.createElement("p")
            peshin.textContent = itemTimes.peshin
            peshin.classList.add("time-default")
            
            let asr = document.createElement("p")
            asr.textContent = itemTimes.asr;
            asr.classList.add("time-default")
            
            let shom = document.createElement("p")
            shom.textContent = itemTimes.shom_iftor;
            shom.classList.add("time-default")
            
            let xufton = document.createElement("p")
            xufton.textContent = itemTimes.hufton;
            xufton.classList.add("time-default")
            
            liElement.appendChild(day)
            liElement.appendChild(date)
            liElement.appendChild(saharlik)
            liElement.appendChild(sun)
            liElement.appendChild(peshin)
            liElement.appendChild(asr)
            liElement.appendChild(shom)
            liElement.appendChild(xufton)
            timeTableMonthly.appendChild(liElement)    
        });
        
    })
    .catch(error => console.log(error))
}
fetchMonthlyDefault()



function fetchMonth(region){
    fetch(`https://islomapi.uz/api/monthly?region=${region}&month=11`)
    .then(res => res.json())
    .then(data => {
        let liHead = document.createElement("li")
        liHead.classList.add("time-table-item");
        
        let headWeek = document.createElement("p")
        headWeek.classList.add("time-default")
        headWeek.textContent = "Hafta:"
        
        let headDate = document.createElement("p")
        headDate.classList.add("time-default")
        headDate.textContent = "Sana:"
        
        let headMorning = document.createElement("p")
        headMorning.classList.add("time-default")
        headMorning.textContent = "Saharlik:"
        
        let headSun = document.createElement("p")
        headSun.classList.add("time-default")
        headSun.textContent = "Quyosh:"
        
        let headPeshin = document.createElement("p")
        headPeshin.classList.add("time-default")
        headPeshin.textContent = "Asr:"
        
        let headAsr = document.createElement("p")
        headAsr.classList.add("time-default")
        headAsr.textContent = "Asr:"
        
        let headShom = document.createElement("p")
        headShom.classList.add("time-default")
        headShom.textContent = "Shom:"
        
        let headXufton = document.createElement("p")
        headXufton.classList.add("time-default")
        headXufton.textContent = "Xufton:"
        
        liHead.appendChild(headWeek);
        liHead.appendChild(headDate);
        liHead.appendChild(headMorning);
        liHead.appendChild(headSun);
        liHead.appendChild(headPeshin);
        liHead.appendChild(headAsr);
        liHead.appendChild(headShom);
        liHead.appendChild(headXufton);
        timeTable.appendChild(liHead);
        timeTableMonthly.innerHTML = "";
        data.forEach(item => {
            const itemTimes = item.times;
            
            let liElement = document.createElement("li");
            liElement.classList.add("time-table-item");
            let day = document.createElement("p");
            day.textContent = item.weekday;
            day.classList.add("time-default");
            let date = document.createElement("p");
            date.textContent = item.date.split("T", 1).join("");
            date.classList.add("time-default");
            let saharlik = document.createElement("p");
            saharlik.textContent = itemTimes.tong_saharlik;
            saharlik.classList.add("time-default");
            let sun = document.createElement("p");
            sun.textContent = itemTimes.quyosh;
            sun.classList.add("time-default");
            let peshin = document.createElement("p");
            peshin.textContent = itemTimes.peshin;
            peshin.classList.add("time-default");
            let asr = document.createElement("p");
            asr.textContent = itemTimes.asr;
            asr.classList.add("time-default");
            let shom = document.createElement("p");
            shom.textContent = itemTimes.shom_iftor;
            shom.classList.add("time-default");
            let xufton = document.createElement("p");
            xufton.textContent = itemTimes.hufton;
            xufton.classList.add("time-default");
            
            liElement.appendChild(day);
            liElement.appendChild(date);
            liElement.appendChild(saharlik);
            liElement.appendChild(sun);
            liElement.appendChild(peshin);
            liElement.appendChild(asr);
            liElement.appendChild(shom);
            liElement.appendChild(xufton);
            timeTableMonthly.appendChild(liElement);    
        });
    })
    .catch(error => console.log(error))
}


 


// record.onresult = function(evt){
//     console.log(evt);
//     const command = evt["results"][0][0]["transcript"];
//     console.log(command);
//     if(command.includes("Bismillah")){
//         elEntrance.style.display = "none";
//     }
// }

// elEntranceBtn.addEventListener("click", function(evt){
//     evt.preventDefault();
//     console.log("Recording started");
//     record.start()
// })