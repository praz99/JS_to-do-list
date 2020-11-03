import './css/style.css';

import { createProject, createTodo } from './logic/factory';
import domController from './dom/domcontroller';

/* globals $:false */

const projectsContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');
const deleteProjectButton = document.querySelector('[data-delete-project-button]');
const deleteToDoButton = document.querySelector('[data-delete-todo-button]');

const displayProjectTodos = document.querySelector('[data-project-dsplay-container]');
const projectTitleElement = document.querySelector('[data-project-title]');
const todosContainer = document.querySelector('[data-todos]');
const todoheader = document.getElementById('ToDoHeader');

const newTodoForm = document.querySelector('[data-new-todo-form]');
const newTodoInputTitle = document.querySelector('[data-new-todo-title-input]');
const newTodoInputDesc = document.querySelector('[data-new-todo-desc-input]');
const newTodoInputPrior = document.querySelector('[data-new-todo-prior-input]');
const newTodoInputDate = document.querySelector('[data-new-todo-date-input]');
const newTodoInputTime = document.querySelector('[data-new-todo-time-input]');
const newTodoInputNote = document.querySelector('[data-new-todo-note-input]');

const todoDescription = document.querySelector('[data-desc]');

const LOCAL_STORAGE_ALL_PROJECTS = 'todos.projects';
const LOCAL_STORAGE_SELECTED_PROJECT = 'todos.selectedProjectId';

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_PROJECTS)) || [
  {
    id: Date.now().toString(),
    name: 'Default Project',
    todos: [],
  },
];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT);

const renderProjects = () => {
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
    projectElement.innerText = project.name;
    if (project.id === selectedProjectId) {
      projectElement.classList.add('active-project');
    }
    projectsContainer.appendChild(projectElement);
  });
};

const save = () => {
  localStorage.setItem(LOCAL_STORAGE_ALL_PROJECTS, JSON.stringify(projects));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, selectedProjectId);
};

const display = () => {
  domController.clearElement(projectsContainer);
  renderProjects();

  const selectedProject = projects.find(project => project.id === selectedProjectId);

  if (selectedProjectId == null) {
    displayProjectTodos.style.display = 'none';
  } else {
    displayProjectTodos.style.display = '';
    projectTitleElement.innerText = selectedProject.name;
    domController.clearElement(todosContainer);
    domController.clearElement(todoDescription);
    domController.renderTodos(selectedProject);
  }
};
const saveAndDisplay = () => {
  save();
  display();
};

const editToDoForm = (todo) => {
  newTodoForm.addEventListener('submit', e => {
    e.preventDefault();
    if (todo.name) todo.name = newTodoInputTitle.value;
    if (todo.desc) todo.desc = newTodoInputDesc.value;
    if (todo.prior) todo.prior = newTodoInputPrior.value;
    if (todo.date) todo.date = newTodoInputDate.value;
    if (todo.time) todo.time = newTodoInputTime.value;
    if (todo.note) todo.note = newTodoInputNote.value;
    saveAndDisplay();
    newTodoForm.reset();
  });
};

todosContainer.addEventListener('click', e => {
  const selectedProject = projects.find(list => list.id === selectedProjectId);
  const selectedToDo = selectedProject.todos.find(todo => todo.id === e.target.id);
  if (e.target.tagName.toLowerCase() === 'input') {
    selectedToDo.complete = e.target.checked;
    save();
  }
  if (e.target.tagName.toLowerCase() === 'button') {
    editToDoForm(selectedToDo);
  }
  if (e.target.tagName.toLowerCase() === 'ul') {
    domController.renderTodosDesc(selectedToDo);
  }
});

deleteToDoButton.addEventListener('click', () => {
  const selectedProject = projects.find(list => list.id === selectedProjectId);
  selectedProject.todos = selectedProject.todos.filter(todo => !todo.complete);
  todoheader.innerText = 'Details';
  saveAndDisplay();
});

projectsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedProjectId = e.target.dataset.projectId;
    todoheader.innerText = 'Details';
    saveAndDisplay();
  }
});

deleteProjectButton.addEventListener('click', () => {
  projects = projects.filter(project => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveAndDisplay();
});

newProjectForm.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === '') return;
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  $('#projectModalCenter').modal('toggle');
  saveAndDisplay();
});

newTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  const todoName = newTodoInputTitle.value;
  const todoDesc = newTodoInputDesc.value;
  const todoPrior = newTodoInputPrior.value;
  const todoDate = newTodoInputDate.value;
  const todoTime = newTodoInputTime.value;
  const todoNote = newTodoInputNote.value;

  if (todoName == null || todoName === '') return;
  const todo = createTodo(todoName, todoDesc, todoPrior, todoDate, todoTime, todoNote);
  newTodoInputTitle.value = null;
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  selectedProject.todos.push(todo);
  $('#ToDoModalCenter').modal('toggle');
  saveAndDisplay();
  newTodoForm.reset();
});

display();
