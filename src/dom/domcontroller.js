// import allLogic from '../logic/logic.js';
// import Factory from '../logic/factory.js';

// const domController = (() => {
	
// 	const removeAllProjects = () => document.querySelectorAll(".project").forEach(p => p.remove());

// 	const removeAllToDos = () => document.querySelectorAll(".todos").forEach(t => t.remove())
	
// 	const domProjects = (event) => {
// 		event.preventDefault();
// 		removeAllProjects();
// 		const projectDiv = document.createElement('div');
// 			projectDiv.className = 'project';
// 			const title = document.getElementById('inputProjectTitle').value;
// 		  	allLogic.addProject(title);
		  	
// 		  	allLogic.getProjects().forEach((project, index) => {

// 		  	allLogic.setCurrentProject(index);
// 			const projectContainer = document.getElementById('project-container');
// 			const projectSubmitBtn = document.getElementById('btn-project-add');
		    
// 		    projectContainer.insertBefore(projectDiv, projectSubmitBtn);

// 		    const projectTitle = document.createElement('p');
// 		    projectTitle.id = `project${index}`;
// 		    projectTitle.innerText = project.title;
// 		    projectDiv.appendChild(projectTitle);
// 			});
			
// 	}


// 	const domToDos = (event) => {
// 		event.preventDefault();
// 		removeAllToDos();
// 		const toDoDiv = document.createElement('div');
// 		toDoDiv.className = 'todos';


// 		  	const title = document.getElementById('inputToDoTitle').value;
// 			const desc = document.getElementById('inputToDoDesc').value;
// 			const prior = document.getElementById('inputToDoPrior').value;
// 			const date = document.getElementById('inputToDODate').value;
// 			const time = document.getElementById('inputToDOTime').value;
// 			const note = document.getElementById('inputToDONote').value;

// 			allLogic.addToDo(indexP, title, desc, prior, date, time, note);

// 			allLogic.getToDos().forEach((todo, index) => {
// 			  const toDoContainer = document.getElementById('toDo-container');
// 			  const toDoSubmitBtn = document.getElementById('btn-toDo-add');
// 			  toDoContainer.insertBefore(toDoDiv, toDoSubmitBtn);

// 			  const toDOTitle = document.createElement('p');
// 			  toDOTitle.innerText = todo.title;
// 			  toDoDiv.appendChild(toDOTitle);
// 		});
// 	}
  	 
// 	return {domProjects,domToDos};
	
// })();

// export default domController;