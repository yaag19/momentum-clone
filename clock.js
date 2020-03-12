/*querySelector : css방식으로(?) 클래스, 태그, 아이디 등을 가져올 수 있음
                  찾은 첫번째를 가져옴
                (querySelectorAll은 찾는 것에 해당하는 모든것을 가져옴 - array로 리턴 )
  여기서는 js-clock이라는 class를 찾아줌. */
const clockContainer = document.querySelector(".js-clock");

//document전체에서 찾는 것이 아닌 
//js-clock의 child를 찾으려고 하는 것이므로 clockContainer.으로부터 h1을 찾음
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  //innerText : 객체안에 텍스트를 넣기 위해 사용 
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ?  `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();