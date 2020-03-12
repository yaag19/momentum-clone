const body = document.querySelector("body");

const IMG_NUMBER = 7;

/* API이용시 필요한 함수.
function handleImgLoad() {
    console.log('finished loading');
}
*/
function paintImage(imgNum) {
    const image = new Image();
    image.src = `images/${imgNum +1}.jpg`;
    image.classList.add("bgImage"); //클래스 만들기
    body.appendChild(image);

    /* table listener를 이미지화 하기위해 even listener를 연결???
     만약 API를 이용했다면 아래의 코드가 필요 했을꺼래..
    image.addEventListener("loadend", handleImgLoad);
    */
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();