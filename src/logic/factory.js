const createProject = (name) => ({
  id: Date.now().toString(),
  name,
  todos: [],
});

const createTodo = (name, desc, prior, date, time, note) => ({
  id: Date.now().toString(),
  name,
  desc,
  prior,
  date,
  time,
  note,
  complete: false,
});

export { createProject, createTodo };