const createProject = (name) => {
  return {
    id: Date.now().toString(),
    name,
    todos: [],
  };
}

const createTodo = (name, desc, prior, date, time, note) => {
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