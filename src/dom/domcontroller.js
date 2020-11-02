const domController = (() => {

  const todoDescriptionContainer = document.querySelector('[data-todo-desc]');
const todoDescription = document.querySelector('[data-desc]');
const projectDisplayContainer = document.querySelector('[data-project-dsplay-container]');
const todosContainer = document.querySelector('[data-todos]');
const projectsContainer = document.querySelector('[data-projects]');
const todoTemplate = document.getElementById('todo-template');


  function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

  function renderTodos(selectedProject) {
  selectedProject.todos.forEach(todo => {
    const todoElement = document.importNode(todoTemplate.content, true);
    const checkbox = todoElement.querySelector('input');
    const todoListContainer = todoElement.getElementById('todo-list-container');
    if (todo.prior.toLowerCase() === 'low') {
      todoListContainer.style.backgroundColor = '#6ed46e';
    } else if (todo.prior.toLowerCase() === 'medium') {
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
    if (todo.name !== '') todosContainer.appendChild(todoElement);
  });
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

  todoDescriptionContainer.appendChild(todoDescription);
}

return { renderTodosDesc, renderTodos, clearElement};

})();

export {domController};
