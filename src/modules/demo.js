import { dom } from './dom.js';
import { tasks } from './tasks.js';

// Projects Array
let projectsArray = [];
// Project Obj Factory

function ProjectObjCreator(name, projectArray, active) {
  return {name, projectArray, active};
}

function inboxProject() {
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
    console.log(projectsArray); //! REMOVE LATER
    console.log(projectObj.name); //! REMOVE LATER
    return projectObj.name;
  });
}

function displayProject() {
  dom.clearProjectContainer();

  projectsArray.forEach(project => {
    if (project.name === 'Inbox') return;

    dom.createProjectDisplayDom(project);
  });

  deleteProject();

  const projDisps = document.querySelectorAll('.project-display');
  const projInbox = dom.selector.projInbox;

  projInbox.onclick = () => {
    makeAllProjectsNonActive(projectsArray, projInbox);

    projectsArray[0].active = true;
    projInbox.classList.replace('bg-transparent', 'bg-brand');
    projInbox.classList.replace('border-mid', 'border-brand');

    dom.selector.pageHeading.textContent = projectsArray[0].name;
    dom.clearTaskContainer();
    tasks.displayTask();

    // console.log(projectsArray); //! REMOVE LATER
  };

  [...projDisps].forEach(projDisp => {
    projDisp.onclick = () => {
      const projIndex = [...dom.selector.projectContainer.children].indexOf(projDisp) + 1;
      makeAllProjectsNonActive(projectsArray, projInbox);

      // Select Active
      projectsArray[projIndex].active = true;
      projDisp.classList.replace('bg-transparent', 'bg-brand');
      projDisp.classList.replace('border-mid', 'border-brand');

      // Change Page
      dom.selector.pageHeading.textContent = projectsArray[projIndex].name;
      dom.clearTaskContainer();

      // console.log(projectsArray); //! REMOVE LATER
    };
  });
}

function deleteProject() {
  const delProjBtns = document.querySelectorAll('.delete-project-btn');

  [...delProjBtns].forEach(delBtn => {
    delBtn.addEventListener('click', () => {
      dom.deleteProjectDom(delBtn, projectsArray);
    });
  });
}

function makeAllProjectsNonActive(projectsArray, projInbox) {
  // Reset
  projectsArray.forEach(project => {
    project.active = false;
  });
  projInbox.classList.replace('bg-brand', 'bg-transparent');
  projInbox.classList.replace('border-brand', 'border-mid');
  [...dom.selector.projectContainer.children].forEach(project => {
    project.classList.replace('bg-brand', 'bg-transparent');
    project.classList.replace('border-brand', 'border-mid');
  });
}

export const projects = {
  projectsArray,
  inboxProject,
  createProject,
};