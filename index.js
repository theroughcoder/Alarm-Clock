// below variable is used for targeting clock section 
var clock = document.getElementById('clock');
// below variable is used for targeting set timer button section 
var setAlarmBtn = document.getElementById('set_timer_btn');
// below variable is used for targeting timer left section 
var timeLeft = document.getElementById('time_left');
var alarmList = document.getElementById('alarm_list');
var alarmLeftTime = document.getElementsByClassName("alarm_left_time");
var deleteBtn = document.getElementsByClassName("delete_btn");
let hour;
let min;
let sec;
let ID;

var audio = new Audio('sound/alarm.mp3');
// audio.loop = true;
var alarmListArr = [];
// console.log("hi");

function render(){
    var len = alarmListArr.length;
    alarmList.innerHTML = "";
    for(let i = 0; i < len; i++){
        clearInterval(alarmListArr[i].id);
    }
  for (let i = 0; i < len; i++) {
    var element = document.createElement("div");
    element.classList.add("alarm_list_items");

    element.innerHTML =`<div class="alarm_time">${alarmListArr[i].alarmTime}</div>
      <div class="alarm_left_time">${alarmListArr[i].alarmLeft}</div>
      <button id="delete_timer_btn" type="button" class="delete_btn btn btn-outline-light">Delete Alarm</button>`;
    alarmList.append(element);
    
    deleteBtn[i].onclick = ()=>{ cancelAlarm(i)};
    let id = setInterval(()=>{
        
        // timeLeft.innerHTML = 
        
        let leftHours;
        let leftMins;
        let leftSec;
        
        leftHours = Math.floor(alarmListArr[i].alarmSecondLeft/60/60);
        leftMins =  Math.floor( alarmListArr[i].alarmSecondLeft/60) % 60;
        leftSec = alarmListArr[i].alarmSecondLeft % 60;
        // console.log(leftHours +" "+ leftMins+" "+ leftSec);
        
        alarmLeftTime[i].innerHTML = leftHours+":"+leftMins+":"+leftSec;
        alarmListArr[i].alarmLeft = leftHours+":"+leftMins+":"+leftSec;
        
        // alarm
        // console.log(alarmListArr[i].alarmLeft);
        if(alarmListArr[i].alarmSecondLeft == 0){
            audio.play();  
            // t.innerHTML = "Stop Alarm";
            // audio.play();  
            clearInterval(alarmListArr[i].id);
            cancelAlarm(i);
            
            return;
        }  
        
        alarmListArr[i].alarmSecondLeft -= 1;
        
        
        
    }, 1000);

        alarmListArr[i].id = id;
    }
}

// this is a click event handler for setting up alarm
setAlarmBtn.onclick = setAlarm;

function setAlarm(){
    alert("Set the Alarm")
    let t = this;
    // t.innerHTML = "Cancel Alarm";
    let setAMPM = document.getElementById("setAMPM").value;
    let setHour = document.getElementById("set_hour").value;
    let setMin = document.getElementById("set_min").value;
    let setSec = document.getElementById("set_sec").value;
    
    setHour = (setAMPM == "pm") ? 12 + Number(setHour) : setHour;
    
    // console.log(setAMPM.value);
    const d = new Date();
    d.setHours(setHour);
        d.setMinutes(setMin);
        d.setSeconds( setSec );
        
        let cur_time = new Date().getTime();
        
        let alarm_time = d.getTime();
        let alarmTime = `${setHour}:${setMin}:${setSec} ${setAMPM}`
        let diff = (alarm_time - cur_time)/1000;
        
        // let leftTime = new Date(diff);
        
        if(diff > 0){
            
            alarm(diff, alarmTime);
        }else{
            alarm(diff + (24*60*60), alarmTime);
        }    
    }
    
// function for running alarm
function alarm(leftTime , alarmTime){


    var obj = {
        alarmTime : alarmTime,
        alarmLeft  : "0:0:0",
        alarmSecondLeft  : leftTime,
        id : 0
    }

    alarmListArr.push(obj);
    render();
} 

// function for canceling alarm
function cancelAlarm(i){
    

        // t.innerHTML = "Set Alarm";
        // timeLeft.innerHTML = "0:0:0";

        clearInterval(alarmListArr[i].id);
        alarmListArr.splice(i , 1);
        render();

    }
// this is the Interval that keeps current time clock running 
setInterval(() => {
    
    const d = new Date();
    // d.setHours(12);
     hour = d.getHours();
     min = d.getMinutes();
     sec = d.getSeconds();

    
    clock.innerHTML =  (hour < 12)? hour + ":"+min+":"+sec+  " AM" : Math.floor( hour%12) + ":"+min+":" +sec+ " PM" ;
}, 1000);