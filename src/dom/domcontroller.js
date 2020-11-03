import intervalToDuration from 'date-fns/intervalToDuration';

const domController = (() => {
  const todoDescriptionContainer = document.querySelector('[data-todo-desc]');
  const todoDescription = document.querySelector('[data-desc]');
  const todosContainer = document.querySelector('[data-todos]');
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
        todoListContainer.classList.add('prior-low');
      } else if (todo.prior.toLowerCase() === 'medium') {
        todoListContainer.classList.add('prior-medium');
      } else {
        todoListContainer.classList.add('prior-high');
      }
      checkbox.id = todo.id;
      checkbox.checked = todo.complete;
      const editButton = todoElement.querySelector('button');
      editButton.id = todo.id;
      const label = todoElement.querySelector('ul');
      label.id = todo.id;
      label.append(todo.name);
      const dueDate = document.createElement('span');
      dueDate.innerText = `Due: ${intervalToDuration({
        start: new Date(Date.now()),
        end: new Date(todo.date),
      }).days} Days`;
      label.appendChild(dueDate);
      if (todo.name !== '') todosContainer.appendChild(todoElement);
    });
  }

  function renderTodosDesc(selectedToDo) {
    clearElement(todoDescription);
    const todoheader = document.getElementById('ToDoHeader');
    todoheader.innerText = selectedToDo.name;

    const todoDescDescription = document.createElement('div');
    const todoDescSpan = document.createElement('span');
    todoDescDescription.innerText = 'Description: ';
    todoDescSpan.innerText = `${selectedToDo.desc}`;
    todoDescDescription.appendChild(todoDescSpan);
    todoDescSpan.classList.add('todoText');
    todoDescription.appendChild(todoDescDescription);

    const todoDescPriority = document.createElement('div');
    const todopriSpan = document.createElement('span');
    todoDescPriority.innerText = 'Priority: ';
    todopriSpan.innerText = `${selectedToDo.prior}`;
    todoDescPriority.appendChild(todopriSpan);
    todopriSpan.classList.add('todoText');
    todoDescription.appendChild(todoDescPriority);

    const todoDescDate = document.createElement('div');
    const todoDateSpan = document.createElement('span');
    todoDescDate.innerText = 'Date: ';
    todoDateSpan.innerText = `${selectedToDo.date}`;
    todoDescDate.appendChild(todoDateSpan);
    todoDateSpan.classList.add('todoText');
    todoDescription.appendChild(todoDescDate);

    const todoDescTime = document.createElement('div');
    const todoTimeSpan = document.createElement('span');
    todoDescTime.innerText = 'Time: ';

    todoTimeSpan.innerText = `${selectedToDo.time}`;
    todoDescTime.appendChild(todoTimeSpan);
    todoTimeSpan.classList.add('todoText');
    todoDescription.appendChild(todoDescTime);

    const todoDescNote = document.createElement('div');
    const todoNoteSpan = document.createElement('span');
    todoDescNote.innerText = 'Note: ';
    todoNoteSpan.innerText = `${selectedToDo.note}`;
    todoDescNote.appendChild(todoNoteSpan);
    todoNoteSpan.classList.add('todoText');
    todoDescription.appendChild(todoDescNote);

    todoDescriptionContainer.appendChild(todoDescription);
  }

  return { renderTodosDesc, renderTodos, clearElement };
})();

export default domController;
