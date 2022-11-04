import { dom } from './dom.js';

// Projects Array
let projectsArray = [];
// Project Obj Factory

function ProjectObjCreator(name, projectArray, active) {
  return {name, projectArray, active};
}

function defaultProject() {
  const inbox = ProjectObjCreator('Inbox', [], true);
  projectsArray.push(inbox);

  return inbox;
}

function createProject(e) {
  dom.selector.newProjectFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //Imported Form Input Values
    const projectName = dom.selector.newProjectName.value;

    if (projectName === '') return;

    const projectObj = ProjectObjCreator(projectName, [], false);

    projectsArray.push(projectObj);

    displayProject();
    console.log(projectsArray);
  });
}

function displayProject() {
  dom.clearProjectContainer();

  projectsArray.forEach(project => {
    if (project.name === 'Inbox') return;

    dom.createProjectDisplayDom(project);
  });
}

export const projects = {
  projectsArray,
  defaultProject,
  createProject,
};