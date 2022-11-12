import { dom } from './dom.js';
import { projects } from './projects.js';

// Task Obj Factory
function TaskObjCreator(title, details, date, priority, project, completed) {
  return {title, details, date, priority, project, completed};
}

const globalObject = {array: null};

projects.createProject();

function addTask(e) {
  dom.selector.newTaskFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    //Imported Form Input Values
    const taskTitle = dom.selector.newTaskTitle.value;
    const taskDetails = dom.selector.newTaskDetails.value;
    const taskDate = dom.selector.newTaskDate.value;
    const taskPriority = dom.selector.newTaskPriority.value;
    const taskProject = projects.projectsArray.find(project => project.active === true).name;
  
    if (taskTitle === '' || taskDetails === '' || taskDate === '' ) return;
  
    const taskObj = TaskObjCreator(taskTitle, taskDetails, taskDate, taskPriority, taskProject, false);
  
    // Tasks Array
    let tasksArray = projects.projectsArray.find(project => project.active === true).projectArray;
  
    tasksArray.push(taskObj);

    globalObject.array = projects.projectsArray;
  
    displayTask(tasksArray);
    console.log(tasksArray); //! REMOVE LATER
  });
}

function displayExistingTasks() {
  let projectsArray = projects.projectsArray;
  const projDisps = document.querySelectorAll('.project-display');
  const projInbox = document.querySelector('#default-project');

  projInbox.onclick = () => {
    projects.makeAllProjectsNonActive(projInbox);

    projectsArray[0].active = true;
    projInbox.classList.replace('bg-transparent', 'bg-brand');
    projInbox.classList.replace('border-mid', 'border-brand');

    
    dom.selector.pageHeading.textContent = projectsArray[0].name;
    dom.clearTaskContainer();
    if (globalObject.array !== null) {
      let tasksArray = globalObject.array.find(project => project.active === true).projectArray;
      displayTask(tasksArray);
    }

    console.log(projectsArray); //! REMOVE LATER
  };

  [...projDisps].forEach(projDisp => {
    projDisp.onclick = () => {
      const projIndex = [...dom.selector.projectContainer.children].indexOf(projDisp) + 1;
      projects.makeAllProjectsNonActive(projInbox);
      
      projectsArray[projIndex].active = true;
      projDisp.classList.replace('bg-transparent', 'bg-brand');
      projDisp.classList.replace('border-mid', 'border-brand');

      dom.selector.pageHeading.textContent = projectsArray[projIndex].name;
      dom.clearTaskContainer();
      if (globalObject.array !== null) {
        let tasksArray = globalObject.array.find(project => project.active === true).projectArray;
        displayTask(tasksArray);
      }

      console.log(projectsArray); //! REMOVE LATER
    };
  });
}

function displayTask(tasksArray) {
  dom.clearTaskContainer();

  tasksArray.forEach(task => {
    let baseColor;

    if (task.priority === 'Low') {
      baseColor = 'blue';
    } else if (task.priority === 'Medium') {
      baseColor = 'yellow';
    } else {
      baseColor = 'red';
    }

    dom.createTaskDisplayDom(baseColor, task);
  });

  expandTask();
  checkTask(tasksArray);
  deleteTask(tasksArray);
  editTask(tasksArray);
}

function expandTask() {
  const chevrons = document.querySelectorAll('.chevron');

  [...chevrons].forEach(chevron => {
    chevron.addEventListener('click', () => {
      dom.taskDisplayControlDom(chevron);
    });
  });
}

function checkTask(tasksArray) {
  const checkboxes = document.querySelectorAll('.checkbox');

  [...checkboxes].forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      dom.completeTaskDom(checkbox, tasksArray);
    });
  }); 
}

function deleteTask(tasksArray) {
  const trashs = document.querySelectorAll('.trash');

  [...trashs].forEach(trash => {
    trash.addEventListener('click', () => {
      dom.deleteTaskDom(trash, tasksArray);
    });
  });
}

function editTask(tasksArray) {
  const edits = document.querySelectorAll('.edit');

  [...edits].forEach(edit => {
    edit.addEventListener('click', () => {
      dom.editTaskDom(edit, tasksArray);
    });
  });
}

export const tasks = {
  addTask,
  displayTask,
  displayExistingTasks,
};