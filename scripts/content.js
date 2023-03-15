// import styles from "https://fonts.googleapis.com/icon?family=Material+Icons";
function addCss(fileName) {
    // var head = document.head;
    // var link = document.createElement("link");

    // link.type = "text/css";
    // link.rel = "stylesheet";
    // link.href = fileName;

    // head.appendChild(link);
    var link = document.createElement("link");
    link.href = fileName;
    // link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

addCss("https://fonts.googleapis.com/icon?family=Material+Icons");

// Notification body.
const notification = document.createElement("div");
notification.className = 'acho-notification';

// Notification text.
const notificationText = document.createElement('p');
notification.appendChild(notificationText);

// Add to current page.
document.body.appendChild(notification);

// Progress Bar !!!
// const progress = document.createElement("div")
// progress.className = "progress_bar";
const progress = document.createElement("img")
progress.src = chrome.runtime.getURL("assets/longwood.png");
progress.className = "progress_bar";
// banana
const goal = document.createElement("img")
goal.src = chrome.runtime.getURL("assets/banana.png");
progress.appendChild(goal);

// monkey
const character = document.createElement("img")
character.className = "character";
character.src = chrome.runtime.getURL("assets/monkey.png");
// const character = document.createElement("div")
// character.className = "character";
// character.textContent = "🧗"
// const character = document.createElement("img")
// character.src = chrome.runtime.getURL("assets/person-climbing.png");
character.addEventListener('click', function () {
    character.classList.toggle("move");
});
progress.appendChild(character);

document.body.appendChild(progress);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    const notification = document.getElementsByClassName('acho-notification')[0];
    const notificationText = notification.getElementsByTagName('p')[0];

    notificationText.innerHTML = "You are at: " + request.tabTitle;

    // notification.style.display = 'flex';

    // setTimeout(function () {

    //   notification.style.display = 'none';
    // }, 5000);

    // any kind of message, show the progress bar
    // const progress = document.getElementsByClassName('progress_bar')[0];
    // progress.classList.toggle("show");
    console.log(request.cmd);

    if (request.cmd === "SHOW_HIDE") {
        const progress = document.getElementsByClassName('progress_bar')[0];
        progress.classList.toggle("show");
    }

    if (request.cmd === "END_TIMER") {
        const soundEffect = new Audio("assets/monkey!.m4a");
        soundEffect.play();
    } else if (request.cmd === "MOVE") {
        const character = document.getElementsByClassName("character")[0];
        character.classList.toggle("move");
    }

    return true;
});