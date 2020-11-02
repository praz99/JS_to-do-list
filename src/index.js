import './css/style.css';

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
	if(e.target.tagName.toLowerCase() === 'input'){
		const selectedProject = projects.find(list => list.id === selectedProjectId)
    const selectedToDo = selectedProject.todos.find(todo => todo.id === e.target.id);
     selectedToDo.complete = e.target.checked;
    save();
	}
  if (e.target.tagName.toLowerCase() === 'button') {
   const selectedProject = projects.find(list => list.id === selectedProjectId)
     const selectedToDo = selectedProject.todos.find(todo => todo.id === e.target.id)
     editToDoForm(selectedToDo);
  }
	if (e.target.tagName.toLowerCase() === 'ul') {
	 const selectedProject = projects.find(list => list.id === selectedProjectId)
    const selectedToDo = selectedProject.todos.find(todo => todo.id === e.target.id)
    
    renderTodosDesc(selectedToDo);
	}
});

deleteToDoButton.addEventListener('click', e => {
  const selectedProject = projects.find(list => list.id === selectedProjectId)
  selectedProject.todos = selectedProject.todos.filter(todo => !todo.complete)
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

function editToDoForm(todo){

  newTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  if (todo.name) todo.name = newTodoInputTitle.value;
  if (todo.desc) todo.desc = newTodoInputDesc.value;
  if (todo.prior) todo.prior = newTodoInputPrior.value;
  if (todo.date) todo.date = newTodoInputDate.value;
  if (todo.time) todo.time = newTodoInputTime.value;
  if (todo.note) todo.note = newTodoInputNote.value;
  saveAndRender();
  newTodoForm.reset();
});
}

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
    note: note,
    complete: false
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
    clearElement(todoDescription);
    renderTodos(selectedProject);
  }
}

function renderTodos(selectedProject) {
  selectedProject.todos.forEach(todo => {
    const todoElement = document.importNode(todoTemplate.content, true);
    const checkbox = todoElement.querySelector('input');
    const todoListContainer = todoElement.getElementById('todo-list-container');
    if(todo.prior.toLowerCase() === 'low') {
      todoListContainer.style.backgroundColor = '#6ed46e';
    } else if(todo.prior.toLowerCase() === 'medium') {
      todoListContainer.style.backgroundColor = '#c3825d';
    } else {
      todoListContainer.style.backgroundColor = '#d45c5c';
    } 
    checkbox.id = todo.id;
    checkbox.checked = todo.complete;
    const editButton = todoElement.querySelector('button');
    editButton.id = todo.id;
    const label = todoElement.querySelector('ul');
    label.id = todo.id;
    label.append(todo.name);
    if(todo.name !== '')
      todosContainer.appendChild(todoElement);
  })
}

function renderTodosDesc(selectedToDo) {
  clearElement(todoDescription);

  const todoDescTitle = document.createElement('div');
  todoDescTitle.innerText = `Title: ${selectedToDo.name}`;
  todoDescription.appendChild(todoDescTitle);

  const todoDescDescription = document.createElement('div');
  todoDescDescription.innerText = `Description: ${selectedToDo.desc}`;
  todoDescription.appendChild(todoDescDescription);

  const todoDescPriority = document.createElement('div');
  todoDescPriority.innerText = `Priority: ${selectedToDo.prior}`;
  todoDescription.appendChild(todoDescPriority);

  const todoDescDate = document.createElement('div');
  todoDescDate.innerText = `Date: ${selectedToDo.date}`;
  todoDescription.appendChild(todoDescDate);

  const todoDescTime = document.createElement('div');
  todoDescTime.innerText = `Time: ${selectedToDo.time}`;
  todoDescription.appendChild(todoDescTime);

  const todoDescNote = document.createElement('div');
  todoDescNote.innerText = `Note: ${selectedToDo.note}`;
  todoDescription.appendChild(todoDescNote);

  todoDescriptionContainer.insertBefore(todoDescription, deleteToDoButton);
}

function renderProjects() {
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
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
