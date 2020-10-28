import './css/style.css';
const projectForm = document.getElementById('project-form');
const projectContainer = document.getElementById('project-container');
const projects = [];

const Project = (title) => {
  return { title }
};

function addProject() {
  const title = document.getElementById('inputProjectTitle').value;
  const project = Project(title);
  projects.push(project);
  displayProject(project);
  projectForm.reset();
}

function displayProject(project) {
  const projectSubmitBtn = document.getElementById('btn-project-submit');
    const projectDiv = document.createElement('div');
    projectContainer.insertBefore(projectDiv, projectSubmitBtn);

    const projectTitle = document.createElement('p');
    projectTitle.innerText = project.title;
    projectDiv.appendChild(projectTitle);
};

const preventRefresh = (event) => {
  event.preventDefault();
};

projectForm.addEventListener('submit', addProject);
projectForm.addEventListener('submit', preventRefresh);