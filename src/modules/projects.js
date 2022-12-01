import dom from './dom';
import storage from './storage';
import tasks from './tasks';

// Projects Array
let projectsArray;

if (storage.getProjectsArray() !== null) {
  projectsArray = storage.getProjectsArray();
} else {
  projectsArray = [];
}

// Project Obj Factory
function ProjectObjCreator(name, projectArray, active) {
  return { name, projectArray, active };
}

function displayDefaultProject() {
  const projectName = projectsArray[0].name;
  dom.displayDefaultProjectDom(projectName);
}

function deleteProject() {
  const delProjBtns = document.querySelectorAll('.delete-project-btn');

  [...delProjBtns].forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      dom.deleteProjectDom(delBtn, projectsArray);
    });
  });
}

function showActiveProjectAfterAdd() {
  const activeProject = projectsArray.find(
    (project) => project.active === true
  );
  const projIndex = projectsArray.indexOf(activeProject);
  if (projIndex === 0) return;
  dom.selector.projectContainer.children[projIndex - 1].classList.replace(
    'bg-transparent',
    'bg-brand'
  );
  dom.selector.projectContainer.children[projIndex - 1].classList.replace(
    'border-mid',
    'border-brand'
  );
}

function displayProject() {
  dom.clearProjectContainer();

  projectsArray.forEach((project) => {
    if (project.name === 'Inbox') return;

    dom.createProjectDisplayDom(project);
  });

  deleteProject();
  tasks.displayExistingTasks();
  showActiveProjectAfterAdd();
}

function createProject() {
  if (projectsArray.length === 0) {
    const defaultProject = ProjectObjCreator('Inbox', [], true);
    projectsArray.push(defaultProject);
  }

  displayDefaultProject();

  dom.selector.newProjectFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Imported Form Input Values
    const projectName = dom.selector.newProjectName.value;

    if (projectName === '') return;

    const projectObj = ProjectObjCreator(projectName, [], false);

    projectsArray.push(projectObj);

    storage.updateProjectsArray(projectsArray);

    displayProject();
    dom.selector.newProjectForm.reset();
    dom.formDom(dom.selector.newProjectForm);
  });
}

function makeAllProjectsNonActive(projInbox) {
  projectsArray.forEach((project) => {
    project.active = false;
  });
  dom.makeAllProjectsNonActiveDom(projInbox);
}

const projects = {
  createProject,
  projectsArray,
  displayProject,
  makeAllProjectsNonActive,
};

export default projects;
