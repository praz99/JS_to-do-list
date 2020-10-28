import './css/style.css';
const projectForm = document.getElementById('project-form');
const projectContainer = document.getElementById('project-container');
const projects = [];

const Project = (title) => {
  return { title }
};

// autofocus modal input
$('#projectModalCenter').on('shown.bs.modal', function () {
  $('#inputProjectTitle').focus()
})

function addProject() {
  const title = document.getElementById('inputProjectTitle').value;
  const project = Project(title);
  projects.push(project);
  displayProject(project);
  projectForm.reset();
  $('#projectModalCenter').modal('toggle'); return false; 
}

function displayProject(project) {
  const projectSubmitBtn = document.getElementById('btn-project-add');
    const projectDiv = document.createElement('div');
    projectContainer.insertBefore(projectDiv, projectSubmitBtn);

    const projectTitle = document.createElement('p');
    projectTitle.innerText = project.title;
    projectDiv.appendChild(projectTitle);
};

const preventRefresh = (event) => {
  event.preventDefault(); 
};

projectForm.addEventListener('submit', addProject);
projectForm.addEventListener('submit', preventRefresh);

// to-do list

const toDoForm = document.getElementById('toDo-form');
const toDoContainer = document.getElementById('toDo-container');
const lists = [];

$('#ToDoModalCenter').on('shown.bs.modal', function () {
  $('#inputToDoTitle').focus()
})

const ToDo = (title, desc, prior, date, time, note) => {
	return {title, desc, prior, date, time, note}
}

function addToDo(){
	const title = document.getElementById('inputToDoTitle').value;
	const desc = document.getElementById('inputToDoDesc').value;
	const prior = document.getElementById('inputToDoPrior').value;
	const date = document.getElementById('inputToDODate').value;
	const time = document.getElementById('inputToDOTime').value;
	const note = document.getElementById('inputToDONote').value;

	const toDo = ToDo(title, desc, prior, date, time, note);
	lists.push(toDo);
	displayToDo(toDo);
  	toDoForm.reset();
  	$('#ToDoModalCenter').modal('toggle'); return false; 
}

function displayToDo(todo){
const toDoSubmitBtn = document.getElementById('btn-toDo-add');
    const toDoDiv = document.createElement('div');
    toDoContainer.insertBefore(toDoDiv, toDoSubmitBtn);

    const toDOTitle = document.createElement('p');
    toDOTitle.innerText = todo.title;
    toDoDiv.appendChild(toDOTitle);
};

toDoForm.addEventListener('submit', addToDo);
toDoForm.addEventListener('submit', preventRefresh);