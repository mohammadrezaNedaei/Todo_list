window.onload = onloadFunction;
let toDoList = [];
let doneList = [];
function onloadFunction() {
  updateTodos();
}
function getTodayDate() {
  var now = new Date();
  var datetime = now.toLocaleDateString();
  return datetime;
}
function getData() {
  // Retrieving the string
  let rettodoString = localStorage.getItem("todoArray");
  // Retrieved array
  toDoList = JSON.parse(rettodoString) || [];
  // Retrieving the string
  let retdoneString = localStorage.getItem("doneArray");
  // Retrieved array
  doneList = JSON.parse(retdoneString) || [];
}
function putData() {
  let todoString = JSON.stringify(toDoList);
  localStorage.setItem("todoArray", todoString);
  let doneString = JSON.stringify(doneList);
  localStorage.setItem("doneArray", doneString);
}
function setToDo(name) {
  toDoList.push(name);
  putData();
  updateTodos();
  document.querySelector(".todo-name").value = "";
}
function updateTodos() {
  getData();
  let todoListHtml = ``;
  for (let i = 0; i < toDoList.length; i++) {
    const todo = toDoList[i];
    todoListHtml += `
    <div class="todo-container">
      <div>
        <p class="todo-list-name"> "${todo}"</p>
      </div>
      <div class="todo-done-buttons">
        <button class="done-button" onclick="doneTodo(${i})">done</button>
        <button class="delete-button" onclick="deleteTodo(${i})">delete</button>
      </div>
    </div>`;
  }
  for (let i = 0; i < doneList.length; i++) {
    const todo = doneList[i];
    todoListHtml += `
    <div class="todo-container">
      <div>
        <p class="todo-list-name" style="text-decoration: line-through;"> "${todo}"</p>
      </div>
      <div class="todo-done-buttons">
        <button class="delete-button" onclick="deleteDone(${i})">delete</button>
      </div>
    </div>`;
  }
  document.querySelector(".todos-js").innerHTML = todoListHtml;
}
function doneTodo(index) {
  doneList.push(toDoList[index]);
  deleteTodo(index);
  putData();
  updateTodos();
}
function deleteTodo(index) {
  toDoList.splice(index, 1);
  putData();
  updateTodos();
}
function deleteDone(index) {
  doneList.splice(index, 1);
  putData();
  updateTodos();
}
function enterKeyPressed(event) {
  if (event.keyCode == 13) {
    document.getElementById("set").click();
  }
}