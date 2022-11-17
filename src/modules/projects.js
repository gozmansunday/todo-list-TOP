import { dom } from './dom.js';
import { tasks } from './tasks.js';
import { storage } from './storage.js';

// Projects Array
let projectsArray;

if (storage.getLocalArray() !== null) {
  projectsArray = storage.getLocalArray();
}
else {
  projectsArray = [];
}

// Project Obj Factory
function ProjectObjCreator(name, projectArray, active) {
  return {name, projectArray, active};
}

function createProject(e) {
  if (projectsArray.length === 0) {
    // Create Default Project - Inbox`
    let defaultProject = ProjectObjCreator('Inbox', [], true);
    projectsArray.push(defaultProject);
  }
  
  displayDefaultProject();

  // Create Other Projects
  dom.selector.newProjectFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //Imported Form Input Values
    const projectName = dom.selector.newProjectName.value;

    if (projectName === '') return;

    const projectObj = ProjectObjCreator(projectName, [], false);

    projectsArray.push(projectObj);

    storage.updateLocalStore(projectsArray);
    
    console.log(projectsArray); //! REMOVE LATER
    displayProject();
  });
}

function displayDefaultProject() {
  const projectName = projectsArray[0].name;
  dom.displayDefaultProjectDom(projectName);
}

function displayProject() {
  dom.clearProjectContainer();

  projectsArray.forEach(project => {
    if (project.name === 'Inbox') return;

    dom.createProjectDisplayDom(project);
  });

  deleteProject();
  tasks.displayExistingTasks();
}

function deleteProject() {
  const delProjBtns = document.querySelectorAll('.delete-project-btn');

  [...delProjBtns].forEach(delBtn => {
    delBtn.addEventListener('click', () => {
      dom.deleteProjectDom(delBtn, projectsArray);
    });
  });
}

function makeAllProjectsNonActive(projInbox) {
  projectsArray.forEach(project => {
    project.active = false;
  });
  dom.makeAllProjectsNonActiveDom(projInbox);
}

// function updateLocalStore() {
//   localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
// }

// function getLocalArray() {
//   return JSON.parse(localStorage.getItem('projectsArray'));
// }

// function loadProjects(projectsArray) {
//   flashcardArray.forEach((flashcard) => {
//     displayFlashcard()
//   })
// }

export const projects = {
  createProject,
  projectsArray,
  displayProject,
  makeAllProjectsNonActive,
};