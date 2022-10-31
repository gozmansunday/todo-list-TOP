const modal = document.querySelector('#modal');
// New Task Form Controls DOM
const newTaskForm = document.querySelector('#new-task-form');
const newTaskFormBtn = document.querySelector('#new-task-form-btn');
const newTaskFormCloseBtn = document.querySelector('#new-task-form-close-btn');
const newTaskFormSubmitBtn = document.querySelector('#new-task-form-submit-btn');
// New Task Form Inputs DOM
const taskTitle = document.querySelector('#title');
const taskDetails = document.querySelector('#details');
const taskDate = document.querySelector('#date');
const taskPriority = document.querySelector('#priority');
const taskProject = document.querySelector('#project');
// Task Display DOM
const taskContainer = document.querySelector('#task-container');
const chevrons = document.querySelectorAll('.chevron');

// Selector obj for accessing all DOM query selectors
const selector = {
  modal,
  newTaskForm,
  newTaskFormBtn,
  newTaskFormCloseBtn,
  newTaskFormSubmitBtn,
  taskTitle,
  taskDetails,
  taskDate,
  taskPriority,
  taskProject,
  taskContainer,
  chevrons,
};

function newTaskFormDom() {
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
  newTaskForm.classList.toggle('new-task-form-animation');
  newTaskForm.classList.toggle('hidden');
}

function clearTaskContainer() {
  taskContainer.textContent = '';
}

function createTaskDisplayDom(baseColor, task) {
  const taskDisp = document.createElement('div');
  taskDisp.className = `task-display text-sm border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-xl px-3 pt-0.5 space-y-0.5 md:text-base`;

  const taskHTML =
    `
    <div class="flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <div class="">
          <input type="checkbox" class="checkbox border-[3px] border-dark rounded-full w-5 h-5 bg-transparent checked:text-dark focus:ring-0 focus:ring-offset-0">
        </div>
        <h4 class="text-lg font-semibold pt-0.5 ml-1">${task.title}</h4>
        <i class="chevron rotate-0 fa-solid fa-chevron-up text-sm pt-1 md:pt-1.5"></i>
      </div>
      <div class="flex gap-2 items-center">
        <p class="mr-4  pt-0.5 md:pt-0">${task.date}</p>
        <i class="fa-solid fa-pen-to-square text-sm"></i>
        <i class="trash fa-solid fa-trash text-sm"></i>
      </div>
    </div>
    <div class="extended-part px-8">
      <p>
        <span class="font-semibold">Title:</span>
        ${task.title}
      </p>
      <p>
        <span class="font-semibold">Details:</span>
        ${task.details}
      </p>
      <p>
        <span class="font-semibold">Project:</span>
        ${task.project}
      </p>
      <p>
        <span class="font-semibold">Priority:</span>
        ${task.priority}
      </p>
    </div>
    <div class="confirm-delete px-8 space-y-1">
      <h4 class="font-semibold">
        Are you sure you want to delete this task?
      </h4>
      <div class="flex items-center gap-2 md:gap-3 pb-1">
        <button class="cancel-del-btn bg-dark text-light rounded-md px-4 py-1 text-sm md:text-base transition duration-200 lg:hover:shadow-card">
          Cancel
        </button>
        <button class="confirm-del-btn bg-dark text-light rounded-md px-4 py-1 text-sm md:text-base transition duration-200 lg:hover:shadow-card">
          Delete
        </button>
      </div>
    </div>
    `;

  taskDisp.innerHTML = taskHTML;

  dom.selector.taskContainer.appendChild(taskDisp);
}

function taskDisplayControlDom(chevron) {
  const extendedPart = chevron.parentElement.parentElement.parentElement.children[1];

  if (extendedPart.style.maxHeight) {
    extendedPart.style.maxHeight = null;
  } else {
    extendedPart.style.maxHeight = extendedPart.scrollHeight + "px";
  }

  if (chevron.classList.contains('chevron-anim-down')) {
    chevron.classList.add('chevron-anim-up');
  } else if (chevron.classList.contains('chevron-anim-up')) {
    chevron.classList.remove('chevron-anim-up');
  }
  chevron.classList.toggle('rotate-0');
  chevron.classList.toggle('chevron-anim-down');
  chevron.classList.toggle('rotate-180');
}

function completeTaskDom(checkbox, tasksArray) {
  const taskDisp = checkbox.parentElement.parentElement.parentElement.parentElement;
  const taskIndex = [...dom.selector.taskContainer.children].indexOf(taskDisp);
  const taskTitle = taskDisp.children[0].children[0].children[1];
  const taskDate = taskDisp.children[0].children[1].children[0];
  const chevron = taskDisp.children[0].children[0].children[2];
  const taskEdit = taskDisp.children[0].children[1].children[1];
  const extendedPart = taskDisp.children[1];
  const confirmDelete = taskDisp.children[2];
  let baseColor;

  if (tasksArray[taskIndex].priority === 'Low') {
    baseColor = 'blue';
  } else if (tasksArray[taskIndex].priority === 'Medium') {
    baseColor = 'yellow';
  } else {
    baseColor = 'red';
  }

  if (checkbox.checked) {
    taskDisp.className = `task-display text-sm border-[3px] border-gray-300 bg-gray-200 text-gray-400 rounded-lg px-3 py-0.5 md:text-base`;
    checkbox.classList.replace('checked:text-dark', 'checked:text-gray-400');
    taskTitle.classList.add('line-through');
    taskDate.classList.add('hidden');
    chevron.classList.add('hidden');
    taskEdit.classList.add('hidden');
    extendedPart.style.maxHeight = null;
    confirmDelete.style.maxHeight = null;
    chevron.classList.remove('chevron-anim-down');
    chevron.classList.remove('chevron-anim-up');
    chevron.classList.remove('rotate-0');
    chevron.classList.remove('rotate-180');
    chevron.classList.add('rotate-0');
    tasksArray[taskIndex].completed = true;
  } else {
    taskDisp.className = `task-display text-sm border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-lg px-3 py-0.5 md:text-base`;
    checkbox.classList.replace('checked:text-gray-400', 'checked:text-dark');
    taskTitle.classList.remove('line-through');
    taskDate.classList.remove('hidden');
    chevron.classList.remove('hidden');
    taskEdit.classList.remove('hidden');
    tasksArray[taskIndex].completed = false;
  }
}

function deleteTaskDom(trash, tasksArray) {
  console.log('trash!');

  const taskDisp = trash.parentElement.parentElement.parentElement;
  const taskIndex = [...dom.selector.taskContainer.children].indexOf(taskDisp);
  const confirmDelete = taskDisp.children[2];
  const cancelBtn = confirmDelete.children[1].children[0];
  const deleteBtn = confirmDelete.children[1].children[1];

  if (tasksArray[taskIndex].completed) {
    taskDisp.remove();
    tasksArray.splice(taskIndex, 1);
  } else {
    if (confirmDelete.style.maxHeight) {
      confirmDelete.style.maxHeight = null;
    } else {
      confirmDelete.style.maxHeight = confirmDelete.scrollHeight + "px";
    }

    cancelBtn.addEventListener('click', () => {
      confirmDelete.style.maxHeight = null;
    });

    deleteBtn.addEventListener('click', () => {
      taskDisp.remove();
      tasksArray.splice(taskIndex, 1);
    });
  }
}

export const dom = {
  selector,
  newTaskFormDom,
  clearTaskContainer,
  createTaskDisplayDom,
  taskDisplayControlDom,
  completeTaskDom,
  deleteTaskDom,
};