import Factory from './factory.js';

const allLogic = (() => {
	const projects = [];
	let currentProj = null;

	 const setCurrentProject = (index) => {
	 	currentProj = projects[index];
	 }

	 const getCurrentProjectIndex = () => projects.findIndex(p => p == currentProj)

	 const getCurrentProject = () => currentProj;

	const addProject = (title) => {
		projects.push(Factory.projectFactory(title));
	}

	const addToDo = (indexP, title, desc, prior, date, time, note) => {
		projects[indexP].toDos.push(Factory.toDoFactory(title, desc, prior, date, time, note));
	}

	const getProjects = () => projects;

	const getToDos = () => {
        if(!currentProj) return [];
        return  currentProj.toDos;
    }

	return {addProject, addToDo, getProjects, setCurrentProject,getCurrentProject,getToDos, getCurrentProjectIndex};
})();

export default allLogic;