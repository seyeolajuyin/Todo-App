//select the elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names

const CHECK = "fa-check-circle";
const UNCHECKED = "fa-circle-thin";
const LINE_THROUGH = "line-through";

//get item from local storage
let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST); //loads the list to user
} else {
  LIST = [];
  id = 0;
}
//clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
//load  items to ui
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-Us", options);

console.log(dateElement);

//add to do function

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECKED;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}" > ${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
            </li>`;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//add an item to list using the enter key
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECKED);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJOb = element.attributes.job.value;

  if (elementJOb == "complete") {
    completeToDo(element);
  } else if (elementJOb == "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
