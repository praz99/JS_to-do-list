import './css/style.css';
import domController from './dom/domcontroller.js';

// autofocus modal input
$('#projectModalCenter').on('shown.bs.modal', function () {
  $('#inputProjectTitle').focus()
})
$('#ToDoModalCenter').on('shown.bs.modal', function () {
  $('#inputToDoTitle').focus()
})


// const preventRefresh = (event) => {
//   event.preventDefault(); 
// };

const projectForm = document.getElementById('project-form');
projectForm.addEventListener('submit', domController.domProjects);

const toDoForm = document.getElementById('toDo-form');
toDoForm.addEventListener('submit', domController.domToDos);


// projectForm.addEventListener('submit', preventRefresh);

// const projectForm = document.getElementById('project-form');
// const projectContainer = document.getElementById('project-container');
// const projects = [];

// const Project = (title) => {
//   return { title }
// };

// function addProject() {
//   const title = document.getElementById('inputProjectTitle').value;
//   const project = Project(title);
//   projects.push(project);
//   displayProject(project);
//   projectForm.reset();
//   $('#projectModalCenter').modal('toggle'); return false; 
// }

// function displayProject(project) {
//   const projectSubmitBtn = document.getElementById('btn-project-add');
//     const projectDiv = document.createElement('div');
//     projectContainer.insertBefore(projectDiv, projectSubmitBtn);

//     const projectTitle = document.createElement('p');
//     projectTitle.innerText = project.title;
//     projectDiv.appendChild(projectTitle);
// };

// const preventRefresh = (event) => {
//   event.preventDefault(); 
// };

// projectForm.addEventListener('submit', addProject);
// projectForm.addEventListener('submit', preventRefresh);

// // to-do list

// const toDoForm = document.getElementById('toDo-form');
// const toDoContainer = document.getElementById('toDo-container');
// const lists = [];



// const ToDo = (title, desc, prior, date, time, note) => {
// 	return {title, desc, prior, date, time, note}
// }

// function addToDo(){
// 	const title = document.getElementById('inputToDoTitle').value;
// 	const desc = document.getElementById('inputToDoDesc').value;
// 	const prior = document.getElementById('inputToDoPrior').value;
// 	const date = document.getElementById('inputToDODate').value;
// 	const time = document.getElementById('inputToDOTime').value;
// 	const note = document.getElementById('inputToDONote').value;

// 	const toDo = ToDo(title, desc, prior, date, time, note);
//   lists.push(toDo);
// 	displayToDo(toDo);
//   toDoForm.reset();
//   $('#ToDoModalCenter').modal('toggle'); return false;
// };

// function displayToDo(todo){
//   const toDoSubmitBtn = document.getElementById('btn-toDo-add');
//   const toDoDiv = document.createElement('div');
//   toDoContainer.insertBefore(toDoDiv, toDoSubmitBtn);

//   const toDOTitle = document.createElement('p');
//   toDOTitle.innerText = todo.title;
//   toDoDiv.appendChild(toDOTitle);
//   toDOTitle.addEventListener('click', showDetail(todo));
//   toDOTitle.addEventListener('click', preventRefresh);
// };

// toDoForm.addEventListener('submit', addToDo);
// toDoForm.addEventListener('submit', preventRefresh);

// // description

// function showDetail(todo) {
//   const detail = document.getElementById('desc');
//   const dTitle = document.createElement('div');
//   const dDesc = document.createElement('div');
//   const dPrior = document.createElement('div');
//   const dDate = document.createElement('div');
//   const dTime = document.createElement('div');
//   const dNote = document.createElement('div');

//   dTitle.innerText = todo.title;
//   dDesc.innerText = todo.desc;
//   dPrior.innerText = todo.prior;
//   dDate.innerText = todo.date;
//   dTime.innerText = todo.time;
//   dNote.innerText = todo.note;

//   detail.appendChild(dTitle);
//   detail.appendChild(dDesc);
//   detail.appendChild(dPrior);
//   detail.appendChild(dDate);
//   detail.appendChild(dTime);
//   detail.appendChild(dNote);
// }