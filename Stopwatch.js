var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var milliseconds=0;
//HTML me jo elements hain (jahan time show hoga), unko select kar rahe hain using id.

var start = document.getElementById("start");
var lapBtn = document.getElementById("Lap");
var resetBtn = document.getElementById("reset");
var laps = document.getElementById("laps");
/*Buttons aur lap list ko select kiya:

start → start/stop button

lapBtn → lap button

resetBtn → reset button

laps → jahan lap list show hogi*/

var totalTime = 0;
//Total time seconds me store hoga (starting me 0)
var isTimerOn = false;
//Check karega timer chal raha hai ya nahi
var timerId = null;
//setInterval ka id store karega (stop karne ke liye)
var lapCount = 0;
//Kitne laps ho chuke hain count karega

// Format time (00:00:00)
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}/**Agar time 10 se chhota hai (like 5), to "05" bana dega
Warna normal return karega */

// Update display
function updateTime() {//Ye function screen pe time update karega
    var hrs = Math.floor(totalTime / 3600);//Total seconds ko hours me convert kar rahe hain
    var mins = Math.floor((totalTime % 3600) / 60);//Remaining seconds me se minutes nikaal rahe hain
    var secs = totalTime % 60;//Baaki seconds nikaal rahe hain

    hours.innerHTML = formatTime(hrs)+" : ";
    minutes.innerHTML = formatTime(mins)+" : ";
    seconds.innerHTML = formatTime(secs)+" . ";
    document.getElementById("ms").innerHTML=formatTime(milliseconds);
    //Screen pe formatted time show kar diya
}

// Start / Stop
start.addEventListener("click", function () {//jb start button click hoga

    if (isTimerOn) {//Agar timer already chal raha hai
        clearInterval(timerId);//Timer stop kar diya
        start.innerHTML = "Start";
        isTimerOn = false;
        // Button text change + timer off
    } else {//Agar timer band hai
        timerId = setInterval(function () {
            milliseconds+=1;
            if(milliseconds==100)
            {
                milliseconds=0;
                totalTime++;
            }
         
            updateTime();
        }, 10);
        /**Har 1 second me:

totalTime +1

display update */

        start.innerHTML = "Stop";
        isTimerOn = true;
        //Button text change + timer ON
    }
});

// Lap button
lapBtn.addEventListener("click", function () {// Lap button click

    if (!isTimerOn) return; //Agar timer chal nahi raha → kuch mat karo

    lapCount++;//Lap number increase

    var li = document.createElement("li");//New list item banaya
    
    li.innerHTML = "Lap " + lapCount +" : " +
        hours.innerHTML +
        minutes.innerHTML +
        seconds.innerHTML+
        document.getElementById("ms").innerHTML;
        //Current time ko lap ke form me likh diya

    laps.appendChild(li);//List me add kar diya
});

// Reset button
resetBtn.addEventListener("click", function () {//reset button click

    clearInterval(timerId);//timer stop
    totalTime = 0;
    isTimerOn = false;
    lapCount = 0;
    milliseconds=0;
    //Sab values reset

    updateTime();//Screen pe 00:00:00 show
    laps.innerHTML = "";//Saare laps delete

    start.innerHTML = "Start";//Button text wapas "Start"
});