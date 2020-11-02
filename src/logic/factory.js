function createProject(name) {
  return {
    id: Date.now().toString(),
    name,
    todos: [],
  };
}

function createTodo(name, desc, prior, date, time, note) {
  return {
    id: Date.now().toString(),
    name,
    desc,
    prior,
    date,
    time,
    note,
    complete: false,
  };
}

export { createProject, createTodo };