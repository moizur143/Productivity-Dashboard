function openFeatures(){
    let allElems = document.querySelectorAll('.elem');
let fullElempage = document.querySelectorAll('.fullElem')
let fullElempageBackbtn = document.querySelectorAll('.fullElem .back')


allElems.forEach((elem)=>{
    elem.addEventListener('click',()=>{
        fullElempage[elem.id].style.display = 'block';
    })
})

fullElempageBackbtn.forEach((back)=>{
    back.addEventListener('click',()=>{
        fullElempage[back.id].style.display = 'none';
    })
})
}
openFeatures();

function todoList (){
    let currentTask = []

    if(localStorage.getItem('currentTask')){
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }else{
        console.log('task list is empty')
}

    function renderTask(){
        let allTask = document.querySelector('.allTask')

    let sum = ''
    currentTask.forEach(function(elem,idx){
        sum = sum + `<div class="task">
    <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
    <button id=${idx}>Mark as completed</button>
    </div>`
    })

    allTask.innerHTML = sum

    localStorage.setItem('currentTask', JSON.stringify(currentTask))

    document.querySelectorAll('.task button').forEach(function(btn){
        btn.addEventListener('click',function(){
            currentTask.splice(btn.id,1)
            renderTask()
        })
    })
}
    renderTask();

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e){
    e.preventDefault()
    currentTask.push(
        {
            task: taskInput.value,
            detail: taskDetailsInput.value,
            imp: taskCheckbox.checked
        }
    )
    renderTask();
    
   taskCheckbox.checked = false
   taskInput.value = ''
   taskDetailsInput.value = ''

    })
}
todoList();

function dailyPlanner (){
    var dayPlanner = document.querySelector('.day-planner')

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData'))||{}

var hours = Array.from({length:18},(_,idx)=>`${6+idx}:00 - ${7+idx}:00`)


wholeDaySum = ''
hours.forEach(function(elem,idx){

    var saveData = dayPlanData[idx] || ''

     wholeDaySum = wholeDaySum + `<div class="day-planner-timer">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="...." value=${saveData}>
                </div>`
})

dayPlanner.innerHTML = wholeDaySum

var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
    elem.addEventListener('input',function(){
        dayPlanData[elem.id] = elem.value

        localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
    })
})
}
dailyPlanner()



function motivationQuote (){
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
var motivationAuthor = document.querySelector('.motivation-3 h2')


async function fetchQuote (){

    let response = await fetch('https://dummyjson.com/quotes/random')
    let data = await response.json()
    motivationQuoteContent.innerHTML = data.quote
    motivationAuthor.innerHTML = data.author
}
fetchQuote()
}
motivationQuote()


function pomodoroTimer (){

    let timer = document.querySelector('.pomo-timer h1')
var startBtn = document.querySelector('.pomo-timer .Start-timer')
var pauseBtn = document.querySelector('.pomo-timer .Pause-timer')
var resetBtn = document.querySelector('.pomo-timer .Reset-timer')
var session = document.querySelector('.pomodoro-fullpage .session')
var isWorkSession = true

let timerInterval = null
let totalSeconds = 25*60


function updateTimer(){
    let minutes = Math.floor(totalSeconds/60)
    let seconds = totalSeconds%60

    timer.innerHTML = `${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`
}
 function startTimer (){
    clearInterval(timerInterval)

    if(isWorkSession){
        
        
        timerInterval = setInterval(()=>{
        if(totalSeconds > 0){
            totalSeconds--
            updateTimer()
        }else{
            isWorkSession = false
            clearInterval(timerInterval)
            timer.innerHTML = '05:00'
            session.innerHTML = 'Take a Break'
            session.style.backgroundColor = 'var(--blue)'
            totalSeconds = 5*60

        }
    },1000)
    }else{
        
        timerInterval = setInterval(()=>{
        if(totalSeconds > 0){
            totalSeconds--
            updateTimer()
        }else{
            isWorkSession = true
            clearInterval(timerInterval)
            timer.innerHTML = '25:00'
            session.innerHTML = 'Work Session'
            session.style.backgroundColor = 'var(--green)'
            totalSeconds = 25*60


        }
    },1000)
    }
    
}

function pauseTimer(){
    clearInterval(timerInterval)
}
function resetTimer(){
    clearInterval(timerInterval)
    totalSeconds = 25*60
    updateTimer()
}

startBtn.addEventListener('click',startTimer)
pauseBtn.addEventListener('click',pauseTimer)
resetBtn.addEventListener('click',resetTimer)
}
pomodoroTimer()


function wheatherFunctionality(){
    apiKey = 'e138dfd3468941e181f54833262710'
var city = 'nagpur'

var header1Time = document.querySelector('.header1 h1')
var header1Date = document.querySelector('.header1 h2')
var header2Temp = document.querySelector('.header2 h2')
var header2Condition = document.querySelector('.header2 h4')
var Precipitation = document.querySelector('.header2 .Precipitation')
var Humidity = document.querySelector('.header2 .Humidity')
var Wind = document.querySelector('.header2 .Wind')





var Data = null
async function wheatherAPICall(){
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    Data = await response.json()

    header2Temp.innerHTML = `${Data.current.temp_c}°C`
    header2Condition.innerHTML = `${Data.current.condition.text}`
    Wind.innerHTML = `Wind: ${Data.current.wind_kph} km/h`
    Humidity.innerHTML =` Humidity: ${Data.current.humidity}%`
    Precipitation.innerHTML = `Heatindex: ${Data.current.heatindex_c}%`

}
wheatherAPICall()




function timeDate(){
    const totaldaysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const monthsName = ['January','Febuary','March','April','May','June','July','August','September','october','November','December']
    var date = new Date()
    var dayOfWeek = totaldaysOfWeek[date.getDay()]
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var tarik = date.getDate()
    var month = monthsName[date.getMonth()]
    var year = date.getFullYear()
    

    header1Date.innerHTML = `${tarik} ${month}, ${year}`

    if(hours>12){
        header1Time.innerHTML = `${dayOfWeek}, ${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} PM`

    }else{
        header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} AM`

    }
}
setInterval(()=>{

    timeDate()
},1000)
}
wheatherFunctionality()


function changeTheme(){
    var theme = document.querySelector('.theme')
var rootElement = document.documentElement

var flag = 0
theme.addEventListener('click',function(){

    if(flag == 0){
        rootElement.style.setProperty('--pri','#F8F4E1')
        rootElement.style.setProperty('--sec','#222831')
        rootElement.style.setProperty('--tri1','#948979')
        rootElement.style.setProperty('--tri2','#393E46')
        flag = 1
    }else if(flag == 1){
        rootElement.style.setProperty('--pri','#F1EFEC')
        rootElement.style.setProperty('--sec','#030303')
        rootElement.style.setProperty('--tri1','#D4C9BE')
        rootElement.style.setProperty('--tri2','#123458')
        flag == 2
    }else if(flag == 2){
        rootElement.style.setProperty('--pri','#F8F4E1')
        rootElement.style.setProperty('--sec','#4E1F00')
        rootElement.style.setProperty('--tri1','#FEBA17')
        rootElement.style.setProperty('--tri2','#74512D')
        flag == 0
    }
    
})
}
changeTheme()