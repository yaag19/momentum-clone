const form = document.querySelector(".js-nameForm");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

//사용자의 이름을 입력받은 text를 localStroage에 저장
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentVal = input.value;
    //console.log(currentVal);
    paintGreeting(currentVal);
    saveName(currentVal);
}

//input에 이름을 써서 Enter를 치면(submit을 하면)
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${text}!`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    console.log(currentUser);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}
init();