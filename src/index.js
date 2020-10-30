const projectsContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');
const deleteProjectButton = document.querySelector('[data-delete-project-button]');
const deleteToDoButton = document.querySelector('[data-delete-todo-button]');

const projectDisplayContainer = document.querySelector('[data-project-dsplay-container]');
const projectTitleElement = document.querySelector('[data-project-title]');
const todosContainer = document.querySelector('[data-todos]');

const todoTemplate = document.getElementById('todo-template');

const newTodoForm = document.querySelector('[data-new-todo-form]');
const newTodoInputTitle = document.querySelector('[data-new-todo-title-input]');
const newTodoInputDesc = document.querySelector('[data-new-todo-desc-input]');
const newTodoInputPrior = document.querySelector('[data-new-todo-prior-input]');
const newTodoInputDate = document.querySelector('[data-new-todo-date-input]');
const newTodoInputTime = document.querySelector('[data-new-todo-time-input]');
const newTodoInputNote = document.querySelector('[data-new-todo-note-input]');

const todoDescriptionContainer = document.querySelector('[data-todo-desc]');
const todoDescription = document.querySelector('[data-desc]');

const LOCAL_STORAGE_PROJECT_KEY = 'todos.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'todos.selectedProjectId';

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)


todosContainer.addEventListener('click', e => {
	if (e.target.tagName.toLowerCase() === 'ul') {
	 const selectedProject = projects.find(list => list.id === selectedProjectId)
    const selectedToDo = selectedProject.todos.find(todo => todo.id === e.target.id)
    renderTodosDesc(selectedToDo);
	}
});

deleteToDoButton.addEventListener('click', e => {
  const selectedProject = projects.find(list => list.id === selectedProjectId)
  selectedProject.todos = selectedProject.todos.filter(todo => todo.id == selectedProject.todos.id);
  saveAndRender();
});

projectsContainer.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'li') {
    selectedProjectId = e.target.dataset.projectId
    saveAndRender()
  }
});

deleteProjectButton.addEventListener('click', e => {
  projects = projects.filter(project => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveAndRender();
});

newProjectForm.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = newProjectInput.value;
  if(projectName == null || projectName === '') return
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  saveAndRender()
});

newTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  const todoName = newTodoInputTitle.value;
  const todoDesc = newTodoInputDesc.value;
  const todoPrior = newTodoInputPrior.value;
  const todoDate = newTodoInputDate.value;
  const todoTime = newTodoInputTime.value;
  const todoNote = newTodoInputNote.value;

  if(todoName == null || todoName === '') return
  const todo = createTodo(todoName,todoDesc,todoPrior,todoDate,todoTime,todoNote);
  newTodoInputTitle.value = null;
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  selectedProject.todos.push(todo);
  saveAndRender();
  newTodoForm.reset();
});



function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    todos: []
  }
}

function createTodo(name, desc, prior, date, time, note) {
  return {
    id: Date.now().toString(),
    name: name,
    desc: desc,
    prior: prior,
    date: date,
    time: time,
    note: note
  }
}

function saveAndRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
}

function render() {
  clearElement(projectsContainer);
  renderProjects();

  const selectedProject = projects.find(project => project.id === selectedProjectId);

  if(selectedProjectId == null) {
    projectDisplayContainer.style.display = 'none';
  } else {
    projectDisplayContainer.style.display = '';
    projectTitleElement.innerText = selectedProject.name;
    clearElement(todosContainer);
    renderTodos(selectedProject);
  }
}

function renderTodos(selectedProject) {
  selectedProject.todos.forEach(todo => {
    const todoElement = document.importNode(todoTemplate.content, true);
    const label = todoElement.querySelector('ul');
    label.id = todo.id;
    label.append(todo.name);
    todosContainer.appendChild(todoElement);
  })
}

function renderTodosDesc(selectedToDo) {
	clearElement(todoDescription);
    todoDescription.append(selectedToDo.name);
    todoDescription.append(selectedToDo.desc); 
    todoDescription.append(selectedToDo.prior);
    todoDescription.append(selectedToDo.date);
    todoDescription.append(selectedToDo.time);
    todoDescription.append(selectedToDo.note);
    todoDescriptionContainer.appendChild(todoDescription);
}

function renderProjects() {
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
    projectElement.classList.add("project-name");
    projectElement.innerText = project.name;
    if(project.id === selectedProjectId) {
      projectElement.classList.add('active-project')
    }
    projectsContainer.appendChild(projectElement);
  })
}
function clearElement(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();

// import './css/style.css';
// const projectForm = document.getElementById('project-form');
// const projectContainer = document.getElementById('project-container');
// const projects = [];

// const Project = (title) => {
//   return { title }
// };

// // autofocus modal input
// $('#projectModalCenter').on('shown.bs.modal', function () {
//   $('#inputProjectTitle').focus()
// })

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

// $('#ToDoModalCenter').on('shown.bs.modal', function () {
//   $('#inputToDoTitle').focus()
// })

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
//   // toDOTitle.addEventListener('click', showDetail(todo));
//   // toDOTitle.addEventListener('click', preventRefresh);
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