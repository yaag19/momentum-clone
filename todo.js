const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const DELETE_BTN_CN = "delBtn"
let toDosArr = [];


function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    /* filter(함수이름) : toDosArr의 모든 아이템을 통해 함수를 실행하고 ,
                            true인 아이템들만 가지고 새로운 array를 만듬,,?
    */
    const cleanToDos = toDosArr.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDosArr = cleanToDos;
    saveToDos();
}

/*
saveToDos() : toDOsArr에 있는 to do 배열들을 localStorage에 저장
JSON.stringify() : 자바스크립트 object를 string으로 바꿔줌.
            why?   localStorage에는 자바스크립트의 data을 집어넣을 수 없다. 
                   오직 String만 저장 가능.

*/
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDosArr));
}

function paintToDo(text) {
    //   console.log(`paintToDo()'s toDoInput -> ${text}`);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDosArr.length + 1;

    delBtn.classList.add(DELETE_BTN_CN);


    delBtn.innerText = "ｘ";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDosArr.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const curretValue = toDoInput.value;
    //   console.log(`hadleSubmit()'s toDoInput -> ${curretValue}`);
    paintToDo(curretValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        //        console.log(parsedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    //   console.log(`init()'s toDoInput -> ${toDoInput}`);
    toDoForm.addEventListener("submit", handleSubmit);
}
init();