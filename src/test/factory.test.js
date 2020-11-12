import { createProject, createTodo } from '../logic/factory';

describe('Create a project', () => {
  const project = createProject('study');

  test('return project name', () => {
    expect(project.name).toEqual('study');
  });

  test('return project todos type', () => {
    const project = createProject('study');
    expect(typeof project.todos).toEqual('object');
  });
});

describe('Create a todo', () => {
  const todo = createTodo('math', 'maths is about logic', 'low', '22-12-2020', '14:50', '10 chapters');

  test('return todo name', () => {
    expect(todo.name).toEqual('math');
  });

  test('return todo description', () => {
    expect(todo.desc).toEqual('maths is about logic');
  });

  test('return todo date', () => {
    expect(todo.date).toEqual('22-12-2020');
  });

  test('return todo priority', () => {
    expect(todo.prior).toEqual('low');
  });

  test('return todo time', () => {
    expect(todo.time).toEqual('14:50');
  });

  test('return todo notes', () => {
    expect(todo.note).toEqual('10 chapters');
  });
});
