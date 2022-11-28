import { dom } from './dom.js';
import { projects } from './projects.js';
import { storage } from './storage.js';
import { format } from 'date-fns';
import { isPast } from 'date-fns';
import { add } from 'date-fns';

// Task Obj Factory
function TaskObjCreator(title, details, date, priority, project, completed, fullDate, overdue) {
  return {title, details, date, priority, project, completed, fullDate, overdue};
}

const globalObject = {array: null};

projects.createProject();

function addTask(e) {
  updatePageOnLoad();

  dom.selector.newTaskFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    //Imported Form Input Values
    const taskTitle = dom.selector.newTaskTitle.value;
    const taskDetails = dom.selector.newTaskDetails.value;
    const taskDueDate = dom.selector.newTaskDate.value;
    const taskPriority = dom.selector.newTaskPriority.value;
    const taskProject = projects.projectsArray.find(project => project.active === true).name;

    const taskDate = format(new Date(taskDueDate), 'dd/MM');
  
    if (taskTitle === '' || taskDueDate === '' ) return;
  
    const taskObj = TaskObjCreator(taskTitle, taskDetails, taskDate, taskPriority, taskProject, false, taskDueDate, false);
  
    // Tasks Array
    let tasksArray = projects.projectsArray.find(project => project.active === true).projectArray;
  
    tasksArray.push(taskObj);

    globalObject.array = projects.projectsArray;
    storage.updateProjectsArray(projects.projectsArray);
  
    displayTask(tasksArray);
    console.log(tasksArray); //! REMOVE LATER
  });
}

function displayTask(tasksArray) {
  dom.clearpageItemContainer();
  
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
  showOverdueTask();
  showCheckedTask(tasksArray);
}

function displayExistingTasks(e) {
  let projectsArray = projects.projectsArray;
  const projDisps = document.querySelectorAll('.project-display');
  const projInbox = document.querySelector('#default-project');

  projInbox.onclick = () => {
    projects.makeAllProjectsNonActive(projInbox);

    dom.makeDefaultProjectActive(projectsArray, projInbox);
    dom.makeNotesOptionNonActive(dom.selector.notesOption);
    dom.makeTodayOptionNonActive(dom.selector.todayOption);
    dom.makeWeekOptionNonActive(dom.selector.weekOption);
    dom.clearpageItemContainer();
    displayTasksFromGlobalObject();
  };

  [...projDisps].forEach(projDisp => {
    projDisp.onclick = (e) => {
      const projIndex = [...dom.selector.projectContainer.children].indexOf(projDisp) + 1;
      projects.makeAllProjectsNonActive(projInbox);

      if (e.target.classList.contains('delete-project-btn')) {
        dom.makeDefaultProjectActive(projectsArray, projInbox);
      } else {
        dom.makeProjectActive(projectsArray, projIndex, projDisp);
      }

      dom.makeNotesOptionNonActive(dom.selector.notesOption);
      dom.makeTodayOptionNonActive(dom.selector.todayOption);
      dom.makeWeekOptionNonActive(dom.selector.weekOption);
      dom.clearpageItemContainer();
      displayTasksFromGlobalObject();
    };
  });
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
      dom.completeTaskDom(checkbox, tasksArray, globalObject.array);
    });
  }); 
}

function showCheckedTask(tasksArray) {
  // let tasksArray = globalObject.array.find(project => project.active === true).projectArray;
  
  tasksArray.forEach(task => {
    let taskIndex = tasksArray.indexOf(task);
    dom.showCheckedTaskDom(task, taskIndex);
  });
}

function deleteTask(tasksArray) {
  const trashs = document.querySelectorAll('.trash');

  [...trashs].forEach(trash => {
    trash.addEventListener('click', () => {
      dom.deleteTaskDom(trash, tasksArray, globalObject.array);
    });
  });
}

function editTask(tasksArray) {
  const edits = document.querySelectorAll('.edit');

  [...edits].forEach(edit => {
    edit.addEventListener('click', () => {
      dom.editTaskDom(edit, tasksArray, globalObject.array);
    });
  });
}

function showOverdueTask() {
  let project = projects.projectsArray.find(project => project.active === true);
  if (project === undefined) return;
  let tasksArray = project.projectArray;
  
  tasksArray.forEach(task => {
    const overdue = isPast(add(new Date(task.fullDate), {days: 1}));
    let taskIndex = tasksArray.indexOf(task);

    if (overdue) task.overdue = true;

    dom.showOverdueTaskDom(overdue, taskIndex);
  });
}

function updatePageOnLoad() {
  const projInbox = document.querySelector('#default-project');

  projects.displayProject();

  globalObject.array = projects.projectsArray;

  projects.makeAllProjectsNonActive(projInbox);
  projects.projectsArray[0].active = true;
  projInbox.classList.replace('bg-transparent', 'bg-brand');
  projInbox.classList.replace('border-mid', 'border-brand');

  let tasksArray = projects.projectsArray.find(project => project.active === true).projectArray;
  displayTask(tasksArray);
  storage.updateProjectsArray(projects.projectsArray);
}

function displayTasksFromGlobalObject() {
  if (globalObject.array !== null) {
    let tasksArray = globalObject.array.find(project => project.active === true).projectArray;
    displayTask(tasksArray);
  }

  storage.updateProjectsArray(projects.projectsArray);
  console.log(projects.projectsArray); //! REMOVE LATER
}

export const tasks = {
  addTask,
  displayTask,
  displayExistingTasks,
  globalObject,
};