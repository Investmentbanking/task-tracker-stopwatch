// HTML element where stopwatch time will be displayed
const display = document.getElementById("display");

const recordTime = document.getElementById("recordedBox")

const list = document.getElementById("list");

var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second"); 

const newTask = document.getElementById("newTask");
const selectTask = document.getElementById("taskDropdown");


const startStopBtn = document.getElementById("startStopBtn");

const taskTitle = document.getElementById("taskTitle");

// Holds set interval reference for controlling timer updates, cleared when stopwatch stopped/reset
let timer = null;

// stores timestamp when stopwatch started or resumed
let startTime = 0;


// tracks total time in milliseconds that had elapsed since stopwatch started
let elapsedTime = 0;

// boolean indicating whether stopwatch currently running
let isRunning = false;


// Starts/resumes stopwatch
function startStop(){

    if(isRunning){
        clearInterval(timer);
        startStopBtn.innerHTML = "Start";
        startStopBtn.style.backgroundColor = "#90EE90";
        startStopBtn.addEventListener('mouseover', () => {
            startStopBtn.style.backgroundColor = "#49B658";
        });
        startStopBtn.addEventListener('mouseout', () => {
            startStopBtn.style.backgroundColor = "#90EE90";
        });
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }

    else {
        // Date.now() gets current timestamp in milliseconds, subtracting elapsed time
        // ensures stopwatch resumes from where it was paused
        startTime = Date.now() - elapsedTime;
        startStopBtn.innerHTML = "Pause";
        startStopBtn.style.backgroundColor = "#FAA0A0";
        startStopBtn.addEventListener('mouseover', () => {
            startStopBtn.style.backgroundColor = "#EE4B2B";
        });
        startStopBtn.addEventListener('mouseout', () => {
            startStopBtn.style.backgroundColor = "#FAA0A0";
        });
        // Calls update function every 10 ms to update display
        timer = setInterval(update, 10);
        isRunning = true;
    }

}

// function stop(){

//     if(isRunning){
//         clearInterval(timer);
//         elapsedTime = Date.now() - startTime;
//         isRunning = false;
//     }

// }

function reset(){
    clearInterval(timer);
    startStopBtn.innerHTML = "Start";
    startStopBtn.style.backgroundColor = "#90EE90";

    startStopBtn.addEventListener('mouseover', () => {
        startStopBtn.style.backgroundColor = "#49B658";
    });
    startStopBtn.addEventListener('mouseout', () => {
        startStopBtn.style.backgroundColor = "#90EE90";
    });
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
}

function update() {

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function record(){
    const listItem = document.createElement("li");

    const selectedTask = document.getElementById("taskDropdown").value;
    const currentTime = display.textContent;
    let taskWithTime = "";

    if(selectedTask === "None") {
        taskWithTime = currentTime;
    } else {
        taskWithTime = `${selectedTask}: ${currentTime}`;
    }

    listItem.textContent = taskWithTime;

    list.appendChild(listItem);
}

function clearTimes() {
    list.innerHTML = "";
}

function setTime() {

    if(hour.value < 0 || hour.value > 24) {
        alert("Please enter a value between 0 and 24 hours");
        return;
    }
    if(minute.value < 0 || minute.value > 60) {
        alert("Please enter a value between 0 and 60 minutes");
        return;
    }
    if(second.value < 0 || second.value > 60) {
        alert("Please enter a value between 0 and 60 seconds");
        return;
    }
    let hours = parseInt(hour.value) || 0;
    let minutes = parseInt(minute.value) || 0;
    let seconds = parseInt(second.value) || 0;

    elapsedTime = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    let milliseconds = "00";

    
    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function addTask() {
    const taskValue = newTask.value.trim();
    const addTaskDropdown = document.createElement("option");

    if(taskValue === "") {
        alert("Task name cannot be empty or just spaces!");
        return; 
    }

    addTaskDropdown.textContent = taskValue;
    addTaskDropdown.value = taskValue;
 
    selectTask.appendChild(addTaskDropdown);
    newTask.value = "";
}

selectTask.addEventListener("change", () => {
    const selectedTask = selectTask.value;

    if (selectedTask === "None") {
        taskTitle.textContent = "No task selected";
    } else {
        taskTitle.textContent = `Current Task: ${selectedTask}`;
    }
})