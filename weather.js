const weather = document.querySelector(".js-weather");

const WEATHER_API_KEY = "6150e990dcf4085224d523b9c2bfc0b6";
const COORDS = 'coords'

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//then : 데이터가 완전히 들어온 다음 함수를 호출함.(fetch가 완료될때까지 기다린후 온전한 json을 가져오고 싶기 때문.)
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function handleGeoSuccess(position) {
    //console.log(position);
    // console.log(position.coords.accuracy);

    /*  .coords대신에 COORDS를 쓰면 왜 안돼?????
        왜냐면, GeolocationCoordinates의 key값인 coords임*/
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function hadleGeoError() {
    console.log("can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, hadleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        //getWeather
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords()
}
init();