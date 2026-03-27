var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var milliseconds=0;

var start = document.getElementById("start");
var lapBtn = document.getElementById("Lap");
var resetBtn = document.getElementById("reset");
var laps = document.getElementById("laps");



var totalTime = 0;
var isTimerOn = false;
var timerId = null;
var lapCount = 0;


function formatTime(time) {
    return time < 10 ? "0" + time : time;
}


function updateTime() {
    var hrs = Math.floor(totalTime / 3600);
    var mins = Math.floor((totalTime % 3600) / 60);
    var secs = totalTime % 60;

    hours.innerHTML = formatTime(hrs)+" : ";
    minutes.innerHTML = formatTime(mins)+" : ";
    seconds.innerHTML = formatTime(secs)+" . ";
    document.getElementById("ms").innerHTML=formatTime(milliseconds);
}


start.addEventListener("click", function () {

    if (isTimerOn) {
        clearInterval(timerId);
        start.innerHTML = "Start";
        isTimerOn = false;
        
    } else {
        timerId = setInterval(function () {
            milliseconds+=1;
            if(milliseconds==100)
            {
                milliseconds=0;
                totalTime++;
            }
         
            updateTime();
        }, 10);
     

        start.innerHTML = "Stop";
        isTimerOn = true;
       
    }
});


lapBtn.addEventListener("click", function () {

    if (!isTimerOn) return; 

    lapCount++;

    var li = document.createElement("li");
    
    li.innerHTML = "Lap " + lapCount +" : " +
        hours.innerHTML +
        minutes.innerHTML +
        seconds.innerHTML+
        document.getElementById("ms").innerHTML;
       

    laps.appendChild(li);
});


resetBtn.addEventListener("click", function () {

    clearInterval(timerId);
    totalTime = 0;
    isTimerOn = false;
    lapCount = 0;
    milliseconds=0;
    

    updateTime();
    laps.innerHTML = "";

    start.innerHTML = "Start";
});
