import { dom } from './dom.js';
import { forms } from './forms.js';

// Tasks Array
let tasksArray = [];

// Task Obj Factory
function TaskObjCreator(title, details, date, priority, project) {
  return {title, details, date, priority, project};
}

// Task Completed State
function TaskCompleteState(completed) {
  return {completed};
}

function addTask(e) {
  dom.selector.newTaskFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    //Imported Form Input Values
    const taskTitle = dom.selector.taskTitle.value;
    const taskDetails = dom.selector.taskDetails.value;
    const taskDate = dom.selector.taskDate.value;
    const taskPriority = dom.selector.taskPriority.value;
    const taskProject = dom.selector.taskProject.value;

    if (taskTitle === '' || taskDetails === '' || taskDate === '' ) return;

    const taskObj = TaskObjCreator(taskTitle, taskDetails, taskDate, taskPriority, taskProject);

    tasksArray.push(taskObj);

    displayTask();
    console.log(tasksArray); //! REMOVE LATER
  });
}

function displayTask() {
  dom.clearTaskContainer();

  let baseColor;

  tasksArray.forEach(task => {
    let taskState = TaskCompleteState(false);

    if (task.priority === 'Low') {
      baseColor = 'blue';
    } else if (task.priority === 'Medium') {
      baseColor = 'yellow';
    } else {
      baseColor = 'red';
    }

    const taskDisp = document.createElement('div');
    taskDisp.className = `task-display text-sm border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-lg px-3 py-0.5 transition duration-150 md:text-base`;

    const taskHTML = 
      `
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <div class="">
            <input type="checkbox" class="finish-task border-[3px] border-dark rounded-full w-5 h-5 bg-transparent checked:text-dark focus:ring-0 focus:ring-offset-0">
          </div>
          <h4 class="text-lg font-semibold pt-0.5 ml-1">${task.title}</h4>
          <i class="fa-solid fa-chevron-up text-sm pt-1.5"></i>
        </div>
        <div class="flex gap-2 items-center">
          <p class="mr-4">${task.date}</p>
          <i class="fa-solid fa-pen-to-square text-sm"></i>
          <i class="fa-solid fa-trash text-sm"></i>
        </div>
      </div>
      <div class="extended-part px-8 hidden">
        <p>
          <span class="font-semibold">Details:</span>
          ${task.details}
        </p>
        <div>
          <p>
            <span class="font-semibold">Project:</span>
            ${task.project}
          </p>
          <p>
            <span class="font-semibold">Priority:</span>
            ${task.priority}
          </p>
        </div>
      </div>
      `;

    taskDisp.innerHTML = taskHTML;

    dom.selector.taskContainer.appendChild(taskDisp);
  });

  // const chevrons = document.querySelectorAll('.fa-chevron-up');

  // [...chevrons].forEach(chevron => {
  //   chevron.addEventListener('click', () => {
  //     console.log('that is a chevron!');
  //   });
  // });
}

export const tasks = {
  addTask,
};