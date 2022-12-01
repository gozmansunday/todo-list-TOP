import { format, isPast, add } from 'date-fns';
import dom from './dom';
import projects from './projects';
import storage from './storage';

// Task Obj Factory
function TaskObjCreator(
  title,
  details,
  date,
  priority,
  project,
  completed,
  fullDate,
  overdue
) {
  return {
    title,
    details,
    date,
    priority,
    project,
    completed,
    fullDate,
    overdue,
  };
}

const globalObject = { array: null };

projects.createProject();

function expandTask() {
  const chevrons = document.querySelectorAll('.chevron');

  [...chevrons].forEach((chevron) => {
    chevron.addEventListener('click', () => {
      dom.taskDisplayControlDom(chevron);
    });
  });
}

function checkTask(tasksArray) {
  const checkboxes = document.querySelectorAll('.checkbox');

  [...checkboxes].forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      dom.completeTaskDom(checkbox, tasksArray, globalObject.array);
    });
  });
}

function showCheckedTask(tasksArray) {
  tasksArray.forEach((task) => {
    const taskIndex = tasksArray.indexOf(task);
    dom.showCheckedTaskDom(task, taskIndex);
  });
}

function deleteTask(tasksArray) {
  const trashs = document.querySelectorAll('.trash');

  [...trashs].forEach((trash) => {
    trash.addEventListener('click', () => {
      dom.deleteTaskDom(trash, tasksArray, globalObject.array);
    });
  });
}

function editTask(tasksArray) {
  const edits = document.querySelectorAll('.edit');

  [...edits].forEach((edit) => {
    edit.addEventListener('click', () => {
      dom.editTaskDom(edit, tasksArray, globalObject.array);
    });
  });
}

function showOverdueTask() {
  const activeProject = projects.projectsArray.find(
    (project) => project.active === true
  );
  if (activeProject === undefined) return;
  const tasksArray = activeProject.projectArray;

  tasksArray.forEach((task) => {
    const overdue = isPast(add(new Date(task.fullDate), { days: 1 }));
    const taskIndex = tasksArray.indexOf(task);

    if (overdue) task.overdue = true;

    dom.showOverdueTaskDom(overdue, taskIndex);
  });
}

function displayTask(tasksArray) {
  dom.clearpageItemContainer();

  tasksArray.forEach((task) => {
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

function updatePageOnLoad() {
  const projInbox = document.querySelector('#default-project');

  projects.displayProject();

  globalObject.array = projects.projectsArray;

  projects.makeAllProjectsNonActive(projInbox);
  projects.projectsArray[0].active = true;
  projInbox.classList.replace('bg-transparent', 'bg-brand');
  projInbox.classList.replace('border-mid', 'border-brand');

  const tasksArray = projects.projectsArray.find(
    (project) => project.active === true
  ).projectArray;
  displayTask(tasksArray);
  storage.updateProjectsArray(projects.projectsArray);
}

function addTask() {
  updatePageOnLoad();

  dom.selector.newTaskFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Imported Form Input Values
    const taskTitle = dom.selector.newTaskTitle.value;
    const taskDetails = dom.selector.newTaskDetails.value;
    const taskDueDate = dom.selector.newTaskDate.value;
    const taskPriority = dom.selector.newTaskPriority.value;
    const taskProject = projects.projectsArray.find(
      (project) => project.active === true
    ).name;
    const taskDate = format(new Date(taskDueDate), 'dd/MM/yyyy');

    if (taskTitle === '' || taskDueDate === '') return;

    const taskObj = TaskObjCreator(
      taskTitle,
      taskDetails,
      taskDate,
      taskPriority,
      taskProject,
      false,
      taskDueDate,
      false
    );

    // Tasks Array
    const tasksArray = projects.projectsArray.find(
      (project) => project.active === true
    ).projectArray;
    tasksArray.push(taskObj);

    globalObject.array = projects.projectsArray;
    storage.updateProjectsArray(projects.projectsArray);
    displayTask(tasksArray);
    dom.selector.newTaskForm.reset();
    dom.formDom(dom.selector.newTaskForm);
  });
}

function displayTasksFromGlobalObject() {
  if (globalObject.array !== null) {
    const tasksArray = globalObject.array.find(
      (project) => project.active === true
    ).projectArray;
    displayTask(tasksArray);
  }

  storage.updateProjectsArray(projects.projectsArray);
}

function displayExistingTasks() {
  const { projectsArray } = projects;
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

  [...projDisps].forEach((projDisp) => {
    projDisp.onclick = (e) => {
      const projIndex =
        [...dom.selector.projectContainer.children].indexOf(projDisp) + 1;
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

const tasks = {
  addTask,
  displayTask,
  displayExistingTasks,
  globalObject,
};

export default tasks;
