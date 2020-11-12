import {createProject, createTodo} from '../logic/factory';

test("Create a project", () => {
	const project = createProject("study");
	expect(project.name).toEqual("study")
});

describe("Create a todo", () => {

	const todo = createTodo("math", "maths is about logic", "low", "date", "time", "10 chapters");
	
	test("return todo name", () => {
	expect(todo.name).toEqual("math")
	});

	test("return todo description", () => {
	expect(todo.desc).toEqual("maths is about logic")
	});

	test("return todo priority", () => {
	expect(todo.prior).toEqual("low")
	});

	test("return todo notes", () => {
	expect(todo.note).toEqual("10 chapters")
	});


});
